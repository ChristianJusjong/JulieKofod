// =============================================================================
// SCRIPT.JS — Interaktivitet, Galleri, Filtre, Sortering & Lightbox for Julie Kofod
// =============================================================================

let saleFilter = "all";
let saleSort = "default";
let soldFilter = "all";

function svgIcon(id) {
    return `<svg class="icon" aria-hidden="true"><use href="#${id}"></use></svg>`;
}

function parsePriceDkk(prisText) {
    if (!prisText) return 0;
    const digits = String(prisText).replace(/[^\d]/g, "");
    return digits ? parseInt(digits, 10) : 0;
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof indhold === "undefined") {
        console.error("indhold.js blev ikke indlæst korrekt.");
        return;
    }

    hydrateContent();
    injectArtworkStructuredData();
    initHeroArtworkLinks();
    initGalleryFilters();
    renderSaleGallery();
    renderSoldGallery();
    initNavigation();
    initScrollSpy();
    initLightbox();
    initContactForm();
    initScrollReveal();
    openFromUrlHash();
    window.addEventListener("hashchange", openFromUrlHash);
});

// -----------------------------------------------------------------------------
// 1. HYDRATE TEXT, LOGO & CONTACT CHANNELS FROM INDHOLD.JS
// -----------------------------------------------------------------------------
function hydrateContent() {
    document.title = indhold.site.titel;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", indhold.site.beskrivelse);

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

    if (indhold.kontakt.formEndpoint) {
        setText("form-submit-label", "Send besked til Julie");
        setText("form-note", "Din besked sendes direkte til Julie — du kan også ringe eller skrive på Instagram.");
    }
}

function injectArtworkStructuredData() {
    if (!Array.isArray(indhold.tilSalg) || !indhold.tilSalg.length) return;
    const baseUrl = "https://juliekofod.com/";
    const graph = indhold.tilSalg.map((item) => ({
        "@type": "VisualArtwork",
        name: item.titel,
        description: item.beskrivelse || "",
        image: new URL(item.filnavn, baseUrl).href,
        url: `${baseUrl}#vaerk=${encodeURIComponent(item.id || item.titel)}`,
        artMedium: item.medium || "Akryl på lærred",
        artform: "Maleri",
        creator: { "@type": "Person", name: "Julie Kofod" },
        offers: {
            "@type": "Offer",
            price: parsePriceDkk(item.pris),
            priceCurrency: "DKK",
            availability: "https://schema.org/InStock",
            url: `${baseUrl}#vaerk=${encodeURIComponent(item.id || item.titel)}`
        }
    }));

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);
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

function getFilteredList(group) {
    const raw = group === "sale" ? indhold.tilSalg : indhold.solgte;
    const activeFilter = group === "sale" ? saleFilter : soldFilter;
    let list = activeFilter === "all" ? [...raw] : raw.filter((item) => getArtworkShape(item) === activeFilter);

    if (group === "sale" && saleSort !== "default") {
        list.sort((a, b) => {
            const pa = parsePriceDkk(a.pris);
            const pb = parsePriceDkk(b.pris);
            return saleSort === "price-asc" ? pa - pb : pb - pa;
        });
    }
    return list;
}

// -----------------------------------------------------------------------------
// 1B. INTERACTIVE HERO FRAMES
// -----------------------------------------------------------------------------
function initHeroArtworkLinks() {
    const wireHeroFrame = (elId, artworkId, fallbackIndex) => {
        const el = document.getElementById(elId);
        if (!el) return;
        const openHeroArtwork = () => {
            saleFilter = "all";
            saleSort = "default";
            const sortEl = document.getElementById("sale-sort");
            if (sortEl) sortEl.value = "default";
            updateFilterButtons("sale-filters", "all");
            renderSaleGallery(true);
            const idx = indhold.tilSalg.findIndex((item) => item.id === artworkId);
            openLightbox("sale", idx >= 0 ? idx : fallbackIndex, el);
        };
        el.addEventListener("click", openHeroArtwork);
        el.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openHeroArtwork();
            }
        });
    };

    wireHeroFrame("hero-frame-main", indhold.hero.fremhaevetStortId || "pink-sky", 2);
    wireHeroFrame("hero-frame-round", indhold.hero.fremhaevetRundtId || "fantasiens-land", 0);
}

