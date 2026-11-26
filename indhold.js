// =============================================================================
// INDHOLD.JS — Rediger alt indhold på Julie Kofods hjemmeside her!
// Du behøver ikke kunne kode: ret blot teksten mellem "gåseøjnene".
// =============================================================================

const indhold = {
    // -------------------------------------------------------------------------
    // GENEREL INFO
    // -------------------------------------------------------------------------
    site: {
        titel: "Julie Kofod — Dansk Kunstmaler | Originale Akrylmalerier & Bestillingsværk",
        beskrivelse: "Jeg maler originale akrylmalerier på lærred i mit atelier i Lindenborg, Gistrup ved Aalborg — svævende øer, runde tondo-værker, drømmende natur og personlige bestillingsværker.",
        logo: "assets/logo.webp",
        footerTekst: "© 2026 Julie Kofod · Lindenborg, Gistrup"
    },

    // -------------------------------------------------------------------------
    // HERO / VELKOMST (ØVERST PÅ SIDEN)
    // -------------------------------------------------------------------------
    hero: {
        overtitel: "Original Kunst · Lindenborg, Gistrup",
        titel: "Natur, lys og farver fra fantasien",
        tekst: "Velkommen til mit farverige univers. Jeg maler akryl på lærred med særligt fokus på lyset — minder om naturen, roen i ubalance og svævende øer, som lever i min fantasi.",
        knapPrimaer: "Om mig",
        knapSekundaer: "Udforsk værkerne",
        fremhaevetStort: "assets/til-salg/07-naar-verden-sover.webp",
        fremhaevetStortId: "naar-verden-sover",
        fremhaevetRundt: "assets/til-salg/08-against-all-odds.webp",
        fremhaevetRundtId: "against-all-odds"
    },

    // -------------------------------------------------------------------------
    // MALERIER TIL SALG & AKTUELLE VÆRKER
    // Når et maleri bliver solgt, flytter du det bare ned i listen "solgte".
    // -------------------------------------------------------------------------
    tilSalgSektion: {
        overtitel: "I atelieret nu",
        overskrift: "Værker til salg",
        intro: "Mine aktuelle originalværker malet i akryl på lærred. Klik på et maleri for stor visning, zoom og forespørgsel."
    },

    tilSalg: [
        {
            id: "naar-verden-sover",
            filnavn: "assets/til-salg/07-naar-verden-sover.webp",
            titel: "Når verden sover",
            status: "reserved",
            statusTekst: "Reserveret til udstilling",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "against-all-odds",
            filnavn: "assets/til-salg/08-against-all-odds.webp",
            titel: "Against All Odds",
            status: "reserved",
            statusTekst: "Reserveret til udstilling",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "fantasiens-land",
            filnavn: "assets/til-salg/01-rund-maane-bjerge.webp",
            titel: "Fantasiens land",
            pris: "1.000 kr.",
            medium: "Akryl på lærred",
            maal: "Ø 40 cm",
            shape: "round"
        },
        {
            id: "i-maaneskinnet",
            filnavn: "assets/til-salg/02-turkis-skov-so-clean.webp",
            titel: "I måneskinnet",
            pris: "2.400 kr.",
            medium: "Akryl på lærred",
            maal: "40 × 50 cm",
            shape: "rect"
        },
        {
            id: "pink-sky",
            filnavn: "assets/til-salg/03-lyseroede-skyer-maane.webp",
            titel: "Pink Sky",
            pris: "3.000 kr.",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "boelgen",
            filnavn: "assets/til-salg/04-havboelger-maane.webp",
            titel: "Bølgen",
            pris: "3.500 kr.",
            medium: "Akryl på lærred",
            maal: "40 × 50 cm",
            shape: "rect"
        },
        {
            id: "i-mellemrummet",
            filnavn: "assets/til-salg/05-rund-birkeskov.webp",
            titel: "I mellemrummet",
            pris: "1.800 kr.",
            medium: "Akryl på lærred",
            maal: "Ø 40 cm",
            shape: "round"
        },
        {
            id: "vendepunktet",
            filnavn: "assets/til-salg/06-rund-gylden-kyst.webp",
            titel: "Vendepunktet",
            pris: "1.800 kr.",
            medium: "Akryl på lærred",
            maal: "Ø 40 cm",
            shape: "round"
        }
    ],

    // -------------------------------------------------------------------------
    // POETISK CITAT-BÅND
    // -------------------------------------------------------------------------
    citat: {
        tekst: "Jeg maler naturen som jeg mærker den, ikke kun som jeg ser den. Brudstykker af natur, som lever i min fantasi.",
        forfatter: "Julie Kofod"
    },

    // -------------------------------------------------------------------------
    // SOLGTE VÆRKER
    // (shape: "round" for runde lærreder, "rect" for firkantede — standard er "rect")
    // -------------------------------------------------------------------------
    solgteSektion: {
        overtitel: "Tidligere værker",
        overskrift: "Solgte værker",
        intro: "Et udvalg af mine tidligere akrylmalerier, der allerede har fundet deres hjem. Bliver du inspireret af en stemning eller farverne, maler jeg meget gerne et bestillingsværk.",
        bestillingTekst: "Drømmer du om et personligt maleri i samme stil eller dine helt egne farver?",
        bestillingKnap: "Forespørg om bestillingsværk"
    },

    solgte: [
        {
            id: "et-familieportraet",
            filnavn: "assets/solgt/solgt-01.webp",
            titel: "Et Familieportræt",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "min-fantasi-din-virkelighed",
            filnavn: "assets/solgt/solgt-03.webp",
            titel: "Min fantasi - din virkelighed",
            medium: "Akryl på lærred",
            maal: "80 × 60 cm",
            shape: "rect"
        },
        {
            id: "nu-falmer-skoven",
            filnavn: "assets/solgt/solgt-06.webp",
            titel: "Nu falmer skoven trindt om land",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "efter-regnen",
            filnavn: "assets/solgt/solgt-07.webp",
            titel: "Efter Regnen",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "et-stykke-fantasi",
            filnavn: "assets/solgt/solgt-02.webp",
            titel: "Et stykke Fantasi",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "wishing-you-well",
            filnavn: "assets/solgt/solgt-04.webp",
            titel: "Wishing you well",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "en-stille-stund",
            filnavn: "assets/solgt/solgt-en-stille-stund.webp",
            titel: "En stille stund",
            medium: "Akryl på lærred",
            maal: "Ø 40 cm",
            shape: "round"
        },
        {
            id: "de-sidste-straaler",
            filnavn: "assets/solgt/solgt-08.webp",
            titel: "De sidste stråler",
            medium: "Akryl på lærred",
            maal: "30 × 40 cm",
            shape: "rect"
        },
        {
            id: "vejen-hjem",
            filnavn: "assets/solgt/solgt-09.webp",
            titel: "Vejen Hjem",
            medium: "Akryl på lærred",
            maal: "80 × 100 cm",
            shape: "rect"
        },
        {
            id: "begyndelsen",
            filnavn: "assets/solgt/solgt-begyndelsen.webp",
            titel: "Begyndelsen",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "solgt-rund-skovsoe",
            filnavn: "assets/solgt/solgt-rund-uden-titel.webp",
            titel: "Uden titel",
            medium: "Akryl på lærred",
            maal: "Rundt lærred",
            shape: "round"
        },
        {
            id: "solgt-stenbro",
            filnavn: "assets/solgt/solgt-12.webp",
            titel: "Uden titel",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "solgt-triptykon",
            filnavn: "assets/solgt/solgt-11.webp",
            titel: "Uden titel",
            medium: "Akryl på lærred",
            maal: "Triptykon",
            shape: "rect"
        }
    ],

    // -------------------------------------------------------------------------
    // OM MIG — JULIES EGEN TEKST
    // -------------------------------------------------------------------------
    om: {
        overtitel: "Bag penslen",
        overskrift: "Om mig",
        billede: "assets/solgt/solgt-07.webp",
        afsnit: [
            "Jeg har altid været kreativ, tegnet og malet meget. Jeg er autodidakt kunstmaler, men bruger min viden om lys, fra min uddannelse til fotograf. Jeg arbejder særligt med lyset i mine malerier, da jeg oplever at det er det der skaber det perfekte maleri for mig.",
            "Udover at være kreativ, er jeg også “ude-menneske”. Jeg er opvokset ved Bøllingsø vest for Silkeborg, jeg har levet min ungdom i Silkeborg og Aarhus og altid søgt mod naturen begge steder. Jeg ved om nogen, hvor helende naturen kan være, for menneskelig sorg, smerte, rastløshed og ubehag, derfor søger jeg altid mod naturen, når jeg er i ubalance. I hvert af mine malerier, finder du derfor et lille stykke af min person. For når jeg maler, søger jeg at illustrere, frembringe og ikke mindst mærke den samme ro i mine billeder.",
            "Jeg maler naturen. Minder om den natur jeg voksede op i, nær Silkeborg. Naturen der omgiver mig i mit hjem i Lindenborg. Naturen som jeg mærker den, ikke kun som jeg ser den. Brudstykker af natur, som lever i min fantasi."
        ],
        underskrift: "Julie Kofod"
    },

    // -------------------------------------------------------------------------
    // KONTAKT
    // Tip: Indsæt evt. en gratis Formspree-URL i formEndpoint for direkte
    // afsendelse uden mailprogram (f.eks. "https://formspree.io/f/xxxxxxxx").
    // -------------------------------------------------------------------------
    kontakt: {
        overtitel: "Lad os tage en snak",
        overskrift: "Kontakt & Forespørgsel",
        tekst: "Interesseret i et af mine malerier, en uforpligtende fremvisning i mit atelier i Lindenborg ved Gistrup (tæt på Aalborg) eller et personligt bestillingsværk? Skriv eller ring endelig — jeg glæder mig til at høre fra dig.",
        email: "juliekofodnielsen@gmail.com",
        telefon: "23 20 04 48",
        telefonLink: "+4523200448",
        by: "Lindenborg, Gistrup · Aalborg (Nordjylland)",
        instagramHandle: "@juliekofodart",
        instagramUrl: "https://www.instagram.com/juliekofodart/",
        formEndpoint: ""
    }
};
