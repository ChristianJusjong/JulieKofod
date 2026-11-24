# Julie Kofod — Kunstner Portfolio & Galleri

En farvestrålende, statisk kunstnerhjemmeside i Neo-Pop galleristil bygget i ren HTML, Vanilla CSS og JavaScript — klar til GitHub Pages eller enhver anden statisk hosting uden build-trin.

## Struktur
- `index.html` — Semantisk opbygning (Start, Til salg, Solgte værker, Om Julie, Kontakt, Lightbox) med SEO-metadata, favicon og JSON-LD struktureret data.
- `index.css` — WCAG AA-kontrastoptimeret Neo-Pop designsystem (`Syne`, `Cormorant Garamond` og `Plus Jakarta Sans`), form-tilpassede rammer til runde tondo- og firkantede værker samt responsivt masonry-galleri.
- `indhold.js` — **Alt redigerbart indhold** (tekster, priser, malerier til salg, solgte værker, kontaktinfo og valgfri formular-endpoint).
- `script.js` — Dynamisk visning, formatfiltre (Alle / Runde / Firkantede), scroll-spy navigation, zoombar & swipe-venlig lightbox med deep-linking (`#vaerk=<id>`), forudfyldt forespørgselsflow og kopiér-email/besked funktioner.
- `assets/` — Logo (`logo.jpg`), favicon (`favicon.png`), optimerede malerier til salg (`til-salg/`) og solgte værker (`solgt/`).

## Sådan opdaterer du siden
1. **Ret priser, mål eller kontaktinfo**: Åbn `indhold.js` og rediger felterne under `tilSalg` og `kontakt`.
2. **Når et maleri bliver solgt**: Flyt maleriets blok fra `tilSalg` ned i `solgte` i `indhold.js`.
3. **Direkte formular-afsendelse (valgfrit)**: Indsæt en gratis Formspree-URL i `kontakt.formEndpoint` i `indhold.js` for at sende beskeder direkte uden mailprogram.
4. **Del et specifikt maleri**: Klik på link-ikonet i lightboxen for at kopiere et direkte link (f.eks. `#vaerk=pink-sky`).
