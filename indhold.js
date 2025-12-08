// INDHOLD.JS - Her kan du redigere alt indhold på hjemmesiden.
// Du behøver ikke kode. Bare ret teksten mellem "gåseøjnene".

const indhold = {
    // Generel info
    site: {
        titel: "Julie Kofod | Kunstner Portfolio",
        beskrivelse: "Julie Kofod - Kunstner. En samling af unika kunstværker og fotografier.",
        footer: "© 2025 Julie Kofod"
    },

    // Velkomst-sektionen (øverst)
    intro: {
        overtitel: "Kunstner & Sjæl",
        titel: "Ro i Kaos",
        tekst: "Jeg skaber rum, hvor tankerne kan lande blødt. En visuel dagbog over øjeblikke, meninger og stilhed. Velkommen til mit univers.",
        billede: "2c2fbe45-5692-4e64-8356-312a51de732e.jpg" // Navn på billedfil i 'Billeder' mappen
    },

    // Filosofi-sektion (billede venstre, tekst højre)
    filosofi: {
        billede: "52fea00e-623e-44e4-b155-dd87743703da.jpg",
        billedeTekst: "", // Den lille tekst under billedet
        overskrift: "Velvære gennem Kunsten",
        tekst1: "I en verden, der altid løber stærkt, søger jeg mod det langsomme. Min kunst er en invitation til at trække vejret helt ned i maven. Det handler ikke bare om at se, men om at mærke efter.",
        tekst2: "Hvert penselstrøg er en tanke, hver farve en følelse. Jeg forsøger at indfange den ro, vi ofte glemmer at give os selv."
    },

    // Citat sektion
    citat: {
        tekst: "Kunsten er ikke målet, men vejen dertil."
    },

    // Om Mig sektion
    om: {
        overskrift: "Om Mig",
        tekst: "Jeg hedder Julie. Jeg er kunstner, tænker og drømmer. Dette er min billedbiografi – et levende galleri af hvem jeg er, og hvad jeg skaber.",
        underskrift: "- Julie Kofod"
    },

    // Kontakt sektion
    kontakt: {
        overskrift: "Kontakt",
        tekst: "Interesseret i et værk eller en snak?",
        email: "kontakt@juliekofod.dk",
        instagram: "@juliekofod_art"
    },

    // VÆRKER (De store fremhævede værker med tekst)
    vaerker: [
        {
            titel: "Det Uperfekte",
            tekst: "Der er skønhed i det, der skæver. I mine værker dyrker jeg det organiske og det uventede. Det er her, livet leves.",
            filnavn: "34db2dad-eaa4-4aec-b5a2-fe891df47365.jpg"
        },
        {
            titel: "Stilhedens Stemme",
            tekst: "Når ordene slipper op, tager billederne over. En dialog uden lyd, men med masser af resonans.",
            filnavn: "7b83594f-48de-4fd1-ae1f-e70b31545576.jpg",
            størrelse: "100x120 cm | Olie på lærred"
        }
    ],

    // GLIMT / KOLLAGE (De mindre billeder i bunden)
    // Her er de muligheder du har for hvert billede:
    // 1. Simpelt billede: "filnavn.jpg"
    // 2. Billede med info: { filnavn: "filnavn.jpg", titel: "Titel", beskrivelse: "Beskrivelse", størrelse: "50x50 cm", format: "bred" }
    // 3. Tekstboks: { type: "tekst", tekst: "Din tekst", baggrund: "#farvekode", format: "lille" }
    //
    // FORMAT MULIGHEDER:
    // "auto"   = Automatisk (Højformat bliver høj, bredformat bliver bred)
    // "lille"  = Firkantet 1x1 (God til mindre fyld)
    // "bred"   = Fylder 2 pladser vandret (Landskab)
    // "høj"    = Fylder 2 pladser lodret (Portræt)
    //
    // KOPIER DENNE SKABELON TIL NYE BILLEDER MED INFO:
    // { filnavn: "BILLEDNAVN.JPG", titel: "TITEL", beskrivelse: "BESKRIVELSE", størrelse: "STØRRELSE", format: "auto" },
    collage: [

        // Række 1
        { filnavn: "2c2fbe45-5692-4e64-8356-312a51de732e.jpg", format: "auto", titel: "Morgenlys", størrelse: "A3 Papir" },
        { type: "tekst", tekst: "Kunsten er sjælens sprog.", baggrund: "#E6DCD3", format: "lille" },
        { filnavn: "34db2dad-eaa4-4aec-b5a2-fe891df47365.jpg", format: "bred", titel: "Horisont", størrelse: "50x70 cm" },

        // Række 2
        { filnavn: "52fea00e-623e-44e4-b155-dd87743703da.jpg", format: "høj", titel: "Portræt Studie", størrelse: "Olie på lærred" },
        { filnavn: "7b83594f-48de-4fd1-ae1f-e70b31545576.jpg", format: "lille", titel: "Detalje", størrelse: "A5" },
        { type: "tekst", tekst: "Hvert penselstrøg fortæller en historie.", baggrund: "#D4D8D2", format: "lille" },
        { filnavn: "545453858_10172296823240133_6763338538540901523_n.jpg", format: "auto" },

        // Række 3 (Gentagelser for at fylde ud)
        { type: "tekst", tekst: "Ro.", baggrund: "#F8F6F1", format: "lille" },
        { filnavn: "34db2dad-eaa4-4aec-b5a2-fe891df47365.jpg", format: "auto", titel: "Skitse #2" },
        { filnavn: "2c2fbe45-5692-4e64-8356-312a51de732e.jpg", format: "bred", titel: "Landskab IV" },

        // Række 4
        { filnavn: "7b83594f-48de-4fd1-ae1f-e70b31545576.jpg", format: "auto" },
        { filnavn: "52fea00e-623e-44e4-b155-dd87743703da.jpg", format: "lille" },
        { type: "tekst", tekst: "At skabe er at leve.", baggrund: "#E6DCD3", format: "bred" }
    ]
};
