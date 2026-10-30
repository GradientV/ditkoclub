import { Link } from 'react-router';
import LegalPage from '@/components/LegalPage';
import Seo from '@/components/Seo';
import { CATALOG_DATE, SHIPPING_USA } from '@/data/catalog';
import { site } from '@/data/site';
import { money } from '@/lib/format';

export default function Terms() {
    return (
        <>
            <Seo page="terms" />
            <LegalPage eyebrow="Terms" title="Terms of Use" intro="The basics of using this website: listings, prices, orders and pressing." updated="October 30, 2026">
                <p>
                    By using the {site.name} website you agree to these terms. If you don’t agree with them, please don’t use the site. Questions are welcome; our contact details are
                    at the bottom of this page.
                </p>

                <h2>The Ditko Collection</h2>
                <ul>
                    <li>Prices shown are asking prices. Books listed “or best offer” are open to offers.</li>
                    <li>
                        A listing is not a reservation. A book is only yours once {site.ownerFirst} has confirmed the sale with you directly, and a book may sell to someone else before
                        then.
                    </li>
                    <li>
                        Grades, page quality, signatures and provenance are described as they appear on each book’s CGC label. Grading is CGC’s professional opinion, and autograph
                        authentication is provided by JSA and CGC, independent companies not affiliated with {site.name}.
                    </li>
                </ul>

                <h2>Ditko Books orders</h2>
                <ul>
                    <li>
                        Prices come from {site.ownerFirst}’s order form dated {CATALOG_DATE} and may change. Inventory changes constantly, so not every title will always be in stock.
                    </li>
                    <li>
                        The order list on the <Link to="/ditko-books">Ditko Books page</Link> is a convenience. Emailing it is a request, not a completed purchase: {site.ownerFirst}{' '}
                        confirms what’s available and bills you once your order is pulled from inventory.
                    </li>
                    <li>Shipping within the USA is {money(SHIPPING_USA)} per order, as listed on the order form. Shipping elsewhere is quoted separately.</li>
                </ul>

                <h2>Pressing</h2>
                <ul>
                    <li>Pressing and cleaning prices are listed on the <Link to="/press-room">Press Room page</Link> and on the press form.</li>
                    <li>
                        Every book is different. Pressing and cleaning can improve a book’s appearance, but they can’t repair every defect, and no one can promise a particular grade
                        from a grading company.
                    </li>
                </ul>

                <h2>Photos, names and trademarks</h2>
                <p>
                    Photos of books in the collection and of pressing work belong to {site.name}. Characters, titles and logos shown on books are trademarks of their respective
                    owners and are used only to identify the books. {site.name} is an independent dealer and is not affiliated with Marvel, DC, CGC or JSA. Public-domain images are
                    credited where they appear.
                </p>

                <h2>Using the site</h2>
                <p>
                    We work to keep the information here accurate and current, but the site is provided “as is.” If you spot a mistake, please let us know. Links to other websites
                    are for convenience; we’re not responsible for their content.
                </p>

                <h2>Changes</h2>
                <p>We may update these terms from time to time. The “Last updated” date at the top shows when they last changed.</p>
            </LegalPage>
        </>
    );
}
