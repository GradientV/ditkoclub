// the small pieces of comic-page lettering the whole site uses:
// the narration caption box, section headings, speech balloons, starbursts and stamps.
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

const CAPTION_TONES = {
    pow: 'bg-pow-400 text-ink',
    white: 'bg-white text-ink',
    ink: 'bg-ink text-pow-300',
    crimson: 'bg-crimson-600 text-white',
    cobalt: 'bg-cobalt-600 text-white'
} as const;

/** the narration box in the corner of a comic panel */
export function Caption({ tone = 'pow', className, children }: { tone?: keyof typeof CAPTION_TONES; className?: string; children: ReactNode }) {
    return (
        <span
            className={cn(
                'condensed inline-block -rotate-1 border-[3px] border-ink px-3 py-1.5 text-[0.8rem] leading-none font-extrabold tracking-[0.14em] uppercase shadow-comic-sm',
                CAPTION_TONES[tone],
                className
            )}
        >
            {children}
        </span>
    );
}

type HeadingProps = {
    eyebrow?: string;
    title: ReactNode;
    children?: ReactNode;
    align?: 'left' | 'center';
    light?: boolean;
    id?: string;
    className?: string;
    /** h1 for page titles that use this layout; h2 everywhere else */
    as?: 'h1' | 'h2';
};

export function SectionHeading({ eyebrow, title, children, align = 'left', light = false, id, className, as: Tag = 'h2' }: HeadingProps) {
    const centered = align === 'center';
    return (
        <div className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
            {eyebrow && <Caption>{eyebrow}</Caption>}
            <Tag
                id={id}
                className={cn(
                    'mt-4 font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl',
                    light ? 'comic-shadow text-white' : 'text-ink'
                )}
            >
                {title}
            </Tag>
            {children && <div className={cn('mt-4 text-lg text-pretty', light ? 'text-white/85' : 'text-ink-soft', centered && 'mx-auto')}>{children}</div>}
        </div>
    );
}

/** a speech balloon in hand lettering. `tail` picks which corner the tail comes out of */
export function Balloon({ tail = 'left', className, children }: { tail?: 'left' | 'right' | 'side'; className?: string; children: ReactNode }) {
    return (
        <div className={cn('bubble px-5 py-3.5 shadow-comic-sm', tail === 'right' && 'bubble-right', tail === 'side' && 'bubble-left', className)}>
            <p className="font-letter text-xl leading-snug text-ink sm:text-2xl">{children}</p>
        </div>
    );
}

const BURST_TONES = {
    pow: { fill: 'var(--color-pow-400)', text: 'text-ink' },
    crimson: { fill: 'var(--color-crimson-600)', text: 'text-white' },
    cobalt: { fill: 'var(--color-cobalt-600)', text: 'text-white' },
    white: { fill: '#fff', text: 'text-ink' }
} as const;

function starPoints(points: number, inner: number) {
    const coords: string[] = [];
    for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? 50 : 50 * inner;
        const angle = (Math.PI * i) / points - Math.PI / 2;
        coords.push(`${(50 + radius * Math.cos(angle)).toFixed(2)},${(50 + radius * Math.sin(angle)).toFixed(2)}`);
    }
    return coords.join(' ');
}

/** a starburst badge. the star and its label share one grid cell, so callers place the badge themselves */
export function Burst({
    tone = 'pow',
    points = 14,
    inner = 0.74,
    className,
    children
}: {
    tone?: keyof typeof BURST_TONES;
    points?: number;
    inner?: number;
    className?: string;
    children: ReactNode;
}) {
    const { fill, text } = BURST_TONES[tone];
    return (
        <div className={cn('grid aspect-square place-items-center', text, className)}>
            <svg viewBox="-4 -4 108 108" aria-hidden="true" className="col-start-1 row-start-1 h-full w-full overflow-visible drop-shadow-[4px_4px_0_var(--color-ink)]">
                <polygon points={starPoints(points, inner)} fill={fill} stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
            <div className="relative col-start-1 row-start-1 px-[18%] text-center leading-none">{children}</div>
        </div>
    );
}

/** a rubber stamp in marker, for SOLD and WRAPPED */
export function Stamp({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <span className={cn('inline-block -rotate-6 border-[3px] border-current px-2 py-0.5 font-marker text-base leading-tight tracking-wide uppercase', className)}>
            {children}
        </span>
    );
}

/** a sound effect, for decoration only */
export function Sfx({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <span aria-hidden="true" className={cn('comic-stroke pointer-events-none inline-block font-display tracking-wider select-none', className)}>
            {children}
        </span>
    );
}