// -----------------------------------------------------------------------------
// 2. GALLERY FORMAT FILTERS & PRICE SORT
// -----------------------------------------------------------------------------
function initGalleryFilters() {
    buildFilterBar("sale-filters", indhold.tilSalg, (nextFilter) => {
        saleFilter = nextFilter;
        renderSaleGallery(true);
    });

    buildFilterBar("sold-filters", indhold.solgte, (nextFilter) => {
        soldFilter = nextFilter;
        renderSoldGallery(true);
    });

    const sortEl = document.getElementById("sale-sort");
    if (sortEl) {
        sortEl.addEventListener("change", () => {
            saleSort = sortEl.value;
            renderSaleGallery(true);
        });
    }
}

function buildFilterBar(containerId, items, onSelect) {
    const bar = document.getElementById(containerId);
    if (!bar) return;

    const roundCount = items.filter((item) => getArtworkShape(item) === "round").length;
    const rectCount = items.filter((item) => getArtworkShape(item) === "rect").length;

    const options = [
        { key: "all", label: "Alle", count: items.length },
        { key: "round", label: "Runde (Tondo)", count: roundCount },
        { key: "rect", label: "Firkantede", count: rectCount }
    ];

    bar.innerHTML = "";
    options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "filter-pill";
        btn.dataset.filter = opt.key;
        btn.setAttribute("aria-pressed", opt.key === "all" ? "true" : "false");
        btn.innerHTML = `${opt.label} <span class="filter-pill-count">(${opt.count})</span>`;

        btn.addEventListener("click", () => {
            updateFilterButtons(containerId, opt.key);
            onSelect(opt.key);
        });

        bar.appendChild(btn);
    });
}

function updateFilterButtons(containerId, activeKey) {
    const bar = document.getElementById(containerId);
    if (!bar) return;
    bar.querySelectorAll(".filter-pill").forEach((btn) => {
        btn.setAttribute("aria-pressed", btn.dataset.filter === activeKey ? "true" : "false");
    });
}

// -----------------------------------------------------------------------------
// 3. RENDER "TIL SALG" GALLERY
// -----------------------------------------------------------------------------
function renderSaleGallery(immediateVisible = false) {
    const grid = document.getElementById("sale-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const items = getFilteredList("sale");

    items.forEach((item, index) => {
        const shape = getArtworkShape(item);

        const card = document.createElement("article");
        card.className = `art-card art-card--${shape} reveal${immediateVisible ? " visible" : ""}`;
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Se ${item.titel} i stor visning`);

        const metaParts = [item.maal, item.medium].filter(Boolean).join(" · ");

        card.innerHTML = `
            <div class="art-mat art-mat--${shape}">
                <img src="${item.filnavn}" alt="${item.titel}" class="is-${shape}" loading="lazy" decoding="async">
            </div>
            <div class="art-info">
                <span class="sale-badge sale-badge--inline">Til salg</span>
                <h3 class="art-title">${item.titel}</h3>
                <p class="art-meta">${metaParts}</p>
                <div class="art-price-row">
                    <span class="art-price">${item.pris}</span>
                    <span class="art-cta-link">Se værk ${svgIcon("i-arrow-right")}</span>
                </div>
            </div>
        `;

        const openHandler = () => openLightbox("sale", index, card);
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
// 4. RENDER "SOLGTE VÆRKER" MASONRY GALLERY
// -----------------------------------------------------------------------------
let commissionWired = false;
function renderSoldGallery(immediateVisible = false) {
    const grid = document.getElementById("sold-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const items = getFilteredList("sold");

    items.forEach((item, index) => {
        const shape = getArtworkShape(item);

        const card = document.createElement("article");
        card.className = `sold-card sold-card--${shape} reveal${immediateVisible ? " visible" : ""}`;
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Se solgt værk: ${item.titel}`);

        const metaParts = [item.maal, item.medium].filter(Boolean).join(" · ");

        card.innerHTML = `
            <div class="sold-img-wrap sold-img-wrap--${shape}">
                <img src="${item.filnavn}" alt="${item.titel}" class="is-${shape}" loading="lazy" decoding="async">
            </div>
            <div class="sold-caption">
                <span class="sold-badge sold-badge--inline">SOLGT!</span>
                <h3 class="sold-title">${item.titel}</h3>
                ${metaParts ? `<p class="sold-meta">${metaParts}</p>` : ""}
                ${item.beskrivelse ? `<p class="sold-desc">${item.beskrivelse}</p>` : ""}
            </div>
        `;

        const openHandler = () => openLightbox("sold", index, card);
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
    if (commissionBtn && !commissionWired) {
        commissionWired = true;
        commissionBtn.addEventListener("click", () => {
            prefillContact(
                "Bestillingsværk",
                "Hej Julie,\n\nJeg er vild med dine værker og vil meget gerne høre om muligheden for et bestillingsværk.\n\nBedste hilsner,"
            );
        });
    }
}

// -----------------------------------------------------------------------------
// 5. MOBILE DRAWER NAVIGATION (WITH ESCAPE & FOCUS MANAGEMENT)
// -----------------------------------------------------------------------------
function initNavigation() {
    const drawer = document.getElementById("mobile-drawer");
    const openBtn = document.getElementById("mobile-menu-open");
    const closeBtn = document.getElementById("mobile-menu-close");

    const setDrawer = (isOpen) => {
        if (!drawer) return;
        drawer.classList.toggle("open", isOpen);
        drawer.setAttribute("aria-hidden", String(!isOpen));
        if (openBtn) openBtn.setAttribute("aria-expanded", String(isOpen));
        document.body.style.overflow = isOpen ? "hidden" : "";

        if (isOpen && closeBtn) {
            closeBtn.focus();
        } else if (!isOpen && openBtn) {
            openBtn.focus();
        }
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
        drawer.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                trapFocus(drawer, e);
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer && drawer.classList.contains("open")) {
            setDrawer(false);
        }
    });
}

