// the Ditko Collection: every signed book, as its CGC label describes it.
//
// grades, page quality, signatures, provenance, credits, key notes and cert numbers are
// copied from the labels in Darren's photos. prices and SOLD/available come from the old
// ditkoclub.com listings. the "about" paragraphs are written for this site from those
// facts plus Ditko's documented career.
//
// selling a book: set status to 'sold'. new book: add an entry, drop the slab photo in
// public/images/collection, run `npm run images`, and add it to src/data/photos.ts.
//
// only type imports in this file: scripts/brand-assets.ts reads it directly with Node.
import type { PhotoKey } from './photos';

export type Book = {
    slug: string;
    title: string;
    /** the title exactly as CGC printed it, when that differs */
    labelTitle?: string;
    publisher: string;
    /** the cover date on the label, spelled out */
    date: string;
    year: number;
    grade: string;
    /** CGC's name for the grade */
    gradeName: string;
    pages: 'White' | 'Off-white to white';
    signedBy: string[];
    provenance?: string;
    /** the left side of the label: who did what */
    credits: string[];
    /** the right side of the label */
    keyNotes: string[];
    /** anything else on the label, like missing pages */
    labelNote?: string;
    cert: string;
    status: 'available' | 'sold';
    /** asking price in dollars, or null when the old site didn't list one */
    price: number | null;
    /** listed "or best offer" */
    obo: boolean;
    photo: PhotoKey;
    about: string;
};

