// =============================================================================
// INDHOLD.EN.JS — English content for Julie Kofod's Artist Portfolio
// =============================================================================

window.ASSET_PREFIX = "../";

window.UI_STRINGS = {
    filterAll: "All",
    filterRound: "Round (Tondo)",
    filterRect: "Rectangular",
    badgeSale: "Available",
    badgeReserved: "Reserved for exhibition",
    badgeSold: "Sold",
    ctaViewWork: "View work",
    ariaViewSale: (t) => `View ${t} in full screen`,
    ariaViewSold: (t) => `View archived artwork: ${t}`,
    altSuffix: "original acrylic painting by Julie Kofod",
    inquireSaleBtn: "Inquire about this artwork",
    wallScaleParsed: (m) => `Artwork: ${m} · Scale reference: 220 cm sofa`,
    wallScaleApprox: "Approx. scale reference: 220 cm sofa",
    copiedBtn: "Copied!",
    copyBtn: "Copy",
    emailCopied: (e) => `Email copied: ${e}`,
    msgCopied: "Message copied — ready to paste into your webmail!",
    writeMsgFirst: "Please write your message in the box above first",
    defaultSubject: "Inquiry from juliekofod.com",
    defaultMedium: "Acrylic on canvas"
};

const indhold = {
    site: {
        titel: "Julie Kofod — Danish Painter | Original Acrylic Paintings",
        beskrivelse: "I paint original acrylic paintings on canvas in my studio in Lindenborg near Aalborg, Denmark — floating islands, round tondo artworks, and dreamy nature.",
        logo: "assets/logo.webp",
        footerTekst: "© 2026 Julie Kofod · Lindenborg, Gistrup · Aalborg, Denmark"
    },

    hero: {
        overtitel: "Original Art · Lindenborg, Denmark",
        titel: "Nature, light, and colors from imagination",
        tekst: "Welcome to my colorful universe. I paint acrylic on canvas with a special focus on light — memories of nature, calm in moments of unrest, and floating islands that live in my imagination.",
        knapPrimaer: "About me",
        knapSekundaer: "Explore works",
        fremhaevetStort: "assets/til-salg/07-naar-verden-sover.webp",
        fremhaevetStortId: "naar-verden-sover",
        fremhaevetRundt: "assets/til-salg/08-against-all-odds.webp",
        fremhaevetRundtId: "against-all-odds"
    },

    tilSalgSektion: {
        overtitel: "In the studio now",
        overskrift: "Available Paintings",
        intro: "My current original works painted in acrylic on canvas. Click any painting for full-screen viewing, zoom, wall-scale preview, or inquiries."
    },

    tilSalg: [
        {
            id: "naar-verden-sover",
            filnavn: "assets/til-salg/07-naar-verden-sover.webp",
            titel: "Når verden sover",
            status: "reserved",
            statusTekst: "Reserved for exhibition",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "against-all-odds",
            filnavn: "assets/til-salg/08-against-all-odds.webp",
            titel: "Against All Odds",
            status: "reserved",
            statusTekst: "Reserved for exhibition",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "fantasiens-land",
            filnavn: "assets/til-salg/01-rund-maane-bjerge.webp",
            titel: "Fantasiens land",
            pris: "1.000 DKK (~€135)",
            medium: "Acrylic on canvas",
            maal: "Ø 40 cm",
            shape: "round"
        },
        {
            id: "i-maaneskinnet",
            filnavn: "assets/til-salg/02-turkis-skov-so-clean.webp",
            titel: "I måneskinnet",
            pris: "2.400 DKK (~€320)",
            medium: "Acrylic on canvas",
            maal: "40 × 50 cm",
            shape: "rect"
        },
        {
            id: "pink-sky",
            filnavn: "assets/til-salg/03-lyseroede-skyer-maane.webp",
            titel: "Pink Sky",
            pris: "3.000 DKK (~€400)",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "boelgen",
            filnavn: "assets/til-salg/04-havboelger-maane.webp",
            titel: "Bølgen",
            pris: "3.500 DKK (~€470)",
            medium: "Acrylic on canvas",
            maal: "40 × 50 cm",
            shape: "rect"
        },
        {
            id: "i-mellemrummet",
            filnavn: "assets/til-salg/05-rund-birkeskov.webp",
            titel: "I mellemrummet",
            pris: "1.800 DKK (~€240)",
            medium: "Acrylic on canvas",
            maal: "Ø 40 cm",
            shape: "round"
        },
        {
            id: "vendepunktet",
            filnavn: "assets/til-salg/06-rund-gylden-kyst.webp",
            titel: "Vendepunktet",
            pris: "1.800 DKK (~€240)",
            medium: "Acrylic on canvas",
            maal: "Ø 40 cm",
            shape: "round"
        }
    ],

    citat: {
        tekst: "I paint nature as I feel it, not only as I see it. Fragments of nature that live in my imagination.",
        forfatter: "Julie Kofod"
    },

    solgteSektion: {
        overtitel: "Archive",
        overskrift: "Sold Works",
        intro: "A selection of my earlier acrylic paintings that have already found their homes."
    },

    solgte: [
        {
            id: "et-familieportraet",
            filnavn: "assets/solgt/solgt-01.webp",
            titel: "Et Familieportræt",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "min-fantasi-din-virkelighed",
            filnavn: "assets/solgt/solgt-03.webp",
            titel: "Min fantasi - din virkelighed",
            medium: "Acrylic on canvas",
            maal: "80 × 60 cm",
            shape: "rect"
        },
        {
            id: "nu-falmer-skoven",
            filnavn: "assets/solgt/solgt-06.webp",
            titel: "Nu falmer skoven trindt om land",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "efter-regnen",
            filnavn: "assets/solgt/solgt-07.webp",
            titel: "Efter Regnen",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "et-stykke-fantasi",
            filnavn: "assets/solgt/solgt-02.webp",
            titel: "Et stykke Fantasi",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "wishing-you-well",
            filnavn: "assets/solgt/solgt-04.webp",
            titel: "Wishing you well",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "en-stille-stund",
            filnavn: "assets/solgt/solgt-en-stille-stund.webp",
            titel: "En stille stund",
            medium: "Acrylic on canvas",
            maal: "Ø 40 cm",
            shape: "round"
        },
        {
            id: "de-sidste-straaler",
            filnavn: "assets/solgt/solgt-08.webp",
            titel: "De sidste stråler",
            medium: "Acrylic on canvas",
            maal: "30 × 40 cm",
            shape: "rect"
        },
        {
            id: "vejen-hjem",
            filnavn: "assets/solgt/solgt-09.webp",
            titel: "Vejen Hjem",
            medium: "Acrylic on canvas",
            maal: "80 × 100 cm",
            shape: "rect"
        },
        {
            id: "begyndelsen",
            filnavn: "assets/solgt/solgt-begyndelsen.webp",
            titel: "Begyndelsen",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "solgt-rund-skovsoe",
            filnavn: "assets/solgt/solgt-rund-uden-titel.webp",
            titel: "Untitled",
            medium: "Acrylic on canvas",
            maal: "Round canvas",
            shape: "round"
        },
        {
            id: "solgt-stenbro",
            filnavn: "assets/solgt/solgt-12.webp",
            titel: "Untitled",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect"
        },
        {
            id: "solgt-triptykon",
            filnavn: "assets/solgt/solgt-11.webp",
            titel: "Untitled (Triptych)",
            medium: "Acrylic on canvas",
            maal: "Triptych",
            shape: "rect"
        }
    ],

    om: {
        overtitel: "Behind the brush",
        overskrift: "About me",
        billede: "assets/solgt/solgt-07.webp",
        afsnit: [
            "I have always been creative — drawing and painting as far back as I can remember. I am a self-taught painter, yet I draw deeply on my understanding of light from my background and training as a photographer. Working with light is at the heart of every painting, because to me, light is what brings a canvas truly alive.",
            "Beyond being creative, I am very much an outdoor person. I grew up by Bøllingsø west of Silkeborg, spent my youth in Silkeborg and Aarhus, and have always sought refuge in nature. I know firsthand how healing nature can be for human grief, pain, restlessness, and unease — so whenever I feel out of balance, nature is where I turn. In every painting you will find a quiet piece of myself: when I paint, I seek to evoke, share, and feel that very same calm.",
            "I paint nature. Memories of the landscapes I grew up in near Silkeborg. The nature surrounding my home and studio in Lindenborg near Aalborg in Northern Jutland. Nature as I feel it, not only as I see it. Fragments of nature that live in my imagination."
        ],
        underskrift: "Julie Kofod"
    },

    kontakt: {
        overtitel: "Let's talk",
        overskrift: "Contact & Inquiries",
        tekst: "Interested in one of my paintings, a studio visit in Lindenborg near Aalborg (Denmark), or international shipping? Feel free to write or call — I would love to hear from you.",
        email: "juliekofodnielsen@gmail.com",
        telefon: "+45 23 20 04 48",
        telefonLink: "+4523200448",
        by: "Lindenborg, Gistrup · Aalborg, Denmark",
        instagramHandle: "@juliekofodart",
        instagramUrl: "https://www.instagram.com/juliekofodart/",
        formEndpoint: ""
    }
};
