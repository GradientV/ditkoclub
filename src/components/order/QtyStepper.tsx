// "Add" until a title is on the order, then − 2 + to change how many
import { Minus, Plus } from 'lucide-react';
import { MAX_QTY } from '@/lib/order';
import { cn } from '@/lib/cn';
import { useOrder } from './OrderContext';

const square = 'grid h-10 w-10 place-items-center border-[3px] border-ink bg-white shadow-comic-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none disabled:opacity-40 disabled:hover:translate-y-0';

export default function QtyStepper({ id, title, className }: { id: string; title: string; className?: string }) {
    const { qtyOf, step } = useOrder();
    const qty = qtyOf(id);

    if (qty === 0) {
        return (
            <button
                type="button"
                onClick={() => step(id, 1)}
                aria-label={`Add ${title} to your order`}
                className={cn(
                    'condensed inline-flex h-10 items-center gap-1.5 border-[3px] border-ink bg-pow-400 px-4 text-[0.95rem] font-extrabold tracking-wide uppercase shadow-comic-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none',
                    className
                )}
            >
                <Plus className="h-4 w-4" aria-hidden="true" /> Add
            </button>
        );
    }

    return (
        <div role="group" aria-label={`How many of ${title}`} className={cn('inline-flex items-center gap-1.5', className)}>
            <button type="button" onClick={() => step(id, -1)} aria-label={qty === 1 ? `Remove ${title} from your order` : `One fewer ${title}`} className={square}>
                <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="grid h-10 min-w-10 place-items-center border-[3px] border-ink bg-ink px-2 font-display text-2xl leading-none text-pow-300" aria-label={`${qty} on your order`}>
                {qty}
            </span>
            <button type="button" onClick={() => step(id, 1)} aria-label={`One more ${title}`} disabled={qty >= MAX_QTY} className={square}>
                <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
        </div>
    );
}
