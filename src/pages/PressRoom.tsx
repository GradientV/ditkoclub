import { useId, useState } from 'react';
import { Link } from 'react-router';
import { CalendarDays, Check, CircleSlash, FileText, Mail, Minus, Package, Plus, Sparkles, Wallet } from 'lucide-react';
import ContactBand from '@/components/ContactBand';
import PageHero from '@/components/PageHero';
import Seo from '@/components/Seo';
import { ButtonAnchor } from '@/components/ui/Button';
import { Burst, Caption, SectionHeading, Sfx } from '@/components/ui/Comic';
import Lightbox from '@/components/ui/Lightbox';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { PRESS_PRICE, PRESS_RESULTS, PRESS_SERVICES, PRESS_STEPS } from '@/data/pressing';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import { money, plural } from '@/lib/format';
import { organizationSchema, pressingSchema } from '@/lib/schema';

function HeroResult() {
    return (
        <figure className="relative mx-auto max-w-sm">
            <div className="rotate-2 border-[3px] border-ink bg-white p-2 shadow-comic-lg">
                <Photo photo="pressDaredevil" sizes="(min-width: 1024px) 380px, 80vw" priority className="aspect-[3/4] w-full" />
            </div>
            <Burst tone="pow" className="absolute -top-8 -left-8 w-32 animate-wiggle sm:w-36">
                <span className="font-display text-2xl leading-[0.9] text-ink">
                    4.0
                    <br />→ 6.0!
                </span>
            </Burst>
            <figcaption className="condensed mt-5 text-center text-sm font-bold tracking-wide text-white/70 uppercase">Daredevil #1: CGC 4.0 before pressing, 6.0 after</figcaption>
        </figure>
    );
}

