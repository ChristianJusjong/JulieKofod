// =============================================================================
// ATELIER-ADMIN — Brugervenligt administrationspanel for Julie Kofod
// =============================================================================

const state = {
    data: null,
    token: sessionStorage.getItem("jk_admin_token") || "",
    localMode: false,
    apiConfigured: false,
    pendingImages: new Map(), // path -> { base64, previewUrl, sizeKb }
    dirtyCount: 0,
    editing: null // { group: 'sale' | 'sold', index: number | -1, tempImage: null }
};

const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", async () => {
    if (typeof indhold === "undefined") {
        showLoginError("Kunne ikke indlæse indhold.js.");
        return;
    }

    state.data = structuredClone(indhold);
    wireLoginEvents();
    wireAppEvents();
    wireModalEvents();

    // Tjek om Vercel API er konfigureret
    try {
        const res = await fetch("/api/auth");
        if (res.ok) {
            const json = await res.json();
            state.apiConfigured = Boolean(json.configured);
        }
    } catch {
        state.apiConfigured = false;
    }

    if (!state.apiConfigured) {
        $("setup-notice").hidden = false;
    }

    if (state.token && state.apiConfigured) {
        enterApp(false);
    }
});

// -----------------------------------------------------------------------------
// LOGIN & SESSION
// -----------------------------------------------------------------------------
function wireLoginEvents() {
    $("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const password = $("admin-password").value;
        if (!password) return;

        $("login-btn").disabled = true;
        $("login-btn").textContent = "Logger ind...";
        hideLoginError();

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });
            const json = await res.json().catch(() => ({}));

            if (!res.ok || !json.token) {
                showLoginError(json.error || "Kunne ikke logge ind. Tjek kodeordet.");
                return;
            }

            state.token = json.token;
            sessionStorage.setItem("jk_admin_token", json.token);
            enterApp(false);
        } catch {
            showLoginError("Kunne ikke kontakte serveren. Brug evt. forhåndsvisning / download-tilstand.");
            $("setup-notice").hidden = false;
        } finally {
            $("login-btn").disabled = false;
            $("login-btn").textContent = "Log ind i Atelier-Admin";
        }
    });

    $("enter-local-btn").addEventListener("click", () => enterApp(true));

    $("logout-btn").addEventListener("click", () => {
        sessionStorage.removeItem("jk_admin_token");
        state.token = "";
        state.localMode = false;
        $("admin-app").hidden = true;
        $("login-screen").hidden = false;
        $("admin-password").value = "";
    });
}

function showLoginError(msg) {
    const el = $("login-error");
    el.textContent = msg;
    el.hidden = false;
}

function hideLoginError() {
    $("login-error").hidden = true;
}

function enterApp(localMode) {
    state.localMode = localMode;
    $("login-screen").hidden = true;
    $("admin-app").hidden = false;
    $("mode-badge").textContent = localMode
        ? "Atelier-Admin · Download-tilstand (lokal)"
        : "Atelier-Admin · Live forbundet";
    $("publish-btn-label").textContent = localMode ? "Download indhold.js" : "Udgiv ændringer";

    renderAll();
    populateTextEditors();
}

