// =============================================================================
// SCRIPT.JS — Interaktivitet, Galleri & Lightbox for Julie Kofod
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
    if (typeof indhold === "undefined") {
        console.error("indhold.js blev ikke indlæst korrekt.");
        return;
    }

    hydrateContent();
    renderSaleGallery();
    renderSoldGallery();
    initNavigation();
    initLightbox();
    initContactForm();
    initScrollReveal();
});

// -----------------------------------------------------------------------------
// 1. HYDRATE TEXT, LOGO & CONTACT CHANNELS FROM INDHOLD.JS
// -----------------------------------------------------------------------------
function hydrateContent() {
    document.title = indhold.site.titel;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", indhold.site.beskrivelse);

    // Logo images (Navbar & Footer only)
    ["nav-logo", "footer-logo"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.src = indhold.site.logo;
    });

    // Hero
    setText("hero-overtitel", indhold.hero.overtitel);
    setText("hero-titel", indhold.hero.titel);
    setText("hero-tekst", indhold.hero.tekst);
    setText("hero-knap-primaer", indhold.hero.knapPrimaer);
    setText("hero-knap-sekundaer", indhold.hero.knapSekundaer);

    const heroMain = document.getElementById("hero-img-main");
    const heroRound = document.getElementById("hero-img-round");
    if (heroMain) heroMain.src = indhold.hero.fremhaevetStort;
    if (heroRound) heroRound.src = indhold.hero.fremhaevetRundt;

    // Section headers
    setText("salg-overtitel", indhold.tilSalgSektion.overtitel);
    setText("salg-overskrift", indhold.tilSalgSektion.overskrift);
    setText("salg-intro", indhold.tilSalgSektion.intro);

    // Quote
    setText("citat-tekst", indhold.citat.tekst);
    setText("citat-forfatter", indhold.citat.forfatter);

    // Sold section
    setText("solgte-overtitel", indhold.solgteSektion.overtitel);
    setText("solgte-overskrift", indhold.solgteSektion.overskrift);
    setText("solgte-intro", indhold.solgteSektion.intro);
    setText("bestilling-tekst", indhold.solgteSektion.bestillingTekst);
    setText("bestilling-knap", indhold.solgteSektion.bestillingKnap);

    // About section
    setText("om-overtitel", indhold.om.overtitel);
    setText("om-overskrift", indhold.om.overskrift);
    setText("om-underskrift", indhold.om.underskrift);
    const omImg = document.getElementById("om-billede");
    if (omImg) omImg.src = indhold.om.billede;

    const omContainer = document.getElementById("om-afsnit");
    if (omContainer && Array.isArray(indhold.om.afsnit)) {
        omContainer.innerHTML = "";
        indhold.om.afsnit.forEach((paragraph) => {
            const p = document.createElement("p");
            p.textContent = paragraph;
            omContainer.appendChild(p);
        });
    }

    // Contact section
    setText("kontakt-overtitel", indhold.kontakt.overtitel);
    setText("kontakt-overskrift", indhold.kontakt.overskrift);
    setText("kontakt-tekst", indhold.kontakt.tekst);
    setText("kontakt-email-text", indhold.kontakt.email);
    setText("kontakt-telefon-text", indhold.kontakt.telefon);
    setText("kontakt-by-text", indhold.kontakt.by);
    setText("kontakt-instagram-text", indhold.kontakt.instagramHandle);

    const emailLink = document.getElementById("kontakt-email-link");
    if (emailLink) emailLink.href = `mailto:${indhold.kontakt.email}`;

    const phoneLink = document.getElementById("kontakt-telefon-link");
    if (phoneLink) phoneLink.href = `tel:${indhold.kontakt.telefonLink}`;

    ["nav-instagram", "drawer-instagram", "kontakt-instagram-link", "footer-instagram", "lb-instagram"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.href = indhold.kontakt.instagramUrl;
    });

    setText("footer-instagram-handle", indhold.kontakt.instagramHandle);
    setText("site-footer-text", indhold.site.footerTekst);
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined) el.textContent = value;
}