export const BOOKS: Book[] = [
    {
        slug: 'mr-a-1973',
        title: 'Mr. A',
        labelTitle: 'Mr. A #nn',
        publisher: 'Comic Art Publishers',
        date: '1973',
        year: 1973,
        grade: '8.5',
        gradeName: 'Very Fine+',
        pages: 'White',
        signedBy: ['Steve Ditko'],
        provenance: 'From the collection of Steve Ditko',
        credits: ['Steve Ditko stories, cover & art'],
        keyNotes: [],
        cert: '4757336001',
        status: 'available',
        price: 8000,
        obo: true,
        photo: 'mrA',
        about: 'Mr. A was Ditko’s own hero, first seen in Wally Wood’s independent witzend #3 in 1967: a crusader who saw no gray areas between right and wrong. This 1973 Mr. A comic from Comic Art Publishers has Ditko’s stories, cover and art, and this copy comes from Steve Ditko’s own collection, signed on the cover.'
    },
    {
        slug: 'static-11',
        title: 'Charlton Action: Featuring Static #11',
        labelTitle: 'Charlton Action: Featuring Static #v2 #11',
        publisher: 'Charlton Comics',
        date: 'October 1985',
        year: 1985,
        grade: '9.2',
        gradeName: 'Near Mint-',
        pages: 'White',
        signedBy: ['Steve Ditko'],
        provenance: 'From the collection of Steve Ditko',
        credits: ['Steve Ditko story, cover & art'],
        keyNotes: [],
        cert: '4750033001',
        status: 'available',
        price: 4000,
        obo: true,
        photo: 'static11',
        about: 'Static is a Ditko creation, and in 1985 he headlined Charlton Action, with Ditko doing the story, the cover and the art. This copy comes from Steve Ditko’s own collection and is signed on the cover.'
    },
    {
        slug: 'static-12',
        title: 'Charlton Action: Featuring Static #12',
        labelTitle: 'Charlton Action: Featuring Static #v2 #12',
        publisher: 'Charlton Comics',
        date: 'December 1985',
        year: 1985,
        grade: '9.8',
        gradeName: 'Near Mint/Mint',
        pages: 'Off-white to white',
        signedBy: ['Steve Ditko'],
        provenance: 'From the collection of Steve Ditko',
        credits: ['Steve Ditko story, cover & art'],
        keyNotes: [],
        cert: '4750033003',
        status: 'available',
        price: 4000,
        obo: true,
        photo: 'static12',
        about: 'The follow-up to #11, in near mint/mint 9.8. Story, cover and art by Ditko. This copy comes from Steve Ditko’s own collection, signed in blue ink near the top of the cover.'
    },
    {
        slug: 'wha-3',
        title: '…Wha…!? #3',
        labelTitle: 'Wha!?! #3',
        publisher: 'Bruce Hershenson',
        date: '1975',
        year: 1975,
        grade: '7.5',
        gradeName: 'Very Fine-',
        pages: 'Off-white to white',
        signedBy: ['Steve Ditko'],
        provenance: 'From the collection of Steve Ditko',
        credits: ['Steve Ditko story, cover & art'],
        keyNotes: [],
        cert: '4750033004',
        status: 'available',
        price: 3000,
        obo: true,
        photo: 'wha3',
        about: 'Ditko’s 1975 comic …Wha…!? Ditko’s H. Series, published by Bruce Hershenson, with story, cover and art by Ditko. He and Robin Snyder brought it back as a second edition in 2011 (it’s on the Ditko Books list). This is an original 1975 copy from Steve Ditko’s own collection, signed “Steve Ditko 85” across the top of the cover.'
    },
    {
        slug: 'amazing-spider-man-38',
        title: 'Amazing Spider-Man #38',
        publisher: 'Marvel Comics',
        date: 'July 1966',
        year: 1966,
        grade: '7.0',
        gradeName: 'Fine/Very Fine',
        pages: 'Off-white to white',
        signedBy: ['Steve Ditko', 'Stan Lee'],
        provenance: 'From the collection of Mark S. Ditko',
        credits: ['Stan Lee and Steve Ditko story', 'Steve Ditko cover and art'],
        keyNotes: ['2nd cameo appearance of Mary Jane Watson (face still not shown)', 'Last Steve Ditko issue'],
        cert: '4750038003',
        status: 'sold',
        price: 38000,
        obo: false,
        photo: 'asm38',
        about: 'Ditko’s last issue of The Amazing Spider-Man. He drew the first 38 issues, plotted them from #25 on, and left Marvel in 1966. This copy is signed on the cover by both of Spider-Man’s co-creators, Steve Ditko and Stan Lee.'
    },
    {
        slug: 'amazing-spider-man-25',
        title: 'Amazing Spider-Man #25',
        publisher: 'Marvel Comics',
        date: 'June 1965',
        year: 1965,
        grade: '0.5',
        gradeName: 'Poor',
        pages: 'Off-white to white',
        signedBy: ['Steve Ditko', 'Stan Lee'],
        credits: ['Stan Lee story', 'Steve Ditko cover and art'],
        keyNotes: ['1st cameo appearance of Mary Jane Watson (face not shown)', '1st appearance of Professor Spencer Smythe and the Spider-Slayer'],
        labelNote: 'Pages 14 & 15 missing',
        cert: '4750038001',
        status: 'sold',
        price: 15000,
        obo: false,
        photo: 'asm25',
        about: 'The issue where Ditko began getting credit as plotter, with the first (faceless) glimpse of Mary Jane Watson and the debut of Spencer Smythe’s Spider-Slayer. It’s a low-grade copy with two pages missing, but it carries both creators’ signatures: Steve Ditko and Stan Lee.'
    },
    {
        slug: 'amazing-spider-man-34',
        title: 'Amazing Spider-Man #34',
        publisher: 'Marvel Comics',
        date: 'March 1966',
        year: 1966,
        grade: '0.5',
        gradeName: 'Poor',
        pages: 'Off-white to white',
        signedBy: ['Steve Ditko'],
        provenance: 'From the collection of Mark S. Ditko',
        credits: ['Stan Lee and Steve Ditko story', 'Steve Ditko cover and art'],
        keyNotes: ['2nd appearance of Gwen Stacy and Harry Osborn', 'Kraven appearance'],
        cert: '4750038002',
        status: 'sold',
        price: 9000,
        obo: false,
        photo: 'asm34',
        about: 'Kraven the Hunter is back in “The Thrill of the Hunt!”, with the second appearances of Gwen Stacy and Harry Osborn. Signed on the cover by Steve Ditko.'
    },
    {
        slug: 'showcase-73',
        title: 'Showcase #73',
        publisher: 'DC Comics',
        date: 'March–April 1968',
        year: 1968,
        grade: '3.5',
        gradeName: 'Very Good-',
        pages: 'Off-white to white',
        signedBy: ['Steve Ditko'],
        provenance: 'From the collection of Mark S. Ditko',
        credits: ['Steve Ditko and Don Segall story', 'Steve Ditko cover and art'],
        keyNotes: ['Origin and 1st appearance of the Creeper (Jack Ryder)'],
        cert: '4750038005',
        status: 'sold',
        price: null,
        obo: false,
        photo: 'showcase73',
        about: 'After leaving Marvel, Ditko co-created the Creeper for DC: TV personality Jack Ryder’s wild alter ego, introduced in this 1968 tryout issue. Signed on the cover by Steve Ditko.'
    },
    {
        slug: 'avenging-world-1973',
        title: 'Avenging World',
        labelTitle: 'Avenging World #nn',
        publisher: 'Bruce Hershenson',
        date: '1973',
        year: 1973,
        grade: '7.0',
        gradeName: 'Fine/Very Fine',
        pages: 'Off-white to white',
        signedBy: ['Steve Ditko'],
        provenance: 'From the collection of Steve Ditko',
        credits: ['Steve Ditko story, cover and art'],
        keyNotes: ['Wraparound cover'],
        cert: '4750038010',
        status: 'sold',
        price: 5000,
        obo: false,
        photo: 'avengingWorld',
        about: 'Ditko’s 1973 Avenging World, published by Bruce Hershenson with a wraparound cover, story and art by Ditko. He and Robin Snyder later used the title for a 240-page collection in 2002, which is on the Ditko Books list. From Steve Ditko’s own collection, signed on the cover.'
    },
    {
        slug: 'the-safest-place',
        title: 'The Safest Place',
        labelTitle: 'The Safest Place #nn',
        publisher: 'Image Comics',
        date: '2008',
        year: 2008,
        grade: '9.8',
        gradeName: 'Near Mint/Mint',
        pages: 'White',
        signedBy: ['Steve Ditko'],
        provenance: 'From the collection of Steve Ditko',
        credits: ['Victor Riches & Steven Grant story', 'Tom Mandrake cover & art'],
        keyNotes: [],
        cert: '4750033006',
        status: 'sold',
        price: 3500,
        obo: true,
        photo: 'safestPlace',
        about: 'A 2008 one-shot written by Victor Riches and Steven Grant, with cover and art by Tom Mandrake. This near mint/mint copy comes from Steve Ditko’s own collection and is signed on the cover.'
    }
];

export const AVAILABLE = BOOKS.filter((book) => book.status === 'available');
export const SOLD = BOOKS.filter((book) => book.status === 'sold');

export function getBook(slug: string): Book | undefined {
    return BOOKS.find((book) => book.slug === slug);
}

/** for slugs written into the code (featured books): a typo fails the build instead of a blank spot */
export function requireBook(slug: string): Book {
    const book = getBook(slug);
    if (!book) throw new Error(`no book with slug "${slug}" in src/data/books.ts`);
    return book;
}

/** 'Steve Ditko' or 'Steve Ditko & Stan Lee' */
export function signers(book: Book): string {
    return book.signedBy.join(' & ');
}

/** CGC's public lookup page for a cert number */
export function certUrl(cert: string): string {
    return `https://www.cgccomics.com/certlookup/${cert}/`;
}
