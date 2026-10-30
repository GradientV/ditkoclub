// builds /llms.txt: a plain-text summary of Ditko Club for AI assistants and crawlers,
// written from the same data as the site so the two never disagree.
// scripts/prerender.ts writes it into dist/ at build time.
import { BOOKS, signers } from '@/data/books';
import { CATALOG, CATALOG_DATE, SHIPPING_USA } from '@/data/catalog';
import { CONVENTIONS, CONVENTIONS_YEAR, formatDates } from '@/data/conventions';
import { PAGES, STATIC_PAGES, absoluteUrl, bookPath } from '@/data/pages';
import { PRESS_PRICE } from '@/data/pressing';
import { ONE_LINER, site } from '@/data/site';
import { money } from './format';

export function llmsTxt(): string {
    const lines: string[] = [];
    lines.push(`# ${site.name}`);
    lines.push('');
    lines.push(
        `> ${site.name} (ditkoclub.com) is run by ${site.owner} in ${site.town}. ${ONE_LINER} Phone: ${site.phone.display}. Email: ${site.email}. Payment: ${site.payments.map((p) => `${p.name} ${p.handle}`).join(', ')}.`
    );
    lines.push('');
    lines.push('## Pages');
    lines.push('');
    for (const page of STATIC_PAGES) lines.push(`- [${page.title.split(' | ')[0]}](${absoluteUrl(page.path)}): ${page.description}`);
    lines.push('');
    lines.push(`## ${site.collection}`);
    lines.push('');
    lines.push('Comics personally signed by Steve Ditko, each in a CGC holder with a CGC × JSA Authentic Autograph label. To buy one, contact Darren by email or phone.');
    lines.push('');
    for (const book of BOOKS) {
        const price = book.status === 'sold' ? `SOLD${book.price !== null ? ` (listed at ${money(book.price)})` : ''}` : `${book.price !== null ? money(book.price) : 'price on request'}${book.obo ? ' or best offer' : ''}`;
        lines.push(
            `- [${book.title}](${absoluteUrl(bookPath(book))}): ${book.publisher}, ${book.date}. CGC ${book.grade} ${book.gradeName}, signed by ${signers(book)}${book.provenance ? `, ${book.provenance.toLowerCase()}` : ''}. CGC cert ${book.cert}. ${price}.`
        );
    }
    lines.push('');
    lines.push('## Out-of-print Ditko books');
    lines.push('');
    lines.push(
        `${CATALOG.length} titles from Steve Ditko and Robin Snyder, priced from Darren’s ${CATALOG_DATE} order form. Shipping in the USA is ${money(SHIPPING_USA)} per order. Inventory changes, so contact Darren first; he bills you once the order is pulled from inventory.`
    );
    lines.push('');
    for (const item of CATALOG) lines.push(`- ${item.title}${item.year ? ` (${item.year})` : ''}: ${money(item.price)}${item.cover ? ` (cover price ${money(item.cover)})` : ''}`);
    lines.push('');
    lines.push(`## ${site.pressRoom} (comic pressing)`);
    lines.push('');
    lines.push(
        `Pressing and light cleaning is ${money(PRESS_PRICE)} per book: light dry cleaning, a humidity chamber if needed, a 15-minute press in a SEAL dry mount press then a 24-hour cold press, flipped and repeated (at least 48 hours in the press). Deep cleaning to reduce foxing and stains is $25–$150 per book, with a free review first. Send books with the press form to ${site.address.name}, ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}, or drop them off at a convention.`
    );
    lines.push('');
    lines.push(`## Conventions (${CONVENTIONS_YEAR})`);
    lines.push('');
    for (const show of CONVENTIONS) lines.push(`- ${show.name}: ${formatDates(show)}, ${show.venue}, ${show.city}`);
    lines.push('');
    lines.push(`Pages in total: ${PAGES.length}.`);
    lines.push('');
    return lines.join('\n');
}
