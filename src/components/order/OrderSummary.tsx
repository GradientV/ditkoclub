// "Your order": what's on the list, the running total with US shipping, and the buttons
// that hand it to Darren (an email with everything filled in) or copy it.
import { useState } from 'react';
import { Check, Copy, Mail, Trash2, X } from 'lucide-react';
import { Button, ButtonAnchor } from '@/components/ui/Button';
import { Balloon } from '@/components/ui/Comic';
import { CATALOG_DATE } from '@/data/catalog';
import { site } from '@/data/site';
import { moneyExact, plural } from '@/lib/format';
import { mailto } from '@/lib/mailto';
import { orderText, priceLines } from '@/lib/order';
import { useOrder } from './OrderContext';

export default function OrderSummary() {
    const order = useOrder();
    const [copied, setCopied] = useState(false);
    const lines = priceLines(order.lines);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(orderText(order.lines));
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2200);
        } catch {
            // no clipboard access (old browser, or permission denied): the email button still works
        }
    };

    return (
        <aside id="your-order" aria-labelledby="order-title" className="scroll-mt-28 border-[3px] border-ink bg-white shadow-comic lg:sticky lg:top-28">
            <div className="flex items-center justify-between gap-3 bg-ink px-5 py-3 text-white">
                <h2 id="order-title" className="font-display text-3xl tracking-wide">
                    Your order
                </h2>
                <span className="condensed text-sm font-extrabold tracking-widest text-pow-300 uppercase">{plural(order.books, 'book')}</span>
            </div>

            {lines.length === 0 ? (
                <div className="px-5 py-8">
                    <Balloon tail="left">Hit “Add” on any title and it lands right here.</Balloon>
                    <p className="mt-8 text-sm text-ink-soft">
                        Your list stays on this device until you send it. Prices are from {site.ownerFirst}’s {CATALOG_DATE} order form.
                    </p>
                </div>
            ) : (
                <>
                    <ul className="max-h-[38vh] divide-y-2 divide-dashed divide-ink/15 overflow-y-auto px-5">
                        {lines.map((line) => (
                            <li key={line.id} className="flex items-start gap-3 py-3">
                                <span className="font-display text-xl leading-tight text-crimson-600">{line.qty}×</span>
                                <span className="min-w-0 flex-1 leading-snug">{line.item.title}</span>
                                <span className="font-semibold tabular-nums">{moneyExact(line.total)}</span>
                                <button
                                    type="button"
                                    onClick={() => order.setQty(line.id, 0)}
                                    aria-label={`Remove ${line.item.title}`}
                                    className="-mr-1 grid h-7 w-7 shrink-0 place-items-center text-ink-soft hover:text-crimson-700"
                                >
                                    <X className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <dl className="space-y-1.5 border-t-[3px] border-ink bg-pow-100 px-5 py-4">
                        <div className="flex justify-between gap-4">
                            <dt>Subtotal</dt>
                            <dd className="tabular-nums">{moneyExact(order.subtotal)}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                            <dt>Shipping (USA)</dt>
                            <dd className="tabular-nums">{moneyExact(order.shipping)}</dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink/20 pt-2">
                            <dt className="font-display text-2xl tracking-wide">Total</dt>
                            <dd className="font-marker text-3xl text-crimson-700 tabular-nums">{moneyExact(order.total)}</dd>
                        </div>
                    </dl>

                    <div className="grid gap-2.5 border-t-[3px] border-ink p-5">
                        <ButtonAnchor
                            href={mailto({ subject: `Ditko book order: ${plural(order.books, 'book')} (${moneyExact(order.total)})`, body: orderText(order.lines) })}
                            variant="crimson"
                            size="lg"
                        >
                            <Mail className="h-5 w-5" aria-hidden="true" /> Email my order to {site.ownerFirst}
                        </ButtonAnchor>
                        <div className="grid grid-cols-2 gap-2.5">
                            <Button onClick={copy} variant="white" size="sm">
                                {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                                {copied ? 'Copied!' : 'Copy order'}
                            </Button>
                            <Button onClick={order.clear} variant="white" size="sm">
                                <Trash2 className="h-4 w-4" aria-hidden="true" /> Clear
                            </Button>
                        </div>
                        <p className="text-sm text-ink-soft">
                            This opens your email app with the list filled in, addressed to {site.email}. Nothing is charged: {site.ownerFirst} confirms what’s in stock, then
                            bills you once your order is pulled.
                        </p>
                    </div>
                </>
            )}
            <p className="sr-only" aria-live="polite">
                {order.announcement}
            </p>
        </aside>
    );
}