// -----------------------------------------------------------------------------
// FANER & TEKSTREDIGERING
// -----------------------------------------------------------------------------
function wireAppEvents() {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b === btn));
            ["sale", "sold", "texts"].forEach((name) => {
                $(`panel-${name}`).hidden = name !== tab;
            });
        });
    });

    $("add-sale-btn").addEventListener("click", () => openArtworkModal("sale", -1));
    $("add-sold-btn").addEventListener("click", () => openArtworkModal("sold", -1));
    $("publish-btn").addEventListener("click", handlePublish);

    // Live binding for tekstfelter
    const bindInput = (id, setter) => {
        $(id).addEventListener("input", (e) => {
            setter(e.target.value);
            markDirty();
        });
    };

    bindInput("txt-hero-overtitel", (v) => (state.data.hero.overtitel = v));
    bindInput("txt-hero-titel", (v) => (state.data.hero.titel = v));
    bindInput("txt-hero-tekst", (v) => (state.data.hero.tekst = v));
    bindInput("txt-citat-tekst", (v) => (state.data.citat.tekst = v));
    bindInput("txt-om-overtitel", (v) => (state.data.om.overtitel = v));
    bindInput("txt-om-afsnit", (v) => {
        state.data.om.afsnit = v
            .split(/\n\s*\n/)
            .map((s) => s.trim())
            .filter(Boolean);
    });
    bindInput("txt-kontakt-email", (v) => (state.data.kontakt.email = v));
    bindInput("txt-kontakt-telefon", (v) => {
        state.data.kontakt.telefon = v;
        state.data.kontakt.telefonLink = v.replace(/\s+/g, "");
    });
    bindInput("txt-kontakt-by", (v) => (state.data.kontakt.by = v));
    bindInput("txt-kontakt-ig", (v) => (state.data.kontakt.instagramHandle = v));
    bindInput("txt-bestilling", (v) => (state.data.solgteSektion.bestillingTekst = v));
}

function populateTextEditors() {
    $("txt-hero-overtitel").value = state.data.hero.overtitel || "";
    $("txt-hero-titel").value = state.data.hero.titel || "";
    $("txt-hero-tekst").value = state.data.hero.tekst || "";
    $("txt-citat-tekst").value = state.data.citat.tekst || "";
    $("txt-om-overtitel").value = state.data.om.overtitel || "";
    $("txt-om-afsnit").value = (state.data.om.afsnit || []).join("\n\n");
    $("txt-kontakt-email").value = state.data.kontakt.email || "";
    $("txt-kontakt-telefon").value = state.data.kontakt.telefon || "";
    $("txt-kontakt-by").value = state.data.kontakt.by || "";
    $("txt-kontakt-ig").value = state.data.kontakt.instagramHandle || "";
    $("txt-bestilling").value = state.data.solgteSektion.bestillingTekst || "";
}

function markDirty() {
    state.dirtyCount += 1;
    $("publish-btn").disabled = false;
    $("change-count").textContent = String(state.dirtyCount);
    $("change-count").hidden = false;
}

function clearDirty() {
    state.dirtyCount = 0;
    $("publish-btn").disabled = true;
    $("change-count").hidden = true;
}

// -----------------------------------------------------------------------------
// RENDER VÆRKLISTER
// -----------------------------------------------------------------------------
function renderAll() {
    $("count-sale").textContent = String(state.data.tilSalg.length);
    $("count-sold").textContent = String(state.data.solgte.length);
    renderList("sale", state.data.tilSalg, $("sale-list"));
    renderList("sold", state.data.solgte, $("sold-list"));
}

function resolvePreviewSrc(filnavn) {
    const pending = state.pendingImages.get(filnavn);
    if (pending) return pending.previewUrl;
    return `../${filnavn}`;
}

