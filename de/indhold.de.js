// =============================================================================
// INDHOLD.DE.JS — Deutsche Inhalte für das Künstlerportfolio von Julie Kofod
// =============================================================================

window.ASSET_PREFIX = "../";

window.UI_STRINGS = {
    filterAll: "Alle",
    filterRound: "Rund (Tondo)",
    filterRect: "Rechteckig",
    badgeSale: "Verfügbar",
    badgeSold: "Verkauft",
    ctaViewWork: "Werk ansehen",
    ariaViewSale: (t) => `${t} in Großansicht öffnen`,
    ariaViewSold: (t) => `Verkauftes Werk ansehen: ${t}`,
    altSuffix: "originales Acrylgemälde der dänischen Künstlerin Julie Kofod",
    commissionSubject: "Anfrage für ein Auftragswerk",
    commissionBody: "Hallo Julie,\n\nmir gefallen deine Gemälde sehr und ich möchte mich gerne über ein persönliches Auftragswerk informieren.\n\nViele Grüße,",
    inquireSaleBtn: "Dieses Werk anfragen",
    inquireSoldBtn: "Ähnliches Werk anfragen",
    wallScaleParsed: (m) => `Werk: ${m} · Maßstab: 220 cm Sofa`,
    wallScaleApprox: "Ca. Maßstab: 220 cm Sofa",
    copiedBtn: "Kopiert!",
    copyBtn: "Kopieren",
    emailCopied: (e) => `E-Mail kopiert: ${e}`,
    msgCopied: "Nachricht kopiert — bereit zum Einfügen in dein E-Mail-Programm!",
    writeMsgFirst: "Bitte schreibe zuerst deine Nachricht in das Feld oben",
    defaultSubject: "Anfrage über juliekofod.com",
    defaultMedium: "Acryl auf Leinwand"
};

