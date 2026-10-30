// "Ditko through the decades": one comic panel per moment, alternating sides on wide screens,
// with a public-domain cover or one of the club's own signed books where there is one.
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { StatusPill } from '@/components/collection/SlabParts';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { requireBook } from '@/data/books';
import { TIMELINE, type TimelineEntry } from '@/data/ditko';
import { bookPath } from '@/data/pages';
import { cn } from '@/lib/cn';

function Picture({ entry }: { entry: TimelineEntry }) {
    if (entry.book) {
        const book = requireBook(entry.book);
        return (
            <Link to={bookPath(book)} className="group relative block w-36 shrink-0 sm:w-44" aria-label={`${book.title}, from the Ditko Collection`}>
                <span className="block -rotate-2 border-[3px] border-ink bg-newsprint p-2 shadow-comic-sm transition-transform group-hover:rotate-0">
                    <Photo photo={book.photo} alt="" sizes="176px" fit="contain" className="aspect-[4/5] w-full" />
                </span>
                <StatusPill book={book} className="absolute -bottom-3 left-1/2 -translate-x-1/2" />
            </Link>
        );
    }
    if (entry.photo) {
        return (
            <span className="block w-36 shrink-0 rotate-2 border-[3px] border-ink bg-white p-1.5 shadow-comic-sm sm:w-44">
                <Photo photo={entry.photo} sizes="176px" className="aspect-[2/3] w-full" />
            </span>
        );
    }
    return null;
}

export default function Timeline() {
    return (
        <ol className="relative mt-14 space-y-10 before:absolute before:top-0 before:bottom-0 before:left-[1.35rem] before:w-[3px] before:bg-ink lg:before:left-1/2 lg:before:-translate-x-1/2">
            {TIMELINE.map((entry, i) => {
                const right = i % 2 === 1;
                const hasPicture = Boolean(entry.photo || entry.book);
                return (
                    <Reveal as="li" key={`${entry.year}-${entry.title}`} className="relative pl-14 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0">
                        <span
                            className="absolute top-3 left-0 z-10 grid h-11 min-w-11 place-items-center border-[3px] border-ink bg-pow-400 px-1.5 font-display text-lg leading-none shadow-comic-sm lg:left-1/2 lg:-translate-x-1/2"
                            aria-hidden="true"
                        >
                            {`’${entry.year.slice(2)}`}
                        </span>
                        <div className={cn('border-[3px] border-ink bg-white p-5 shadow-comic sm:p-6', right ? 'lg:col-start-2' : 'lg:col-start-1')}>
                            <div className={cn('flex gap-5', hasPicture ? 'flex-col sm:flex-row sm:items-start' : '')}>
                                <div className="min-w-0 flex-1">
                                    <p className="condensed text-sm font-extrabold tracking-widest text-crimson-700 uppercase">{entry.year}</p>
                                    <h3 className="mt-1 font-display text-3xl leading-none tracking-wide">{entry.title}</h3>
                                    <p className="mt-2 text-ink-soft">{entry.text}</p>
                                    {entry.link && (
                                        <Link to={entry.link.to} className="condensed mt-3 inline-flex items-center gap-1.5 font-extrabold tracking-wide text-crimson-700 uppercase hover:underline">
                                            {entry.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                        </Link>
                                    )}
                                </div>
                                <Picture entry={entry} />
                            </div>
                        </div>
                    </Reveal>
                );
            })}
        </ol>
    );
}