function Prices() {
    return (
        <section aria-labelledby="prices-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <SectionHeading id="prices-title" eyebrow="Prices" title="Simple, per-book pricing" align="center" />
            <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
                {PRESS_SERVICES.map((service, i) => (
                    <Reveal key={service.id} delay={i * 90}>
                        <div className={cn('relative h-full border-[3px] border-ink p-7 shadow-comic sm:p-8', i === 0 ? 'bg-white' : 'bg-newsprint')}>
                            {i === 0 && (
                                <Caption tone="crimson" className="absolute -top-4 right-6">
                                    Every book
                                </Caption>
                            )}
                            <h3 className="font-display text-4xl leading-none tracking-wide">{service.name}</h3>
                            <p className="mt-4 flex items-baseline gap-2">
                                <span className="font-marker text-6xl leading-none text-crimson-700">{service.price}</span>
                                <span className="condensed text-sm font-extrabold tracking-widest text-ink-soft uppercase">{service.unit}</span>
                            </p>
                            <ul className="mt-6 space-y-3">
                                {service.items.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-go-500" strokeWidth={3} aria-hidden="true" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

function Method() {
    return (
        <section aria-labelledby="method-title" className="relative overflow-hidden border-y-[3px] border-ink bg-cobalt-700 text-white">
            <div aria-hidden="true" className="halftone absolute inset-0 text-cobalt-950/40" />
            <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
                <SectionHeading id="method-title" eyebrow="The 48-hour method" title="Two full presses. Every book." light>
                    <p>Here’s what happens to your book in the Press Room, panel by panel.</p>
                </SectionHeading>

                <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {PRESS_STEPS.map((step, i) => (
                        <Reveal as="li" key={step.title} delay={(i % 3) * 80}>
                            <div className="relative flex h-full min-h-48 flex-col border-[3px] border-ink bg-white p-5 pt-12 text-ink shadow-comic">
                                <span className="condensed absolute top-0 left-0 border-r-[3px] border-b-[3px] border-ink bg-pow-400 px-3 py-1 text-sm font-extrabold tracking-widest uppercase">
                                    Panel {i + 1}
                                </span>
                                <Sfx className={cn('absolute top-2 right-3 text-3xl', i % 2 ? '-rotate-6 text-crimson-500' : 'rotate-6 text-cobalt-500')}>{step.sfx}</Sfx>
                                <h3 className="font-display text-3xl tracking-wide">{step.title}</h3>
                                <p className="mt-2 text-ink-soft">{step.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </ol>

                <figure className="mx-auto mt-14 max-w-3xl">
                    <blockquote className="bubble px-7 py-6 text-ink shadow-comic sm:px-9">
                        <p className="font-letter text-2xl leading-snug sm:text-[1.7rem]">
                            “Not all pressing agents will guarantee two 24-hour presses, but experience has shown that leaving the books 48 hours in the press is the best method to
                            prevent reversion of creases. While this takes more time, I’ve found it to be the best procedure for my customers’ books.”
                        </p>
                    </blockquote>
                    <figcaption className="condensed mt-6 ml-6 text-lg font-extrabold tracking-wide text-pow-300 uppercase">
                        {site.owner}, {site.pressRoom}
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}

function Results({ onOpen }: { onOpen: (index: number) => void }) {
    return (
        <section aria-labelledby="results-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <SectionHeading id="results-title" eyebrow="Before & after" title="Fresh out of the press">
                <p>Real books from real customers. Tap any photo to see it bigger.</p>
            </SectionHeading>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {PRESS_RESULTS.map((result, i) => (
                    <Reveal as="li" key={result.photo} delay={(i % 3) * 60}>
                        <button
                            type="button"
                            onClick={() => onOpen(i)}
                            className="group block h-full w-full cursor-zoom-in border-[3px] border-ink bg-white text-left shadow-comic transition-[transform,box-shadow] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-comic-lg"
                        >
                            <span className="block overflow-hidden border-b-[3px] border-ink bg-paper">
                                <Photo photo={result.photo} alt="" sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw" className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.03]" />
                            </span>
                            <span className="block p-4">
                                <span className="block font-display text-2xl tracking-wide">{result.title}</span>
                                <span className="mt-1 block text-ink-soft">{result.caption}</span>
                            </span>
                        </button>
                    </Reveal>
                ))}
            </ul>
        </section>
    );
}

function Estimator() {
    const inputId = useId();
    const [count, setCount] = useState(10);
    const set = (value: number) => setCount(Math.min(500, Math.max(1, Math.round(value) || 1)));

    return (
        <section aria-labelledby="estimate-title" className="border-y-[3px] border-ink bg-newsprint">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
                <SectionHeading id="estimate-title" eyebrow="Quick math" title="What will my books cost?">
                    <p>
                        Pressing and light cleaning is a flat {money(PRESS_PRICE)} a book. Deep cleaning is quoted per book after a free review, and shipping goes on the press form.
                    </p>
                </SectionHeading>

                <div className="border-[3px] border-ink bg-white p-6 shadow-comic sm:p-8">
                    <label htmlFor={inputId} className="condensed block text-sm font-extrabold tracking-widest uppercase">
                        How many books?
                    </label>
                    <div className="mt-3 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => set(count - 1)}
                            aria-label="One fewer book"
                            className="grid h-12 w-12 place-items-center border-[3px] border-ink bg-white shadow-comic-sm active:translate-y-0.5 active:shadow-none"
                        >
                            <Minus className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <input
                            id={inputId}
                            type="number"
                            inputMode="numeric"
                            min={1}
                            max={500}
                            value={count}
                            onChange={(event) => set(Number(event.target.value))}
                            className="h-12 w-24 border-[3px] border-ink bg-pow-100 text-center font-display text-3xl focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => set(count + 1)}
                            aria-label="One more book"
                            className="grid h-12 w-12 place-items-center border-[3px] border-ink bg-white shadow-comic-sm active:translate-y-0.5 active:shadow-none"
                        >
                            <Plus className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <input
                        type="range"
                        min={1}
                        max={100}
                        value={Math.min(count, 100)}
                        onChange={(event) => set(Number(event.target.value))}
                        aria-label="Number of books"
                        className="mt-5 w-full accent-crimson-600"
                    />
                    <output htmlFor={inputId} aria-live="polite" className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-dashed border-ink/20 pt-5">
                        <span className="text-lg text-ink-soft">
                            {plural(count, 'book')} × {money(PRESS_PRICE)}
                        </span>
                        <span className="font-marker text-5xl text-crimson-700">{money(count * PRESS_PRICE)}</span>
                    </output>
                    <p className="mt-3 text-sm text-ink-soft">Plus shipping, and any deep cleaning ($25–$150 per book).</p>
                </div>
            </div>
        </section>
    );
}

function SendBooks() {
    const steps = [
        {
            icon: FileText,
            title: 'Fill out the press form',
            body: (
                <>
                    <p>List each book’s title and number with its market value, then pack the form with your books.</p>
                    <ButtonAnchor href={site.forms.pressPdf} download size="sm" className="mt-4">
                        <FileText className="h-4 w-4" aria-hidden="true" /> Press form (PDF)
                    </ButtonAnchor>
                </>
            )
        },
        {
            icon: Package,
            title: 'Ship them, or drop them off',
            body: (
                <>
                    <p>Mail your books to:</p>
                    <address className="mt-2 border-l-4 border-pow-400 pl-3 font-semibold not-italic">
                        {site.address.name}
                        <br />
                        {site.address.street}
                        <br />
                        {site.address.city}, {site.address.region} {site.address.postalCode}
                    </address>
                    <p className="mt-3">
                        Or hand them over at a{' '}
                        <Link to="/conventions" className="font-semibold text-crimson-700 underline underline-offset-2">
                            convention
                        </Link>
                        .
                    </p>
                </>
            )
        },
        {
            icon: Wallet,
            title: 'Pay your way',
            body: (
                <>
                    <p>The form totals pressing, any deep cleaning and shipping. Pay with:</p>
                    <ul className="mt-2 space-y-1">
                        {site.payments.map((payment) => (
                            <li key={payment.name}>
                                <strong className="condensed tracking-wide uppercase">{payment.name}</strong> {payment.handle}
                            </li>
                        ))}
                    </ul>
                </>
            )
        }
    ];

    return (
        <section id="send" aria-labelledby="send-title" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6">
            <SectionHeading id="send-title" eyebrow="Send your books" title="Three steps to the Press Room" />
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
                {steps.map(({ icon: Icon, title, body }, i) => (
                    <Reveal as="li" key={title} delay={i * 80}>
                        <div className="relative h-full border-[3px] border-ink bg-white p-6 pt-8 shadow-comic">
                            <span aria-hidden="true" className="absolute -top-5 left-5 grid h-10 w-10 -rotate-6 place-items-center border-[3px] border-ink bg-pow-400 font-display text-2xl shadow-comic-sm">
                                {i + 1}
                            </span>
                            <Icon className="h-8 w-8 text-crimson-600" aria-hidden="true" />
                            <h3 className="mt-3 font-display text-3xl tracking-wide">
                                <span className="sr-only">Step {i + 1}: </span>
                                {title}
                            </h3>
                            <div className="mt-2 text-ink-soft">{body}</div>
                        </div>
                    </Reveal>
                ))}
            </ol>
        </section>
    );
}

function GoodToKnow() {
    const cards = [
        { icon: Sparkles, title: 'What pressing fixes', text: 'Non-color-breaking bends, waves, ripples and dents usually press out.' },
        { icon: CircleSlash, title: 'What it can’t', text: 'Tears, missing pieces and creases that break the color stay put. Not sure about a book? Ask before you send it.' },
        { icon: CalendarDays, title: 'Meeting at a show?', text: 'Drop your books off at a convention Darren is working and skip the shipping.' }
    ];
    return (
        <section aria-labelledby="know-title" className="border-t-[3px] border-ink bg-paper">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                <h2 id="know-title" className="font-display text-5xl tracking-wide">
                    Good to know
                </h2>
                <ul className="mt-8 grid gap-5 md:grid-cols-3">
                    {cards.map(({ icon: Icon, title, text }) => (
                        <li key={title} className="flex gap-4 border-[3px] border-ink bg-white p-5 shadow-comic-sm">
                            <Icon className="h-7 w-7 shrink-0 text-cobalt-600" aria-hidden="true" />
                            <div>
                                <h3 className="font-display text-2xl tracking-wide">{title}</h3>
                                <p className="mt-1 text-ink-soft">{text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default function PressRoom() {
    const [zoom, setZoom] = useState<number | null>(null);

    return (
        <>
            <Seo page="pressRoom" schema={[pressingSchema(), organizationSchema()]} />
            <PageHero
                tone="ink"
                eyebrow="Ditko Club Comic Pressing"
                title="The Press"
                accent="Room"
                intro={
                    <p>
                        When you entrust your books to The Press Room, rest assured they’ll be treated with the utmost care and attention. Each book is carefully cleaned and pressed
                        for a minimum of two 24-hour presses.
                    </p>
                }
                aside={<HeroResult />}
            >
                <ButtonAnchor href={site.forms.pressPdf} download size="lg">
                    <FileText className="h-5 w-5" aria-hidden="true" /> Download the press form
                </ButtonAnchor>
                <ButtonAnchor href="#send" variant="white" size="lg">
                    How to send books
                </ButtonAnchor>
            </PageHero>
            <Prices />
            <Method />
            <Results onOpen={setZoom} />
            <Estimator />
            <SendBooks />
            <GoodToKnow />
            <ContactBand title="Questions about your books?" balloon="Ask me about your books!">
                <p>
                    Not sure whether a book needs pressing or a deep clean? Email {site.ownerFirst} or call {site.phone.display}.{' '}
                    <a href={`mailto:${site.email}?subject=${encodeURIComponent('Pressing question')}`} className="inline-flex items-center gap-1 font-semibold underline underline-offset-2">
                        <Mail className="h-4 w-4" aria-hidden="true" /> {site.email}
                    </a>
                </p>
            </ContactBand>
            <Lightbox items={PRESS_RESULTS} index={zoom} onChange={setZoom} />
        </>
    );
}
