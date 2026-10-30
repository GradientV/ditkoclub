// the Ditko Club wordmark: the club's ink-pot mascot in a round badge, DITKO in cover-logo
// lettering, and CLUB on a yellow tag. `tone` is the background it sits on.
import { PHOTOS } from '@/data/photos';
import { cn } from '@/lib/cn';

/** the mascot's ink-bottle head, cropped into a circle */
export function MascotAvatar({ className }: { className?: string }) {
    return (
        <span className={cn('relative block shrink-0 overflow-hidden rounded-full border-[3px] border-ink bg-crimson-600', className)}>
            <img
                src={PHOTOS.mascot.src}
                alt=""
                width={275}
                height={304}
                className="absolute top-[-12%] left-1/2 w-[160%] max-w-none -translate-x-1/2"
                decoding="async"
            />
        </span>
    );
}

export default function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
    return (
        <span className={cn('inline-flex items-center gap-2.5', className)}>
            <MascotAvatar className="h-12 w-12 shadow-comic-sm" />
            <span className="flex flex-col items-start leading-none">
                <span className={cn('font-display text-[2.15rem] leading-[0.8] tracking-[0.05em]', tone === 'dark' ? 'comic-stroke text-white' : 'text-ink')}>DITKO</span>
                <span className="condensed mt-1 -rotate-2 border-2 border-ink bg-pow-400 px-1.5 py-0.5 text-[0.68rem] leading-none font-extrabold tracking-[0.3em] text-ink uppercase">
                    Club
                </span>
            </span>
        </span>
    );
}
