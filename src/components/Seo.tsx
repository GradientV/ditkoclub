// the <head> tags for one page: title, description, the canonical address and what
// a shared link looks like.
//
// every page renders one <Seo /> at its top. React 19 moves <title>, <meta> and <link>
// into <head> by itself, wherever they're rendered, and swaps them on navigation.
// scripts/prerender.ts bakes the same tags into each HTML file at build time, so
// crawlers and link previews that don't run JavaScript see them too.
import { absoluteUrl, getPage, type Page, type StaticPageId } from '@/data/pages';
import { SHARE_IMAGE } from '@/data/photos';
import { SITE_URL, site } from '@/data/site';

type Props = {
    /** a fixed page, or a whole page entry (the book pages) */
    page?: StaticPageId | Page;
    /** only for the 404 page, which isn't in the page list */
    title?: string;
    description?: string;
    schema?: object | object[];
};

export default function Seo({ page, title, description, schema }: Props) {
    if (!page) {
        return (
            <>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="robots" content="noindex, follow" />
            </>
        );
    }

    const entry = typeof page === 'string' ? getPage(page) : page;
    const url = absoluteUrl(entry.path);
    const share = entry.image ?? SHARE_IMAGE;
    const image = `${SITE_URL}${share.path}`;

    return (
        <>
            <title>{entry.title}</title>
            <meta name="description" content={entry.description} />
            <link rel="canonical" href={url} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={site.name} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:title" content={entry.title} />
            <meta property="og:description" content={entry.description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content={String(share.width)} />
            <meta property="og:image:height" content={String(share.height)} />
            <meta property="og:image:alt" content={share.alt} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={entry.title} />
            <meta name="twitter:description" content={entry.description} />
            <meta name="twitter:image" content={image} />

            {/* "<" is escaped so nothing inside the data can close the script tag early */}
            {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />}
        </>
    );
}