// -----------------------------------------------------------------------------
// 5B. ACTIVE NAV SCROLL-SPY
// -----------------------------------------------------------------------------
function initScrollSpy() {
    const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (!("IntersectionObserver" in window) || !sections.length) return;

    const setActive = (id) => {
        navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
}

// -----------------------------------------------------------------------------
// 6. FULL-SCREEN LIGHTBOX: SWIPE, PINCH/WHEEL ZOOM, WALL PREVIEW & DEEP-LINKING
// -----------------------------------------------------------------------------
let lbState = { group: "sale", index: 0, zoom: 1, panX: 0, panY: 0, fullscreen: false, wallMode: false };
let lastFocusedElement = null;
const preloadedUrls = new Set();

function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const stage = document.getElementById("lb-stage");
    const closeBtn = document.getElementById("lb-close");
    const prevBtn = document.getElementById("lb-prev");
    const nextBtn = document.getElementById("lb-next");
    const prevMobileBtn = document.getElementById("lb-prev-mobile");
    const nextMobileBtn = document.getElementById("lb-next-mobile");
    const zoomInBtn = document.getElementById("lb-zoom-in");
    const zoomOutBtn = document.getElementById("lb-zoom-out");
    const zoomBadge = document.getElementById("lb-zoom-level");
    const wallToggleBtn = document.getElementById("lb-wall-toggle");
    const copyLinkBtn = document.getElementById("lb-copy-link");
    const fullscreenBtn = document.getElementById("lb-fullscreen");
    const lbImg = document.getElementById("lb-img");
    const inquireBtn = document.getElementById("lb-inquire");

    if (!lightbox) return;

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", () => stepLightbox(-1));
    nextBtn.addEventListener("click", () => stepLightbox(1));
    if (prevMobileBtn) prevMobileBtn.addEventListener("click", () => stepLightbox(-1));
    if (nextMobileBtn) nextMobileBtn.addEventListener("click", () => stepLightbox(1));
    zoomInBtn.addEventListener("click", () => setZoom(lbState.zoom + 0.5));
    zoomOutBtn.addEventListener("click", () => setZoom(lbState.zoom - 0.5));
    if (zoomBadge) zoomBadge.addEventListener("click", () => setZoom(1));
    if (wallToggleBtn) wallToggleBtn.addEventListener("click", () => setWallMode(!lbState.wallMode));
    if (fullscreenBtn) fullscreenBtn.addEventListener("click", () => toggleLightboxFullscreen());

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener("click", async () => {
            const list = getFilteredList(lbState.group);
            const item = list[lbState.index];
            if (!item) return;
            const shareUrl = `${window.location.origin}${window.location.pathname}#vaerk=${encodeURIComponent(item.id || item.titel)}`;
            const ok = await copyTextToClipboard(shareUrl);
            showToast(ok ? `Link kopieret til "${item.titel}"` : "Kunne ikke kopiere linket automatisk");
        });
    }

    lbImg.addEventListener("dblclick", () => {
        setZoom(lbState.zoom > 1 ? 1 : 2.2);
    });

    // Smooth click-and-drag panning, horizontal swipe, mouse-wheel zoom & pinch-to-zoom
    let dragging = false;
    let swiping = false;
    let startX = 0;
    let startY = 0;
    let swipeStartX = 0;
    let swipeStartY = 0;
    let pinchStartDist = 0;
    let pinchStartZoom = 1;

    if (stage) {
        stage.addEventListener("wheel", (e) => {
            if (!lightbox.classList.contains("open") || lbState.wallMode) return;
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.25 : -0.25;
            setZoom(lbState.zoom + delta);
        }, { passive: false });

        stage.addEventListener("touchstart", (e) => {
            if (e.touches.length === 2) {
                dragging = false;
                swiping = false;
                pinchStartDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                pinchStartZoom = lbState.zoom;
            }
        }, { passive: true });

        stage.addEventListener("touchmove", (e) => {
            if (e.touches.length === 2 && pinchStartDist > 0) {
                e.preventDefault();
                const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                setZoom(pinchStartZoom * (dist / pinchStartDist));
            }
        }, { passive: false });

        stage.addEventListener("touchend", (e) => {
            if (e.touches.length < 2) pinchStartDist = 0;
        });

        stage.addEventListener("pointerdown", (e) => {
            if (pinchStartDist > 0) return;
            if (lbState.zoom > 1) {
                dragging = true;
                startX = e.clientX - lbState.panX;
                startY = e.clientY - lbState.panY;
                stage.classList.add("is-dragging");
                stage.setPointerCapture(e.pointerId);
            } else {
                swiping = true;
                swipeStartX = e.clientX;
                swipeStartY = e.clientY;
            }
        });

        stage.addEventListener("pointermove", (e) => {
            if (!dragging) return;
            const rawX = e.clientX - startX;
            const rawY = e.clientY - startY;
            const clamped = clampPan(rawX, rawY);
            lbState.panX = clamped.x;
            lbState.panY = clamped.y;
            applyLightboxTransform();
        });

        const stopPointer = (e) => {
            if (dragging) {
                dragging = false;
                stage.classList.remove("is-dragging");
            }
            if (swiping) {
                swiping = false;
                const dx = e.clientX - swipeStartX;
                const dy = e.clientY - swipeStartY;
                if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
                    stepLightbox(dx < 0 ? 1 : -1);
                }
            }
        };

        stage.addEventListener("pointerup", stopPointer);
        stage.addEventListener("pointercancel", () => {
            dragging = false;
            swiping = false;
            stage.classList.remove("is-dragging");
        });
    }

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || (e.target === stage && lbState.zoom <= 1)) {
            closeLightbox();
        }
    });

    lightbox.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
            trapFocus(lightbox, e);
        }
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
        if (e.key === "w" || e.key === "W") setWallMode(!lbState.wallMode);
    });

    inquireBtn.addEventListener("click", () => {
        const list = getFilteredList(lbState.group);
        const item = list[lbState.index];
        closeLightbox(false);

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

function parseDimensionsCm(maal, shape, natW, natH) {
    const text = String(maal || "");
    const diaMatch = text.match(/Ø\s*(\d+)/i);
    if (diaMatch) {
        const d = parseInt(diaMatch[1], 10);
        return { w: d, h: d, parsed: true };
    }
    const rectMatch = text.match(/(\d+)\s*[×x]\s*(\d+)/i);
    if (rectMatch) {
        const a = parseInt(rectMatch[1], 10);
        const b = parseInt(rectMatch[2], 10);
        if (natW && natH) {
            const isLandscape = natW > natH;
            return { w: isLandscape ? Math.max(a, b) : Math.min(a, b), h: isLandscape ? Math.min(a, b) : Math.max(a, b), parsed: true };
        }
        return { w: a, h: b, parsed: true };
    }
    return shape === "round" ? { w: 40, h: 40, parsed: false } : { w: 60, h: 80, parsed: false };
}

function setWallMode(isWall) {
    lbState.wallMode = isWall;
    const stage = document.getElementById("lb-stage");
    const wallPreview = document.getElementById("lb-wall-preview");
    const wallBtn = document.getElementById("lb-wall-toggle");

    if (isWall) setZoom(1);
    if (stage) stage.hidden = isWall;
    if (wallPreview) wallPreview.hidden = !isWall;
    if (wallBtn) wallBtn.setAttribute("aria-pressed", String(isWall));

    updateZoomControls();
    if (isWall) {
        const list = getFilteredList(lbState.group);
        const item = list[lbState.index];
        if (item) updateWallPreview(item);
    }
}

function updateWallPreview(item) {
    const wallImg = document.getElementById("lb-wall-img");
    const lbImg = document.getElementById("lb-img");
    const note = document.getElementById("lb-wall-note");
    const sofa = document.querySelector(".wall-sofa");
    if (!wallImg) return;

    const shape = getArtworkShape(item);
    wallImg.src = item.filnavn;
    wallImg.alt = item.titel;
    wallImg.classList.toggle("is-round", shape === "round");
    wallImg.classList.toggle("is-rect", shape !== "round");

    const applyScale = () => {
        const sofaWidthPx = (sofa && sofa.clientWidth) ? sofa.clientWidth : 380;
        const pxPerCm = sofaWidthPx / 220; // 220 cm reference sofa
        const dims = parseDimensionsCm(item.maal, shape, lbImg.naturalWidth, lbImg.naturalHeight);
        const wPx = Math.max(52, Math.min(260, Math.round(dims.w * pxPerCm)));
        const hPx = Math.max(52, Math.min(240, Math.round(dims.h * pxPerCm)));
        wallImg.style.width = `${wPx}px`;
        wallImg.style.height = `${hPx}px`;
        if (note) {
            note.textContent = dims.parsed
                ? `Værk: ${item.maal} · Skala-reference: 220 cm sofa`
                : `Ca. skala-reference: 220 cm sofa`;
        }
    };

    if (lbImg && lbImg.complete && lbImg.naturalWidth) {
        applyScale();
    } else if (lbImg) {
        lbImg.addEventListener("load", applyScale, { once: true });
    }
}

function preloadAdjacentLightboxImages() {
    const list = getFilteredList(lbState.group);
    if (list.length < 2) return;
    [-1, 1].forEach((offset) => {
        const neighbor = list[(lbState.index + offset + list.length) % list.length];
        if (neighbor && neighbor.filnavn && !preloadedUrls.has(neighbor.filnavn)) {
            preloadedUrls.add(neighbor.filnavn);
            const pre = new Image();
            pre.src = neighbor.filnavn;
        }
    });
}

function clampPan(x, y) {
    const img = document.getElementById("lb-img");
    if (!img || lbState.zoom <= 1) return { x: 0, y: 0 };
    const maxX = Math.max(0, ((img.clientWidth * lbState.zoom) - img.clientWidth) / 2 + 40);
    const maxY = Math.max(0, ((img.clientHeight * lbState.zoom) - img.clientHeight) / 2 + 40);
    return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y))
    };
}