function getArtworkShape(item) {
    if (item.shape === "round" || item.shape === "rect") {
        return item.shape;
    }
    const text = `${item.titel || ""} ${item.maal || ""}`.toLowerCase();
    if (text.includes("rundt") || text.includes("ø")) {
        return "round";
    }
    return "rect";
}

// -----------------------------------------------------------------------------
// 2. RENDER "TIL SALG" GALLERY
// -----------------------------------------------------------------------------
function renderSaleGallery() {
    const grid = document.getElementById("sale-grid");
    if (!grid) return;
    grid.innerHTML = "";

    indhold.tilSalg.forEach((item, index) => {
        const shape = getArtworkShape(item);
        const isRound = shape === "round";

        const card = document.createElement("article");
        card.className = `art-card art-card--${shape} reveal`;
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Se ${item.titel} i stor visning`);

        const metaParts = [item.maal, item.medium].filter(Boolean).join(" · ");

        if (isRound) {
            card.innerHTML = `
                <div class="art-mat art-mat--round">
                    <img src="${item.filnavn}" alt="${item.titel}" class="is-round" loading="lazy">
                </div>
                <div class="art-info art-info--round">
                    <span class="sale-badge sale-badge--inline">Til salg</span>
                    <h3 class="art-title">${item.titel}</h3>
                    <p class="art-meta">${metaParts}</p>
                    <div class="art-price-row art-price-row--round">
                        <span class="art-price">${item.pris}</span>
                        <span class="art-cta-link">Se værk <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            `;
        } else {
            card.innerHTML = `
                <div class="art-mat">
                    <img src="${item.filnavn}" alt="${item.titel}" class="is-rect" loading="lazy">
                    <span class="sale-badge">Til salg</span>
                    <span class="art-zoom-hint" aria-hidden="true"><i class="fas fa-expand"></i></span>
                </div>
                <div class="art-info">
                    <h3 class="art-title">${item.titel}</h3>
                    <p class="art-meta">${metaParts}</p>
                    <div class="art-price-row">
                        <span class="art-price">${item.pris}</span>
                        <span class="art-cta-link">Se værk <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            `;
        }

        const openHandler = () => openLightbox("sale", index);
        card.addEventListener("click", openHandler);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openHandler();
            }
        });

        grid.appendChild(card);
    });
}

// -----------------------------------------------------------------------------
// 3. RENDER "SOLGTE VÆRKER" MASONRY GALLERY
// -----------------------------------------------------------------------------
function renderSoldGallery() {
    const grid = document.getElementById("sold-grid");
    if (!grid) return;
    grid.innerHTML = "";

    indhold.solgte.forEach((item, index) => {
        const shape = getArtworkShape(item);
        const isRound = shape === "round";

        const card = document.createElement("article");
        card.className = `sold-card sold-card--${shape} reveal`;
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Se solgt værk: ${item.titel}`);

        const metaParts = [item.maal, item.medium].filter(Boolean).join(" · ");

        if (isRound) {
            card.innerHTML = `
                <div class="sold-img-wrap sold-img-wrap--round">
                    <img src="${item.filnavn}" alt="${item.titel}" class="is-round" loading="lazy">
                </div>
                <div class="sold-caption sold-caption--round">
                    <span class="sold-badge sold-badge--inline">Solgt</span>
                    <h3 class="sold-title">${item.titel}</h3>
                    ${metaParts ? `<p class="sold-meta">${metaParts}</p>` : ""}
                    ${item.beskrivelse ? `<p class="sold-desc">${item.beskrivelse}</p>` : ""}
                </div>
            `;
        } else {
            card.innerHTML = `
                <div class="sold-img-wrap">
                    <img src="${item.filnavn}" alt="${item.titel}" class="is-rect" loading="lazy">
                    <span class="sold-badge">Solgt</span>
                </div>
                <div class="sold-caption">
                    <h3 class="sold-title">${item.titel}</h3>
                    ${metaParts ? `<p class="sold-meta">${metaParts}</p>` : ""}
                    ${item.beskrivelse ? `<p class="sold-desc">${item.beskrivelse}</p>` : ""}
                </div>
            `;
        }

        const openHandler = () => openLightbox("sold", index);
        card.addEventListener("click", openHandler);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openHandler();
            }
        });

        grid.appendChild(card);
    });

    const commissionBtn = document.getElementById("commission-cta");
    if (commissionBtn) {
        commissionBtn.addEventListener("click", () => {
            prefillContact(
                "Bestillingsværk",
                "Hej Julie,\n\nJeg er vild med dine værker og vil meget gerne høre om muligheden for et bestillingsværk.\n\nBedste hilsner,"
            );
        });
    }
}

