// what the yellow CGC × JSA label means, in plain words. facts from CGC's own label and
// guarantee pages; no CGC or JSA logos are copied, just the label's look.
import { FileSearch, PenLine, ShieldCheck, Stamp as StampIcon } from 'lucide-react';
import { Caption } from '@/components/ui/Comic';

const POINTS = [
    {
        icon: PenLine,
        title: 'Authenticated by JSA',
        text: 'The autograph experts at James Spence Authentication examined the signature on every book.'
    },
    {
        icon: StampIcon,
        title: 'Graded & sealed by CGC',
        text: 'CGC graded each book and sealed it in its holder under the yellow Authentic Autograph label.'
    },
    {
        icon: ShieldCheck,
        title: 'Backed by CGC',
        text: 'CGC’s guarantee covers the authenticity of the autograph on an Authentic Autograph label.'
    },
    {
        icon: FileSearch,
        title: 'Look it up yourself',
        text: 'Every label carries a certification number. Each book’s page links straight to its record on CGC’s site.'
    }
];

export default function AuthPanel({ id = 'authentication' }: { id?: string }) {
    return (
        <section id={id} aria-labelledby={`${id}-title`} className="relative overflow-hidden border-y-[3px] border-ink bg-ink text-white">
            <div aria-hidden="true" className="halftone absolute inset-0 text-white/[0.05]" />
            <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20">
                <div>
                    <Caption>How authentication works</Caption>
                    <h2 id={`${id}-title`} className="comic-shadow mt-4 font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl">
                        What the yellow label means
                    </h2>
                    <p className="mt-4 max-w-xl text-lg text-white/80">
                        Every book in the collection carries a CGC × JSA Authentic Autograph label: CGC’s label for signatures that weren’t signed in front of a CGC
                        witness, after JSA has authenticated them.
                    </p>

                    {/* a stand-in for the label itself, drawn in type */}
                    <div className="mt-8 max-w-md -rotate-1 border-[3px] border-ink bg-white shadow-comic">
                        <div className="condensed flex items-center justify-center gap-2 bg-ink px-3 py-1.5 text-sm font-black tracking-wide text-white">
                            CGC <span className="text-white/60">×</span> JSA <span className="font-marker text-pow-400 normal-case">Authentic Autograph</span>
                        </div>
                        <div className="flex items-stretch gap-3 bg-pow-200 p-3 text-ink">
                            <div className="grid w-16 shrink-0 place-items-center rounded-lg border-2 border-ink bg-white">
                                <span className="condensed text-3xl leading-none font-black">9.8</span>
                            </div>
                            <div className="condensed min-w-0 text-[0.8rem] leading-snug font-semibold tracking-wide uppercase">
                                <p className="text-base font-black normal-case">Charlton Action: Featuring Static #12</p>
                                <p>Steve Ditko authenticated autograph</p>
                                <p>From the collection of Steve Ditko</p>
                                <p className="mt-1 font-mono text-xs tracking-normal text-ink-soft">4750033003</p>
                            </div>
                        </div>
                    </div>
                </div>

                <ul className="grid gap-4 sm:grid-cols-2">
                    {POINTS.map(({ icon: Icon, title, text }) => (
                        <li key={title} className="border-[3px] border-ink bg-white p-5 text-ink shadow-[6px_6px_0_0_var(--color-pow-400)]">
                            <Icon className="h-8 w-8 text-crimson-600" aria-hidden="true" />
                            <h3 className="mt-3 font-display text-2xl tracking-wide">{title}</h3>
                            <p className="mt-1.5 text-ink-soft">{text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