function toggleLightboxFullscreen(forceState) {
    const next = typeof forceState === "boolean" ? forceState : !lbState.fullscreen;
    if (next && lbState.wallMode) setWallMode(false);
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
        fullscreenBtn.innerHTML = isFull ? svgIcon("i-compress") : svgIcon("i-expand");
        fullscreenBtn.setAttribute("aria-label", isFull ? "Afslut fuld skærm" : "Fuld skærm");
        fullscreenBtn.setAttribute("title", isFull ? "Afslut fuld skærm (F)" : "Fuld skærm (F)");
    }
    setZoom(1);
}

function openLightbox(group, index, triggerEl = null) {
    lastFocusedElement = triggerEl || document.activeElement;
    lbState = { group, index, zoom: 1, panX: 0, panY: 0, fullscreen: false, wallMode: false };
    setWallMode(false);
    setLightboxFullscreen(false);
    updateLightboxView();

    const lightbox = document.getElementById("lightbox");
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const closeBtn = document.getElementById("lb-close");
    if (closeBtn) closeBtn.focus();
}

function closeLightbox(restoreFocus = true) {
    if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }
    setWallMode(false);
    setLightboxFullscreen(false);
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (window.location.hash.startsWith("#vaerk=")) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }
}

function stepLightbox(delta) {
    const list = getFilteredList(lbState.group);
    if (!list.length) return;
    lbState.index = (lbState.index + delta + list.length) % list.length;
    lbState.zoom = 1;
    lbState.panX = 0;
    lbState.panY = 0;
    updateLightboxView();
}