// -----------------------------------------------------------------------------
// 4. MOBILE DRAWER NAVIGATION
// -----------------------------------------------------------------------------
function initNavigation() {
    const drawer = document.getElementById("mobile-drawer");
    const openBtn = document.getElementById("mobile-menu-open");
    const closeBtn = document.getElementById("mobile-menu-close");

    const setDrawer = (isOpen) => {
        if (!drawer) return;
        drawer.classList.toggle("open", isOpen);
        drawer.setAttribute("aria-hidden", String(!isOpen));
        document.body.style.overflow = isOpen ? "hidden" : "";
    };

    if (openBtn) openBtn.addEventListener("click", () => setDrawer(true));
    if (closeBtn) closeBtn.addEventListener("click", () => setDrawer(false));

    if (drawer) {
        drawer.addEventListener("click", (e) => {
            if (e.target === drawer) setDrawer(false);
        });
        drawer.querySelectorAll(".drawer-link").forEach((link) => {
            link.addEventListener("click", () => setDrawer(false));
        });
    }
}

// -----------------------------------------------------------------------------
// 5. FULL-SCREEN LIGHTBOX WITH ZOOM, PAN & INQUIRY CTA
// -----------------------------------------------------------------------------
let lbState = { group: "sale", index: 0, zoom: 1, panX: 0, panY: 0, fullscreen: false };

