// small pieces shared by the collection grid and the book pages:
// the CGC-style grade tile, the status pill and the price line.
import { BadgeCheck } from 'lucide-react';
import type { Book } from '@/data/books';
import { money } from '@/lib/format';
import { cn } from '@/lib/cn';

/** the white grade box from the corner of a CGC label */
export function GradeTile({ book, size = 'sm', className }: { book: Book; size?: 'sm' | 'lg'; className?: string }) {
    const large = size === 'lg';
    return (
        <div
            className={cn(
                'flex shrink-0 flex-col items-center justify-center rounded-xl border-[3px] border-ink bg-white text-center shadow-comic-sm',
                large ? 'h-28 w-28 px-1' : 'h-14 w-14',
                className
            )}
        >
            <span className="sr-only">CGC grade </span>
            <span className={cn('condensed leading-none font-black tracking-tight', large ? 'text-5xl' : 'text-[1.65rem]')}>{book.grade}</span>
            {large && (
                <>
                    <span className="condensed mt-1 text-[0.7rem] leading-tight font-bold tracking-wide uppercase">{book.gradeName}</span>
                    <span className="condensed mt-0.5 text-[0.58rem] leading-tight font-semibold tracking-wide text-ink-soft uppercase">{book.pages} pages</span>
                </>
            )}
        </div>
    );
}

export function StatusPill({ book, className }: { book: Book; className?: string }) {
    const sold = book.status === 'sold';
    return (
        <span
            className={cn(
                'condensed inline-flex items-center gap-1 border-2 border-ink px-2 py-1 text-[0.78rem] leading-none font-extrabold tracking-[0.12em] uppercase shadow-comic-sm',
                sold ? 'bg-ink text-white' : 'bg-go-500 text-white',
                className
            )}
        >
            {!sold && <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />}
            {sold ? 'Sold' : 'Available'}
        </span>
    );
}

/** "$8,000 / or best offer", or for a sold book "Sold / listed at $38,000" */
export function PriceLine({ book, size = 'sm' }: { book: Book; size?: 'sm' | 'lg' }) {
    const large = size === 'lg';
    if (book.status === 'sold') {
        return (
            <div>
                <p className={cn('font-marker leading-none text-ink/70', large ? 'text-4xl' : 'text-xl')}>Sold</p>
                {book.price !== null && (
                    <p className={cn('condensed mt-1 font-bold tracking-wide text-ink-soft uppercase', large ? 'text-sm' : 'text-xs')}>Listed at {money(book.price)}</p>
                )}
            </div>
        );
    }
    return (
        <div>
            <p className={cn('font-marker leading-none text-crimson-700', large ? 'text-5xl' : 'text-2xl')}>{book.price !== null ? money(book.price) : 'Ask Darren'}</p>
            {book.obo && <p className={cn('condensed mt-1 font-bold tracking-wide text-ink-soft uppercase', large ? 'text-sm' : 'text-xs')}>or best offer</p>}
        </div>
    );
}
