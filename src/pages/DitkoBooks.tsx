import { ArrowDown, FileSpreadsheet, FileText, Mail } from 'lucide-react';
import ContactBand from '@/components/ContactBand';
import PageHero from '@/components/PageHero';
import Seo from '@/components/Seo';
import CatalogList from '@/components/order/CatalogList';
import MobileOrderBar from '@/components/order/MobileOrderBar';
import OrderSummary from '@/components/order/OrderSummary';
import { ButtonAnchor } from '@/components/ui/Button';
import { Caption, SectionHeading } from '@/components/ui/Comic';
import Photo from '@/components/ui/Photo';
import { CATALOG, CATALOG_DATE, LOWEST_PRICE, SHIPPING_USA } from '@/data/catalog';
import { site } from '@/data/site';
import { money } from '@/lib/format';
import { catalogSchema, organizationSchema } from '@/lib/schema';

/** the header art from Darren's order form, redrawn: the mascot and the hand-lettered welcome */
function WelcomeCard() {
    return (
        <div className="mx-auto max-w-md rotate-1 border-[3px] border-ink bg-white p-5 text-ink shadow-comic-lg sm:p-6">
            <div className="flex items-center gap-5">
                <span className="w-28 shrink-0 -rotate-3 border-[3px] border-ink bg-crimson-600 shadow-comic-sm sm:w-32">
                    <Photo photo="mascot" sizes="128px" eager className="aspect-[275/304] w-full" />
                </span>
                <div>
                    <p className="font-marker text-3xl leading-tight sm:text-4xl">Welcome to Ditko Club.</p>
                </div>
            </div>
            <p className="mt-4 font-letter text-2xl leading-snug">{site.tagline}.</p>
        </div>
    );
}

const STEPS = [
    { title: 'Build your list', text: 'Add titles below, or download the PDF or Excel order form if you’d rather fill it out.' },
    { title: `Send it to ${site.ownerFirst}`, text: `Email your list to ${site.email}. Inventory changes all the time, so he’ll confirm what’s in stock first.` },
    { title: 'Get billed, get books', text: `${site.ownerFirst} bills you once your order is pulled from inventory. Shipping in the USA is ${money(SHIPPING_USA)}.` }
];

export default function DitkoBooks() {
    return (
        <>
            <Seo page="ditkoBooks" schema={[catalogSchema(), organizationSchema()]} />
            <PageHero
                tone="cobalt"
                eyebrow={`Out of print · from ${money(LOWEST_PRICE)}`}
                title="Ditko Books,"
                accent="Ready to Order"
                intro={
                    <>
                        <p>
                            “I am pleased to offer these out-of-print books from Steve Ditko at wholesale prices. My inventory is constantly changing, so please contact me
                            first.”
                        </p>
                        <p className="mt-2 font-letter text-2xl text-pow-200">— {site.owner}</p>
                    </>
                }
                aside={<WelcomeCard />}
            >
                <ButtonAnchor href="#catalog" size="lg">
                    Start your order <ArrowDown className="h-5 w-5" aria-hidden="true" />
                </ButtonAnchor>
                <ButtonAnchor href={site.forms.orderPdf} download variant="white" size="lg">
                    <FileText className="h-5 w-5" aria-hidden="true" /> PDF order form
                </ButtonAnchor>
            </PageHero>

            <section aria-label="How ordering works" className="border-b-[3px] border-ink bg-newsprint">
                <ol className="mx-auto grid max-w-7xl gap-5 px-4 pt-14 pb-12 sm:px-6 md:grid-cols-3">
                    {STEPS.map((step, i) => (
                        <li key={step.title} className="relative border-[3px] border-ink bg-white p-5 pt-7 shadow-comic-sm">
                            <span
                                aria-hidden="true"
                                className="absolute -top-5 left-4 grid h-10 w-10 -rotate-6 place-items-center border-[3px] border-ink bg-pow-400 font-display text-2xl shadow-comic-sm"
                            >
                                {i + 1}
                            </span>
                            <h2 className="font-display text-2xl tracking-wide">
                                <span className="sr-only">Step {i + 1}: </span>
                                {step.title}
                            </h2>
                            <p className="mt-1.5 text-ink-soft">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section id="catalog" aria-labelledby="catalog-title" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6">
                <div className="grid gap-10 lg:grid-cols-[1fr_23rem] lg:items-start xl:grid-cols-[1fr_25rem]">
                    <div>
                        <SectionHeading id="catalog-title" eyebrow={`${CATALOG.length} titles`} title="From Steve Ditko and Robin Snyder">
                            <p>
                                Ditko’s own books, published with his longtime editor Robin Snyder: the big collections, Mr. A, and the 32-page Ditko comics. Prices from{' '}
                                {site.ownerFirst}’s {CATALOG_DATE} order form.
                            </p>
                        </SectionHeading>
                        <div className="mt-10">
                            <CatalogList />
                        </div>
                    </div>
                    <OrderSummary />
                </div>
            </section>

            <section aria-labelledby="forms-title" className="border-y-[3px] border-ink bg-pow-400">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <Caption tone="ink">Prefer paper?</Caption>
                        <h2 id="forms-title" className="mt-4 font-display text-5xl leading-none tracking-wide">
                            Download the order form
                        </h2>
                        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
                            Same list, same prices. Fill in the quantities, then email it to{' '}
                            <a href={`mailto:${site.email}`} className="font-semibold text-ink underline underline-offset-2">
                                {site.email}
                            </a>
                            . Outside the USA? Ask {site.ownerFirst} for a shipping quote.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <ButtonAnchor href={site.forms.orderPdf} download variant="ink">
                            <FileText className="h-5 w-5" aria-hidden="true" /> PDF (440 KB)
                        </ButtonAnchor>
                        <ButtonAnchor href={site.forms.orderXlsx} download variant="white">
                            <FileSpreadsheet className="h-5 w-5" aria-hidden="true" /> Excel (195 KB)
                        </ButtonAnchor>
                        <ButtonAnchor href={`mailto:${site.email}?subject=${encodeURIComponent('Ditko book order')}`} variant="white">
                            <Mail className="h-5 w-5" aria-hidden="true" /> Email Darren
                        </ButtonAnchor>
                    </div>
                </div>
            </section>

            <ContactBand title="Looking for a Ditko title?" balloon="Ask me! My stock changes all the time.">
                <p>Don’t see the one you want, or need a few copies of something? {site.ownerFirst} can tell you what he has right now.</p>
            </ContactBand>

            <MobileOrderBar />
        </>
    );
}
