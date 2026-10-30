import { useHydrated } from './useHydrated';

/**
 * today's date, but only after hydration (null before). the prerendered HTML was drawn on
 * the build machine on some earlier day, so anything date-based waits for the browser.
 */
export function useToday(): Date | null {
    const hydrated = useHydrated();
    return hydrated ? new Date() : null;
}
