import { ArrowRight, BookOpen, CalendarDays, Package, PenLine } from 'lucide-react';
import { Link } from 'react-router';
import ContactBand from '@/components/ContactBand';
import PageHero from '@/components/PageHero';
import Seo from '@/components/Seo';
import Timeline from '@/components/Timeline';
import { ButtonLink } from '@/components/ui/Button';
import { Balloon, Caption, SectionHeading } from '@/components/ui/Comic';
import Photo from '@/components/ui/Photo';
import { site } from '@/data/site';
import { organizationSchema } from '@/lib/schema';

//**test */

function DitkoPortrait() {
    return (
        <figure className="mx-auto max-w-lg">
            <div className="-rotate-2 border-[3px] border-ink bg-white p-2 shadow-comic-lg">
                <Photo photo="ditko1959" sizes="(min-width: 1024px) 500px, 92vw" priority className="aspect-[820/548] w-full grayscale" />
            </div>
            <figcaption className="condensed mt-5 text-center text-sm font-bold tracking-wide text-white/70 uppercase">Steve Ditko in his studio, November 1959</figcaption>
        </figure>
    );
}

const FACTS: Array<[string, string]> = [
    ['Born', 'November 2, 1927, Johnstown, Pennsylvania'],
    ['Died', 'Late June 2018, New York City, at 90'],
    ['Created or co-created', 'Spider-Man, Doctor Strange, Captain Atom, the Question, the Creeper, Hawk and Dove, Mr. A'],
    ['Honors', 'Jack Kirby Hall of Fame (1990), Will Eisner Hall of Fame (1994), Disney Legend (2024)']
];

const CLUB = [
    { icon: PenLine, title: 'The Ditko Collection', text: 'Books personally signed by Steve Ditko, offered for the first time.', to: '/collection' },
    { icon: BookOpen, title: 'Ditko Books', text: 'Out-of-print comics from Steve Ditko and Robin Snyder, at wholesale prices.', to: '/ditko-books' },
    { icon: Package, title: 'The Press Room', text: 'Careful pressing and cleaning, with two 24-hour presses for every book.', to: '/press-room' },
    { icon: CalendarDays, title: 'Conventions', text: 'Find Darren on the road, and drop off books for pressing at the show.', to: '/conventions' }
];

