// everything about Ditko Club that shows up in more than one place:
// names, contact details, payment handles, the downloadable forms, the menu.
// change it here and every page follows.

/** the address the site lives at: canonical links, the sitemap, social previews, structured data */
export const SITE_URL = 'https://ditkoclub.com';

export const site = {
    name: 'Ditko Club',
    collection: 'The Ditko Collection',
    pressRoom: 'The Press Room',
    owner: 'Darren Ford',
    ownerFirst: 'Darren',
    /** the line under the mascot on Darren's order form */
    tagline: 'Your source for all comics from Steve Ditko and Robin Snyder',
    town: 'North Lima, Ohio',
    /**
     * the mailing address from the press form. it's only shown where people need it
     * (sending books in for pressing), never in the header or footer
     */
    address: {
        name: 'Ditko Club Comic Pressing',
        street: '75 E Pine Lake Rd',
        city: 'North Lima',
        region: 'OH',
        postalCode: '44452',
        country: 'US'
    },
    phone: { display: '(330) 647-5628', tel: '+13306475628' },
    email: 'darren@ditkoclub.com',
    /** printed on the press form */
    payments: [
        { name: 'Venmo', handle: '@Ditkoclub' },
        { name: 'Zelle', handle: 'darren@ditkoclub.com' },
        { name: 'Cash App', handle: '$ditkoclub' }
    ],
    /** Darren's own forms, re-hosted from the old site */
    forms: {
        orderPdf: '/forms/ditko-club-order-form.pdf',
        orderXlsx: '/forms/ditko-club-order-form.xlsx',
        pressPdf: '/forms/ditko-club-press-form.pdf'
    }
} as const;

export type NavItem = { to: string; label: string; blurb: string };

export const nav: NavItem[] = [
    { to: '/collection', label: 'The Collection', blurb: 'Signed by Steve Ditko' },
    { to: '/ditko-books', label: 'Ditko Books', blurb: 'Out of print, ready to order' },
    { to: '/press-room', label: 'Pressing', blurb: 'The Press Room' },
    { to: '/conventions', label: 'Conventions', blurb: 'Find us at the show' },
    { to: '/about', label: 'About', blurb: 'Steve Ditko & the club' },
    { to: '/contact', label: 'Contact', blurb: 'Talk to Darren' }
];

/** one line used in the footer, llms.txt and structured data */
export const ONE_LINER =
    'Books personally signed by Steve Ditko and authenticated by CGC × JSA, out-of-print comics from Steve Ditko and Robin Snyder, and careful comic pressing, from Darren Ford in North Lima, Ohio.';

/** the scrolling strip above the footer */
export const ticker = [
    'Signed by Steve Ditko',
    'CGC × JSA authenticated',
    'Out-of-print Ditko & Robin Snyder books',
    'Pressing from $15 a book',
    'Two 24-hour presses for every book',
    'Drop off at the show'
];