function setZoom(nextZoom) {
    if (lbState.wallMode) return;
    lbState.zoom = Math.max(1, Math.min(3.5, Math.round(nextZoom * 100) / 100));
    if (lbState.zoom <= 1) {
        lbState.panX = 0;
        lbState.panY = 0;
    } else {
        const clamped = clampPan(lbState.panX, lbState.panY);
        lbState.panX = clamped.x;
        lbState.panY = clamped.y;
    }
    applyLightboxTransform();
    updateZoomControls();
}

function updateZoomControls() {
    const zoomInBtn = document.getElementById("lb-zoom-in");
    const zoomOutBtn = document.getElementById("lb-zoom-out");
    const zoomBadge = document.getElementById("lb-zoom-level");

    if (zoomOutBtn) zoomOutBtn.disabled = lbState.wallMode || lbState.zoom <= 1;
    if (zoomInBtn) zoomInBtn.disabled = lbState.wallMode || lbState.zoom >= 3.5;
    if (zoomBadge) {
        const isZoomed = !lbState.wallMode && lbState.zoom > 1;
        zoomBadge.hidden = !isZoomed;
        zoomBadge.textContent = `${Math.round(lbState.zoom * 100)}%`;
    }
}

function applyLightboxTransform() {
    const img = document.getElementById("lb-img");
    const stage = document.getElementById("lb-stage");
    if (img) {
        img.style.transform = `translate(${lbState.panX}px, ${lbState.panY}px) scale(${lbState.zoom})`;
    }
    if (stage) {
        stage.classList.toggle("is-zoomed", lbState.zoom > 1);
    }
}

