// the Ditko Books order list: what's on it, what it costs, and the email it turns into.
// pure functions only; the React state lives in src/components/order/OrderContext.tsx.
import { CATALOG, CATALOG_DATE, SHIPPING_USA, getItem, type CatalogItem } from '@/data/catalog';
import { site } from '@/data/site';
import { moneyExact } from './format';

export const MAX_QTY = 99;

export type OrderLine = { id: string; qty: number };
export type PricedLine = OrderLine & { item: CatalogItem; total: number };

/** whatever came back from localStorage, cleaned: known titles only, whole quantities 1–99, no duplicates */
export function sanitize(raw: unknown): OrderLine[] {
    if (!Array.isArray(raw)) return [];
    const seen = new Set<string>();
    const lines: OrderLine[] = [];
    for (const entry of raw) {
        if (!entry || typeof entry !== 'object') continue;
        const { id, qty } = entry as { id?: unknown; qty?: unknown };
        if (typeof id !== 'string' || seen.has(id) || !getItem(id)) continue;
        if (typeof qty !== 'number' || !Number.isFinite(qty) || qty < 1) continue;
        seen.add(id);
        lines.push({ id, qty: Math.min(Math.floor(qty), MAX_QTY) });
    }
    return lines;
}

/** the lines with their catalog entry and line total, in the order-form's order */
export function priceLines(lines: OrderLine[]): PricedLine[] {
    const qty = new Map(lines.map((line) => [line.id, line.qty]));
    return CATALOG.filter((item) => qty.has(item.id)).map((item) => {
        const count = qty.get(item.id) ?? 0;
        return { id: item.id, qty: count, item, total: count * item.price };
    });
}

export function totals(lines: OrderLine[]) {
    const priced = priceLines(lines);
    const books = priced.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = priced.reduce((sum, line) => sum + line.total, 0);
    const shipping = priced.length ? SHIPPING_USA : 0;
    return { books, titles: priced.length, subtotal, shipping, total: subtotal + shipping };
}

/** the order as plain text: the body of the email to Darren, and what "Copy" puts on the clipboard */
export function orderText(lines: OrderLine[]): string {
    const priced = priceLines(lines);
    const { subtotal, shipping, total } = totals(lines);
    return [
        `Hi ${site.ownerFirst},`,
        '',
        `I’d like to order these Ditko books (prices from the ${CATALOG_DATE} order form on ditkoclub.com):`,
        '',
        ...priced.map((line) => `${line.qty} × ${line.item.title} @ ${moneyExact(line.item.price)} = ${moneyExact(line.total)}`),
        '',
        `Subtotal: ${moneyExact(subtotal)}`,
        `Shipping (USA): ${moneyExact(shipping)}`,
        `Total: ${moneyExact(total)}`,
        '',
        'Name:',
        'Ship to:',
        'Phone:',
        '',
        'Please let me know what you have in stock and bill me once it’s pulled. Thanks!'
    ].join('\n');
}
