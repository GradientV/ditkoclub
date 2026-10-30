import { useSearchParams } from 'react-router';
import ContactBand from '@/components/ContactBand';
import PageHero from '@/components/PageHero';
import Seo from '@/components/Seo';
import AuthPanel from '@/components/collection/AuthPanel';
import HowToBuy from '@/components/collection/HowToBuy';
import SlabCard from '@/components/collection/SlabCard';
import { Balloon, SectionHeading } from '@/components/ui/Comic';
import Reveal from '@/components/ui/Reveal';
import { AVAILABLE, BOOKS, SOLD } from '@/data/books';
import { useHydrated } from '@/hooks/useHydrated';
import { cn } from '@/lib/cn';
import { collectionSchema, organizationSchema } from '@/lib/schema';

const FILTERS = [
    { id: 'all', label: 'All books', books: BOOKS },
    { id: 'available', label: 'Available', books: AVAILABLE },
    { id: 'sold', label: 'Sold', books: SOLD }
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

function isFilter(value: string | null): value is FilterId {
    return FILTERS.some((filter) => filter.id === value);
}

function Stats() {
    const rows = [
        { value: BOOKS.length, label: 'Signed books' },
        { value: AVAILABLE.length, label: 'Available now' },
        { value: SOLD.length, label: 'Already sold' }
    ];
    return (
        <div className="relative">
            <dl className="grid grid-cols-3 border-[3px] border-ink bg-white text-ink shadow-comic">
                {rows.map((row, i) => (
                    <div key={row.label} className={cn('flex flex-col-reverse px-3 py-5 text-center', i > 0 && 'border-l-[3px] border-ink')}>
                        <dt className="condensed mt-1 text-xs font-extrabold tracking-widest text-ink-soft uppercase">{row.label}</dt>
                        <dd className="font-display text-6xl leading-none text-crimson-600">{row.value}</dd>
                    </div>
                ))}
            </dl>
            <p className="condensed mt-4 border-[3px] border-ink bg-pow-200 px-4 py-2 text-center text-sm font-extrabold tracking-[0.14em] text-ink uppercase shadow-comic-sm">
                Every one CGC × JSA authenticated
            </p>
            <Balloon tail="left" className="mt-8 max-w-xs rotate-1">
                Click on a book for its description and price!
            </Balloon>
        </div>
    );
}

export default function Collection() {
    const hydrated = useHydrated();
    const [params, setParams] = useSearchParams();
    // the prerendered page always shows every book; a ?show= filter applies once the browser takes over
    const requested = params.get('show');
    const active: FilterId = hydrated && isFilter(requested) ? requested : 'all';
    const books = FILTERS.find((filter) => filter.id === active)?.books ?? BOOKS;

    const choose = (id: FilterId) => setParams(id === 'all' ? {} : { show: id }, { replace: true, preventScrollReset: true });

    return (
        <>
            <Seo page="collection" schema={[collectionSchema(), organizationSchema()]} />
            <PageHero
                eyebrow="First time offered"
                title="The Ditko"
                accent="Collection"
                web
                intro={
                    <p>
                        Books personally signed by Steve Ditko, among the most elusive signatures in comic collecting, including rare Spider-Man books signed by both Steve
                        Ditko and Stan Lee. For decades they remained hidden from the public. Now, for the first time, they’re being made available.
                    </p>
                }
                aside={<Stats />}
            />

            <section aria-labelledby="books-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <h2 id="books-title" className="font-display text-5xl tracking-wide">
                        {active === 'sold' ? 'Sold from the collection' : active === 'available' ? 'Available now' : 'Every book in the collection'}
                    </h2>
                    <div role="group" aria-label="Show books" className="flex flex-wrap gap-2">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter.id}
                                type="button"
                                aria-pressed={active === filter.id}
                                onClick={() => choose(filter.id)}
                                className={cn(
                                    'condensed border-[3px] border-ink px-4 py-2 text-[0.95rem] font-extrabold tracking-wide uppercase transition-transform',
                                    active === filter.id ? 'bg-ink text-pow-300 shadow-none' : 'bg-white shadow-comic-sm hover:-translate-y-0.5'
                                )}
                            >
                                {filter.label} <span className="opacity-70">({filter.books.length})</span>
                            </button>
                        ))}
                    </div>
                </div>

                <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {books.map((book, i) => (
                        <Reveal as="li" key={book.slug} delay={(i % 4) * 60}>
                            <SlabCard book={book} eager={i < 2} />
                        </Reveal>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="buying-title" className="border-t-[3px] border-ink bg-newsprint">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                    <SectionHeading id="buying-title" eyebrow="No checkout, just Darren" title="How buying works" />
                    <HowToBuy className="mt-12" light />
                </div>
            </section>

            <AuthPanel />
            <ContactBand title="Have your eye on a book?" balloon="Make me an offer!">
                <p>Most books are listed “or best offer.” Email or call Darren to ask about one, or to make an offer.</p>
            </ContactBand>
        </>
    );
}