function updateLightboxView() {
    const list = getFilteredList(lbState.group);
    const item = list[lbState.index];
    if (!item) return;

    const isRound = getArtworkShape(item) === "round";
    const img = document.getElementById("lb-img");
    img.src = item.filnavn;
    img.alt = item.titel;
    lbState.zoom = 1;
    lbState.panX = 0;
    lbState.panY = 0;
    applyLightboxTransform();
    updateZoomControls();
    img.classList.toggle("lb-img--round", isRound);
    img.classList.toggle("lb-img--rect", !isRound);

    if (lbState.wallMode) updateWallPreview(item);

    setText("lb-counter", `${lbState.index + 1} / ${list.length}`);
    setText("lb-title", item.titel);
    setText("lb-desc", item.beskrivelse || "");

    const metaEl = document.getElementById("lb-meta");
    const priceEl = document.getElementById("lb-price");
    const inquireBtn = document.getElementById("lb-inquire");

    const metaParts = [item.maal, item.medium].filter(Boolean).join(" · ");
    metaEl.textContent = metaParts || "Akryl på lærred";

    if (lbState.group === "sale") {
        priceEl.textContent = item.pris;
        inquireBtn.innerHTML = `${svgIcon("i-envelope")} Forespørg om dette værk`;
    } else {
        priceEl.textContent = "Solgt";
        inquireBtn.innerHTML = `${svgIcon("i-palette")} Forespørg om lignende værk`;
    }

    if (item.id) {
        history.replaceState(null, "", `#vaerk=${encodeURIComponent(item.id)}`);
    }

    preloadAdjacentLightboxImages();
}

function openFromUrlHash() {
    const hash = window.location.hash;
    if (!hash.startsWith("#vaerk=")) return;
    const targetId = decodeURIComponent(hash.slice("#vaerk=".length));
    const saleIdx = indhold.tilSalg.findIndex((item) => item.id === targetId);
    if (saleIdx >= 0) {
        openLightbox("sale", saleIdx);
        return;
    }
    const soldIdx = indhold.solgte.findIndex((item) => item.id === targetId);
    if (soldIdx >= 0) {
        openLightbox("sold", soldIdx);
    }
}

