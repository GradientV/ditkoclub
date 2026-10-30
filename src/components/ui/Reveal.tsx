import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
    as?: 'div' | 'li' | 'section' | 'article';
    delay?: number;
    className?: string;
    children: ReactNode;
};

/**
 * fades and slides its children in the first time they scroll into view.
 * the prerendered HTML and the browser's first pass both start hidden (via CSS, and only
 * when scripts run), so hydration matches and nothing stays invisible without JavaScript.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className, children }: Props) {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (!('IntersectionObserver' in window)) {
            // oxlint-disable-next-line react/set-state-in-effect
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            // threshold 0 so blocks taller than the screen still trigger
            { threshold: 0, rootMargin: '0px 0px -8% 0px' }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            // the ref type differs per tag; every one of them is an HTMLElement
            ref={ref as never}
            className={cn('reveal', visible && 'is-visible', className)}
            style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
        >
            {children}
        </Tag>
    );
}
