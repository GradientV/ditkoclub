// every photo on the site, with its alt text in one place.
// - collection/ and pressing/: Ditko Club's own photos, from the old ditkoclub.com
// - brand/mascot: cut from the header art on Darren's order form
// - ditko/: public domain, via Wikimedia Commons (credits in RESEARCH.md and the footer)
// files live in public/images; run `npm run images` after adding new ones.

export type PhotoInfo = {
    src: string;
    alt: string;
    /** focal point for object-position when the photo is cropped, e.g. '50% 30%' */
    focus?: string;
};

export const PHOTOS = {
    mascot: {
        src: '/images/brand/mascot.webp',
        alt: 'The Ditko Club mascot: an artist with an ink-bottle head and round glasses, a brush in each hand, behind a yellow banner reading “A Steve Ditko Special! 64 pages”'
    },

    // the Ditko Collection
    mrA: {
        src: '/images/collection/mr-a.webp',
        alt: 'Mr. A (1973) sealed in a CGC × JSA Authentic Autograph slab graded 8.5, signed on the cover by Steve Ditko'
    },
    static11: {
        src: '/images/collection/static-11.webp',
        alt: 'Charlton Action: Featuring Static #11 (1985) in a CGC × JSA Authentic Autograph slab graded 9.2, signed on the cover by Steve Ditko'
    },
    static12: {
        src: '/images/collection/static-12.webp',
        alt: 'Charlton Action: Featuring Static #12 (1985) in a CGC × JSA Authentic Autograph slab graded 9.8, signed in blue ink near the top of the cover by Steve Ditko'
    },
    wha3: {
        src: '/images/collection/wha-3.webp',
        alt: '…Wha…!? Ditko’s H. Series (1975) in a CGC × JSA Authentic Autograph slab graded 7.5, signed across the top of the cover “Steve Ditko 85”'
    },
    asm38: {
        src: '/images/collection/amazing-spider-man-38.webp',
        alt: 'Amazing Spider-Man #38 in a CGC × JSA Authentic Autograph slab graded 7.0, signed on the cover by Stan Lee and by Steve Ditko, with a SOLD stamp across the photo'
    },
    asm25: {
        src: '/images/collection/amazing-spider-man-25.webp',
        alt: 'Amazing Spider-Man #25 in a CGC × JSA Authentic Autograph slab graded 0.5, signed by Steve Ditko and Stan Lee, with a SOLD stamp across the photo'
    },
    asm34: {
        src: '/images/collection/amazing-spider-man-34.webp',
        alt: 'Amazing Spider-Man #34 in a CGC × JSA Authentic Autograph slab graded 0.5, signed on the cover by Steve Ditko, with a SOLD stamp across the photo'
    },
    showcase73: {
        src: '/images/collection/showcase-73.webp',
        alt: 'Showcase #73, the first appearance of the Creeper, in a CGC × JSA Authentic Autograph slab graded 3.5, signed by Steve Ditko, with a SOLD stamp across the photo'
    },
    avengingWorld: {
        src: '/images/collection/avenging-world.webp',
        alt: 'Avenging World by Ditko (1973) in a CGC × JSA Authentic Autograph slab graded 7.0, signed by Steve Ditko, with a SOLD stamp across the photo'
    },
    safestPlace: {
        src: '/images/collection/the-safest-place.webp',
        alt: 'The Safest Place (2008) in a CGC × JSA Authentic Autograph slab graded 9.8, signed by Steve Ditko, with a SOLD stamp across the photo'
    },

    // the Press Room: before and after
    pressDaredevil: {
        src: '/images/pressing/daredevil-1-regrade.webp',
        alt: 'Daredevil #1 in a CGC slab graded 6.0, with its old CGC 4.0 label from before pressing laid on top'
    },
    pressBatman: {
        src: '/images/pressing/batman-adventures-12.webp',
        alt: 'Batman Adventures #12 raw on a cutting mat before pressing, next to the same book back from CGC graded 9.8'
    },
    pressAsm129: {
        src: '/images/pressing/amazing-spider-man-129.webp',
        alt: 'Amazing Spider-Man #129 before and after pressing: waves and bends on the left, flat on the right'
    },
    pressSuspense: {
        src: '/images/pressing/tales-of-suspense.webp',
        alt: 'The top of a Tales of Suspense cover featuring Iron Man, rippled before pressing and flat after'
    },
    pressCorner: {
        src: '/images/pressing/silver-age-corner.webp',
        alt: 'The top corner of a 1960s comic, wavy and creased along the edge before pressing and flat after'
    },
    pressStain: {
        src: '/images/pressing/green-lantern-stain.webp',
        alt: 'A Green Lantern cover detail before and after: the stain in the middle of the cover is gone after cleaning'
    },
    pressBackCover: {
        src: '/images/pressing/back-cover-ad.webp',
        alt: 'A vintage back-cover ad for wallet photos, wrinkled before pressing and smooth after'
    },
    pressFlash: {
        src: '/images/pressing/flash-139.webp',
        alt: 'The Flash #139 before and after pressing, side by side'
    },
    pressAsm5: {
        src: '/images/pressing/amazing-spider-man-5.webp',
        alt: 'The top corner of Amazing Spider-Man #5 before and after pressing'
    },

    // Steve Ditko: public domain
    ditko1959: {
        src: '/images/ditko/steve-ditko-1959.webp',
        alt: 'Steve Ditko at his drawing table in his studio, November 1959, glasses on and pages spread out in front of him',
        focus: '55% 45%'
    },
    theThing12: {
        src: '/images/ditko/the-thing-12.webp',
        alt: 'Cover of The Thing #12 (Charlton, February 1954), a horror cover drawn and signed by Steve Ditko'
    },
    spaceAdventures33: {
        src: '/images/ditko/space-adventures-33.webp',
        alt: 'Cover of Space Adventures #33 (Charlton, March 1960) introducing Captain Atom, drawn by Steve Ditko'
    },
    captainAtom82: {
        src: '/images/ditko/captain-atom-82.webp',
        alt: 'Cover of Captain Atom #82 (Charlton, September 1966), “How do you catch a ghost?”, introducing Nightshade, drawn by Steve Ditko'
    },
    mysteriousSuspense: {
        src: '/images/ditko/mysterious-suspense-1.webp',
        alt: 'Cover of Mysterious Suspense #1 (Charlton, October 1968), “Return of the Question,” drawn and signed by Steve Ditko'
    }
} satisfies Record<string, PhotoInfo>;

export type PhotoKey = keyof typeof PHOTOS;

/** the picture shown when a link to the site is shared (made by `npm run brand`) */
export const SHARE_IMAGE = {
    path: '/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'The Ditko Collection at Ditko Club: comics signed by Steve Ditko'
};
