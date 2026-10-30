import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { ArrowRight, Mail, Menu, Phone, X } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import { useOrder } from '@/components/order/OrderContext';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { nav, site } from '@/data/site';
import { cn } from '@/lib/cn';

function TopBar() {
    return (
        <div className="bg-ink text-[0.8rem] text-paper/85 sm:text-[0.85rem]">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
                <Link to="/collection" className="condensed group inline-flex items-center gap-2 font-bold tracking-wide whitespace-nowrap uppercase hover:text-pow-300">
                    <span className="bg-pow-400 px-1.5 py-0.5 text-[0.7rem] leading-none text-ink">New</span>
                    <span className="sm:hidden">Signed by Steve Ditko</span>
                    <span className="hidden sm:inline">First time offered: books signed by Steve Ditko</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <div className="flex items-center gap-4">
                    <a href={`tel:${site.phone.tel}`} className="hidden items-center gap-1.5 font-semibold whitespace-nowrap hover:text-pow-300 md:inline-flex">
                        <Phone className="h-3.5 w-3.5 text-pow-400" aria-hidden="true" />
                        {site.phone.display}
                    </a>
                    <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 font-semibold whitespace-nowrap hover:text-pow-300 lg:inline-flex">
                        <Mail className="h-3.5 w-3.5 text-pow-400" aria-hidden="true" />
                        {site.email}
                    </a>
                </div>
            </div>
        </div>
    );
}

/** the little count bubble on "Ditko Books" once something is on the order list */
function OrderBadge({ className }: { className?: string }) {
    const { books } = useOrder();
    if (!books) return null;
    return (
        <span className={cn('grid h-5 min-w-5 place-items-center rounded-full border-2 border-ink bg-pow-400 px-1 text-[0.7rem] leading-none font-extrabold text-ink', className)}>
            <span className="sr-only">(</span>
            {books}
            <span className="sr-only"> on your order)</span>
        </span>
    );
}

const desktopLink = ({ isActive }: { isActive: boolean }) =>
    cn(
        'condensed relative inline-flex items-center gap-1.5 px-2.5 py-2 text-[1.02rem] font-extrabold tracking-wide uppercase transition-colors xl:px-3.5',
        isActive ? 'text-pow-300 after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-1 after:-rotate-1 after:bg-pow-400' : 'text-white hover:text-pow-300'
    );

/**
 * the full-screen menu on phones and tablets. a native modal <dialog> keeps keyboard
 * focus inside it, closes on Escape, and hides the page behind it from screen readers
 */
function MobileMenu({ onClose }: { onClose: () => void }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (!dialog.open) dialog.showModal();
        closeRef.current?.focus();
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        // no dialog.close() here: unmounting removes the dialog anyway, and calling close()
        // would fire onClose (React's development double-mount would shut the menu instantly)
        return () => {
            document.body.style.overflow = previous;
        };
    }, []);

    return (
        <dialog
            ref={dialogRef}
            aria-label="Site menu"
            onClose={onClose}
            className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-crimson-600 p-0 text-white backdrop:bg-transparent lg:hidden"
        >
            <div className="relative flex min-h-full flex-col">
                <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 text-crimson-900/35" />
                <div className="relative flex items-center justify-between px-4 py-3 sm:px-6">
                    <Link to="/" onClick={onClose} aria-label="Ditko Club home">
                        <Logo />
                    </Link>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close menu"
                        className="grid h-11 w-11 place-items-center border-[3px] border-ink bg-pow-400 text-ink shadow-comic-sm"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                <nav aria-label="Main" className="relative mt-2 flex-1 px-4 sm:px-6">
                    <ul className="divide-y-2 divide-ink/25 border-y-2 border-ink/25">
                        <li>
                            <NavLink to="/" end onClick={onClose} className="flex items-baseline justify-between gap-4 py-3.5">
                                {({ isActive }) => (
                                    <>
                                        <span className={cn('comic-shadow font-display text-4xl tracking-wide', isActive && 'text-pow-300')}>Home</span>
                                        <span className="condensed text-xs font-bold tracking-[0.16em] text-pow-200 uppercase">Welcome to Ditko Club</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                        {nav.map((item, i) => (
                            <li key={item.to} className="animate-pop" style={{ animationDelay: `${(i + 1) * 35}ms` }}>
                                <NavLink to={item.to} onClick={onClose} className="flex items-baseline justify-between gap-4 py-3.5">
                                    {({ isActive }) => (
                                        <>
                                            <span className={cn('comic-shadow inline-flex items-center gap-2 font-display text-4xl tracking-wide', isActive && 'text-pow-300')}>
                                                {item.label}
                                                {item.to === '/ditko-books' && <OrderBadge />}
                                            </span>
                                            <span className="condensed text-right text-xs font-bold tracking-[0.16em] text-pow-200 uppercase">{item.blurb}</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="relative grid gap-3 px-4 py-6 sm:px-6">
                    <ButtonAnchor href={`tel:${site.phone.tel}`} variant="pow" size="lg">
                        <Phone className="h-5 w-5" aria-hidden="true" /> Call {site.phone.display}
                    </ButtonAnchor>
                    <ButtonAnchor href={`mailto:${site.email}`} variant="white" size="lg">
                        <Mail className="h-5 w-5" aria-hidden="true" /> Email {site.ownerFirst}
                    </ButtonAnchor>
                </div>
            </div>
        </dialog>
    );
}

export default function Header() {
    const { pathname } = useLocation();
    // the menu remembers which page it was opened on, so moving to another
    // page (a link, or the back button) closes it by itself
    const [openOn, setOpenOn] = useState<string | null>(null);
    const open = openOn === pathname;

    return (
        <>
            <TopBar />
            <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-crimson-600">
                <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 text-crimson-800/40 [mask-image:linear-gradient(to_right,black,transparent_40%)]" />
                <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
                    <Link to="/" aria-label="Ditko Club home" className="shrink-0 transition-transform hover:-rotate-2">
                        <Logo />
                    </Link>

                    <nav aria-label="Main" className="hidden lg:block">
                        <ul className="flex items-center">
                            {nav.map((item) => (
                                <li key={item.to}>
                                    <NavLink to={item.to} className={desktopLink}>
                                        {item.label}
                                        {item.to === '/ditko-books' && <OrderBadge />}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-2.5">
                        {/* the wrappers decide when each button shows; the buttons themselves are always inline-flex */}
                        <span className="hidden xl:block">
                            <ButtonLink to="/ditko-books" variant="pow" size="sm" className="whitespace-nowrap">
                                Order Ditko books
                            </ButtonLink>
                        </span>
                        <a
                            href={`tel:${site.phone.tel}`}
                            aria-label={`Call ${site.phone.display}`}
                            className="grid h-11 w-11 place-items-center border-[3px] border-ink bg-white text-ink shadow-comic-sm lg:hidden"
                        >
                            <Phone className="h-5 w-5" aria-hidden="true" />
                        </a>
                        <button
                            type="button"
                            onClick={() => setOpenOn(pathname)}
                            aria-label="Open menu"
                            aria-expanded={open}
                            className="relative grid h-11 w-11 place-items-center border-[3px] border-ink bg-pow-400 text-ink shadow-comic-sm lg:hidden"
                        >
                            <Menu className="h-5 w-5" aria-hidden="true" />
                            <OrderBadge className="absolute -top-2.5 -right-2.5" />
                        </button>
                    </div>
                </div>
            </header>
            {open && <MobileMenu onClose={() => setOpenOn(null)} />}
        </>
    );
}
