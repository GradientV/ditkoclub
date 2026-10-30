// one signed book: the slab photo (zoomable), everything on its CGC label, the price,
// and the ways to ask Darren about it. drawn for every entry in src/data/books.ts.
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, ExternalLink, Mail, MessageSquareText, Phone, ZoomIn } from 'lucide-react';
import ContactBand from '@/components/ContactBand';
import Seo from '@/components/Seo';
import HowToBuy from '@/components/collection/HowToBuy';
import SlabCard from '@/components/collection/SlabCard';
import { GradeTile, PriceLine, StatusPill } from '@/components/collection/SlabParts';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { Caption } from '@/components/ui/Comic';
import Lightbox from '@/components/ui/Lightbox';
import Photo from '@/components/ui/Photo';
import { BOOKS, certUrl, getBook, signers, type Book } from '@/data/books';
import { bookPath, getBookPage } from '@/data/pages';
import { site } from '@/data/site';
import { money } from '@/lib/format';
import { mailto } from '@/lib/mailto';
import { bookSchema, breadcrumbSchema } from '@/lib/schema';
import NotFound from './NotFound';

function inquiry(book: Book): string {
    if (book.status === 'sold') {
        return mailto({
            subject: `The Ditko Collection: books like ${book.title}`,
            body: `Hi ${site.ownerFirst},\n\nI saw that ${book.title} (CGC ${book.grade}) from the Ditko Collection has sold. Do you have anything similar, or more signed Ditko books coming up?\n\nName:\nPhone:\n\nThanks!`
        });
    }
    const price = book.price !== null ? `, listed at ${money(book.price)}${book.obo ? ' or best offer' : ''}` : '';
    return mailto({
        subject: `The Ditko Collection: ${book.title} (CGC ${book.grade})`,
        body: `Hi ${site.ownerFirst},\n\nI’m interested in ${book.title} (CGC ${book.grade}, cert #${book.cert}) from the Ditko Collection${price}.\n\nMy question or offer:\n\nName:\nPhone:\n\nThanks!`
    });
}

