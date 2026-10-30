// structured data (schema.org JSON-LD) so search engines understand the club, each signed
// book (with its price and whether it's sold), the pressing service and the Ditko Books list.
import { BOOKS, signers, type Book } from '@/data/books';
import { CATALOG } from '@/data/catalog';
import { absoluteUrl, bookPath } from '@/data/pages';
import { PHOTOS, SHARE_IMAGE } from '@/data/photos';
import { PRESS_PRICE } from '@/data/pressing';
import { ONE_LINER, SITE_URL, site } from '@/data/site';

const ORG_ID = `${SITE_URL}/#org`;
const TEL = '+1-330-647-5628';

export function organizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': ORG_ID,
        name: site.name,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/icon-512.png`,
        image: `${SITE_URL}${SHARE_IMAGE.path}`,
        description: ONE_LINER,
        email: site.email,
        telephone: TEL,
        address: {
            '@type': 'PostalAddress',
            addressLocality: site.address.city,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country
        },
        contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', telephone: TEL, email: site.email, areaServed: 'US' }
    };
}

export function websiteSchema() {
    return { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: `${SITE_URL}/`, publisher: { '@id': ORG_ID } };
}

export function bookSchema(book: Book) {
    const url = absoluteUrl(bookPath(book));
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${book.title} signed by ${signers(book)} (CGC ${book.grade})`,
        description: book.about,
        image: `${SITE_URL}${PHOTOS[book.photo].src}`,
        sku: book.cert,
        category: 'Signed comic books',
        brand: { '@type': 'Brand', name: book.publisher },
        additionalProperty: [
            { '@type': 'PropertyValue', name: 'CGC grade', value: `${book.grade} ${book.gradeName}` },
            { '@type': 'PropertyValue', name: 'Signed by', value: signers(book) },
            { '@type': 'PropertyValue', name: 'CGC certification number', value: book.cert }
        ],
        ...(book.price !== null && {
            offers: {
                '@type': 'Offer',
                url,
                price: book.price,
                priceCurrency: 'USD',
                availability: book.status === 'sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/UsedCondition',
                seller: { '@id': ORG_ID }
            }
        })
    };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((step, i) => ({ '@type': 'ListItem', position: i + 1, name: step.name, item: absoluteUrl(step.path) }))
    };
}

export function collectionSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: site.collection,
        numberOfItems: BOOKS.length,
        itemListElement: BOOKS.map((book, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(bookPath(book)), name: book.title }))
    };
}

export function catalogSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'Out-of-print Steve Ditko and Robin Snyder books',
        url: absoluteUrl('/ditko-books'),
        itemListElement: CATALOG.map((item) => ({
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'USD',
            seller: { '@id': ORG_ID },
            itemOffered: { '@type': 'Book', name: item.title, author: { '@type': 'Person', name: 'Steve Ditko' } }
        }))
    };
}

export function pressingSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: site.pressRoom,
        serviceType: 'Comic book pressing and cleaning',
        provider: { '@id': ORG_ID },
        areaServed: 'US',
        url: absoluteUrl('/press-room'),
        offers: [
            { '@type': 'Offer', name: 'Pressing & light cleaning (per book)', price: PRESS_PRICE, priceCurrency: 'USD' },
            {
                '@type': 'Offer',
                name: 'Deep cleaning (per book)',
                priceSpecification: { '@type': 'PriceSpecification', minPrice: 25, maxPrice: 150, priceCurrency: 'USD' }
            }
        ]
    };
}
