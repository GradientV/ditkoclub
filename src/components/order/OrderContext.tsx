// shared state for the Ditko Books order list: the list itself, plus the actions every
// part of the site uses (set a quantity, step it up or down, clear). the header reads the
// count for its badge. it's saved to localStorage so a reload doesn't lose it; nothing
// leaves the browser until the visitor emails it to Darren themselves.
import { createContext, use, useCallback, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import { getItem } from '@/data/catalog';
import { MAX_QTY, sanitize, totals, type OrderLine } from '@/lib/order';
import { readJson, writeJson } from '@/lib/storage';

const STORAGE_KEY = 'ditko-club:order:v1';

type Action = { type: 'set'; id: string; qty: number } | { type: 'clear' } | { type: 'load'; lines: OrderLine[] };

function reducer(lines: OrderLine[], action: Action): OrderLine[] {
    switch (action.type) {
        case 'set': {
            const qty = Math.min(Math.max(Math.floor(action.qty), 0), MAX_QTY);
            if (qty === 0) return lines.filter((line) => line.id !== action.id);
            if (lines.some((line) => line.id === action.id)) return lines.map((line) => (line.id === action.id ? { ...line, qty } : line));
            return [...lines, { id: action.id, qty }];
        }
        case 'clear':
            return [];
        case 'load':
            return action.lines;
    }
}

type OrderValue = ReturnType<typeof totals> & {
    lines: OrderLine[];
    /** what the live region reads out after a change */
    announcement: string;
    qtyOf: (id: string) => number;
    setQty: (id: string, qty: number) => void;
    step: (id: string, delta: 1 | -1) => void;
    clear: () => void;
};

const OrderContext = createContext<OrderValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [lines, dispatch] = useReducer(reducer, []);
    const [announcement, setAnnouncement] = useState('');
    // true once the saved list has been read back. saving waits for it, so the
    // empty starting list never overwrites what was saved
    const [ready, setReady] = useState(false);

    // read the saved list after the first render, so the prerendered page and
    // the browser's first pass both start from an empty list
    useEffect(() => {
        dispatch({ type: 'load', lines: sanitize(readJson<unknown>(STORAGE_KEY, [])) });
        // syncing from localStorage (an outside system) after hydration is what effects are for
        // oxlint-disable-next-line react/set-state-in-effect
        setReady(true);
    }, []);

    useEffect(() => {
        if (ready) writeJson(STORAGE_KEY, lines);
    }, [lines, ready]);

    const qtyOf = useCallback((id: string) => lines.find((line) => line.id === id)?.qty ?? 0, [lines]);

    const setQty = useCallback(
        (id: string, qty: number) => {
            const item = getItem(id);
            if (!item) return;
            const before = lines.find((line) => line.id === id)?.qty ?? 0;
            dispatch({ type: 'set', id, qty });
            const after = Math.min(Math.max(Math.floor(qty), 0), MAX_QTY);
            if (after === before) return;
            setAnnouncement(after === 0 ? `Removed ${item.title} from your order` : `${item.title}: ${after} on your order`);
        },
        [lines]
    );

    const step = useCallback((id: string, delta: 1 | -1) => setQty(id, qtyOf(id) + delta), [qtyOf, setQty]);

    const clear = useCallback(() => {
        dispatch({ type: 'clear' });
        setAnnouncement('Your order list is empty');
    }, []);

    const value = useMemo<OrderValue>(() => ({ ...totals(lines), lines, announcement, qtyOf, setQty, step, clear }), [lines, announcement, qtyOf, setQty, step, clear]);

    return <OrderContext value={value}>{children}</OrderContext>;
}

export function useOrder(): OrderValue {
    const value = use(OrderContext);
    if (!value) throw new Error('useOrder needs an <OrderProvider> above it');
    return value;
}
