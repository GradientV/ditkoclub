import { Link } from 'react-router';
import { ArrowRight, BookOpen, CalendarDays, PenLine, ShieldCheck, Sparkles } from 'lucide-react';
import ContactBand from '@/components/ContactBand';
import Seo from '@/components/Seo';
import Web from '@/components/brand/Web';
import SlabCard from '@/components/collection/SlabCard';
import { ButtonLink } from '@/components/ui/Button';
import { Balloon, Burst, Caption, SectionHeading } from '@/components/ui/Comic';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { AVAILABLE, BOOKS, SOLD, requireBook, signers, type Book } from '@/data/books';
import { CATALOG, LOWEST_PRICE } from '@/data/catalog';
import { CONVENTIONS, CONVENTIONS_YEAR, calendarTile, formatDates, showStatus } from '@/data/conventions';
import { bookPath } from '@/data/pages';
import { PRESS_PRICE } from '@/data/pressing';
import { useToday } from '@/hooks/useToday';
import { cn } from '@/lib/cn';
import { money } from '@/lib/format';
import { organizationSchema, websiteSchema } from '@/lib/schema';

/** the three slabs fanned out in the hero: left, front, right */
const FAN = ['wha-3', 'mr-a-1973', 'static-12'].map(requireBook);
const FROM_PRICE = Math.min(...AVAILABLE.map((book) => book.price ?? Infinity));

function fanLabel(book: Book) {
    return `${book.title}, CGC ${book.grade}, signed by ${signers(book)}${book.price ? `: ${money(book.price)}${book.obo ? ' or best offer' : ''}` : ''}`;
}

function SlabFan() {
    const [left, front, right] = FAN;
    const slab = 'block border-[3px] border-ink bg-ink shadow-comic transition-transform duration-300';
    return (
        <div className="relative mx-auto aspect-[10/9] w-full max-w-[34rem]">
            <Link to={bookPath(left)} aria-label={fanLabel(left)} className={cn(slab, 'absolute top-[13%] left-0 w-[43%] -rotate-[9deg] hover:-translate-y-2 hover:-rotate-[5deg]')}>
                <Photo photo={left.photo} alt="" sizes="(min-width: 1024px) 230px, 40vw" eager className="w-full" />
            </Link>
            <Link to={bookPath(right)} aria-label={fanLabel(right)} className={cn(slab, 'absolute top-[13%] right-0 w-[43%] rotate-[8deg] hover:-translate-y-2 hover:rotate-[4deg]')}>
                <Photo photo={right.photo} alt="" sizes="(min-width: 1024px) 230px, 40vw" eager className="w-full" />
            </Link>
            <Link
                to={bookPath(front)}
                aria-label={fanLabel(front)}
                className={cn(slab, 'absolute top-0 left-1/2 z-10 w-[50%] -translate-x-1/2 shadow-comic-lg hover:-translate-y-2')}
            >
                <Photo photo={front.photo} alt="" sizes="(min-width: 1024px) 270px, 48vw" priority className="w-full" />
            </Link>
            <Burst tone="pow" className="absolute -top-5 -right-2 z-20 w-28 animate-wiggle sm:w-36">
                <span className="font-display text-lg leading-[0.9] tracking-wide sm:text-2xl">
                    Signed by
                    <br />
                    Steve Ditko!
                </span>
            </Burst>
            <p className="condensed absolute -bottom-3 left-1/2 z-20 -translate-x-1/2 -rotate-2 border-[3px] border-ink bg-pow-200 px-3 py-1.5 text-[0.72rem] font-extrabold tracking-[0.16em] whitespace-nowrap text-ink uppercase shadow-comic-sm sm:text-xs">
                CGC × JSA · Authentic Autograph
            </p>
        </div>
    );
}

function Hero() {
    return (
        <section className="relative overflow-hidden border-b-[3px] border-ink bg-cobalt-700 text-white">
            <div
                aria-hidden="true"
                className="sunburst absolute top-1/2 left-[72%] aspect-square w-[170%] -translate-x-1/2 -translate-y-1/2 text-white/[0.07] [mask-image:radial-gradient(circle,black,transparent_62%)] lg:w-[115%]"
            />
            <div aria-hidden="true" className="halftone absolute inset-0 text-cobalt-950/45 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />
            <Web className="absolute -top-1 -left-1 w-52 text-white/15 sm:w-80" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:pt-16 lg:pb-24">
                <div>
                    <Caption>First time offered</Caption>
                    <h1 className="comic-stroke mt-5 font-display text-[clamp(3.9rem,14vw,8.6rem)] leading-[0.84] tracking-wide">
                        The Ditko <span className="block text-pow-400">Collection</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-xl text-pretty text-white/90 sm:text-2xl">
                        Books personally signed by Steve Ditko, among the most elusive signatures in comic collecting.
                    </p>
                    <p className="mt-3 font-letter text-2xl text-pow-200 sm:text-3xl">A rare opportunity to own a piece of comic book history.</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <ButtonLink to="/collection" size="lg">
                            See the collection <ArrowRight className="h-5 w-5" aria-hidden="true" />
                        </ButtonLink>
                        <ButtonLink to="/ditko-books" size="lg" variant="white">
                            Order Ditko books
                        </ButtonLink>
                    </div>
                    <ul className="condensed mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[0.95rem] font-bold tracking-wide text-white/85 uppercase">
                        <li className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-pow-400" aria-hidden="true" /> CGC × JSA authenticated
                        </li>
                        <li className="flex items-center gap-2">
                            <PenLine className="h-5 w-5 text-pow-400" aria-hidden="true" /> {BOOKS.length} signed books
                        </li>
                        <li className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-pow-400" aria-hidden="true" /> {AVAILABLE.length} available now
                        </li>
                    </ul>
                </div>
                <SlabFan />
            </div>
        </section>
    );
}

