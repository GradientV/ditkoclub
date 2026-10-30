import { Link } from 'react-router';
import { Mail, Package, Phone, Wallet } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Faq, { type FaqItem } from '@/components/Faq';
import PageHero from '@/components/PageHero';
import Seo from '@/components/Seo';
import { MascotAvatar } from '@/components/brand/Logo';
import { ButtonAnchor } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/Comic';
import { SHIPPING_USA } from '@/data/catalog';
import { site } from '@/data/site';
import { money } from '@/lib/format';
import { organizationSchema } from '@/lib/schema';

const FAQS: FaqItem[] = [
    {
        question: 'How do I buy a book from the Ditko Collection?',
        answer: (
            <p>
                Every book has its own page with the label details and price. Email or call {site.ownerFirst} about the one you want; most are listed “or best offer.” He’ll confirm
                it’s available and work out payment and shipping with you. <Link to="/collection">See the collection</Link>.
            </p>
        )
    },
    {
        question: 'Are the signatures authentic?',
        answer: (
            <p>
                Every book in the collection is sealed by CGC under a CGC × JSA Authentic Autograph label: JSA authenticated the signature, and CGC’s guarantee covers the
                autograph. Each book’s page links to its certification record on CGC’s website. <Link to="/collection#authentication">How it works</Link>.
            </p>
        )
    },
    {
        question: 'How do I order out-of-print Ditko books?',
        answer: (
            <p>
                Build your list on the <Link to="/ditko-books">Ditko Books</Link> page and email it, or download the PDF or Excel order form. Inventory changes all the time, so{' '}
                {site.ownerFirst} confirms what’s in stock and bills you once your order is pulled.
            </p>
        )
    },
    {
        question: 'How much is shipping on Ditko books?',
        answer: <p>{money(SHIPPING_USA)} in the USA, per the order form. Outside the USA, ask {site.ownerFirst} for a quote.</p>
    },
    {
        question: 'How do I send books for pressing?',
        answer: (
            <p>
                Fill out the press form and mail your books to {site.address.name}, {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode},
                or drop them off at a convention. <Link to="/press-room#send">All the details</Link>.
            </p>
        )
    },
    {
        question: 'How can I pay?',
        answer: (
            <p>
                Darren’s press form lists {site.payments.map((payment) => `${payment.name} (${payment.handle})`).join(', ')}. For a book from the collection, {site.ownerFirst} will
                work out payment with you directly.
            </p>
        )
    }
];

function Direct() {
    return (
        <div className="mx-auto max-w-md rotate-1 border-[3px] border-ink bg-white p-6 text-ink shadow-comic-lg sm:p-7">
            <div className="flex items-center gap-4">
                <MascotAvatar className="h-16 w-16 shadow-comic-sm" />
                <div>
                    <p className="font-display text-3xl leading-none tracking-wide">{site.owner}</p>
                    <p className="condensed mt-1 text-sm font-bold tracking-wide text-ink-soft uppercase">
                        {site.name} · {site.town}
                    </p>
                </div>
            </div>
            <div className="mt-6 grid gap-3">
                <ButtonAnchor href={`tel:${site.phone.tel}`} variant="crimson" size="lg">
                    <Phone className="h-5 w-5" aria-hidden="true" /> {site.phone.display}
                </ButtonAnchor>
                <ButtonAnchor href={`mailto:${site.email}`} variant="white" size="lg" className="normal-case">
                    <Mail className="h-5 w-5" aria-hidden="true" /> {site.email}
                </ButtonAnchor>
            </div>
        </div>
    );
}

export default function Contact() {
    return (
        <>
            <Seo page="contact" schema={organizationSchema()} />
            <PageHero
                eyebrow="Contact"
                title="Talk to"
                accent="Darren"
                web
                intro={<p>Questions about a signed book, an order of Ditko books, or pressing? {site.owner} answers them himself. Call, email, or send a message below.</p>}
                aside={<Direct />}
            />

            <section aria-labelledby="message-title" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div>
                    <h2 id="message-title" className="font-display text-5xl tracking-wide">
                        Send a message
                    </h2>
                    <div className="mt-6">
                        <ContactForm />
                    </div>
                </div>

                <aside className="space-y-6 lg:pt-20">
                    <div className="border-[3px] border-ink bg-newsprint p-5 shadow-comic-sm">
                        <Package className="h-7 w-7 text-crimson-600" aria-hidden="true" />
                        <h2 className="mt-2 font-display text-2xl tracking-wide">Sending books for pressing?</h2>
                        <address className="mt-2 not-italic">
                            {site.address.name}
                            <br />
                            {site.address.street}
                            <br />
                            {site.address.city}, {site.address.region} {site.address.postalCode}
                        </address>
                        <p className="mt-2 text-sm text-ink-soft">
                            Include the{' '}
                            <a href={site.forms.pressPdf} download className="font-semibold text-crimson-700 underline underline-offset-2">
                                press form
                            </a>{' '}
                            with your books.
                        </p>
                    </div>
                    <div className="border-[3px] border-ink bg-white p-5 shadow-comic-sm">
                        <Wallet className="h-7 w-7 text-crimson-600" aria-hidden="true" />
                        <h2 className="mt-2 font-display text-2xl tracking-wide">Ways to pay</h2>
                        <dl className="mt-2 space-y-1">
                            {site.payments.map((payment) => (
                                <div key={payment.name} className="flex flex-wrap gap-x-2">
                                    <dt className="condensed font-extrabold tracking-wide uppercase">{payment.name}</dt>
                                    <dd className="break-all text-ink-soft">{payment.handle}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </aside>
            </section>

            <section aria-labelledby="faq-title" className="border-t-[3px] border-ink bg-newsprint">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
                    <SectionHeading id="faq-title" eyebrow="Good questions" title="Frequently asked" align="center" />
                    <Faq items={FAQS} className="mt-10" />
                </div>
            </section>
        </>
    );
}
