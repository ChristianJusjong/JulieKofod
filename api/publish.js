const crypto = require("crypto");

function sha256(str) {
    return crypto.createHash("sha256").update(String(str || "")).digest();
}

function verifyToken(token, secret) {
    if (!token || !secret || typeof token !== "string") return false;
    const parts = token.split(".");
    if (parts.length !== 2) return false;

    const [payload, sig] = parts;
    const expectedSig = crypto
        .createHmac("sha256", sha256(secret))
        .update(payload)
        .digest("base64url");

    const a = Buffer.from(sig);
    const b = Buffer.from(expectedSig);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

    try {
        const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
        return Boolean(data && data.sub === "julie-atelier-admin" && typeof data.exp === "number" && data.exp > Date.now());
    } catch {
        return false;
    }
}

function isSafeAssetPath(filePath) {
    if (typeof filePath !== "string") return false;
    if (filePath.includes("..") || filePath.startsWith("/")) return false;
    return /^(assets\/(til-salg|solgt)\/[a-z0-9][a-z0-9._-]*\.(webp|jpg|jpeg|png))$/i.test(filePath);
}

async function ghRequest(repo, token, path, options = {}) {
    const res = await fetch(`https://api.github.com/repos/${repo}${path}`, {
        method: options.method || "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "User-Agent": "JulieKofod-Atelier-Admin",
            "Content-Type": "application/json"
        },
        body: options.body ? JSON.stringify(options.body) : undefined
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const msg = data.message || `GitHub API fejl (${res.status})`;
        throw new Error(msg);
    }
    return data;
}

module.exports = async function handler(req, res) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Metode ikke tilladt." });
    }

    const adminPassword = process.env.ADMIN_PASSWORD || "";
    const githubToken = process.env.GITHUB_TOKEN || "";
    const repo = process.env.GITHUB_REPO || "ChristianJusjong/JulieKofod";
    const branch = process.env.GITHUB_BRANCH || "main";

    if (!adminPassword || !githubToken) {
        return res.status(503).json({
            error: "Serveren mangler ADMIN_PASSWORD eller GITHUB_TOKEN i Vercel."
        });
    }

    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
    if (!verifyToken(token, adminPassword)) {
        return res.status(401).json({ error: "Din session er udløbet. Log venligst ind igen." });
    }

    let body = req.body;
    if (typeof body === "string") {
        try {
            body = JSON.parse(body);
        } catch {
            return res.status(400).json({ error: "Ugyldig forespørgsel." });
        }
    }

    const { indholdJs, sitemapXml, images = [], commitMessage } = body || {};
    if (typeof indholdJs !== "string" || !indholdJs.includes("const indhold")) {
        return res.status(400).json({ error: "Ugyldigt indhold.js format." });
    }

    if (!Array.isArray(images) || images.length > 25) {
        return res.status(400).json({ error: "For mange billeder på én gang (maks 25)." });
    }

    for (const img of images) {
        if (!isSafeAssetPath(img?.path) || typeof img?.base64 !== "string" || img.base64.length === 0) {
            return res.status(400).json({ error: `Ugyldig billedsti eller fil: ${img?.path || "ukendt"}` });
        }
    }

    try {
        // 1. Get latest commit on main
        const refData = await ghRequest(repo, githubToken, `/git/ref/heads/${branch}`);
        const latestCommitSha = refData.object.sha;
        const commitData = await ghRequest(repo, githubToken, `/git/commits/${latestCommitSha}`);
        const baseTreeSha = commitData.tree.sha;

        // 2. Create blobs for indhold.js, optional sitemap.xml, and any new images
        const treeEntries = [];

        const indholdBlob = await ghRequest(repo, githubToken, "/git/blobs", {
            method: "POST",
            body: { content: indholdJs, encoding: "utf-8" }
        });
        treeEntries.push({
            path: "indhold.js",
            mode: "100644",
            type: "blob",
            sha: indholdBlob.sha
        });

        if (typeof sitemapXml === "string" && sitemapXml.includes("<urlset")) {
            const sitemapBlob = await ghRequest(repo, githubToken, "/git/blobs", {
                method: "POST",
                body: { content: sitemapXml, encoding: "utf-8" }
            });
            treeEntries.push({
                path: "sitemap.xml",
                mode: "100644",
                type: "blob",
                sha: sitemapBlob.sha
            });
        }

        for (const img of images) {
            const imgBlob = await ghRequest(repo, githubToken, "/git/blobs", {
                method: "POST",
                body: { content: img.base64, encoding: "base64" }
            });
            treeEntries.push({
                path: img.path,
                mode: "100644",
                type: "blob",
                sha: imgBlob.sha
            });
        }

        // 3. Create new tree & commit
        const newTree = await ghRequest(repo, githubToken, "/git/trees", {
            method: "POST",
            body: {
                base_tree: baseTreeSha,
                tree: treeEntries
            }
        });

        const message =
            typeof commitMessage === "string" && commitMessage.trim()
                ? commitMessage.trim().slice(0, 120)
                : `Atelier-Admin: Opdateret galleri og indhold (${new Date().toISOString().slice(0, 10)})`;

        const newCommit = await ghRequest(repo, githubToken, "/git/commits", {
            method: "POST",
            body: {
                message,
                tree: newTree.sha,
                parents: [latestCommitSha]
            }
        });

        // 4. Advance branch ref
        await ghRequest(repo, githubToken, `/git/refs/heads/${branch}`, {
            method: "PATCH",
            body: { sha: newCommit.sha, force: false }
        });

        return res.status(200).json({
            ok: true,
            commitSha: newCommit.sha,
            filesUpdated: treeEntries.length
        });
    } catch (err) {
        return res.status(500).json({
            error: `Kunne ikke udgive til GitHub: ${err.message}`
        });
    }
};
