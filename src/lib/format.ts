const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const usdWhole = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/** 38000 -> '$38,000', 6 -> '$6', 7.5 -> '$7.50' (whole dollars drop the cents, like the order form) */
export function money(amount: number): string {
    return Number.isInteger(amount) ? usdWhole.format(amount) : usd.format(amount);
}

/** always with cents, for order totals: 8 -> '$8.00' */
export function moneyExact(amount: number): string {
    return usd.format(amount);
}

/** 1 book / 3 books */
export function plural(count: number, one: string, many = `${one}s`): string {
    return `${count} ${count === 1 ? one : many}`;
}
