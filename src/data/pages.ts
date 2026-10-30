// every page the site has, in one list: the fixed pages plus one page per signed book.
// App.tsx builds the routes from it, <Seo /> builds canonical links from it,
// and scripts/prerender.ts writes one HTML file per page plus sitemap.xml from it.
//
// adding a page: one entry here, one component in src/pages, and one line in
// PAGE_COMPONENTS (App.tsx). book pages appear by themselves from src/data/books.ts.
import { money } from '@/lib/format';
import { AVAILABLE, BOOKS, signers, type Book } from './books';
import { CATALOG, LOWEST_PRICE } from './catalog';
import { SITE_URL } from './site';

export type StaticPageId = 'home' | 'collection' | 'ditkoBooks' | 'pressRoom' | 'conventions' | 'about' | 'contact' | 'privacy' | 'terms' | 'accessibility';

export type ShareImage = { path: string; width: number; height: number; alt: string };

export type Page = {
    id: string;
    path: string;
    title: string;
    description: string;
    /** the picture for link previews, when it isn't the site-wide one */
    image?: ShareImage;
    /** sitemap hints */
    priority: number;
    changefreq: 'weekly' | 'monthly' | 'yearly';
    lastmod: string;
};

const UPDATED = '2026-10-30';
const fromPrice = money(Math.min(...AVAILABLE.map((book) => book.price ?? Infinity)));

export const STATIC_PAGES: Array<Page & { id: StaticPageId }> = [
    {
        id: 'home',
        path: '/',
        title: 'Ditko Club | Comics Signed by Steve Ditko, Ditko Books & Comic Pressing',
        description: `The Ditko Collection: comics personally signed by Steve Ditko, CGC × JSA authenticated and offered for the first time. Plus out-of-print Steve Ditko and Robin Snyder books from ${money(LOWEST_PRICE)}, and comic pressing at $15 a book.`,
        priority: 1,
        changefreq: 'weekly',
        lastmod: UPDATED
    },
    {
        id: 'collection',
        path: '/collection',
        title: 'The Ditko Collection | Comics Signed by Steve Ditko (CGC × JSA)',
        description: `First time offered: comics personally signed by Steve Ditko, including Spider-Man books signed by Ditko and Stan Lee. Every one CGC graded with a CGC × JSA Authentic Autograph label. Available now from ${fromPrice}.`,
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: UPDATED
    },
    {
        id: 'ditkoBooks',
        path: '/ditko-books',
        title: 'Order Out-of-Print Steve Ditko & Robin Snyder Books | Ditko Club',
        description: `${CATALOG.length} out-of-print Steve Ditko titles from Robin Snyder: Avenging World, The Mocker, Mr. A, the 32-page Ditko books and more, from ${money(LOWEST_PRICE)}. Build your order and email it to Darren.`,
        priority: 0.9,
        changefreq: 'monthly',
        lastmod: UPDATED
    },
    {
        id: 'pressRoom',
        path: '/press-room',
        title: 'Comic Book Pressing & Cleaning, $15 a Book | The Press Room at Ditko Club',
        description:
            'Careful comic pressing: light cleaning, a humidity chamber if needed, and two 15-minute SEAL dry mount presses, each followed by a 24-hour cold press. $15 per book; deep cleaning $25–$150.',
        priority: 0.8,
        changefreq: 'monthly',
        lastmod: UPDATED
    },
    {
        id: 'conventions',
        path: '/conventions',
        title: 'Comic Conventions | Where to Find Ditko Club',
        description:
            'Ditko Club’s 2026 shows: South Carolina Comic Con, HeroesCon, Empire Comic Fest and New York Comic Con. Drop off your books for pressing at the show.',
        priority: 0.6,
        changefreq: 'monthly',
        lastmod: UPDATED
    },
    {
        id: 'about',
        path: '/about',
        title: 'Steve Ditko & Ditko Club | Why a Ditko Signature Is So Rare',
        description:
            'Steve Ditko (1927–2018) co-created Spider-Man and Doctor Strange and almost never gave interviews or made appearances. His story through the decades, and the club behind the Ditko Collection.',
        priority: 0.7,
        changefreq: 'yearly',
        lastmod: UPDATED
    },
    {
        id: 'contact',
        path: '/contact',
        title: 'Contact Darren Ford | Ditko Club',
        description: 'Questions about a signed Ditko book, a Ditko book order or pressing? Call (330) 647-5628 or email darren@ditkoclub.com.',
        priority: 0.6,
        changefreq: 'yearly',
        lastmod: UPDATED
    },
    {
        id: 'privacy',
        path: '/privacy',
        title: 'Privacy Policy | Ditko Club',
        description: 'How the Ditko Club website handles your information, in plain English.',
        priority: 0.2,
        changefreq: 'yearly',
        lastmod: UPDATED
    },
    {
        id: 'terms',
        path: '/terms',
        title: 'Terms of Use | Ditko Club',
        description: 'The basics of using the Ditko Club website: listings, prices, orders and pressing.',
        priority: 0.2,
        changefreq: 'yearly',
        lastmod: UPDATED
    },
    {
        id: 'accessibility',
        path: '/accessibility',
        title: 'Accessibility | Ditko Club',
        description: 'Our commitment to an accessible website, and how to reach us if something gets in your way.',
        priority: 0.2,
        changefreq: 'yearly',
        lastmod: UPDATED
    }
];

export function bookPath(book: Book): string {
    return `/collection/${book.slug}`;
}

function bookPage(book: Book): Page {
    const status = book.status === 'sold' ? 'Sold' : book.price ? `${money(book.price)}${book.obo ? ' or best offer' : ''}` : 'Available';
    return {
        id: `book:${book.slug}`,
        path: bookPath(book),
        title: `${book.title} Signed by ${signers(book)}, CGC ${book.grade} | The Ditko Collection`,
        description: `${status}. ${book.title} (${book.publisher}, ${book.date}), CGC ${book.grade} ${book.gradeName} with a CGC × JSA Authentic Autograph label: signed by ${signers(book)}.${book.provenance ? ` ${book.provenance}.` : ''}`,
        image: { path: `/og/${book.slug}.jpg`, width: 1200, height: 630, alt: `${book.title} signed by ${signers(book)}, CGC ${book.grade}` },
        priority: book.status === 'available' ? 0.8 : 0.5,
        changefreq: 'monthly',
        lastmod: UPDATED
    };
}

export const PAGES: Page[] = [...STATIC_PAGES, ...BOOKS.map(bookPage)];

export function getPage(id: StaticPageId): Page {
    const page = STATIC_PAGES.find((candidate) => candidate.id === id);
    if (!page) throw new Error(`unknown page: ${id}`);
    return page;
}

export function getBookPage(book: Book): Page {
    return bookPage(book);
}

/** the full address of a path, for canonical links and the sitemap */
export function absoluteUrl(path: string): string {
    return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
