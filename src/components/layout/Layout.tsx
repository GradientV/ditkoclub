import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { OrderProvider } from '@/components/order/OrderContext';
import Footer from './Footer';
import Header from './Header';

/** new page: back to the top. a #hash in the link: scroll to that section instead */
function ScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [pathname, hash]);

    return null;
}

export default function Layout() {
    return (
        <OrderProvider>
            <a
                href="#main"
                className="condensed sr-only z-[60] border-[3px] border-ink bg-pow-400 px-4 py-2 font-extrabold text-ink uppercase focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            >
                Skip to content
            </a>
            <ScrollManager />
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
                <Outlet />
            </main>
            <Footer />
        </OrderProvider>
    );
}