function renderList(group, items, container) {
    container.innerHTML = "";
    if (!items.length) {
        container.innerHTML = `<p style="color:var(--text-muted)">Ingen malerier i denne kategori endnu.</p>`;
        return;
    }

    items.forEach((item, index) => {
        const isRound = item.shape === "round";
        const row = document.createElement("article");
        row.className = "art-row";

        const img = document.createElement("img");
        img.className = `art-thumb ${isRound ? "is-round" : ""}`;
        img.src = resolvePreviewSrc(item.filnavn);
        img.alt = item.titel || "Maleri";
        img.loading = "lazy";

        const info = document.createElement("div");
        info.className = "art-row-info";
        info.innerHTML = `
            <h3>${escapeHtml(item.titel || "Uden titel")}</h3>
            <div class="art-row-meta">
                ${group === "sale" && item.pris ? `<span class="art-row-price">${escapeHtml(item.pris)}</span>` : ""}
                <span>${escapeHtml(item.maal || "")}</span>
                <span>${isRound ? "Rundt (Tondo)" : "Rektangulært"}</span>
                <span>${escapeHtml(item.medium || "Akryl på lærred")}</span>
            </div>
            <p class="art-row-desc">${escapeHtml(item.beskrivelse || "")}</p>
        `;

        const actions = document.createElement("div");
        actions.className = "art-row-actions";

        const orderWrap = document.createElement("div");
        orderWrap.className = "order-btns";

        const upBtn = document.createElement("button");
        upBtn.type = "button";
        upBtn.className = "icon-btn";
        upBtn.textContent = "↑";
        upBtn.title = "Flyt op";
        upBtn.disabled = index === 0;
        upBtn.addEventListener("click", () => moveItem(group, index, -1));

        const downBtn = document.createElement("button");
        downBtn.type = "button";
        downBtn.className = "icon-btn";
        downBtn.textContent = "↓";
        downBtn.title = "Flyt ned";
        downBtn.disabled = index === items.length - 1;
        downBtn.addEventListener("click", () => moveItem(group, index, 1));

        orderWrap.append(upBtn, downBtn);

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "btn btn-outline btn-sm";
        editBtn.textContent = "Redigér";
        editBtn.addEventListener("click", () => openArtworkModal(group, index));

        const moveGroupBtn = document.createElement("button");
        moveGroupBtn.type = "button";
        moveGroupBtn.className = "btn btn-ghost btn-sm";
        moveGroupBtn.textContent = group === "sale" ? "Markér som solgt" : "Sæt til salg";
        moveGroupBtn.addEventListener("click", () => toggleSaleStatus(group, index));

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn-danger btn-sm";
        delBtn.textContent = "Slet";
        delBtn.addEventListener("click", () => deleteItem(group, index));

        actions.append(orderWrap, editBtn, moveGroupBtn, delBtn);
        row.append(img, info, actions);
        container.appendChild(row);
    });
}

function moveItem(group, index, delta) {
    const list = group === "sale" ? state.data.tilSalg : state.data.solgte;
    const target = index + delta;
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];
    markDirty();
    renderAll();
}

function toggleSaleStatus(group, index) {
    if (group === "sale") {
        const [item] = state.data.tilSalg.splice(index, 1);
        const soldCopy = { ...item };
        delete soldCopy.pris;
        state.data.solgte.unshift(soldCopy);
        showBanner(`"${item.titel}" er flyttet til Solgte værker. Husk at trykke "Udgiv ændringer".`);
    } else {
        const [item] = state.data.solgte.splice(index, 1);
        const saleCopy = { ...item, pris: item.pris || "2.000 kr." };
        state.data.tilSalg.unshift(saleCopy);
        showBanner(`"${item.titel}" er flyttet til Værker til salg. Tjek prisen og tryk "Udgiv ændringer".`);
    }
    markDirty();
    renderAll();
}

function deleteItem(group, index) {
    const list = group === "sale" ? state.data.tilSalg : state.data.solgte;
    const item = list[index];
    if (!confirm(`Er du sikker på, at du vil fjerne "${item.titel}" fra hjemmesiden?`)) return;
    list.splice(index, 1);
    markDirty();
    renderAll();
}

// -----------------------------------------------------------------------------
// MODAL & AUTOMATISK WEBP-KONVERTERING
// -----------------------------------------------------------------------------
function wireModalEvents() {
    $("modal-close").addEventListener("click", closeArtworkModal);
    $("modal-cancel").addEventListener("click", closeArtworkModal);
    $("artwork-modal").addEventListener("click", (e) => {
        if (e.target === $("artwork-modal")) closeArtworkModal();
    });

    $("choose-file-btn").addEventListener("click", () => $("art-file-input").click());
    $("art-file-input").addEventListener("change", (e) => {
        const file = e.target.files?.[0];
        if (file) handleImageFile(file);
    });

    const zone = $("upload-zone");
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.classList.add("is-dragover");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("is-dragover"));
    zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("is-dragover");
        const file = e.dataTransfer?.files?.[0];
        if (file) handleImageFile(file);
    });

    $("art-shape").addEventListener("change", () => {
        $("upload-preview-img").classList.toggle("is-round", $("art-shape").value === "round");
    });

    $("artwork-form").addEventListener("submit", saveArtworkFromModal);
}

