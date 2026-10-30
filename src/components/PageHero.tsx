// the banner at the top of every inner page: a colored panel with action lines,
// Ben-Day dots and an optional web in the corner. `aside` fills the right side on wide screens.
import type { ReactNode } from 'react';
import Web from '@/components/brand/Web';
import { Caption } from '@/components/ui/Comic';
import { cn } from '@/lib/cn';

const TONES = {
    crimson: 'bg-crimson-600',
    cobalt: 'bg-cobalt-700',
    ink: 'bg-ink',
    mystic: 'bg-mystic-700'
} as const;

type Props = {
    eyebrow?: string;
    title: ReactNode;
    /** the part of the title in yellow */
    accent?: ReactNode;
    intro?: ReactNode;
    tone?: keyof typeof TONES;
    aside?: ReactNode;
    web?: boolean;
    children?: ReactNode;
};

export default function PageHero({ eyebrow, title, accent, intro, tone = 'crimson', aside, web = false, children }: Props) {
    return (
        <section className={cn('relative overflow-hidden border-b-[3px] border-ink text-white', TONES[tone])}>
            <div
                aria-hidden="true"
                className="sunburst absolute top-1/2 -right-1/4 aspect-square w-[110%] -translate-y-1/2 text-white/[0.06] [mask-image:radial-gradient(circle,black,transparent_68%)]"
            />
            <div aria-hidden="true" className="halftone absolute inset-0 text-black/25 [mask-image:linear-gradient(to_top,black,transparent_75%)]" />
            {web && <Web className="absolute -top-1 -left-1 w-48 text-white/15 sm:w-72" />}

            <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
                <div>
                    {eyebrow && <Caption>{eyebrow}</Caption>}
                    <h1 className="comic-stroke mt-5 font-display text-6xl leading-[0.9] tracking-wide text-balance sm:text-7xl lg:text-8xl">
                        {title} {accent && <span className="text-pow-400">{accent}</span>}
                    </h1>
                    {intro && <div className="mt-6 max-w-xl text-lg text-pretty text-white/90 sm:text-xl">{intro}</div>}
                    {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
                </div>
                {aside && <div className="relative mx-auto w-full max-w-md lg:max-w-none">{aside}</div>}
            </div>
        </section>
    );
}
