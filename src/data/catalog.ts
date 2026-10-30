// the out-of-print Ditko books on Darren's order form (Ditkoclub_blankorder, May 4, 2026),
// in the form's own order. `cover` is the printed cover price, `price` is Ditko Club's price,
// both straight from the form. inventory changes all the time, so the site always says
// to check with Darren before paying.
//
// a new title: add a line. a price change: edit `price`. sold out: delete the line.
// keep public/forms/ditko-club-order-form.(pdf|xlsx) in step with this list.

export const CATALOG_DATE = 'May 4, 2026';

/** flat shipping per order inside the USA, from the order form */
export const SHIPPING_USA = 8;

export type CatalogItem = {
    id: string;
    title: string;
    year?: number;
    pages?: number;
    edition?: string;
    note?: string;
    /** printed cover price, when the form lists one */
    cover: number | null;
    price: number;
};

export const CATALOG: CatalogItem[] = [
    { id: '160-page-package', title: '160 Page Package', cover: 12, price: 12 },
    { id: 'public-service-package', title: 'The Ditko Public Service Package', edition: '2nd Edition', note: 'Reprint of the 1991 book', cover: 14, price: 16 },
    { id: 'the-mocker', title: 'The Mocker', edition: '2nd Edition', year: 2000, pages: 112, note: 'Chapters 1 to 10, plus more', cover: 15, price: 18 },
    { id: 'avenging-world-2002', title: 'Avenging World', year: 2002, pages: 240, note: 'Classic comics, essays and more, 1969–2002', cover: null, price: 69 },
    { id: 'the-avenging-mind', title: 'The Avenging Mind', year: 2008, pages: 32, note: 'New and reprint essays, illustrations', cover: null, price: 9 },
    { id: 'wha-h-series', title: '…Wha…!? Ditko’s H. Series', edition: '2nd Edition', year: 2011, note: 'Reprint of the 1975 comic', cover: 4, price: 6 },
    { id: 'ditko-etc', title: 'Ditko, etc…', year: 2008, pages: 32, note: 'All-new', cover: 4, price: 6 },
    { id: 'ditko-continued', title: 'Ditko Continued…', year: 2008, pages: 32, note: 'All-new, with Mr. A', cover: 4, price: 6 },
    { id: 'oh-no-not-again-ditko', title: 'Oh, No! Not Again, Ditko', year: 2009, pages: 32, note: 'All-new, with Mr. A', cover: 4, price: 6 },
    { id: 'ditko-presents', title: 'Ditko Presents', year: 2009, pages: 32, note: 'All-new', cover: 4, price: 6 },
    { id: 'ditko-once-more', title: 'Ditko Once More', year: 2009, pages: 32, note: 'All-new', cover: 4, price: 6 },
    { id: 'tsk-tsk', title: 'Tsk! Tsk!', cover: null, price: 10 },
    { id: 'ditko-5-five-act', title: 'Ditko #5: Five Act', year: 2010, pages: 32, note: 'All-new', cover: 4, price: 6 },
    { id: 'act-8', title: 'Act 8', year: 2011, pages: 32, note: 'All-new', cover: 4, price: 6 },
    { id: 'a-ditko-14', title: 'A Ditko #14', year: 2011, pages: 32, note: 'All-new', cover: 4, price: 6 },
    { id: 'sixteen-16', title: '#16: Sixteen', year: 2012, pages: 32, note: 'All-new', cover: 4, price: 6 },
    { id: 'ditko-23', title: 'Ditko #23', cover: 4, price: 6 },
    { id: 'ditko-24', title: 'Ditko #24', cover: 4, price: 6 },
    { id: 'ditko-25', title: 'Ditko #25', cover: 4, price: 6 },
    { id: 'out-of-this-world-20', title: 'Ditko: Out of This World #20', year: 2016, note: 'Color cover', cover: 5, price: 6 },
    { id: 'mr-a-15', title: 'Mr. A #15', year: 2014, cover: 4, price: 6 },
    { id: 'mr-a-50th-anniversary-21', title: 'Mr. A 50th Anniversary Special #21', year: 2017, cover: 5, price: 6 },
    { id: 'murder-22', title: 'Murder #22', year: 2017, cover: 5, price: 3 },
    { id: 'the-hero-comics-23', title: 'The Hero Comics #23', year: 2017, cover: 5, price: 3 },
    { id: 'mr-a-24', title: 'Mr. A #24', year: 2017, cover: 5, price: 6 },
    { id: 'ditko-26', title: 'Ditko #26', cover: 5, price: 6 },
    { id: 'steve-ditkos-mr-a-7', title: 'Steve Ditko’s Mr. A #7', year: 2018, pages: 48, note: 'New and reprint', cover: 5, price: 6 },
    { id: 'steve-ditkos-hero-26', title: 'Steve Ditko’s Hero #26', year: 2018, pages: 48, note: 'New and reprint', cover: 5, price: 3 },
    { id: 'konga-25', title: 'Konga #25', cover: 5, price: 3 },
    { id: 'hero-comics-29', title: 'Hero Comics #29', year: 2019, cover: 5, price: 3 }
];

export type CatalogTag = 'mr-a' | 'big' | 'deal' | 'reprint';

export const TAG_LABELS: Record<CatalogTag, string> = {
    'mr-a': 'Mr. A',
    big: 'Big book',
    deal: 'Under cover price',
    reprint: 'Reprint'
};

/** tags worked out from the form's own wording, so they stay right when a line changes */
export function tagsFor(item: CatalogItem): CatalogTag[] {
    const tags: CatalogTag[] = [];
    const text = `${item.title} ${item.note ?? ''}`;
    if (/Mr\. A/.test(text)) tags.push('mr-a');
    if ((item.pages ?? 0) >= 100 || /Package/.test(item.title)) tags.push('big');
    if (item.cover !== null && item.price < item.cover) tags.push('deal');
    if (/reprint/i.test(item.note ?? '') && !/new and reprint/i.test(item.note ?? '')) tags.push('reprint');
    return tags;
}

/** "2008 · 32 pages · All-new, with Mr. A" */
export function itemDetails(item: CatalogItem): string {
    return [item.edition, item.year, item.pages ? `${item.pages} pages` : null, item.note].filter(Boolean).join(' · ');
}

export function getItem(id: string): CatalogItem | undefined {
    return CATALOG.find((item) => item.id === id);
}

export const LOWEST_PRICE = Math.min(...CATALOG.map((item) => item.price));