function openArtworkModal(group, index) {
    const isNew = index < 0;
    const list = group === "sale" ? state.data.tilSalg : state.data.solgte;
    const item = isNew ? null : list[index];

    state.editing = { group, index, tempImage: null };
    $("modal-heading").textContent = isNew
        ? group === "sale" ? "Tilføj nyt maleri til salg" : "Tilføj maleri til arkiv"
        : `Redigér "${item.titel}"`;

    $("price-field-wrap").hidden = group !== "sale";
    $("art-pris").required = group === "sale";

    $("art-titel").value = item?.titel || "";
    $("art-pris").value = item?.pris || "";
    $("art-maal").value = item?.maal || "";
    $("art-shape").value = item?.shape === "round" ? "round" : "rect";
    $("art-medium").value = item?.medium || "Akryl på lærred";
    $("art-beskrivelse").value = item?.beskrivelse || "";
    $("art-file-input").value = "";

    if (item?.filnavn) {
        $("upload-preview-img").src = resolvePreviewSrc(item.filnavn);
        $("upload-preview-img").classList.toggle("is-round", item.shape === "round");
        $("upload-meta").textContent = `Nuværende billede: ${item.filnavn}`;
        $("upload-preview-wrap").hidden = false;
        $("upload-prompt").hidden = true;
    } else {
        $("upload-preview-wrap").hidden = true;
        $("upload-prompt").hidden = false;
    }

    $("artwork-modal").hidden = false;
    $("art-titel").focus();
}

function closeArtworkModal() {
    $("artwork-modal").hidden = true;
    state.editing = null;
}

async function handleImageFile(file) {
    if (!file.type.startsWith("image/")) {
        alert("Vælg venligst en billedfil (JPG, PNG eller WebP).");
        return;
    }

    try {
        const result = await convertFileToWebP(file, 1400, 0.86);
        state.editing.tempImage = result;

        $("upload-preview-img").src = result.previewUrl;
        $("upload-preview-img").classList.toggle("is-round", $("art-shape").value === "round");
        $("upload-meta").textContent = `Optimeret til WebP (${result.width}×${result.height} px · ${result.sizeKb} KB)`;
        $("upload-preview-wrap").hidden = false;
        $("upload-prompt").hidden = true;
    } catch (err) {
        alert(`Kunne ikke behandle billedet: ${err.message}`);
    }
}