function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const stage = document.querySelector(".lightbox-stage");
    const closeBtn = document.getElementById("lb-close");
    const prevBtn = document.getElementById("lb-prev");
    const nextBtn = document.getElementById("lb-next");
    const zoomInBtn = document.getElementById("lb-zoom-in");
    const zoomOutBtn = document.getElementById("lb-zoom-out");
    const fullscreenBtn = document.getElementById("lb-fullscreen");
    const lbImg = document.getElementById("lb-img");
    const inquireBtn = document.getElementById("lb-inquire");

    if (!lightbox) return;

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", () => stepLightbox(-1));
    nextBtn.addEventListener("click", () => stepLightbox(1));
    zoomInBtn.addEventListener("click", () => setZoom(lbState.zoom + 0.5));
    zoomOutBtn.addEventListener("click", () => setZoom(lbState.zoom - 0.5));
    if (fullscreenBtn) fullscreenBtn.addEventListener("click", () => toggleLightboxFullscreen());

    lbImg.addEventListener("dblclick", () => {
        setZoom(lbState.zoom > 1 ? 1 : 2.2);
    });

    // Smooth click-and-drag panning when zoomed in
    let dragging = false;
    let startX = 0;
    let startY = 0;

    if (stage) {
        stage.addEventListener("pointerdown", (e) => {
            if (lbState.zoom <= 1) return;
            dragging = true;
            startX = e.clientX - lbState.panX;
            startY = e.clientY - lbState.panY;
            stage.classList.add("is-dragging");
            stage.setPointerCapture(e.pointerId);
        });

        stage.addEventListener("pointermove", (e) => {
            if (!dragging) return;
            lbState.panX = e.clientX - startX;
            lbState.panY = e.clientY - startY;
            applyLightboxTransform();
        });

        const stopDrag = () => {
            if (!dragging) return;
            dragging = false;
            stage.classList.remove("is-dragging");
        };

        stage.addEventListener("pointerup", stopDrag);
        stage.addEventListener("pointercancel", stopDrag);
    }

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement && lbState.fullscreen) {
            setLightboxFullscreen(false);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("open")) return;
        if (e.key === "Escape") {
            if (lbState.fullscreen) {
                toggleLightboxFullscreen(false);
            } else {
                closeLightbox();
            }
        }
        if (e.key === "ArrowLeft") stepLightbox(-1);
        if (e.key === "ArrowRight") stepLightbox(1);
        if (e.key === "+" || e.key === "=") setZoom(lbState.zoom + 0.5);
        if (e.key === "-") setZoom(lbState.zoom - 0.5);
        if (e.key === "f" || e.key === "F") toggleLightboxFullscreen();
    });

    inquireBtn.addEventListener("click", () => {
        const list = lbState.group === "sale" ? indhold.tilSalg : indhold.solgte;
        const item = list[lbState.index];
        closeLightbox();

        const dimSuffix = item.maal ? ` (${item.maal})` : "";
        const subjectLine = `Forespørgsel: ${item.titel}${dimSuffix}`;

        if (lbState.group === "sale") {
            prefillContact(
                subjectLine,
                `Hej Julie,\n\nJeg er interesseret i maleriet "${item.titel}"${dimSuffix} til ${item.pris}. Kan du fortælle mig lidt mere om værket og muligheden for køb eller levering?\n\nBedste hilsner,`
            );
        } else {
            prefillContact(
                subjectLine,
                `Hej Julie,\n\nJeg er helt vild med det solgte maleri "${item.titel}"${dimSuffix}. Kunne man bestille et lignende værk?\n\nBedste hilsner,`
            );
        }
    });
}

function toggleLightboxFullscreen(forceState) {
    const next = typeof forceState === "boolean" ? forceState : !lbState.fullscreen;
    setLightboxFullscreen(next);

    const lightbox = document.getElementById("lightbox");
    if (next && lightbox && lightbox.requestFullscreen && !document.fullscreenElement) {
        lightbox.requestFullscreen().catch(() => {});
    } else if (!next && document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }
}

function setLightboxFullscreen(isFull) {
    lbState.fullscreen = isFull;
    const lightbox = document.getElementById("lightbox");
    const fullscreenBtn = document.getElementById("lb-fullscreen");
    if (lightbox) lightbox.classList.toggle("lightbox--fullscreen", isFull);
    if (fullscreenBtn) {
        fullscreenBtn.innerHTML = isFull
            ? `<i class="fas fa-compress"></i>`
            : `<i class="fas fa-expand"></i>`;
        fullscreenBtn.setAttribute("aria-label", isFull ? "Afslut fuld skærm" : "Fuld skærm");
        fullscreenBtn.setAttribute("title", isFull ? "Afslut fuld skærm (F)" : "Fuld skærm (F)");
    }
    setZoom(1);
}

function openLightbox(group, index) {
    lbState = { group, index, zoom: 1, panX: 0, panY: 0, fullscreen: false };
    setLightboxFullscreen(false);
    updateLightboxView();

    const lightbox = document.getElementById("lightbox");
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }
    setLightboxFullscreen(false);
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function stepLightbox(delta) {
    const list = lbState.group === "sale" ? indhold.tilSalg : indhold.solgte;
    lbState.index = (lbState.index + delta + list.length) % list.length;
    lbState.zoom = 1;
    lbState.panX = 0;
    lbState.panY = 0;
    updateLightboxView();
}

function setZoom(nextZoom) {
    lbState.zoom = Math.max(1, Math.min(3.5, nextZoom));
    if (lbState.zoom <= 1) {
        lbState.panX = 0;
        lbState.panY = 0;
    }
    applyLightboxTransform();
}