export default function About() {
    return (
        <>
            <Seo page="about" schema={organizationSchema()} />
            <PageHero
                tone="mystic"
                eyebrow="Steve Ditko, 1927–2018"
                title="The Man Behind"
                accent="the Signature"
                intro={<p>He co-created Spider-Man and Doctor Strange, then spent half a century letting his work do the talking. Here’s why his autograph is so rare.</p>}
                aside={<DitkoPortrait />}
            />

            <section aria-labelledby="bio-title" className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <SectionHeading id="bio-title" eyebrow="Who was Steve Ditko?" title="One of comics’ great originals" />
                    <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
                        <p>
                            Steve Ditko drew the first 38 issues of The Amazing Spider-Man, co-creating the hero with Stan Lee along with much of his world: the supporting cast and
                            villains like Doctor Octopus, the Sandman, the Lizard, Electro and the Green Goblin. He co-created Doctor Strange and sent him through some of the strangest
                            dimensions ever printed.
                        </p>
                        <p>
                            Then, in 1966, he walked away from Marvel. He went on to create or co-create the Question, the Creeper, Hawk and Dove and Mr. A for Charlton, DC and small
                            publishers, and for decades published his own work with his longtime editor, Robin Snyder.
                        </p>
                        <p>
                            Through it all, Ditko largely declined interviews and public appearances. He preferred to communicate through his work, though he answered his fan mail,
                            writing thousands of letters by hand.
                        </p>
                    </div>
                    <blockquote className="mt-8 max-w-xl">
                        <div className="bubble px-6 py-5 shadow-comic-sm">
                            <p className="font-letter text-3xl leading-snug">“Steve Ditko is the brand name.”</p>
                        </div>
                        <footer className="condensed mt-6 ml-5 font-extrabold tracking-wide text-ink-soft uppercase">Steve Ditko, 1969, on why his work mattered more than his personality</footer>
                    </blockquote>
                </div>

                <aside aria-label="Steve Ditko at a glance" className="self-start border-[3px] border-ink bg-white shadow-comic">
                    <p className="font-display bg-ink px-5 py-3 text-2xl tracking-wide text-pow-300">At a glance</p>
                    <dl className="divide-y-2 divide-dashed divide-ink/15 px-5">
                        {FACTS.map(([label, value]) => (
                            <div key={label} className="py-4">
                                <dt className="condensed text-sm font-extrabold tracking-widest text-crimson-700 uppercase">{label}</dt>
                                <dd className="mt-1 text-lg">{value}</dd>
                            </div>
                        ))}
                    </dl>
                    <div className="border-t-[3px] border-ink bg-pow-100 px-5 py-4">
                        <p className="font-display text-2xl tracking-wide">Why so few signatures?</p>
                        <p className="mt-1 text-ink-soft">
                            No convention circuit, no signing tours, and no new signatures since 2018. Signed Ditko books surface rarely, and forgeries exist, which is why every book in
                            the collection is CGC × JSA authenticated.
                        </p>
                        <Link to="/collection#authentication" className="condensed mt-3 inline-flex items-center gap-1.5 font-extrabold tracking-wide text-crimson-700 uppercase hover:underline">
                            How authentication works <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </aside>
            </section>

            <section aria-labelledby="timeline-title" className="relative overflow-hidden border-y-[3px] border-ink bg-newsprint">
                <div aria-hidden="true" className="halftone absolute inset-0 text-ink/[0.05]" />
                <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
                    <SectionHeading id="timeline-title" eyebrow="1927 – 2018" title="Ditko through the decades" align="center">
                        <p>From Charlton horror to Spider-Man to the books he published himself. Covers from the 1950s and ’60s are public domain; the slabs are from the Ditko Collection.</p>
                    </SectionHeading>
                    <Timeline />
                </div>
            </section>

            <section aria-labelledby="club-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                    <div>
                        <Caption>About the club</Caption>
                        <h2 id="club-title" className="mt-4 font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl">
                            Welcome to Ditko Club
                        </h2>
                        <p className="mt-4 text-lg text-ink-soft">
                            Ditko Club is {site.owner}’s home for all things Ditko, based in {site.town}: {site.tagline.charAt(0).toLowerCase() + site.tagline.slice(1)}, plus
                            The Press Room for comic pressing and cleaning.
                        </p>
                        <div className="mt-8 flex items-end gap-5">
                            <span className="w-32 shrink-0 -rotate-3 border-[3px] border-ink bg-crimson-600 shadow-comic">
                                <Photo photo="mascot" sizes="128px" className="aspect-[275/304] w-full" />
                            </span>
                            <Balloon tail="side" className="mb-6">
                                Pull up a chair!
                            </Balloon>
                        </div>
                    </div>
                    <ul className="grid gap-5 sm:grid-cols-2">
                        {CLUB.map(({ icon: Icon, title, text, to }) => (
                            <li key={to}>
                                <Link
                                    to={to}
                                    className="group flex h-full flex-col border-[3px] border-ink bg-white p-6 shadow-comic transition-[transform,box-shadow] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-comic-lg"
                                >
                                    <Icon className="h-8 w-8 text-crimson-600" aria-hidden="true" />
                                    <span className="mt-3 font-display text-3xl tracking-wide">{title}</span>
                                    <span className="mt-1 text-ink-soft">{text}</span>
                                    <span className="condensed mt-4 inline-flex items-center gap-1.5 font-extrabold tracking-wide text-crimson-700 uppercase">
                                        Go <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="mt-12 text-center">
                    <ButtonLink to="/collection" size="lg">
                        See the Ditko Collection <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </ButtonLink>
                </p>
            </section>

            <ContactBand />
        </>
    );
}