// -----------------------------------------------------------------------------
// 7. CONTACT FORM (DIRECT ENDPOINT OR SMART MAILTO + COPY MESSAGE) & COPY EMAIL
// -----------------------------------------------------------------------------
function initContactForm() {
    const form = document.getElementById("contact-form");
    const copyBtn = document.getElementById("copy-email-btn");
    const copyMessageBtn = document.getElementById("copy-message-btn");
    const statusEl = document.getElementById("form-status");
    const submitBtn = document.getElementById("form-submit-btn");

    if (copyBtn) {
        let copyResetTimer = null;
        copyBtn.addEventListener("click", async () => {
            const ok = await copyTextToClipboard(indhold.kontakt.email);
            if (!ok) {
                showToast(`Kopiér manuelt: ${indhold.kontakt.email}`);
                return;
            }

            copyBtn.classList.add("is-copied");
            copyBtn.innerHTML = `${svgIcon("i-check")} Kopieret!`;
            showToast(`Email kopieret: ${indhold.kontakt.email}`);

            clearTimeout(copyResetTimer);
            copyResetTimer = setTimeout(() => {
                copyBtn.classList.remove("is-copied");
                copyBtn.innerHTML = `${svgIcon("i-copy")} Kopiér`;
            }, 2200);
        });
    }

    if (copyMessageBtn) {
        copyMessageBtn.addEventListener("click", async () => {
            const name = document.getElementById("form-name").value.trim();
            const email = document.getElementById("form-email").value.trim();
            const subject = document.getElementById("form-subject").value.trim() || "Forespørgsel fra juliekofod.com";
            const message = document.getElementById("form-message").value.trim();

            if (!message) {
                showToast("Skriv først din besked i feltet ovenfor");
                document.getElementById("form-message").focus();
                return;
            }

            const fullText = `Til: ${indhold.kontakt.email}\nEmne: ${subject}\n\n${message}${name || email ? `\n\n---\n${name ? `Navn: ${name}\n` : ""}${email ? `Email: ${email}` : ""}` : ""}`;
            const ok = await copyTextToClipboard(fullText);
            showToast(ok ? "Besked kopieret — klar til at indsætte i din webmail!" : "Kunne ikke kopiere beskeden automatisk");
        });
    }

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("form-name").value.trim();
            const email = document.getElementById("form-email").value.trim();
            const subject = document.getElementById("form-subject").value.trim() || "Forespørgsel fra juliekofod.com";
            const message = document.getElementById("form-message").value.trim();

            if (statusEl) {
                statusEl.textContent = "";
                statusEl.classList.remove("is-error");
            }

            if (indhold.kontakt.formEndpoint) {
                if (submitBtn) submitBtn.disabled = true;
                try {
                    const res = await fetch(indhold.kontakt.formEndpoint, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", Accept: "application/json" },
                        body: JSON.stringify({ name, email, subject, message })
                    });
                    if (!res.ok) throw new Error("Server error");
                    form.reset();
                    if (statusEl) statusEl.textContent = "Tak for din besked! Julie vender tilbage hurtigst muligt.";
                    showToast("Besked sendt til Julie!");
                } catch {
                    if (statusEl) {
                        statusEl.textContent = "Kunne ikke sende automatisk — brug gerne 'Kopiér besked' eller skriv direkte på email/Instagram.";
                        statusEl.classList.add("is-error");
                    }
                    showToast("Afsendelse fejlede — prøv 'Kopiér besked'");
                } finally {
                    if (submitBtn) submitBtn.disabled = false;
                }
                return;
            }

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
// 8. UTILITIES: FOCUS TRAP, CLIPBOARD, SCROLL REVEAL & TOAST
// -----------------------------------------------------------------------------
function trapFocus(container, event) {
    const focusables = Array.from(
        container.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])')
    ).filter((el) => el.offsetParent !== null);

    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

async function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // Fall through to legacy textarea fallback
        }
    }
    try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
    } catch {
        return false;
    }
}

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
