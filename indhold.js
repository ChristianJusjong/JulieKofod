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
        beskrivelse: "Julie Kofod — dansk kunstmaler i Lindenborg, Gistrup ved Aalborg. Udforsk originale akrylmalerier på lærred, runde tondo-værker, drømmende landskabsmalerier og personlige bestillingsværker.",
        logo: "assets/logo.webp",
        footerTekst: "© 2026 Julie Kofod · Lindenborg, Gistrup"
    },

    // -------------------------------------------------------------------------
    // HERO / VELKOMST (ØVERST PÅ SIDEN)
    // -------------------------------------------------------------------------
    hero: {
        overtitel: "Original Kunst · Lindenborg, Gistrup",
        titel: "Natur, lys og farver fra fantasien",
        tekst: "Velkommen til mit farverige univers. Jeg maler akryl på lærred med særligt fokus på lyset — minder om naturen, roen i ubalance og brudstykker af landskaber, som lever i min fantasi.",
        knapPrimaer: "Se værker til salg",
        knapSekundaer: "Kontakt Julie",
        fremhaevetStort: "assets/til-salg/03-lyseroede-skyer-maane.webp",
        fremhaevetStortId: "pink-sky",
        fremhaevetRundt: "assets/til-salg/01-rund-maane-bjerge.webp",
        fremhaevetRundtId: "fantasiens-land"
    },

    // -------------------------------------------------------------------------
    // MALERIER TIL SALG
    // Når et maleri bliver solgt, flytter du det bare ned i listen "solgte".
    // -------------------------------------------------------------------------
    tilSalgSektion: {
        overtitel: "Galleriet",
        overskrift: "Værker til salg",
        intro: "Alle tilgængelige originalværker fra en ende af — malet i akryl på lærred. Klik på et maleri for stor visning, zoom og forespørgsel."
    },

    tilSalg: [
        {
            id: "fantasiens-land",
            filnavn: "assets/til-salg/01-rund-maane-bjerge.webp",
            titel: "Fantasiens land",
            pris: "1.000 kr.",
            medium: "Akryl på lærred",
            maal: "Ø 40 cm",
            shape: "round",
            beskrivelse: "Rundt originalværk med drømmende rosa-lilla himmel, fuldmåne over bjergene og levende turkis struktur."
        },
        {
            id: "i-maaneskinnet",
            filnavn: "assets/til-salg/02-turkis-skov-so-clean.webp",
            titel: "I måneskinnet",
            pris: "2.400 kr.",
            medium: "Akryl på lærred",
            maal: "40 × 50 cm",
            shape: "rect",
            beskrivelse: "Månens blide lys bryder gennem hængende grene og spejler sig i en dyb, smaragdgrøn og turkis skovsø."
        },
        {
            id: "pink-sky",
            filnavn: "assets/til-salg/03-lyseroede-skyer-maane.webp",
            titel: "Pink Sky",
            pris: "3.000 kr.",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Et stort, dragende himmelrum fyldt med rosa, lavendel og dybe violette skyformationer oplyst af aftensolen."
        },
        {
            id: "boelgen",
            filnavn: "assets/til-salg/04-havboelger-maane.webp",
            titel: "Bølgen",
            pris: "3.500 kr.",
            medium: "Akryl på lærred",
            maal: "40 × 50 cm",
            shape: "rect",
            beskrivelse: "Kraftfulde, skummende blå havbølger mod kysten under en dramatisk skumringshimmel og en lysende fuldmåne."
        },
        {
            id: "i-mellemrummet",
            filnavn: "assets/til-salg/05-rund-birkeskov.webp",
            titel: "I mellemrummet",
            pris: "1.800 kr.",
            medium: "Akryl på lærred",
            maal: "Ø 40 cm",
            shape: "round",
            beskrivelse: "Rundt maleri af en lysning mellem hvide birkestammer, gyldne efterårsblade og mosbeklædte sten."
        },
        {
            id: "vendepunktet",
            filnavn: "assets/til-salg/06-rund-gylden-kyst.webp",
            titel: "Vendepunktet",
            pris: "1.800 kr.",
            medium: "Akryl på lærred",
            maal: "Ø 40 cm",
            shape: "round",
            beskrivelse: "Rundt strukturmaleri i varme gyldne sandtoner, metalliske strejf og dyb blå omkring en stille kystbølge."
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
        intro: "Et udvalg af tidligere akrylmalerier, der allerede har fundet deres hjem. Bliver du inspireret af en stemning eller farverne, maler jeg meget gerne et bestillingsværk.",
        bestillingTekst: "Drømmer du om et personligt maleri i samme stil eller dine helt egne farver?",
        bestillingKnap: "Forespørg om bestillingsværk"
    },

    solgte: [
        {
            id: "min-fantasi-din-virkelighed",
            filnavn: "assets/solgt/solgt-03.webp",
            titel: "Min fantasi - din virkelighed",
            medium: "Akryl på lærred",
            maal: "80 × 60 cm",
            shape: "rect",
            beskrivelse: "Svævende vildblomst-ø i dybe rosa, blå og violette skyer."
        },
        {
            id: "nu-falmer-skoven",
            filnavn: "assets/solgt/solgt-06.webp",
            titel: "Nu falmer skoven trindt om land",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Svævende birkeskov med gyldent efterårsløv mod dyb petrol-blå nattehimmel."
        },
        {
            id: "efter-regnen",
            filnavn: "assets/solgt/solgt-07.webp",
            titel: "Efter Regnen",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "En lille kolibri ved en svævende skovkant i koralrød og himmelblå solnedgang."
        },
        {
            id: "et-stykke-fantasi",
            filnavn: "assets/solgt/solgt-02.webp",
            titel: "Et stykke Fantasi",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Svævende træ under fuldmånen i varme gyldne og turkise nuancer."
        },
        {
            id: "wishing-you-well",
            filnavn: "assets/solgt/solgt-04.webp",
            titel: "Wishing you well",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "En eventyrlig ønskebrønd på sin egen svævende ø i gyldent lys."
        },
        {
            id: "en-stille-stund",
            filnavn: "assets/solgt/solgt-en-stille-stund.webp",
            titel: "En stille stund",
            medium: "Akryl på lærred",
            maal: "Ø 40 cm",
            shape: "round",
            beskrivelse: "Rundt maleri af en stille, månebelyst skovsø omgivet af birketræer."
        },
        {
            id: "de-sidste-straaler",
            filnavn: "assets/solgt/solgt-08.webp",
            titel: "De sidste stråler",
            medium: "Akryl på lærred",
            maal: "30 × 40 cm",
            shape: "rect",
            beskrivelse: "Lysstråler der bryder gennem trækronerne i dybe skovgrønne og gyldne toner."
        },
        {
            id: "vejen-hjem",
            filnavn: "assets/solgt/solgt-09.webp",
            titel: "Vejen Hjem",
            medium: "Akryl på lærred",
            maal: "80 × 100 cm",
            shape: "rect",
            beskrivelse: "En åben låge og en snoet sti over en gammel stenbro i morgendis og lavendellys."
        },
        {
            id: "begyndelsen",
            filnavn: "assets/solgt/solgt-begyndelsen.webp",
            titel: "Begyndelsen",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "En frodig, lysfyldt skovsti der fører blikket mod en lav, glødende sol."
        },
        {
            id: "solgt-rund-skovsoe",
            filnavn: "assets/solgt/solgt-rund-uden-titel.webp",
            titel: "Uden titel",
            medium: "Akryl på lærred",
            maal: "Rundt lærred",
            shape: "round",
            beskrivelse: "Rundt stemningsmaleri i sort, varm guld og orange nuancer ved en stille skovsø."
        },
        {
            id: "solgt-stenbro",
            filnavn: "assets/solgt/solgt-12.webp",
            titel: "Uden titel",
            medium: "Akryl på lærred",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Stemningsfuldt landskab med gammel stenbro, gyldent lysindfald og rig struktur."
        },
        {
            id: "solgt-triptykon",
            filnavn: "assets/solgt/solgt-11.webp",
            titel: "Uden titel",
            medium: "Akryl på lærred",
            maal: "Triptykon",
            shape: "rect",
            beskrivelse: "Tredelt maleri af en lang træbro gennem tåget sølandskab med en svævende rovfugl."
        },
        {
            id: "valmuer-i-luften",
            filnavn: "assets/solgt/solgt-01.webp",
            titel: "Valmuer i Luften",
            medium: "Akryl på lærred",
            maal: "Firkantet lærred",
            shape: "rect",
            beskrivelse: "Sarte lyserøde valmuer på en svævende ø i bløde sand- og jordtoner."
        }
    ],

    // -------------------------------------------------------------------------
    // OM JULIE — JULIES EGEN TEKST
    // -------------------------------------------------------------------------
    om: {
        overtitel: "Kunstneren bag penslen",
        overskrift: "Om Julie",
        billede: "assets/solgt/solgt-07.webp",
        afsnit: [
            "Jeg har altid været kreativ, tegnet og malet meget. Jeg er autodidakt kunstmaler, men bruger min viden om lys, fra min uddannelse til fotograf. Jeg arbejder særligt med lyset i mine malerier, da jeg oplever at det er det der skaber det perfekte maleri for mig.",
            "Udover at være kreativ, er jeg også “ude-menneske”. Jeg er opvokset ved Bøllingsø vest for Silkeborg, jeg har levet min ungdom i Silkeborg og Aarhus og altid søgt mod naturen begge steder. Jeg ved om nogen, hvor helende naturen kan være, for menneskelig sorg, smerte, rastløshed og ubehag, derfor søger jeg altid mod naturen, når jeg er i ubalance. I hvert af mine malerier, finder du derfor et lille stykke af min person. For når jeg maler, søger jeg at illustrere, frembringe og ikke mindst mærke den samme ro i mine billeder.",
            "Jeg maler naturen. Minder om den natur jeg voksede op i, nær Silkeborg. Naturen der omgiver mig i mit hjem i Lindenborg. Naturen som jeg mærker den, ikke kun som jeg ser den. Brudstykker af natur, som lever i min fantasi."
        ],
        underskrift: "— Julie Kofod"
    },

    // -------------------------------------------------------------------------
    // KONTAKT
    // Tip: Indsæt evt. en gratis Formspree-URL i formEndpoint for direkte
    // afsendelse uden mailprogram (f.eks. "https://formspree.io/f/xxxxxxxx").
    // -------------------------------------------------------------------------
    kontakt: {
        overtitel: "Lad os tage en snak",
        overskrift: "Kontakt & Forespørgsel",
        tekst: "Interesseret i et af malerierne til salg, en uforpligtende fremvisning i atelieret i Lindenborg ved Gistrup (tæt på Aalborg) eller et personligt bestillingsværk? Skriv eller ring endelig — jeg glæder mig til at høre fra dig.",
        email: "juliekofodnielsen@gmail.com",
        telefon: "23 20 04 48",
        telefonLink: "+4523200448",
        by: "Lindenborg, Gistrup · Aalborg (Nordjylland)",
        instagramHandle: "@juliekofodart",
        instagramUrl: "https://www.instagram.com/juliekofodart/",
        formEndpoint: ""
    }
};
