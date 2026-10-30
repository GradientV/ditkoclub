import type { ComponentType } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Layout from '@/components/layout/Layout';
import { ALIASES } from '@/data/aliases';
import { STATIC_PAGES, type StaticPageId } from '@/data/pages';
import About from '@/pages/About';
import Accessibility from '@/pages/Accessibility';
import BookPage from '@/pages/Book';
import Collection from '@/pages/Collection';
import Contact from '@/pages/Contact';
import Conventions from '@/pages/Conventions';
import DitkoBooks from '@/pages/DitkoBooks';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import PressRoom from '@/pages/PressRoom';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';

/** which component draws each fixed page in src/data/pages.ts */
const PAGE_COMPONENTS: Record<StaticPageId, ComponentType> = {
    home: Home,
    collection: Collection,
    ditkoBooks: DitkoBooks,
    pressRoom: PressRoom,
    conventions: Conventions,
    about: About,
    contact: Contact,
    privacy: Privacy,
    terms: Terms,
    accessibility: Accessibility
};

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                {STATIC_PAGES.map((page) => {
                    const Page = PAGE_COMPONENTS[page.id];
                    return page.path === '/' ? <Route key={page.id} index element={<Page />} /> : <Route key={page.id} path={page.path.slice(1)} element={<Page />} />;
                })}
                {/* one page per signed book, from src/data/books.ts */}
                <Route path="collection/:slug" element={<BookPage />} />
                {Object.entries(ALIASES).map(([from, to]) => (
                    <Route key={from} path={from.slice(1)} element={<Navigate to={to} replace />} />
                ))}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