const indhold = {
    site: {
        titel: "Julie Kofod — Dänische Malerin | Originale Acrylgemälde & Auftragswerke",
        beskrivelse: "Entdecke originale Acrylgemälde auf Leinwand, runde Tondo-Werke, träumerische nordische Landschaften und persönliche Auftragswerke der dänischen Künstlerin Julie Kofod in Nordjütland bei Aalborg.",
        logo: "assets/logo.webp",
        footerTekst: "© 2026 Julie Kofod · Lindenborg, Gistrup · Aalborg, Dänemark"
    },

    hero: {
        overtitel: "Originalkunst · Lindenborg, Dänemark",
        titel: "Natur, Licht und Farben aus der Fantasie",
        tekst: "Willkommen in meinem farbenfrohen Universum. Ich male Acryl auf Leinwand mit besonderem Fokus auf das Licht — Erinnerungen an die Natur, Ruhe in Zeiten der Unruhe und Fragmente von Landschaften, die in meiner Fantasie leben.",
        knapPrimaer: "Künstlerin kennenlernen",
        knapSekundaer: "Werke entdecken",
        fremhaevetStort: "assets/til-salg/03-lyseroede-skyer-maane.webp",
        fremhaevetStortId: "pink-sky",
        fremhaevetRundt: "assets/til-salg/01-rund-maane-bjerge.webp",
        fremhaevetRundtId: "fantasiens-land"
    },

    tilSalgSektion: {
        overtitel: "Aktuell im Atelier",
        overskrift: "Verfügbare Gemälde",
        intro: "Alle aktuell verfügbaren Originalwerke — handgemalt in Acryl auf Leinwand. Klicke auf ein Gemälde für Großansicht, Zoom, Wand-Vorschau im Maßstab oder eine Anfrage."
    },

    tilSalg: [
        {
            id: "fantasiens-land",
            filnavn: "assets/til-salg/01-rund-maane-bjerge.webp",
            titel: "Fantasiens land (Land der Fantasie)",
            pris: "1.000 DKK (~135 €)",
            medium: "Acryl auf Leinwand",
            maal: "Ø 40 cm",
            shape: "round",
            beskrivelse: "Rundes Originalwerk (Tondo) mit träumerischem rosa-violettem Himmel, Vollmond über den Bergen und lebendiger türkiser Struktur."
        },
        {
            id: "i-maaneskinnet",
            filnavn: "assets/til-salg/02-turkis-skov-so-clean.webp",
            titel: "I måneskinnet (Im Mondschein)",
            pris: "2.400 DKK (~320 €)",
            medium: "Acryl auf Leinwand",
            maal: "40 × 50 cm",
            shape: "rect",
            beskrivelse: "Sanftes Mondlicht bricht durch hängende Zweige und spiegelt sich in einem tiefen smaragdgrünen und türkisen Waldsee."
        },
        {
            id: "pink-sky",
            filnavn: "assets/til-salg/03-lyseroede-skyer-maane.webp",
            titel: "Pink Sky",
            pris: "3.000 DKK (~400 €)",
            medium: "Acryl auf Leinwand",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Ein weiter, faszinierender Himmelsraum voller Rosa-, Lavendel- und tiefer Violetttöne im warmen Licht der Abendsonne."
        },
        {
            id: "boelgen",
            filnavn: "assets/til-salg/04-havboelger-maane.webp",
            titel: "Bølgen (Die Welle)",
            pris: "3.500 DKK (~470 €)",
            medium: "Acryl auf Leinwand",
            maal: "40 × 50 cm",
            shape: "rect",
            beskrivelse: "Kraftvolle, schäumende blaue Meereswellen an der Küste unter einem dramatischen Abendhimmel und einem leuchtenden Vollmond."
        },
        {
            id: "i-mellemrummet",
            filnavn: "assets/til-salg/05-rund-birkeskov.webp",
            titel: "I mellemrummet (Im Zwischenraum)",
            pris: "1.800 DKK (~240 €)",
            medium: "Acryl auf Leinwand",
            maal: "Ø 40 cm",
            shape: "round",
            beskrivelse: "Rundes Strukturwerk einer stillen Lichtung zwischen weißen Birkenstämmen, goldenem Herbstlaub und bemoosten Steinen."
        },
        {
            id: "vendepunktet",
            filnavn: "assets/til-salg/06-rund-gylden-kyst.webp",
            titel: "Vendepunktet (Der Wendepunkt)",
            pris: "1.800 DKK (~240 €)",
            medium: "Acryl auf Leinwand",
            maal: "Ø 40 cm",
            shape: "round",
            beskrivelse: "Rundes Strukturmalerei-Unikat in warmen goldenen Sandtönen, metallischen Akzenten und tiefem Blau rund um eine ruhige Küstenwelle."
        }
    ],

    citat: {
        tekst: "Ich male die Natur so, wie ich sie fühle — nicht nur so, wie ich sie sehe. Fragmente der Natur, die in meiner Fantasie leben.",
        forfatter: "Julie Kofod"
    },

    solgteSektion: {
        overtitel: "Archiv",
        overskrift: "Verkaufte Werke",
        intro: "Eine Auswahl früherer Acrylgemälde, die bereits ein neues Zuhause gefunden haben. Inspiriert dich eine Stimmung oder Farbwelt, male ich sehr gerne ein persönliches Auftragswerk für dich.",
        bestillingTekst: "Träumst du von einem persönlichen Gemälde in ähnlichem Stil oder in deinen ganz eigenen Farben?",
        bestillingKnap: "Auftragswerk anfragen"
    },

    solgte: [
        {
            id: "min-fantasi-din-virkelighed",
            filnavn: "assets/solgt/solgt-03.webp",
            titel: "Min fantasi - din virkelighed",
            medium: "Acryl auf Leinwand",
            maal: "80 × 60 cm",
            shape: "rect",
            beskrivelse: "Schwebende Wildblumen-Insel inmitten tiefer rosa, blauer und violetter Wolken."
        },
        {
            id: "nu-falmer-skoven",
            filnavn: "assets/solgt/solgt-06.webp",
            titel: "Nu falmer skoven trindt om land",
            medium: "Acryl auf Leinwand",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Schwebender Birkenwald mit goldenem Herbstlaub vor einem tiefen petrolblauen Nachthimmel."
        },
        {
            id: "efter-regnen",
            filnavn: "assets/solgt/solgt-07.webp",
            titel: "Efter Regnen (Nach dem Regen)",
            medium: "Acryl auf Leinwand",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Ein kleiner Kolibri an einem schwebenden Waldrand im korallenroten und himmelblauen Sonnenuntergang."
        },
        {
            id: "et-stykke-fantasi",
            filnavn: "assets/solgt/solgt-02.webp",
            titel: "Et stykke Fantasi (Ein Stück Fantasie)",
            medium: "Acryl auf Leinwand",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Schwebender Baum unter dem Vollmond in warmen Gold- und Türkisnuancen."
        },
        {
            id: "wishing-you-well",
            filnavn: "assets/solgt/solgt-04.webp",
            titel: "Wishing you well",
            medium: "Acryl auf Leinwand",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Ein märchenhafter Wunschbrunnen auf seiner eigenen schwebenden Insel in goldenem Licht."
        },
        {
            id: "en-stille-stund",
            filnavn: "assets/solgt/solgt-en-stille-stund.webp",
            titel: "En stille stund (Ein stiller Moment)",
            medium: "Acryl auf Leinwand",
            maal: "Ø 40 cm",
            shape: "round",
            beskrivelse: "Rundes Gemälde eines stillen, mondbeschienenen Waldsees umgeben von Birken."
        },
        {
            id: "de-sidste-straaler",
            filnavn: "assets/solgt/solgt-08.webp",
            titel: "De sidste stråler (Die letzten Strahlen)",
            medium: "Acryl auf Leinwand",
            maal: "30 × 40 cm",
            shape: "rect",
            beskrivelse: "Sonnenstrahlen brechen durch die Baumkronen in tiefem Waldgrün und warmem Gold."
        },
        {
            id: "vejen-hjem",
            filnavn: "assets/solgt/solgt-09.webp",
            titel: "Vejen Hjem (Der Weg nach Hause)",
            medium: "Acryl auf Leinwand",
            maal: "80 × 100 cm",
            shape: "rect",
            beskrivelse: "Ein offenes Tor und ein geschwungener Pfad über eine alte Steinbrücke im Morgennebel und Lavendellicht."
        },
        {
            id: "begyndelsen",
            filnavn: "assets/solgt/solgt-begyndelsen.webp",
            titel: "Begyndelsen (Der Anfang)",
            medium: "Acryl auf Leinwand",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Ein üppiger, lichtdurchfluteter Waldweg, der den Blick zu einer tief stehenden, glühenden Sonne lenkt."
        },
        {
            id: "solgt-rund-skovsoe",
            filnavn: "assets/solgt/solgt-rund-uden-titel.webp",
            titel: "Ohne Titel",
            medium: "Acryl auf Leinwand",
            maal: "Runde Leinwand",
            shape: "round",
            beskrivelse: "Stimmungsvolles Rundbild in Schwarz, warmem Gold und Orangetönen an einem stillen Waldsee."
        },
        {
            id: "solgt-stenbro",
            filnavn: "assets/solgt/solgt-12.webp",
            titel: "Ohne Titel",
            medium: "Acryl auf Leinwand",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Stimmungsvolle Landschaft mit alter Steinbrücke, goldenem Lichteinfall und reicher Struktur."
        },
        {
            id: "solgt-triptykon",
            filnavn: "assets/solgt/solgt-11.webp",
            titel: "Ohne Titel (Triptychon)",
            medium: "Acryl auf Leinwand",
            maal: "Triptychon",
            shape: "rect",
            beskrivelse: "Dreiteiliges Gemälde eines langen Holzstegs durch neblige Seenlandschaft mit schwebendem Greifvogel."
        },
        {
            id: "valmuer-i-luften",
            filnavn: "assets/solgt/solgt-01.webp",
            titel: "Valmuer i Luften (Mohnblumen in der Luft)",
            medium: "Acryl auf Leinwand",
            maal: "Quadratische Leinwand",
            shape: "rect",
            beskrivelse: "Zarte rosafarbene Mohnblumen auf einer schwebenden Insel in weichen Sand- und Erdtönen."
        }
    ],

    om: {
        overtitel: "Die Künstlerin hinter dem Pinsel",
        overskrift: "Über Julie",
        billede: "assets/solgt/solgt-07.webp",
        afsnit: [
            "Ich war schon immer kreativ und habe mein ganzes Leben lang viel gezeichnet und gemalt. Ich bin Autodidaktin als Malerin, nutze aber mein tiefes Verständnis für Licht aus meiner Ausbildung zur Fotografin. Besonders die Arbeit mit Licht steht im Mittelpunkt meiner Bilder — denn für mich ist es das Licht, das ein Gemälde wirklich lebendig macht.",
            "Neben meiner kreativen Seite bin ich ein echter Naturmensch. Ich bin am Bøllingsø westlich von Silkeborg aufgewachsen, habe meine Jugend in Silkeborg und Aarhus verbracht und überall die Nähe zur Natur gesucht. Ich weiß aus eigener Erfahrung, wie heilsam die Natur bei Trauer, Schmerz, Unruhe und innerem Ungleichgewicht sein kann. Deshalb steckt in jedem meiner Gemälde auch ein kleines Stück von mir: Beim Malen möchte ich genau diese Ruhe spüren und weitergeben.",
            "Ich male die Natur. Erinnerungen an die Landschaften meiner Kindheit bei Silkeborg. Die Natur rund um mein Zuhause und Atelier in Lindenborg nahe Aalborg in Nordjütland. Die Natur, wie ich sie fühle — nicht nur, wie ich sie sehe. Fragmente der Natur, die in meiner Fantasie leben."
        ],
        underskrift: "— Julie Kofod"
    },

    kontakt: {
        overtitel: "Lass uns sprechen",
        overskrift: "Kontakt & Anfrage",
        tekst: "Interessierst du dich für ein verfügbares Gemälde, einen Atelierbesuch in Lindenborg nahe Aalborg (Nordjütland), Versand nach Deutschland oder ein persönliches Auftragswerk? Schreib oder ruf mir gerne — ich freue mich auf deine Nachricht.",
        email: "juliekofodnielsen@gmail.com",
        telefon: "+45 23 20 04 48",
        telefonLink: "+4523200448",
        by: "Lindenborg, Gistrup · Aalborg, Dänemark",
        instagramHandle: "@juliekofodart",
        instagramUrl: "https://www.instagram.com/juliekofodart/",
        formEndpoint: ""
    }
};
