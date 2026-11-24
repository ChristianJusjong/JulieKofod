# Julie Kofod — Kunstner Portfolio & Galleri

En farvestrålende, statisk kunstnerhjemmeside bygget i ren HTML, Vanilla CSS og JavaScript — klar til GitHub Pages eller enhver anden statisk hosting uden build-trin.

## Struktur
- `index.html` — Semantisk opbygning (Start, Til salg, Solgte værker, Om Julie, Kontakt, Lightbox).
- `index.css` — Designsystem med begge farvetemaer (**Lillypad Garden** og **Sunset Flower Field**), `Belleza`-typografi der matcher logoet, museum-rammer uden beskæring og responsivt masonry-galleri.
- `indhold.js` — **Alt redigerbart indhold** (tekster, priser, malerier til salg, solgte værker, kontaktinfo og farvetema-indstilling).
- `script.js` — Dynamisk visning, live farvetema-skifter, zoombar lightbox, forudfyldt forespørgselsflow og kopiér-email funktion.
- `assets/` — Logo (`logo.jpg`), malerier til salg (`til-salg/`) og solgte værker (`solgt/`).

## Sådan opdaterer du siden
1. **Ret priser, mål eller email**: Åbn `indhold.js` og rediger felterne under `tilSalg` og `kontakt`.
2. **Når et maleri bliver solgt**: Flyt maleriets blok fra `tilSalg` ned i `solgte` i `indhold.js`.
3. **Lås det endelige farvetema**: Når Julie har valgt mellem `"lillypad"` og `"sunset"`, sæt `standardTema` i `indhold.js` til vinderen og ændr `visTemaSkifter` til `false`.
