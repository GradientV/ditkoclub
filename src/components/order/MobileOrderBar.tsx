// on phones the order summary sits below a long list, so once something is added
// this bar rides along the bottom of the screen with the count, total and a jump to it
import { useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { moneyExact, plural } from '@/lib/format';
import { useOrder } from './OrderContext';

export default function MobileOrderBar() {
    const { books, total } = useOrder();

    // while the bar shows, the page gets extra room at the bottom (see .has-order-bar in
    // index.css) so the bar never hides the end of the footer
    useEffect(() => {
        if (!books) return;
        document.documentElement.classList.add('has-order-bar');
        return () => document.documentElement.classList.remove('has-order-bar');
    }, [books]);

    if (!books) return null;
    return (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t-[3px] border-ink bg-pow-400 px-4 py-3 shadow-[0_-4px_0_0_rgb(0_0_0/0.15)] lg:hidden">
            <a href="#your-order" className="mx-auto flex max-w-xl items-center justify-between gap-3">
                <span className="condensed text-lg font-extrabold tracking-wide uppercase">
                    {plural(books, 'book')} · {moneyExact(total)}
                </span>
                <span className="condensed inline-flex items-center gap-1.5 border-[3px] border-ink bg-ink px-3 py-1.5 font-extrabold tracking-wide text-pow-300 uppercase">
                    Review order <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </span>
            </a>
        </div>
    );
}