function AvailableNow() {
    return (
        <section aria-labelledby="available-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <SectionHeading id="available-title" eyebrow="Available now" title={`${AVAILABLE.length} signed books, ready for a new home`}>
                    <p>
                        From Steve Ditko’s own collection, every one signed on the cover and sealed by CGC. From {money(FROM_PRICE)}, and open to offers.
                    </p>
                </SectionHeading>
                <Balloon tail="left" className="max-w-xs shrink-0 -rotate-1 self-start lg:mb-6 lg:self-auto">
                    Click a book for its story and price!
                </Balloon>
            </div>
            <ul className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                {AVAILABLE.map((book, i) => (
                    <Reveal as="li" key={book.slug} delay={i * 70}>
                        <SlabCard book={book} />
                    </Reveal>
                ))}
            </ul>
            <p className="mt-10 text-center">
                <ButtonLink to="/collection" variant="white">
                    See all {BOOKS.length} books, including the ones that sold <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </ButtonLink>
            </p>
        </section>
    );
}

function HiddenForDecades() {
    return (
        <section aria-labelledby="decades-title" className="relative overflow-hidden border-y-[3px] border-ink bg-newsprint">
            <div aria-hidden="true" className="halftone absolute inset-0 text-ink/[0.06]" />
            <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <Reveal>
                    <div className="-rotate-1 border-[3px] border-ink bg-white p-7 shadow-comic sm:p-9">
                        <Caption tone="ink">Hidden for decades</Caption>
                        <h2 id="decades-title" className="mt-5 font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl">
                            Now, for the first time
                        </h2>
                        <p className="mt-5 text-lg leading-relaxed sm:text-xl">
                            For decades these books remained hidden from the public. Now a selection of comics personally signed by Steve Ditko, including rare Spider-Man
                            books signed by both Steve Ditko and Stan Lee, is being made available.
                        </p>
                        <p className="mt-4 text-ink-soft">
                            Steve Ditko signatures are among the most elusive in comic collecting, making this a rare opportunity to see and acquire pieces connected to one
                            of the most influential creators in comic book history.
                        </p>
                    </div>
                </Reveal>

                <div>
                    <div className="flex items-end justify-between gap-4">
                        <h3 className="font-display text-4xl tracking-wide">Already found a home</h3>
                        <Link to="/collection?show=sold" className="condensed shrink-0 font-extrabold tracking-wide text-crimson-700 uppercase hover:underline">
                            All sold books →
                        </Link>
                    </div>
                    <ul className="no-scrollbar -mx-4 mt-6 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
                        {SOLD.map((book) => (
                            <li key={book.slug} className="w-40 shrink-0 snap-start sm:w-auto">
                                <Link to={bookPath(book)} className="group block border-[3px] border-ink bg-white shadow-comic-sm transition-transform hover:-translate-y-1">
                                    <span className="block bg-paper p-2">
                                        <Photo photo={book.photo} sizes="(min-width: 1024px) 190px, (min-width: 640px) 28vw, 160px" fit="contain" className="aspect-[4/5] w-full" />
                                    </span>
                                    <span className="block border-t-[3px] border-ink px-2.5 py-2">
                                        <span className="block font-display text-lg leading-tight tracking-wide">{book.title}</span>
                                        <span className="condensed block text-xs font-bold tracking-wide text-ink-soft uppercase">
                                            {book.signedBy.length > 1 ? 'Signed by Ditko & Lee' : 'Signed by Ditko'}
                                            {book.price !== null && ` · ${money(book.price)}`}
                                        </span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function WhatWeDo() {
    return (
        <section aria-labelledby="services-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <SectionHeading id="services-title" eyebrow="Welcome to Ditko Club" title="Your source for all things Ditko" align="center">
                <p>Signed books, out-of-print Ditko and Robin Snyder comics, and a press room that treats your books right.</p>
            </SectionHeading>

            <div className="mt-14 grid gap-7 lg:grid-cols-[1.15fr_1fr] lg:grid-rows-2">
                <Reveal className="lg:row-span-2">
                    <Link
                        to="/collection"
                        className="group relative flex h-full flex-col overflow-hidden border-[3px] border-ink bg-crimson-600 text-white shadow-comic transition-[transform,box-shadow] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-comic-lg"
                    >
                        <div aria-hidden="true" className="halftone absolute inset-0 text-crimson-900/40" />
                        <div className="relative p-7 sm:p-9">
                            <Caption tone="white">Signed & authenticated</Caption>
                            <h3 className="comic-stroke mt-4 font-display text-5xl leading-none tracking-wide sm:text-6xl">The Ditko Collection</h3>
                            <p className="mt-3 max-w-md text-lg text-white/90">
                                Comics personally signed by Steve Ditko, every one CGC graded with a CGC × JSA Authentic Autograph label. Available now from{' '}
                                {money(FROM_PRICE)}.
                            </p>
                            <span className="condensed mt-5 inline-flex items-center gap-2 text-lg font-extrabold tracking-wide text-pow-300 uppercase">
                                See the collection <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </div>
                        <div className="relative mt-auto flex items-end justify-center gap-4 px-6">
                            {['static-11', 'static-12'].map(requireBook).map((book, i) => (
                                <span key={book.slug} className={cn('block w-[38%] max-w-52 translate-y-6 border-[3px] border-ink bg-ink shadow-comic', i === 0 ? '-rotate-6' : 'rotate-3')}>
                                    <Photo photo={book.photo} alt="" sizes="(min-width: 1024px) 200px, 38vw" className="w-full" />
                                </span>
                            ))}
                        </div>
                    </Link>
                </Reveal>

                <Reveal delay={80}>
                    <Link
                        to="/ditko-books"
                        className="group relative flex h-full items-center gap-6 overflow-hidden border-[3px] border-ink bg-pow-400 p-7 shadow-comic transition-[transform,box-shadow] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-comic-lg sm:p-8"
                    >
                        <div aria-hidden="true" className="halftone absolute inset-0 text-pow-600/40" />
                        <div className="relative min-w-0 flex-1">
                            <Caption tone="ink">From {money(LOWEST_PRICE)}</Caption>
                            <h3 className="mt-4 font-display text-4xl leading-none tracking-wide sm:text-5xl">Out-of-print Ditko books</h3>
                            <p className="mt-3 text-ink-soft">
                                {CATALOG.length} titles from Steve Ditko and Robin Snyder: Avenging World, The Mocker, Mr. A and the 32-page Ditko books.
                            </p>
                            <span className="condensed mt-4 inline-flex items-center gap-2 font-extrabold tracking-wide text-crimson-700 uppercase">
                                <BookOpen className="h-5 w-5" aria-hidden="true" /> Build your order
                            </span>
                        </div>
                        <span className="relative hidden w-28 shrink-0 rotate-3 border-[3px] border-ink bg-crimson-600 shadow-comic-sm sm:block">
                            <Photo photo="mascot" alt="" sizes="112px" className="aspect-[275/304] w-full" />
                        </span>
                    </Link>
                </Reveal>

                <Reveal delay={160}>
                    <Link
                        to="/press-room"
                        className="group relative flex h-full items-center gap-6 overflow-hidden border-[3px] border-ink bg-cobalt-600 p-7 text-white shadow-comic transition-[transform,box-shadow] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-comic-lg sm:p-8"
                    >
                        <div aria-hidden="true" className="halftone absolute inset-0 text-cobalt-900/40" />
                        <div className="relative min-w-0 flex-1">
                            <Caption>{money(PRESS_PRICE)} a book</Caption>
                            <h3 className="comic-stroke mt-4 font-display text-4xl leading-none tracking-wide sm:text-5xl">The Press Room</h3>
                            <p className="mt-3 text-white/85">Careful cleaning and pressing, with two 24-hour presses for every book. Deep cleaning from $25.</p>
                            <span className="condensed mt-4 inline-flex items-center gap-2 font-extrabold tracking-wide text-pow-300 uppercase">
                                How it works <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </div>
                        <span className="relative hidden w-32 shrink-0 -rotate-3 sm:block">
                            <span className="block border-[3px] border-ink bg-white shadow-comic-sm">
                                <Photo photo="pressDaredevil" alt="" sizes="128px" className="aspect-[3/4] w-full" />
                            </span>
                            <Burst tone="pow" points={12} className="absolute -top-8 -right-6 w-20">
                                <span className="font-display text-base leading-none text-ink">4.0→6.0!</span>
                            </Burst>
                        </span>
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}

function RareSignature() {
    return (
        <section aria-labelledby="rare-title" className="relative overflow-hidden border-y-[3px] border-ink bg-ink text-white">
            <div aria-hidden="true" className="halftone absolute inset-0 text-white/[0.05]" />
            <Web className="absolute -top-1 -right-1 w-56 -scale-x-100 text-white/10 sm:w-80" />
            <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <Reveal>
                    <figure className="relative mx-auto max-w-lg -rotate-2">
                        <div className="border-[3px] border-white bg-white p-2 shadow-[8px_8px_0_0_var(--color-pow-400)]">
                            <Photo photo="ditko1959" sizes="(min-width: 1024px) 480px, 92vw" className="aspect-[820/548] w-full grayscale" />
                        </div>
                        <figcaption className="condensed mt-4 text-center text-sm font-bold tracking-wide text-white/60 uppercase">Steve Ditko in his studio, 1959</figcaption>
                    </figure>
                </Reveal>
                <div>
                    <Caption>Why it matters</Caption>
                    <h2 id="rare-title" className="comic-shadow mt-4 font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl">
                        Why a Ditko signature is so rare
                    </h2>
                    <div className="mt-5 space-y-4 text-lg text-white/85">
                        <p>
                            Steve Ditko co-created Spider-Man and Doctor Strange, then spent the rest of his career out of the spotlight. He largely declined interviews and public
                            appearances, and let the work speak for him.
                        </p>
                        <blockquote className="border-l-4 border-pow-400 pl-4 font-letter text-3xl leading-snug text-pow-200">
                            “Steve Ditko is the brand name.”
                            <footer className="condensed mt-1 font-sans text-sm font-bold tracking-wide text-white/60 uppercase">Steve Ditko, 1969</footer>
                        </blockquote>
                        <p>
                            Signed Ditko books rarely surface, and since his death in 2018 there will be no new ones. That’s why every book in the collection was authenticated
                            by JSA and sealed by CGC.
                        </p>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <ButtonLink to="/about">His story</ButtonLink>
                        <ButtonLink to="/collection#authentication" variant="white">
                            How authentication works
                        </ButtonLink>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ShowsTeaser() {
    const today = useToday();
    const statuses = CONVENTIONS.map((show) => (today ? showStatus(show, today) : null));
    const allWrapped = today !== null && statuses.every((status) => status === 'wrapped');

    return (
        <section aria-labelledby="shows-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <div>
                    <SectionHeading id="shows-title" eyebrow="On the road" title="Catch Ditko Club at the show">
                        <p>Say hello to Darren, talk Ditko, and drop off your books for pressing at the conventions he works.</p>
                    </SectionHeading>
                    {allWrapped && (
                        <p className="mt-5 inline-block -rotate-1 border-[3px] border-ink bg-pow-200 px-4 py-2 font-letter text-xl shadow-comic-sm">
                            That’s a wrap on {CONVENTIONS_YEAR}! The {CONVENTIONS_YEAR + 1} schedule is coming soon.
                        </p>
                    )}
                    <div className="mt-7">
                        <ButtonLink to="/conventions" variant="crimson">
                            <CalendarDays className="h-5 w-5" aria-hidden="true" /> The full schedule
                        </ButtonLink>
                    </div>
                </div>
                <ol className="grid gap-4 sm:grid-cols-2">
                    {CONVENTIONS.map((show, i) => {
                        const tile = calendarTile(show);
                        const wrapped = statuses[i] === 'wrapped';
                        return (
                            <li key={show.id} className={cn('flex items-center gap-4 border-[3px] border-ink bg-white p-4 shadow-comic-sm', wrapped && 'bg-paper')}>
                                <span className={cn('grid w-16 shrink-0 border-[3px] border-ink text-center', wrapped ? 'bg-newsprint' : 'bg-crimson-600 text-white')}>
                                    <span className="condensed border-b-[3px] border-ink bg-ink py-0.5 text-xs font-extrabold tracking-widest text-white uppercase">{tile.month}</span>
                                    <span className="py-1 font-display text-2xl leading-none">{tile.days}</span>
                                </span>
                                <span className="min-w-0">
                                    <span className={cn('block font-display text-2xl leading-none tracking-wide', wrapped && 'text-ink/60')}>{show.name}</span>
                                    <span className="mt-1 block text-sm text-ink-soft">
                                        {formatDates(show)} · {show.city}
                                    </span>
                                    {wrapped && <span className="condensed mt-1 block text-xs font-extrabold tracking-widest text-crimson-700 uppercase">Wrapped</span>}
                                </span>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}

export default function Home() {
    return (
        <>
            <Seo page="home" schema={[organizationSchema(), websiteSchema()]} />
            <Hero />
            <AvailableNow />
            <HiddenForDecades />
            <WhatWeDo />
            <RareSignature />
            <ShowsTeaser />
            <ContactBand />
        </>
    );
}
