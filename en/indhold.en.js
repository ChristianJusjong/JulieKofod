// =============================================================================
// INDHOLD.EN.JS — English content for Julie Kofod's Artist Portfolio
// =============================================================================

window.ASSET_PREFIX = "../";

window.UI_STRINGS = {
    filterAll: "All",
    filterRound: "Round (Tondo)",
    filterRect: "Rectangular",
    badgeSale: "Available",
    badgeSold: "Sold",
    ctaViewWork: "View work",
    ariaViewSale: (t) => `View ${t} in full screen`,
    ariaViewSold: (t) => `View archived artwork: ${t}`,
    altSuffix: "original acrylic painting by Danish artist Julie Kofod",
    commissionSubject: "Commission inquiry",
    commissionBody: "Hi Julie,\n\nI love your paintings and would love to hear more about commissioning a custom artwork.\n\nBest regards,",
    inquireSaleBtn: "Inquire about this artwork",
    inquireSoldBtn: "Inquire about a similar piece",
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
        titel: "Julie Kofod — Danish Painter | Original Acrylic Paintings & Commissions",
        beskrivelse: "Discover original acrylic paintings on canvas, round tondo artworks, dreamy Nordic landscapes, and custom commissions by Danish artist Julie Kofod in Northern Jutland near Aalborg.",
        logo: "assets/logo.webp",
        footerTekst: "© 2026 Julie Kofod · Lindenborg, Gistrup · Aalborg, Denmark"
    },

    hero: {
        overtitel: "Original Art · Lindenborg, Denmark",
        titel: "Nature, light, and colors from imagination",
        tekst: "Welcome to my colorful universe. I paint acrylic on canvas with a special focus on light — memories of nature, calm in moments of unrest, and fragments of landscapes that live in my imagination.",
        knapPrimaer: "Meet the artist",
        knapSekundaer: "Explore works",
        fremhaevetStort: "assets/til-salg/03-lyseroede-skyer-maane.webp",
        fremhaevetStortId: "pink-sky",
        fremhaevetRundt: "assets/til-salg/01-rund-maane-bjerge.webp",
        fremhaevetRundtId: "fantasiens-land"
    },

    tilSalgSektion: {
        overtitel: "In the studio now",
        overskrift: "Available Paintings",
        intro: "All currently available original works — hand-painted in acrylic on canvas. Click any painting for full-screen viewing, zoom, wall-scale preview, or inquiries."
    },

    tilSalg: [
        {
            id: "fantasiens-land",
            filnavn: "assets/til-salg/01-rund-maane-bjerge.webp",
            titel: "Fantasiens land (Land of Imagination)",
            pris: "1.000 DKK (~€135)",
            medium: "Acrylic on canvas",
            maal: "Ø 40 cm",
            shape: "round",
            beskrivelse: "Round original tondo painting with a dreamy rose-lilac sky, full moon above the mountains, and vibrant turquoise texture."
        },
        {
            id: "i-maaneskinnet",
            filnavn: "assets/til-salg/02-turkis-skov-so-clean.webp",
            titel: "I måneskinnet (In the Moonlight)",
            pris: "2.400 DKK (~€320)",
            medium: "Acrylic on canvas",
            maal: "40 × 50 cm",
            shape: "rect",
            beskrivelse: "Soft moonlight breaks through hanging branches and reflects in a deep emerald and turquoise forest lake."
        },
        {
            id: "pink-sky",
            filnavn: "assets/til-salg/03-lyseroede-skyer-maane.webp",
            titel: "Pink Sky",
            pris: "3.000 DKK (~€400)",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "A wide, captivating skyscape filled with blush pink, lavender, and deep violet cloud formations lit by the evening sun."
        },
        {
            id: "boelgen",
            filnavn: "assets/til-salg/04-havboelger-maane.webp",
            titel: "Bølgen (The Wave)",
            pris: "3.500 DKK (~€470)",
            medium: "Acrylic on canvas",
            maal: "40 × 50 cm",
            shape: "rect",
            beskrivelse: "Powerful, foaming blue ocean waves rolling toward the shore beneath a dramatic dusk sky and a glowing full moon."
        },
        {
            id: "i-mellemrummet",
            filnavn: "assets/til-salg/05-rund-birkeskov.webp",
            titel: "I mellemrummet (In the Space Between)",
            pris: "1.800 DKK (~€240)",
            medium: "Acrylic on canvas",
            maal: "Ø 40 cm",
            shape: "round",
            beskrivelse: "Round textured painting of a quiet clearing among white birch trunks, golden autumn leaves, and moss-covered stones."
        },
        {
            id: "vendepunktet",
            filnavn: "assets/til-salg/06-rund-gylden-kyst.webp",
            titel: "Vendepunktet (The Turning Point)",
            pris: "1.800 DKK (~€240)",
            medium: "Acrylic on canvas",
            maal: "Ø 40 cm",
            shape: "round",
            beskrivelse: "Round impasto painting in warm golden sand tones, subtle metallic highlights, and deep coastal blue around a calm wave."
        }
    ],

    citat: {
        tekst: "I paint nature as I feel it, not only as I see it. Fragments of nature that live in my imagination.",
        forfatter: "Julie Kofod"
    },

    solgteSektion: {
        overtitel: "Archive",
        overskrift: "Sold Works",
        intro: "A curated selection of earlier acrylic paintings that have already found their homes. If a mood or color palette speaks to you, I would love to create a custom commissioned piece.",
        bestillingTekst: "Dreaming of a personal painting in a similar style or your own favorite colors?",
        bestillingKnap: "Inquire about a commission"
    },

    solgte: [
        {
            id: "min-fantasi-din-virkelighed",
            filnavn: "assets/solgt/solgt-03.webp",
            titel: "Min fantasi - din virkelighed",
            medium: "Acrylic on canvas",
            maal: "80 × 60 cm",
            shape: "rect",
            beskrivelse: "A floating wildflower island drifting through deep rose, blue, and violet clouds."
        },
        {
            id: "nu-falmer-skoven",
            filnavn: "assets/solgt/solgt-06.webp",
            titel: "Nu falmer skoven trindt om land",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Floating birch woodland with golden autumn foliage against a deep petrol-blue night sky."
        },
        {
            id: "efter-regnen",
            filnavn: "assets/solgt/solgt-07.webp",
            titel: "Efter Regnen (After the Rain)",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "A tiny hummingbird by a floating forest edge glowing in coral red and sky-blue sunset tones."
        },
        {
            id: "et-stykke-fantasi",
            filnavn: "assets/solgt/solgt-02.webp",
            titel: "Et stykke Fantasi (A Piece of Imagination)",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "A floating tree beneath the full moon in warm golden and turquoise hues."
        },
        {
            id: "wishing-you-well",
            filnavn: "assets/solgt/solgt-04.webp",
            titel: "Wishing you well",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "A fairytale wishing well perched on its own floating island bathed in golden light."
        },
        {
            id: "en-stille-stund",
            filnavn: "assets/solgt/solgt-en-stille-stund.webp",
            titel: "En stille stund (A Quiet Moment)",
            medium: "Acrylic on canvas",
            maal: "Ø 40 cm",
            shape: "round",
            beskrivelse: "Round painting of a serene, moonlit forest lake surrounded by silver birch trees."
        },
        {
            id: "de-sidste-straaler",
            filnavn: "assets/solgt/solgt-08.webp",
            titel: "De sidste stråler (The Last Rays)",
            medium: "Acrylic on canvas",
            maal: "30 × 40 cm",
            shape: "rect",
            beskrivelse: "Sunbeams breaking through the treetops in deep forest greens and warm golden light."
        },
        {
            id: "vejen-hjem",
            filnavn: "assets/solgt/solgt-09.webp",
            titel: "Vejen Hjem (The Way Home)",
            medium: "Acrylic on canvas",
            maal: "80 × 100 cm",
            shape: "rect",
            beskrivelse: "An open garden gate and winding path across an old stone bridge in morning mist and lavender light."
        },
        {
            id: "begyndelsen",
            filnavn: "assets/solgt/solgt-begyndelsen.webp",
            titel: "Begyndelsen (The Beginning)",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "A lush, light-filled woodland path drawing the eye toward a low, glowing sun."
        },
        {
            id: "solgt-rund-skovsoe",
            filnavn: "assets/solgt/solgt-rund-uden-titel.webp",
            titel: "Untitled",
            medium: "Acrylic on canvas",
            maal: "Round canvas",
            shape: "round",
            beskrivelse: "Atmospheric round landscape in charcoal, warm gold, and amber reflections by a quiet lake."
        },
        {
            id: "solgt-stenbro",
            filnavn: "assets/solgt/solgt-12.webp",
            titel: "Untitled",
            medium: "Acrylic on canvas",
            maal: "60 × 80 cm",
            shape: "rect",
            beskrivelse: "Evocative landscape featuring an old stone bridge, golden light, and rich palette-knife texture."
        },
        {
            id: "solgt-triptykon",
            filnavn: "assets/solgt/solgt-11.webp",
            titel: "Untitled (Triptych)",
            medium: "Acrylic on canvas",
            maal: "Triptych",
            shape: "rect",
            beskrivelse: "Three-panel painting of a long wooden boardwalk through misty waters with a soaring bird of prey."
        },
        {
            id: "valmuer-i-luften",
            filnavn: "assets/solgt/solgt-01.webp",
            titel: "Valmuer i Luften (Poppies in the Air)",
            medium: "Acrylic on canvas",
            maal: "Square canvas",
            shape: "rect",
            beskrivelse: "Delicate blush poppies resting on a floating island in soft sand and earth tones."
        }
    ],

    om: {
        overtitel: "The artist behind the brush",
        overskrift: "About Julie",
        billede: "assets/solgt/solgt-07.webp",
        afsnit: [
            "I have always been creative — drawing and painting as far back as I can remember. I am a self-taught painter, yet I draw deeply on my understanding of light from my background and training as a photographer. Working with light is at the heart of every painting, because to me, light is what brings a canvas truly alive.",
            "Beyond being creative, I am very much an outdoor person. I grew up by Bøllingsø west of Silkeborg, spent my youth in Silkeborg and Aarhus, and have always sought refuge in nature. I know firsthand how healing nature can be for human grief, pain, restlessness, and unease — so whenever I feel out of balance, nature is where I turn. In every painting you will find a quiet piece of myself: when I paint, I seek to evoke, share, and feel that very same calm.",
            "I paint nature. Memories of the landscapes I grew up in near Silkeborg. The nature surrounding my home and studio in Lindenborg near Aalborg in Northern Jutland. Nature as I feel it, not only as I see it. Fragments of nature that live in my imagination."
        ],
        underskrift: "— Julie Kofod"
    },

    kontakt: {
        overtitel: "Let's talk",
        overskrift: "Contact & Inquiries",
        tekst: "Interested in an available painting, a studio visit in Lindenborg near Aalborg (Denmark), international shipping, or a custom commission? Feel free to write or call — I would love to hear from you.",
        email: "juliekofodnielsen@gmail.com",
        telefon: "+45 23 20 04 48",
        telefonLink: "+4523200448",
        by: "Lindenborg, Gistrup · Aalborg, Denmark",
        instagramHandle: "@juliekofodart",
        instagramUrl: "https://www.instagram.com/juliekofodart/",
        formEndpoint: ""
    }
};
