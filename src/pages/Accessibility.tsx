import LegalPage from '@/components/LegalPage';
import Seo from '@/components/Seo';
import { site } from '@/data/site';

export default function Accessibility() {
    return (
        <>
            <Seo page="accessibility" />
            <LegalPage
                eyebrow="Accessibility"
                title="Accessibility"
                intro="Everyone should be able to browse the collection, order books and reach Darren. Here’s what we’ve done, and how to tell us when something gets in your way."
                updated="October 30, 2026"
            >
                <h2>Our goal</h2>
                <p>We aim for this website to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA, and we test it with a keyboard and at phone and desktop sizes.</p>

                <h2>What’s built in</h2>
                <ul>
                    <li>Every page works with a keyboard, starting with a “Skip to content” link, and the menu and photo viewer keep focus where it belongs.</li>
                    <li>Every photo has a text description. The fine print on each CGC label (grade, signatures, provenance, cert number) is also written out as text on each book’s page.</li>
                    <li>The Ditko Books order list announces changes to screen readers, and the order can be copied as plain text or emailed.</li>
                    <li>Text and buttons are sized and colored for contrast, and the layout adapts to zoom and small screens.</li>
                    <li>If your device is set to reduce motion, the site’s animations are turned off.</li>
                </ul>

                <h2>Known limitations</h2>
                <ul>
                    <li>
                        The downloadable PDF and Excel forms are {site.owner}’s originals and may not work well with every screen reader. Everything on them is also on this website as
                        text: the full book list and prices on the Ditko Books page, and the press form’s details on the Press Room page.
                    </li>
                    <li>Links to other websites (CGC, conventions) go to pages we don’t control.</li>
                </ul>

                <h2>Tell us</h2>
                <p>
                    If something on the site is hard to use, or you’d like information in a different format, please call or email {site.ownerFirst}. We’ll help you directly and
                    work on fixing the problem.
                </p>
            </LegalPage>
        </>
    );
}