function convertFileToWebP(file, maxDimension = 1400, quality = 0.86) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Kunne ikke læse filen."));
        reader.onload = () => {
            const img = new Image();
            img.onerror = () => reject(new Error("Billedformatet understøttes ikke af browseren."));
            img.onload = () => {
                let { width, height } = img;
                if (width > maxDimension || height > maxDimension) {
                    const ratio = Math.min(maxDimension / width, maxDimension / height);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL("image/webp", quality);
                const base64 = dataUrl.split(",")[1];
                const sizeKb = Math.max(1, Math.round((base64.length * 3) / 4 / 1024));
                resolve({ base64, previewUrl: dataUrl, width, height, sizeKb });
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

function slugify(str) {
    return String(str || "maleri")
        .toLowerCase()
        .replace(/æ/g, "ae")
        .replace(/ø/g, "oe")
        .replace(/å/g, "aa")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "maleri";
}

function saveArtworkFromModal(e) {
    e.preventDefault();
    const { group, index, tempImage } = state.editing;
    const isNew = index < 0;
    const list = group === "sale" ? state.data.tilSalg : state.data.solgte;

    const titel = $("art-titel").value.trim();
    const pris = $("art-pris").value.trim();
    const maal = $("art-maal").value.trim();
    const shape = $("art-shape").value === "round" ? "round" : "rect";
    const medium = $("art-medium").value.trim() || "Akryl på lærred";
    const beskrivelse = $("art-beskrivelse").value.trim();

    if (isNew && !tempImage) {
        alert("Vælg venligst et billede af maleriet først.");
        return;
    }

    const slug = slugify(titel);
    let filnavn = isNew ? "" : list[index].filnavn;

    if (tempImage) {
        const folder = group === "sale" ? "assets/til-salg" : "assets/solgt";
        const stamp = Date.now().toString().slice(-5);
        filnavn = `${folder}/${slug}-${stamp}.webp`;
        state.pendingImages.set(filnavn, tempImage);
    }

    const record = {
        id: isNew ? slug : list[index].id || slug,
        filnavn,
        titel,
        ...(group === "sale" ? { pris } : {}),
        medium,
        maal,
        shape,
        beskrivelse
    };

    if (isNew) {
        list.unshift(record);
    } else {
        list[index] = record;
    }

    markDirty();
    renderAll();
    closeArtworkModal();
    showBanner(`"${titel}" er gemt i kladden. Tryk på "${$("publish-btn-label").textContent}" når du er klar.`);
}

// -----------------------------------------------------------------------------
// UDGIVELSE TIL GITHUB / VERCEL (ELLER LOKAL DOWNLOAD)
// -----------------------------------------------------------------------------
function generateIndholdJs() {
    return `// =============================================================================
// INDHOLD.JS — Administreret via Julie Kofods Atelier-Admin
// =============================================================================

const indhold = ${JSON.stringify(state.data, null, 4)};
`;
}

function generateSitemapXml() {
    const today = new Date().toISOString().slice(0, 10);
    const allWorks = [...(state.data.tilSalg || []), ...(state.data.solgte || [])];
    const imageNodes = allWorks
        .map((w) => {
            const loc = `https://juliekofod.com/${w.filnavn}`;
            const title = xmlEscape(`${w.titel || "Maleri"} — Akrylmaleri af Julie Kofod`);
            const caption = xmlEscape(
                [w.beskrivelse, w.maal, w.medium].filter(Boolean).join(" · ")
            );
            return `    <image:image>
      <image:loc>${xmlEscape(loc)}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${caption}</image:caption>
      <image:geo_location>Lindenborg, Gistrup, Danmark</image:geo_location>
    </image:image>`;
        })
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://juliekofod.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${imageNodes}
  </url>
</urlset>
`;
}

async function handlePublish() {
    const indholdJs = generateIndholdJs();
    const sitemapXml = generateSitemapXml();

    if (state.localMode) {
        downloadFile("indhold.js", indholdJs, "application/javascript");
        showBanner("indhold.js er downloadet. For 1-klik direkte udgivelse, tilføj ADMIN_PASSWORD og GITHUB_TOKEN i Vercel.");
        clearDirty();
        return;
    }

    const btn = $("publish-btn");
    btn.disabled = true;
    $("publish-btn-label").textContent = "Udgiver...";

    const images = [];
    for (const [path, img] of state.pendingImages.entries()) {
        images.push({ path, base64: img.base64 });
    }

    try {
        const res = await fetch("/api/publish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.token}`
            },
            body: JSON.stringify({
                indholdJs,
                sitemapXml,
                images
            })
        });

        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
            if (res.status === 401) {
                sessionStorage.removeItem("jk_admin_token");
            }
            throw new Error(json.error || "Udgivelse fejlede.");
        }

        state.pendingImages.clear();
        clearDirty();
        showBanner("Udgivet! Din hjemmeside og Google-sitemap opdateres automatisk om ca. 10–15 sekunder.");
    } catch (err) {
        showBanner(err.message, true);
        btn.disabled = false;
    } finally {
        $("publish-btn-label").textContent = "Udgiv ændringer";
    }
}

function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function showBanner(msg, isError = false) {
    const el = $("status-banner");
    el.textContent = msg;
    el.classList.toggle("is-error", isError);
    el.hidden = false;
}

function escapeHtml(str) {
    return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function xmlEscape(str) {
    return escapeHtml(str).replace(/'/g, "&apos;");
}
