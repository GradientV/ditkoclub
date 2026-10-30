import { Link } from 'react-router';
import LegalPage from '@/components/LegalPage';
import Seo from '@/components/Seo';
import { SITE_URL, site } from '@/data/site';

export default function Privacy() {
    return (
        <>
            <Seo page="privacy" />
            <LegalPage eyebrow="Privacy" title="Privacy Policy" intro="How this website handles your information, in plain English." updated="October 30, 2026">
                <p>
                    {site.name} (“Ditko Club,” “we,” “us”) respects your privacy. This policy explains what information the website at{' '}
                    <a href={SITE_URL}>{SITE_URL.replace('https://', '')}</a> collects, why, and the choices you have.
                </p>

                <h2>The short version</h2>
                <ul>
                    <li>There are no accounts, sign-ups or newsletters on this site.</li>
                    <li>We don’t use advertising trackers, and the site doesn’t set cookies of its own.</li>
                    <li>The contact form and the Ditko Books order list don’t send anything by themselves. They open your own email app, and you decide whether to send.</li>
                    <li>We don’t sell or rent your personal information to anyone.</li>
                </ul>

                <h2>What we collect</h2>
                <h3>Information you choose to give us</h3>
                <p>
                    When you email or call us, or send us books for pressing, we receive whatever you share: for example your name, email address, phone number, shipping
                    address, the books you’re asking about and photos you attach. We use it to answer you, fill your order, press your books and ship them back.
                </p>
                <h3>Your Ditko Books order list</h3>
                <p>
                    The list on our <Link to="/ditko-books">Ditko Books page</Link> is saved in your browser’s local storage, on your device, so it’s still there if you reload the
                    page. It is never sent to us unless you email it. Use the “Clear” button, or clear this site’s data in your browser settings, to delete it.
                </p>
                <h3>Website analytics</h3>
                <p>
                    We use Vercel Web Analytics to count page views and see which pages are useful. It doesn’t use cookies, doesn’t follow you to other websites, and reports totals
                    rather than information about individual visitors.
                </p>
                <h3>Server logs</h3>
                <p>
                    Like nearly every website, our hosting provider (Vercel) processes technical information such as your IP address, browser type and the pages requested, to
                    deliver the site and protect it from abuse.
                </p>

                <h2>Other services this site links to</h2>
                <ul>
                    <li>
                        <strong>CGC.</strong> Each book page links to that book’s certification record on CGC’s website, which has its own privacy policy.
                    </li>
                    <li>
                        <strong>Convention websites.</strong> The conventions page links to each show’s own site.
                    </li>
                    <li>
                        <strong>Payment apps.</strong> If you pay with Venmo, Zelle or Cash App, that company handles the payment under its own privacy policy. We never see your card
                        or bank details.
                    </li>
                    <li>
                        <strong>Phone and email links.</strong> Tapping a phone number or email address opens your own phone or email app.
                    </li>
                </ul>

                <h2>How we use information</h2>
                <ul>
                    <li>To answer your questions, and to fill, ship and keep records of your orders and pressing jobs.</li>
                    <li>To keep this website running, secure and useful.</li>
                    <li>To meet our legal obligations.</li>
                </ul>

                <h2>Who we share it with</h2>
                <p>
                    We don’t sell or rent personal information. We share it only with the services that help us run the website (hosting and analytics), with shipping carriers
                    when we send you books, and when the law requires it.
                </p>

                <h2>Your choices</h2>
                <ul>
                    <li>Clear your order list at any time.</li>
                    <li>Ask us what information we have from you, or ask us to delete it, using the contact details below.</li>
                </ul>

                <h2>Children</h2>
                <p>This website is meant for a general audience and isn’t directed to children under 13. We don’t knowingly collect personal information from children.</p>

                <h2>Security</h2>
                <p>The site is served over an encrypted (HTTPS) connection. No method of sending or storing information is perfectly secure, but we take reasonable care.</p>

                <h2>Changes to this policy</h2>
                <p>If we change this policy, we’ll update the “Last updated” date at the top of the page.</p>
            </LegalPage>
        </>
    );
}