function applyLightboxTransform() {
    const img = document.getElementById("lb-img");
    const stage = document.querySelector(".lightbox-stage");
    if (img) {
        img.style.transform = `translate(${lbState.panX}px, ${lbState.panY}px) scale(${lbState.zoom})`;
    }
    if (stage) {
        stage.classList.toggle("is-zoomed", lbState.zoom > 1);
    }
}

function updateLightboxView() {
    const list = lbState.group === "sale" ? indhold.tilSalg : indhold.solgte;
    const item = list[lbState.index];
    if (!item) return;

    const isRound = getArtworkShape(item) === "round";
    const stage = document.querySelector(".lightbox-stage");
    const img = document.getElementById("lb-img");
    img.src = item.filnavn;
    img.alt = item.titel;
    lbState.zoom = 1;
    lbState.panX = 0;
    lbState.panY = 0;
    applyLightboxTransform();
    img.classList.toggle("lb-img--round", isRound);
    if (stage) stage.classList.toggle("lightbox-stage--round", isRound);

    setText("lb-title", item.titel);
    setText("lb-desc", item.beskrivelse || "");

    const metaEl = document.getElementById("lb-meta");
    const priceEl = document.getElementById("lb-price");
    const inquireBtn = document.getElementById("lb-inquire");

    const metaParts = [item.maal, item.medium].filter(Boolean).join(" · ");
    metaEl.textContent = metaParts || "Akryl på lærred";

    if (lbState.group === "sale") {
        priceEl.textContent = item.pris;
        inquireBtn.innerHTML = `<i class="fas fa-envelope"></i> Forespørg om dette værk`;
    } else {
        priceEl.textContent = "Solgt";
        inquireBtn.innerHTML = `<i class="fas fa-palette"></i> Forespørg om lignende værk`;
    }
}

// -----------------------------------------------------------------------------
// 6. CONTACT FORM (SMART MAILTO) & COPY EMAIL
// -----------------------------------------------------------------------------
function initContactForm() {
    const form = document.getElementById("contact-form");
    const copyBtn = document.getElementById("copy-email-btn");

    if (copyBtn) {
        let copyResetTimer = null;
        copyBtn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(indhold.kontakt.email);
            } catch {
                // Fallback still shows confirmation & toast
            }

            copyBtn.classList.add("is-copied");
            copyBtn.innerHTML = `<i class="fas fa-check"></i> Kopieret!`;
            showToast(`Email kopieret: ${indhold.kontakt.email}`);

            clearTimeout(copyResetTimer);
            copyResetTimer = setTimeout(() => {
                copyBtn.classList.remove("is-copied");
                copyBtn.innerHTML = `<i class="far fa-copy"></i> Kopiér`;
            }, 2200);
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("form-name").value.trim();
            const email = document.getElementById("form-email").value.trim();
            const subject = document.getElementById("form-subject").value.trim() || "Forespørgsel fra juliekofod.com";
            const message = document.getElementById("form-message").value.trim();

            const body = `${message}\n\n---\nSendt af: ${name}\nEmail: ${email}`;
            const mailtoUrl = `mailto:${encodeURIComponent(indhold.kontakt.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoUrl;
            showToast("Åbner dit mailprogram med beskeden klar...");
        });
    }
}

function prefillContact(subjectText, messageText) {
    const subjectInput = document.getElementById("form-subject");
    const messageInput = document.getElementById("form-message");
    const contactSection = document.getElementById("kontakt");

    if (subjectInput) subjectInput.value = subjectText;
    if (messageInput) messageInput.value = messageText;
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            if (messageInput) {
                messageInput.focus();
                messageInput.setSelectionRange(messageInput.value.length, messageInput.value.length);
            }
        }, 600);
    }
}

// -----------------------------------------------------------------------------
// 7. SCROLL REVEAL & TOAST
// -----------------------------------------------------------------------------
function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        elements.forEach((el) => el.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
}

let toastTimer = null;
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}
