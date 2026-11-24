// =============================================================================
// INDHOLD.JS — Rediger alt indhold på Julie Kofods hjemmeside her!
// Du behøver ikke kunne kode: ret blot teksten mellem "gåseøjnene".
// =============================================================================

const indhold = {
    // -------------------------------------------------------------------------
    // GENEREL INFO & FARVETEMA
    // -------------------------------------------------------------------------
    site: {
        titel: "Julie Kofod | Original Kunst & Malerier",
        beskrivelse: "Originale malerier af Julie Kofod — drømmende landskaber, svævende øer, måneskin og levende farver.",
        logo: "assets/logo.jpg",
        // Standard farvetema ved første besøg: "lillypad" eller "sunset"
        standardTema: "lillypad",
        // Sæt til false, når Julie har valgt sit endelige farvetema og skifteren skal skjules
        visTemaSkifter: true,
        footerTekst: "© 2026 Julie Kofod — Alle rettigheder forbeholdes"
    },

    // -------------------------------------------------------------------------
    // HERO / VELKOMST (ØVERST PÅ SIDEN)
    // -------------------------------------------------------------------------
    hero: {
        overtitel: "Original Kunst af Julie Kofod",
        titel: "Drømmende universer i farver, lys og stilhed",
        tekst: "Velkommen til mit galleri. Jeg maler stemningsfulde landskaber, svævende øer og magiske øjeblikke under månen — skabt med lag på lag af struktur, varme og farveglæde.",
        knapPrimaer: "Se værker til salg",
        knapSekundaer: "Kontakt & bestilling",
        // De to fremhævede billeder i hero-sektionen
        fremhaevetStort: "assets/solgt/solgt-03.jpg",
        fremhaevetRundt: "assets/til-salg/01-rund-maane-bjerge.jpg"
    },

    // -------------------------------------------------------------------------
    // MALERIER TIL SALG
    // Ret pris, titel, mål og beskrivelse herunder.
    // Når et maleri bliver solgt, flytter du det bare ned i listen "solgte".
    // -------------------------------------------------------------------------
    tilSalgSektion: {
        overtitel: "Galleriet",
        overskrift: "Værker til salg",
        intro: "Her finder du alle mine tilgængelige originalværker fra en ende af. Klik på et maleri for at se det i fuld størrelse, zoome ind på detaljerne eller sende en forespørgsel."
    },

    tilSalg: [
        {
            id: "vaerk-1",
            filnavn: "assets/til-salg/01-rund-maane-bjerge.jpg",
            titel: "Måneskin over Bjergene",
            pris: "Pris indsættes (DKK)", // F.eks. "2.400 kr."
            format: "Rundt lærred · Akryl & struktur",
            maal: "Ø — cm", // F.eks. "Ø 50 cm"
            beskrivelse: "Et stemningsfuldt rundt maleri med blød rosa-lilla himmel, fuldmåne over fjeldet og rig, turkis struktur i forgrunden."
        },
        {
            id: "vaerk-2",
            filnavn: "assets/til-salg/02-turkis-skov-so.jpg",
            titel: "Stilhed ved Skovsøen",
            pris: "Pris indsættes (DKK)",
            format: "Originalt maleri · Akryl på lærred",
            maal: "— x — cm",
            beskrivelse: "Månen lyser blidt gennem hængende pilegrene og spejler sig i en dyb, smaragdgrøn og turkis skovsø."
        },
        {
            id: "vaerk-3",
            filnavn: "assets/til-salg/03-lyseroede-skyer-maane.jpg",
            titel: "Aftenskyer & Måne",
            pris: "Pris indsættes (DKK)",
            format: "Originalt maleri · Akryl på lærred",
            maal: "— x — cm",
            beskrivelse: "Drømmende rosa, lavendel og violette skyformationer oplyst af aftensolens sidste stråler og en stille måne."
        },
        {
            id: "vaerk-4",
            filnavn: "assets/til-salg/04-havboelger-maane.jpg",
            titel: "Bølger i Skumringen",
            pris: "Pris indsættes (DKK)",
            format: "Originalt maleri · Akryl på lærred",
            maal: "— x — cm",
            beskrivelse: "Kraftfulde, skummende blå havbølger der ruller ind over kysten under en dramatisk himmel og en klar fuldmåne."
        },
        {
            id: "vaerk-5",
            filnavn: "assets/til-salg/05-rund-birkeskov.jpg",
            titel: "Efterårssti i Birkeskoven",
            pris: "Pris indsættes (DKK)",
            format: "Rundt lærred · Akryl & struktur",
            maal: "Ø — cm",
            beskrivelse: "En lysning mellem hvide birkestammer, gyldent løv og mosbeklædte sten, malet med levende relief og dybde."
        },
        {
            id: "vaerk-6",
            filnavn: "assets/til-salg/06-rund-gylden-kyst.jpg",
            titel: "Gylden Kyst",
            pris: "Pris indsættes (DKK)",
            format: "Rundt lærred · Akryl & struktur",
            maal: "Ø — cm",
            beskrivelse: "Varme sandfarver, metalliske guldnuancer og strejf af dyb blå indrammer en stille bølge ved horisonten."
        }
    ],

    // -------------------------------------------------------------------------
    // POETISK CITAT-BÅND
    // -------------------------------------------------------------------------
    citat: {
        tekst: "Hvert maleri er et lille fristed — et sted hvor farverne får lov at tale, og tankerne kan lande blødt.",
        forfatter: "Julie Kofod"
    },

    // -------------------------------------------------------------------------
    // SOLGTE VÆRKER
    // -------------------------------------------------------------------------
    solgteSektion: {
        overtitel: "Tidligere værker",
        overskrift: "Solgte værker",
        intro: "Et udvalg af værker, der allerede har fundet et nyt hjem. Bliver du inspireret af en stemning eller et motiv, maler jeg meget gerne et personligt bestillingsværk.",
        bestillingTekst: "Drømmer du om et maleri i samme stil eller dine helt egne farver?",
        bestillingKnap: "Forespørg om bestillingsværk"
    },

    solgte: [
        {
            filnavn: "assets/solgt/solgt-03.jpg",
            titel: "Blomsterø i Aftenrøde",
            beskrivelse: "Svævende vildblomst-ø i dybe rosa, blå og violette skyer."
        },
        {
            filnavn: "assets/solgt/solgt-06.jpg",
            titel: "Efterårsbirke i Natten",
            beskrivelse: "Svævende birkeskov med gyldent efterårsløv mod dyb petrol-blå nattehimmel."
        },
        {
            filnavn: "assets/solgt/solgt-07.jpg",
            titel: "Kolibrien & Dugdråben",
            beskrivelse: "En lille kolibri ved en svævende skovkant i koralrød og himmelblå solnedgang."
        },
        {
            filnavn: "assets/solgt/solgt-02.jpg",
            titel: "Piletræet på Øen",
            beskrivelse: "Svævende træ under fuldmånen i varme gyldne og turkise nuancer."
        },
        {
            filnavn: "assets/solgt/solgt-04.jpg",
            titel: "Ønskebrønden",
            beskrivelse: "En eventyrlig ønskebrønd på sin egen svævende ø i gyldent lys."
        },
        {
            filnavn: "assets/solgt/solgt-01.jpg",
            titel: "Valmuer i Luften",
            beskrivelse: "Sarte lyserøde valmuer på en svævende ø i bløde sand- og jordtoner."
        },
        {
            filnavn: "assets/solgt/solgt-08.jpg",
            titel: "Solstråler i Skoven",
            beskrivelse: "Lysstråler der bryder gennem trækronerne i dybe skovgrønne og gyldne toner."
        },
        {
            filnavn: "assets/solgt/solgt-09.jpg",
            titel: "Stenbroen gennem Dalen",
            beskrivelse: "En åben låge og en snoet sti over en gammel stenbro i morgendis og lavendellys."
        },
        {
            filnavn: "assets/solgt/solgt-10.jpg",
            titel: "Den Grønne Sti",
            beskrivelse: "En frodig, lysfyldt skovsti der fører blikket mod en lav, glødende sol."
        },
        {
            filnavn: "assets/solgt/solgt-11.jpg",
            titel: "Broen over Søen (Triptykon)",
            beskrivelse: "Tredelt maleri af en lang træbro gennem tåget sølandskab med en svævende rovfugl."
        },
        {
            filnavn: "assets/solgt/solgt-12.jpg",
            titel: "Den Gamle Stenbro",
            beskrivelse: "Stemningsfuldt landskab med stenbro, gyldent lysindfald og rig struktur."
        }
    ],

    // -------------------------------------------------------------------------
    // OM JULIE
    // -------------------------------------------------------------------------
    om: {
        overtitel: "Kunstneren bag penslen",
        overskrift: "Om Julie",
        billede: "assets/solgt/solgt-07.jpg",
        afsnit: [
            "Jeg hedder Julie Kofod og skaber originale malerier, hvor naturens ro møder det drømmende og eventyrlige. Mit univers kredser om svævende øer, måneskin, levende teksturer og farver, der giver varme og karakter til rummet.",
            "Jeg arbejder intuitivt i mange lag — ofte med både akryl, struktur og fine detaljer — så hvert værk har sin egen puls og dybde. Uanset om det er et rundt lærred med skovens ro eller en farverig aftenhimmel, håber jeg, at mine malerier inviterer dig til at standse op og mærke efter.",
            "Du er altid velkommen til at skrive, hvis du forelsker dig i et værk, vil se flere billeder af det i dagslys, eller har en idé til et personligt bestillingsværk."
        ],
        underskrift: "— Julie Kofod"
    },

    // -------------------------------------------------------------------------
    // KONTAKT
    // -------------------------------------------------------------------------
    kontakt: {
        overtitel: "Lad os tage en snak",
        overskrift: "Kontakt & Forespørgsel",
        tekst: "Interesseret i et af malerierne til salg, en fremvisning eller et personligt bestillingsværk? Skriv endelig en besked herunder eller fang mig direkte på Instagram.",
        // RET EMAILEN HERUNDER TIL JULIES RIGTIGE EMAIL:
        email: "kontakt@juliekofod.dk",
        instagramHandle: "@juliekofodart",
        instagramUrl: "https://www.instagram.com/juliekofodart/"
    }
};
