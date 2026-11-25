const crypto = require("crypto");

function sha256(str) {
    return crypto.createHash("sha256").update(String(str || "")).digest();
}

function signToken(secret, expiresInMs = 24 * 60 * 60 * 1000) {
    const payload = Buffer.from(
        JSON.stringify({
            sub: "julie-atelier-admin",
            exp: Date.now() + expiresInMs
        })
    ).toString("base64url");

    const sig = crypto
        .createHmac("sha256", sha256(secret))
        .update(payload)
        .digest("base64url");

    return `${payload}.${sig}`;
}

module.exports = async function handler(req, res) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const adminPassword = process.env.ADMIN_PASSWORD || "";
    const githubToken = process.env.GITHUB_TOKEN || "";
    const configured = Boolean(adminPassword && githubToken);

    if (req.method === "GET") {
        return res.status(200).json({ configured });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Metode ikke tilladt." });
    }

    if (!configured) {
        return res.status(503).json({
            error: "Atelier-Admin er ikke forbundet endnu. Tilføj ADMIN_PASSWORD og GITHUB_TOKEN i Vercel."
        });
    }

    let body = req.body;
    if (typeof body === "string") {
        try {
            body = JSON.parse(body);
        } catch {
            body = {};
        }
    }

    const submitted = typeof body?.password === "string" ? body.password : "";
    const match = crypto.timingSafeEqual(sha256(submitted), sha256(adminPassword));

    if (!match) {
        return res.status(401).json({ error: "Forkert kodeord. Prøv igen." });
    }

    const token = signToken(adminPassword);
    return res.status(200).json({ ok: true, token });
};
