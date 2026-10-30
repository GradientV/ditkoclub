// Darren's order form as a list you can search, filter and add from
import { useId, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { CATALOG, TAG_LABELS, itemDetails, tagsFor, type CatalogTag } from '@/data/catalog';
import { cn } from '@/lib/cn';
import { money } from '@/lib/format';
import QtyStepper from './QtyStepper';

type Filter = 'all' | CatalogTag;

const FILTERS: Filter[] = ['all', 'mr-a', 'big', 'deal'];

/** lowercase letters and digits only, so "wha" finds "…Wha…!?" and "mr a" finds "Mr. A" */
const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const TAG_STYLES: Record<CatalogTag, string> = {
    'mr-a': 'bg-ink text-white',
    big: 'bg-cobalt-600 text-white',
    deal: 'bg-go-500 text-white',
    reprint: 'bg-newsprint text-ink'
};

export default function CatalogList() {
    const searchId = useId();
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState<Filter>('all');

    const counts = useMemo(() => {
        const result: Record<Filter, number> = { all: CATALOG.length, 'mr-a': 0, big: 0, deal: 0, reprint: 0 };
        for (const item of CATALOG) for (const tag of tagsFor(item)) result[tag] += 1;
        return result;
    }, []);

    const needle = normalize(query);
    const items = CATALOG.filter((item) => {
        if (filter !== 'all' && !tagsFor(item).includes(filter)) return false;
        if (!needle) return true;
        return normalize(`${item.title} ${itemDetails(item)}`).includes(needle);
    });

    return (
        <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <label htmlFor={searchId} className="sr-only">
                        Search the Ditko books
                    </label>
                    <Search className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
                    <input
                        id={searchId}
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search titles: Mr. A, Mocker, #23…"
                        className="w-full border-[3px] border-ink bg-white py-3 pr-11 pl-11 text-base shadow-comic-sm placeholder:text-ink/45 focus:bg-pow-100 focus:outline-none"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            aria-label="Clear search"
                            className="absolute top-1/2 right-2.5 grid h-8 w-8 -translate-y-1/2 place-items-center hover:text-crimson-700"
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>

            <div role="group" aria-label="Filter the list" className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
                {FILTERS.map((id) => (
                    <button
                        key={id}
                        type="button"
                        aria-pressed={filter === id}
                        onClick={() => setFilter(id)}
                        className={cn(
                            'condensed shrink-0 border-[3px] border-ink px-3.5 py-1.5 text-sm font-extrabold tracking-wide whitespace-nowrap uppercase',
                            filter === id ? 'bg-ink text-pow-300' : 'bg-white shadow-comic-sm hover:-translate-y-0.5'
                        )}
                    >
                        {id === 'all' ? 'Everything' : TAG_LABELS[id]} <span className="opacity-70">({counts[id]})</span>
                    </button>
                ))}
            </div>

            <p className="sr-only" aria-live="polite">
                {items.length === CATALOG.length ? '' : `${items.length} of ${CATALOG.length} titles shown`}
            </p>

            {items.length === 0 ? (
                <div className="mt-8 border-[3px] border-dashed border-ink/40 p-8 text-center">
                    <p className="font-letter text-2xl">Nothing matches “{query}”.</p>
                    <p className="mt-2 text-ink-soft">Try a shorter search, or ask Darren: his stock changes all the time.</p>
                </div>
            ) : (
                <ul className="mt-6 space-y-3">
                    {items.map((item) => {
                        const tags = tagsFor(item);
                        return (
                            <li key={item.id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 border-[3px] border-ink bg-white p-4 shadow-comic-sm sm:grid-cols-[1fr_auto_auto]">
                                <div className="min-w-0">
                                    <h3 className="font-display text-[1.65rem] leading-[1.02] tracking-wide">{item.title}</h3>
                                    {itemDetails(item) && <p className="mt-1 text-[0.95rem] text-ink-soft">{itemDetails(item)}</p>}
                                    {tags.length > 0 && (
                                        <ul className="mt-2 flex flex-wrap gap-1.5">
                                            {tags.map((tag) => (
                                                <li key={tag} className={cn('condensed border-2 border-ink px-1.5 py-0.5 text-[0.7rem] leading-none font-extrabold tracking-wider uppercase', TAG_STYLES[tag])}>
                                                    {TAG_LABELS[tag]}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="font-marker text-[1.7rem] leading-none text-crimson-700">{money(item.price)}</p>
                                    {item.cover !== null && <p className="condensed mt-1 text-xs font-bold tracking-wide whitespace-nowrap text-ink-soft uppercase">Cover {money(item.cover)}</p>}
                                </div>
                                <QtyStepper id={item.id} title={item.title} className="col-span-2 justify-self-end sm:col-span-1" />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
