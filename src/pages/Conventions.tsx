import { ExternalLink, FileText, MapPin, Package } from 'lucide-react';
import ContactBand from '@/components/ContactBand';
import PageHero from '@/components/PageHero';
import Seo from '@/components/Seo';
import { MascotAvatar } from '@/components/brand/Logo';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { Caption, SectionHeading, Stamp } from '@/components/ui/Comic';
import Reveal from '@/components/ui/Reveal';
import { CONVENTIONS, CONVENTIONS_YEAR, calendarTile, formatDates, showStatus, type ShowStatus } from '@/data/conventions';
import { site } from '@/data/site';
import { useToday } from '@/hooks/useToday';
import { cn } from '@/lib/cn';

/** a convention badge on a lanyard, for the hero */
function ConBadge() {
    return (
        <div className="relative mx-auto w-64 sm:w-72" aria-hidden="true">
            <div className="flex justify-center gap-10">
                <span className="h-24 w-5 origin-bottom rotate-[18deg] border-[3px] border-ink bg-cobalt-500" />
                <span className="h-24 w-5 origin-bottom -rotate-[18deg] border-[3px] border-ink bg-cobalt-500" />
            </div>
            <div className="relative z-10 mx-auto -mt-2 h-6 w-14 rounded-sm border-[3px] border-ink bg-white" />
            <div className="-mt-1 rotate-2 border-[3px] border-ink bg-white text-center text-ink shadow-comic-lg">
                <p className="condensed bg-ink py-2 text-sm font-extrabold tracking-[0.3em] text-pow-300 uppercase">Ditko Club</p>
                <div className="px-5 pt-5 pb-4">
                    <MascotAvatar className="mx-auto h-24 w-24 shadow-comic-sm" />
                    <p className="mt-3 font-display text-4xl tracking-wide">{site.ownerFirst}</p>
                    <p className="condensed mt-1 text-xs font-extrabold tracking-widest text-ink-soft uppercase">Pressing drop-off · Ditko books</p>
                </div>
                <p className="border-t-[3px] border-ink bg-crimson-600 py-2 font-display text-xl tracking-wide text-white">See you at the show!</p>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: ShowStatus | null }) {
    if (status === 'wrapped') return <Stamp className="text-crimson-700">Wrapped</Stamp>;
    if (status === 'on-now')
        return <span className="condensed animate-pulse border-2 border-ink bg-crimson-600 px-2 py-1 text-xs font-extrabold tracking-widest text-white uppercase">On now!</span>;
    if (status === 'upcoming') return <span className="condensed border-2 border-ink bg-go-500 px-2 py-1 text-xs font-extrabold tracking-widest text-white uppercase">Upcoming</span>;
    return null;
}

export default function Conventions() {
    const today = useToday();
    const statuses = CONVENTIONS.map((show) => (today ? showStatus(show, today) : null));
    const allWrapped = today !== null && statuses.every((status) => status === 'wrapped');

    return (
        <>
            <Seo page="conventions" />
            <PageHero
                eyebrow={`The ${CONVENTIONS_YEAR} schedule`}
                title="Comic"
                accent="Conventions"
                web
                intro={<p>The comic conventions Ditko Club attends this year. Come say hello, and drop off your books for pressing at the show.</p>}
                aside={<ConBadge />}
            />

            {allWrapped && (
                <div className="border-b-[3px] border-ink bg-pow-400">
                    <p className="mx-auto max-w-7xl px-4 py-5 text-center font-letter text-2xl sm:px-6">
                        That’s a wrap on {CONVENTIONS_YEAR}! Thanks to everyone who stopped by. The {CONVENTIONS_YEAR + 1} schedule is coming soon.
                    </p>
                </div>
            )}

            <section aria-labelledby="shows-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                <h2 id="shows-title" className="font-display text-5xl tracking-wide">
                    {CONVENTIONS_YEAR} shows
                </h2>
                <ol className="mt-10 grid gap-7 md:grid-cols-2">
                    {CONVENTIONS.map((show, i) => {
                        const tile = calendarTile(show);
                        const status = statuses[i];
                        return (
                            <Reveal as="li" key={show.id} delay={(i % 2) * 80}>
                                <article className={cn('flex h-full flex-col border-[3px] border-ink bg-white shadow-comic', status === 'wrapped' && 'bg-paper')}>
                                    <div className="flex items-stretch border-b-[3px] border-ink">
                                        <div className={cn('grid w-24 shrink-0 border-r-[3px] border-ink text-center', status === 'wrapped' ? 'bg-newsprint text-ink' : 'bg-crimson-600 text-white')}>
                                            <span className="condensed bg-ink py-1 text-sm font-extrabold tracking-widest text-white uppercase">{tile.month}</span>
                                            <span className="grid place-items-center px-1 py-3 font-display text-4xl leading-none">{tile.days}</span>
                                        </div>
                                        <div className="flex min-w-0 flex-1 items-start justify-between gap-3 p-4 sm:p-5">
                                            <div className="min-w-0">
                                                <h3 className={cn('font-display text-3xl leading-none tracking-wide sm:text-4xl', status === 'wrapped' && 'text-ink/70')}>{show.name}</h3>
                                                <p className="condensed mt-2 font-bold tracking-wide text-ink-soft uppercase">{formatDates(show)}</p>
                                            </div>
                                            <StatusBadge status={status} />
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-wrap items-end justify-between gap-4 p-4 sm:p-5">
                                        <p className="flex gap-2 text-ink-soft">
                                            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-crimson-600" aria-hidden="true" />
                                            <span>
                                                {show.venue}
                                                <br />
                                                {show.city}
                                            </span>
                                        </p>
                                        <a
                                            href={show.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="condensed inline-flex items-center gap-1.5 font-extrabold tracking-wide text-crimson-700 uppercase hover:underline"
                                        >
                                            Show website <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                            <span className="sr-only">(opens {show.name}’s site)</span>
                                        </a>
                                    </div>
                                </article>
                            </Reveal>
                        );
                    })}
                </ol>
            </section>

            <section aria-labelledby="dropoff-title" className="relative overflow-hidden border-y-[3px] border-ink bg-cobalt-700 text-white">
                <div aria-hidden="true" className="halftone absolute inset-0 text-cobalt-950/40" />
                <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <SectionHeading id="dropoff-title" eyebrow="Pressing at the show" title="Bring your books, skip the shipping" light>
                        <p>
                            Fill out the press form ahead of time, list each book with its market value, and hand your books to {site.ownerFirst} at the show. Pressing and light
                            cleaning is $15 a book, with two 24-hour presses for every one.
                        </p>
                    </SectionHeading>
                    <div className="flex flex-col gap-4 border-[3px] border-ink bg-white p-6 text-ink shadow-comic sm:p-8">
                        <Caption tone="crimson">Before the show</Caption>
                        <ButtonAnchor href={site.forms.pressPdf} download size="lg">
                            <FileText className="h-5 w-5" aria-hidden="true" /> Download the press form
                        </ButtonAnchor>
                        <ButtonLink to="/press-room" variant="white" size="lg">
                            <Package className="h-5 w-5" aria-hidden="true" /> How pressing works
                        </ButtonLink>
                        <p className="text-sm text-ink-soft">Can’t make a show? You can always mail your books to the Press Room.</p>
                    </div>
                </div>
            </section>

            <ContactBand title="Meeting up at a show?" balloon="Let me know you’re coming!">
                <p>Planning to drop off a stack of books, or want to ask about a Ditko title before the show? Get in touch with {site.ownerFirst} ahead of time.</p>
            </ContactBand>
        </>
    );
}
