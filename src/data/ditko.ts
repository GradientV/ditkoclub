// Steve Ditko's story for the About page. every fact here is from his Wikipedia biography
// (checked October 2026), the CGC labels on the club's books, or the public-domain
// covers' Wikimedia Commons records.
import type { PhotoKey } from './photos';

export type TimelineEntry = {
    year: string;
    title: string;
    text: string;
    /** a public-domain image, or one of the club's own signed books (by slug) */
    photo?: PhotoKey;
    book?: string;
    /** a link to a page on this site */
    link?: { to: string; label: string };
};

export const TIMELINE: TimelineEntry[] = [
    {
        year: '1927',
        title: 'Born in Johnstown, Pennsylvania',
        text: 'Stephen John Ditko was born on November 2, 1927. His father’s love of newspaper strips like Prince Valiant got him hooked on comics early.'
    },
    {
        year: '1950',
        title: 'Art school in New York',
        text: 'On the G.I. Bill, he studied under Batman artist Jerry Robinson at the Cartoonists and Illustrators School, today’s School of Visual Arts.'
    },
    {
        year: '1953',
        title: 'The first pages',
        text: 'His first published story, “Paper Romance,” ran in Daring Love #1. He inked in the Simon & Kirby studio and began a long run at Charlton.'
    },
    {
        year: '1954',
        title: 'Charlton horror',
        text: 'Ditko drew covers and stories for Charlton’s horror, mystery and science-fiction books, like The Thing #12.',
        photo: 'theThing12'
    },
    {
        year: '1960',
        title: 'Captain Atom',
        text: 'Captain Atom, co-created by Ditko, makes his debut in Space Adventures #33.',
        photo: 'spaceAdventures33'
    },
    {
        year: '1962',
        title: 'Spider-Man',
        text: 'Ditko and Stan Lee introduce Spider-Man in Amazing Fantasy #15. Ditko designs the costume and draws the first 38 issues of The Amazing Spider-Man. A year later, Doctor Strange arrives in Strange Tales.',
        book: 'amazing-spider-man-25'
    },
    {
        year: '1966',
        title: 'Exit from Marvel',
        text: 'Amazing Spider-Man #38 is his last issue. Back at Charlton he revamps the Blue Beetle, creates the Question, and introduces Nightshade in Captain Atom #82.',
        photo: 'captainAtom82'
    },
    {
        year: '1967',
        title: 'Mr. A',
        text: 'Free of the Comics Code, Ditko introduces Mr. A in Wally Wood’s independent witzend #3: a hero with no gray areas.'
    },
    {
        year: '1968',
        title: 'The Creeper & the Question',
        text: 'At DC: the Creeper in Showcase #73, then Hawk and Dove. At Charlton, the Question headlines Mysterious Suspense #1.',
        photo: 'mysteriousSuspense'
    },
    {
        year: '1973',
        title: 'Publishing on his own terms',
        text: 'A Mr. A comic and Avenging World, Ditko’s own work through small publishers. Signed copies of both are part of the Ditko Collection.',
        book: 'mr-a-1973',
        link: { to: '/collection/mr-a-1973', label: 'See the signed Mr. A' }
    },
    {
        year: '1985',
        title: 'Static',
        text: 'Ditko’s hero Static headlines Charlton Action, story, cover and art by Ditko. Robin Snyder, his editor at Charlton, would publish Ditko’s solo work for decades.',
        book: 'static-12',
        link: { to: '/collection/static-12', label: 'See the signed Static #12' }
    },
    {
        year: '1990s',
        title: 'Halls of fame',
        text: 'Inducted into the Jack Kirby Hall of Fame in 1990 and the Will Eisner Award Hall of Fame in 1994.'
    },
    {
        year: '2008',
        title: 'The 32-page books',
        text: 'With Robin Snyder, Ditko starts a run of 32-page comics with The Avenging Mind and Ditko, etc… Many are still on Darren’s order list.',
        link: { to: '/ditko-books', label: 'Order Ditko books' }
    },
    {
        year: '2018',
        title: 'The final page',
        text: 'Steve Ditko died in New York City in late June 2018, at 90. In 2024 he was named a Disney Legend.'
    }
];
