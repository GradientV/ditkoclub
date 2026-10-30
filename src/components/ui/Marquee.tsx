import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** endless horizontal scroller. the content is drawn twice so the loop is seamless; it pauses on hover */
export default function Marquee({ children, className, duration }: { children: ReactNode; className?: string; duration?: string }) {
    return (
        <div className={cn('overflow-hidden', className)}>
            <div className="marquee-track flex w-max animate-marquee" style={duration ? { animationDuration: duration } : undefined}>
                <div className="flex shrink-0 items-center">{children}</div>
                <div className="flex shrink-0 items-center" aria-hidden="true">
                    {children}
                </div>
            </div>
        </div>
    );
}
