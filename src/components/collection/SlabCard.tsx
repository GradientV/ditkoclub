// one signed book in the grid: the slab photo on newsprint, the grade, who signed it and the price.
// the whole card is one link to the book's page (the title link stretches over it).
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import { signers, type Book } from '@/data/books';
import { bookPath } from '@/data/pages';
import { cn } from '@/lib/cn';
import { GradeTile, PriceLine, StatusPill } from './SlabParts';

type Props = {
    book: Book;
    eager?: boolean;
    sizes?: string;
    /** h3 under a section heading; h2 when the grid is the page's main list */
    as?: 'h2' | 'h3';
    className?: string;
};

export default function SlabCard({ book, eager = false, sizes = '(min-width: 1280px) 290px, (min-width: 1024px) 23vw, (min-width: 640px) 45vw, 92vw', as: Heading = 'h3', className }: Props) {
    return (
        <article
            className={cn(
                'group relative flex h-full flex-col border-[3px] border-ink bg-white shadow-comic transition-[transform,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-comic-lg focus-within:-translate-x-1 focus-within:-translate-y-1 focus-within:shadow-comic-lg',
                className
            )}
        >
            <div className="slab-sheen relative bg-newsprint px-5 pt-5 pb-4">
                <div aria-hidden="true" className="halftone absolute inset-0 text-ink/[0.07]" />
                <Photo photo={book.photo} sizes={sizes} fit="contain" eager={eager} className="relative aspect-[4/5] w-full drop-shadow-[0_6px_10px_rgb(0_0_0/0.25)]" />
                <StatusPill book={book} className="absolute top-3 left-3" />
            </div>

            <div className="flex flex-1 flex-col gap-3 border-t-[3px] border-ink p-4">
                <div className="flex items-start gap-3">
                    <GradeTile book={book} />
                    <div className="min-w-0">
                        <Heading className="font-display text-[1.6rem] leading-[0.95] tracking-wide">
                            <Link to={bookPath(book)} className="outline-none after:absolute after:inset-0 after:content-['']">
                                {book.title}
                            </Link>
                        </Heading>
                        <p className="condensed mt-1 text-[0.82rem] font-bold tracking-wide text-ink-soft uppercase">
                            {book.publisher} · {book.date}
                        </p>
                    </div>
                </div>
                <p className="text-[0.95rem] text-ink-soft">
                    Signed by <strong className="text-ink">{signers(book)}</strong>
                </p>
                <div className="mt-auto flex items-end justify-between gap-2 border-t-2 border-dashed border-ink/20 pt-3">
                    <PriceLine book={book} />
                    <span aria-hidden="true" className="condensed inline-flex items-center gap-1 text-sm font-extrabold tracking-wide text-crimson-700 uppercase">
                        Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </article>
    );
}
