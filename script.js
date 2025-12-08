document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor logic removed

    // Reveal on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll, .fade-in');
    revealElements.forEach(el => observer.observe(el));

    // Populate Content from indhold.js (CMS)
    if (typeof indhold !== 'undefined') {

        // Helper to safely set text
        const setText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.innerText = text;
        };

        // Helper to safely set image src
        const setImage = (id, filename) => {
            const el = document.getElementById(id);
            if (el && filename) el.src = `Billeder/${filename}`;
        };

        // Site Info
        document.title = indhold.site.titel;
        setText('site-footer', indhold.site.footer);

        // Intro
        setText('intro-overtitel', indhold.intro.overtitel);
        setText('intro-titel', indhold.intro.titel);
        setText('intro-tekst', indhold.intro.tekst);
        setImage('intro-billede', indhold.intro.billede);

        // Filosofi
        setImage('filosofi-billede', indhold.filosofi.billede);
        setText('filosofi-billedeTekst', indhold.filosofi.billedeTekst);
        setText('filosofi-overskrift', indhold.filosofi.overskrift);
        setText('filosofi-tekst1', indhold.filosofi.tekst1);
        setText('filosofi-tekst2', indhold.filosofi.tekst2);

        // Citat
        setText('citat-tekst', `${indhold.citat.tekst}`);

        // Om
        setText('om-overskrift', indhold.om.overskrift);
        setText('om-tekst', indhold.om.tekst);
        setText('om-underskrift', indhold.om.underskrift);

        // Kontakt
        setText('kontakt-overskrift', indhold.kontakt.overskrift);
        setText('kontakt-tekst', indhold.kontakt.tekst);

        const emailLink = document.getElementById('kontakt-email');
        if (emailLink) {
            emailLink.innerText = indhold.kontakt.email;
            emailLink.href = `mailto:${indhold.kontakt.email}`;
        }

        const instaLink = document.getElementById('kontakt-instagram');
        if (instaLink) {
            instaLink.innerText = indhold.kontakt.instagram;
        }

        // Render Works
        const worksContainer = document.getElementById('works');
        if (worksContainer && indhold.vaerker) {
            indhold.vaerker.forEach((vaerk, index) => {
                const isRightAlign = index % 2 === 0;
                const alignClass = isRightAlign ? 'right-align' : 'left-align';

                const item = document.createElement('div');
                item.className = `work-item ${alignClass} reveal-on-scroll`;

                item.innerHTML = `
                    <div class="work-text">
                        <h3>${vaerk.titel}</h3>
                        <p>${vaerk.tekst}</p>
                    </div>
                    <div class="work-image">
                        <img src="Billeder/${vaerk.filnavn}" alt="${vaerk.titel}">
                    </div>
                `;

                worksContainer.appendChild(item);
                observer.observe(item);

                // Add lightbox click
                const imgContainer = item.querySelector('.work-image');
                if (imgContainer) {
                    imgContainer.style.cursor = 'pointer';
                    imgContainer.addEventListener('click', () => {
                        window.openLightbox(`Billeder/${vaerk.filnavn}`, {
                            titel: vaerk.titel,
                            beskrivelse: vaerk.tekst,
                            størrelse: vaerk.størrelse
                        });
                    });
                }
            });
        }

        // Render Collage
        const collageContainer = document.getElementById('collage');
        if (collageContainer && indhold.collage && indhold.collage.length > 0) {

            const grid = document.createElement('div');
            grid.className = 'collage-grid';

            indhold.collage.forEach((itemData, index) => {
                // Initialize variables
                let type = 'img';
                let content = itemData;
                let format = 'auto';
                let background = '';

                // Check if object
                if (typeof itemData === 'object') {
                    if (itemData.type === 'tekst') {
                        type = 'tekst';
                        content = itemData.tekst;
                        format = itemData.format || 'auto'; // Default to auto
                        background = itemData.baggrund || '';
                    } else {
                        content = itemData.filnavn;
                        format = itemData.format || 'auto';
                    }
                }

                // Create Item Container
                const item = document.createElement('div');
                item.className = 'collage-item reveal-on-scroll';
                item.style.transitionDelay = `${index * 50}ms`;

                // Smart Text Sizing logic
                if (type === 'tekst' && format === 'auto') {
                    if (content.length > 50) {
                        format = 'bred';
                    } else {
                        format = 'lille';
                    }
                }

                // Apply Format Classes
                if (format === 'bred') item.classList.add('wide');
                if (format === 'høj') item.classList.add('tall');

                // RENDER Based on Type
                if (type === 'tekst') {
                    item.classList.add('text-card');
                    item.innerText = content;
                    if (background) item.style.backgroundColor = background;

                    grid.appendChild(item);
                    observer.observe(item);
                } else {
                    // IMAGE LOGIC
                    const img = document.createElement('img');
                    img.src = `Billeder/${content}`;
                    img.alt = `Glimt ${index + 1}`;

                    // Auto Layout Logic
                    if (format === 'auto') {
                        img.onload = function () {
                            const ratio = this.naturalWidth / this.naturalHeight;
                            if (ratio > 1.3) {
                                item.classList.add('wide');
                            } else if (ratio < 0.8) {
                                item.classList.add('tall');
                            }
                        };
                    }

                    item.appendChild(img);
                    grid.appendChild(item);
                    observer.observe(item);

                    // Lightbox for images ONLY
                    item.style.cursor = 'pointer';
                    item.addEventListener('click', () => {
                        window.openLightbox(img.src, {
                            titel: itemData.titel, // only if object
                            beskrivelse: itemData.beskrivelse,
                            størrelse: itemData.størrelse
                        });
                    });
                }
            });

            collageContainer.appendChild(grid);
        }
    }

    // Lightbox Logic with Zoom & Pan & Metadata
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');

    // Metadata Elements
    const captionContainer = document.querySelector('.lightbox-caption');
    const captionTitle = document.getElementById('lightbox-title');
    const captionDesc = document.getElementById('lightbox-desc');
    const captionMeta = document.getElementById('lightbox-meta');

    let scale = 1;
    let panning = false;
    let pointX = 0;
    let pointY = 0;
    let startX = 0;
    let startY = 0;

    const setTransform = () => {
        lightboxImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    };

    const resetZoom = () => {
        scale = 1;
        pointX = 0;
        pointY = 0;
        setTransform();
    };

    // Helper to open lightbox with data
    window.openLightbox = (src, data = {}) => {
        lightbox.style.display = 'flex';
        lightboxImg.src = src;
        resetZoom();

        // Populate Caption
        if ((data.titel || data.beskrivelse || data.størrelse) && captionContainer) {
            if (captionTitle) {
                captionTitle.innerText = data.titel || '';
                captionTitle.style.display = data.titel ? 'block' : 'none';
            }

            if (captionDesc) {
                captionDesc.innerText = data.beskrivelse || '';
                captionDesc.style.display = data.beskrivelse ? 'block' : 'none';
            }

            if (captionMeta) {
                captionMeta.innerText = data.størrelse || '';
                captionMeta.style.display = data.størrelse ? 'block' : 'none';
            }

            captionContainer.classList.add('visible');
        } else if (captionContainer) {
            captionContainer.classList.remove('visible');
        }
    };

    const zoom = (direction) => {
        const factor = 0.2;
        if (direction === 'in') {
            scale += factor;
        } else {
            scale = Math.max(1, scale - factor); // Don't scale below 1
        }
        setTransform();
    };

    // Controls
    zoomInBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        zoom('in');
    });

    zoomOutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        zoom('out');
    });

    // Panning
    lightboxImg.addEventListener('mousedown', (e) => {
        if (scale > 1) { // Only pan if zoomed
            e.preventDefault();
            startX = e.clientX - pointX;
            startY = e.clientY - pointY;
            panning = true;
            lightboxImg.classList.add('grabbing');
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (!panning) return;
        e.preventDefault();
        pointX = e.clientX - startX;
        pointY = e.clientY - startY;
        setTransform();
    });

    window.addEventListener('mouseup', () => {
        panning = false;
        lightboxImg.classList.remove('grabbing');
    });

    // Close logic
    const closeBox = () => {
        lightbox.style.display = 'none';
        resetZoom();
        if (captionContainer) captionContainer.classList.remove('visible');
    };

    // Direct listener
    if (closeLightbox) {
        closeLightbox.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop bubbling
            closeBox();
        });
    }

    // Global delegation as backup
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-lightbox')) {
            closeBox();
        }
    });

    lightbox.addEventListener('click', (e) => {
        // Close if clicking outside image
        if (e.target === lightbox || e.target.classList.contains('lightbox-image-wrapper')) {
            closeBox();
        }
    });

    // Navigation Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