function LabelDetails({ book }: { book: Book }) {
    const signedLine = book.signedBy.length > 1 ? `${signers(book)} authenticated autographs` : `${signers(book)} authenticated autograph`;
    const rows: Array<[string, string | string[]]> = [
        ['Title on the label', book.labelTitle ?? book.title],
        ['Publisher', book.publisher],
        ['Cover date', book.date],
        ['Grade', `CGC ${book.grade} · ${book.gradeName}`],
        ['Page quality', `${book.pages} pages`],
        ['Autograph', signedLine],
        ...(book.provenance ? ([['Provenance', book.provenance]] as Array<[string, string]>) : []),
        ['Credits', book.credits],
        ...(book.keyNotes.length ? ([['Key notes', book.keyNotes]] as Array<[string, string[]]>) : []),
        ...(book.labelNote ? ([['Also on the label', book.labelNote]] as Array<[string, string]>) : [])
    ];

    return (
        <div className="border-[3px] border-ink bg-white shadow-comic">
            <p className="condensed flex items-center justify-between gap-3 bg-ink px-4 py-2 text-sm font-black tracking-wide text-white uppercase">
                <span>
                    CGC <span className="text-white/60">×</span> JSA <span className="font-marker text-pow-400 normal-case">Authentic Autograph</span>
                </span>
                <span className="font-mono text-xs tracking-normal text-white/70">#{book.cert}</span>
            </p>
            <dl className="divide-y-2 divide-dashed divide-ink/15 bg-pow-100 px-4">
                {rows.map(([label, value]) => (
                    <div key={label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                        <dt className="condensed text-sm font-extrabold tracking-wide text-ink-soft uppercase">{label}</dt>
                        <dd className="text-ink">
                            {Array.isArray(value) ? (
                                <ul className="space-y-1">
                                    {value.map((line) => (
                                        <li key={line}>{line}</li>
                                    ))}
                                </ul>
                            ) : (
                                value
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
            <a
                href={certUrl(book.cert)}
                target="_blank"
                rel="noopener noreferrer"
                className="condensed flex items-center justify-between gap-3 border-t-[3px] border-ink bg-white px-4 py-3 font-extrabold tracking-wide text-crimson-700 uppercase hover:bg-paper"
            >
                Verify cert #{book.cert} on CGC’s website
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
        </div>
    );
}

export default function BookPage() {
    const { slug = '' } = useParams();
    const book = getBook(slug);
    const [zoom, setZoom] = useState<number | null>(null);

    if (!book) return <NotFound />;

    const page = getBookPage(book);
    const sold = book.status === 'sold';
    const index = BOOKS.indexOf(book);
    const previous = BOOKS[(index - 1 + BOOKS.length) % BOOKS.length];
    const next = BOOKS[(index + 1) % BOOKS.length];
    // more to look at: available books first, never this one
    const more = [...BOOKS.filter((other) => other.status === 'available'), ...BOOKS.filter((other) => other.status === 'sold')].filter((other) => other !== book).slice(0, 4);

    return (
        <>
            <Seo
                page={page}
                schema={[
                    bookSchema(book),
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: site.collection, path: '/collection' },
                        { name: book.title, path: bookPath(book) }
                    ])
                ]}
            />

            <nav aria-label="Breadcrumb" className="border-b-[3px] border-ink bg-newsprint">
                <ol className="condensed mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 text-sm font-bold tracking-wide uppercase sm:px-6">
                    <li>
                        <Link to="/" className="hover:text-crimson-700">
                            Home
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                        <Link to="/collection" className="hover:text-crimson-700">
                            {site.collection}
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page" className="text-crimson-700">
                        {book.title}
                    </li>
                </ol>
            </nav>

            <section className="relative overflow-hidden">
                <div aria-hidden="true" className="halftone absolute inset-y-0 left-0 w-full text-ink/[0.05] lg:w-1/2" />
                <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <div className="relative border-[3px] border-ink bg-newsprint p-5 shadow-comic-lg sm:p-8">
                            <button
                                type="button"
                                onClick={() => setZoom(0)}
                                className="group block w-full cursor-zoom-in"
                                aria-label={`Zoom in on the photo of ${book.title}`}
                            >
                                <Photo photo={book.photo} sizes="(min-width: 1024px) 520px, 92vw" priority fit="contain" className="mx-auto max-h-[78vh] w-full drop-shadow-[0_10px_16px_rgb(0_0_0/0.3)]" />
                                <span className="condensed absolute right-4 bottom-4 inline-flex items-center gap-1.5 border-[3px] border-ink bg-pow-400 px-3 py-1.5 text-sm font-extrabold tracking-wide uppercase shadow-comic-sm transition-transform group-hover:-translate-y-0.5">
                                    <ZoomIn className="h-4 w-4" aria-hidden="true" /> Zoom
                                </span>
                            </button>
                            <StatusPill book={book} className="absolute top-4 left-4" />
                        </div>
                    </div>

                    <div>
                        <Caption>{sold ? 'Sold from the collection' : 'Available now'}</Caption>
                        <h1 className="mt-4 font-display text-6xl leading-[0.9] tracking-wide sm:text-7xl">{book.title}</h1>
                        <p className="condensed mt-3 text-lg font-bold tracking-wide text-ink-soft uppercase">
                            {book.publisher} · {book.date}
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-6">
                            <GradeTile book={book} size="lg" />
                            <div className="space-y-2">
                                <p className="text-lg">
                                    Signed by <strong>{signers(book)}</strong>
                                </p>
                                {book.provenance && <p className="text-ink-soft">{book.provenance}</p>}
                                <PriceLine book={book} size="lg" />
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <ButtonAnchor href={inquiry(book)} variant={sold ? 'white' : 'crimson'} size="lg">
                                <Mail className="h-5 w-5" aria-hidden="true" /> {sold ? 'Ask about similar books' : 'Email Darren about this book'}
                            </ButtonAnchor>
                            <ButtonAnchor href={`tel:${site.phone.tel}`} variant="white" size="lg">
                                <Phone className="h-5 w-5" aria-hidden="true" /> {site.phone.display}
                            </ButtonAnchor>
                            {!sold && (
                                <ButtonLink to={`/contact?book=${book.slug}`} variant="white" size="lg">
                                    <MessageSquareText className="h-5 w-5" aria-hidden="true" /> Message form
                                </ButtonLink>
                            )}
                        </div>
                        {sold && (
                            <p className="mt-4 text-ink-soft">
                                This one has found a home.{' '}
                                <Link to="/collection?show=available" className="font-semibold text-crimson-700 underline underline-offset-2">
                                    See the books still available
                                </Link>
                                .
                            </p>
                        )}

                        <div className="mt-10">
                            <h2 className="font-display text-4xl tracking-wide">About this book</h2>
                            <p className="mt-3 text-lg leading-relaxed text-ink-soft">{book.about}</p>
                        </div>

                        <div className="mt-10">
                            <h2 className="mb-4 font-display text-4xl tracking-wide">On the label</h2>
                            <LabelDetails book={book} />
                        </div>
                    </div>
                </div>
            </section>

            {!sold && (
                <section aria-labelledby="buy-title" className="border-t-[3px] border-ink bg-newsprint">
                    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
                        <h2 id="buy-title" className="font-display text-5xl tracking-wide">
                            How buying works
                        </h2>
                        <HowToBuy className="mt-10" light />
                    </div>
                </section>
            )}

            <section aria-labelledby="more-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <h2 id="more-title" className="font-display text-5xl tracking-wide">
                        More from the collection
                    </h2>
                    <div className="flex gap-2">
                        <ButtonLink to={bookPath(previous)} variant="white" size="sm" aria-label={`Previous book: ${previous.title}`}>
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Previous
                        </ButtonLink>
                        <ButtonLink to={bookPath(next)} variant="white" size="sm" aria-label={`Next book: ${next.title}`}>
                            Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </ButtonLink>
                    </div>
                </div>
                <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                    {more.map((other) => (
                        <li key={other.slug}>
                            <SlabCard book={other} />
                        </li>
                    ))}
                </ul>
            </section>

            <ContactBand title={sold ? 'Looking for a signed Ditko?' : 'Want this one?'} balloon={sold ? 'Ask me what’s coming!' : 'Make me an offer!'} />

            <Lightbox items={[{ photo: book.photo, title: book.title, caption: `CGC ${book.grade} · signed by ${signers(book)}` }]} index={zoom} onChange={setZoom} />
        </>
    );
}
