// chunky comic buttons: a thick ink border and a hard shadow that presses in when
// you click. ButtonLink for pages on this site, ButtonAnchor for phone numbers,
// email, downloads and other sites, Button for actions.
import type { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/cn';

const VARIANTS = {
    pow: 'bg-pow-400 text-ink hover:bg-pow-300',
    crimson: 'bg-crimson-600 text-white hover:bg-crimson-500',
    cobalt: 'bg-cobalt-600 text-white hover:bg-cobalt-500',
    ink: 'bg-ink text-paper hover:bg-ink-soft',
    white: 'bg-white text-ink hover:bg-paper'
} as const;

const SIZES = {
    sm: 'px-3.5 py-2 text-[0.95rem]',
    md: 'px-5 py-3 text-[1.05rem]',
    lg: 'px-6 py-3.5 text-lg sm:text-xl'
} as const;

export type ButtonStyle = { variant?: keyof typeof VARIANTS; size?: keyof typeof SIZES; className?: string };

export function buttonClasses({ variant = 'pow', size = 'md', className }: ButtonStyle = {}) {
    return cn(
        'condensed inline-flex items-center justify-center gap-2 border-[3px] border-ink leading-none font-extrabold tracking-wide uppercase shadow-comic-sm',
        'transition-[transform,box-shadow,background-color] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic',
        'active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:pointer-events-none disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className
    );
}

type LinkProps = ButtonStyle & { to: string; children: ReactNode } & Omit<ComponentProps<typeof Link>, 'to' | 'className' | 'children'>;

export function ButtonLink({ variant, size, className, children, ...rest }: LinkProps) {
    return (
        <Link className={buttonClasses({ variant, size, className })} {...rest}>
            {children}
        </Link>
    );
}

type AnchorProps = ButtonStyle & ComponentProps<'a'>;

export function ButtonAnchor({ variant, size, className, children, ...rest }: AnchorProps) {
    return (
        <a className={buttonClasses({ variant, size, className })} {...rest}>
            {children}
        </a>
    );
}

type ButtonProps = ButtonStyle & ComponentProps<'button'>;

export function Button({ variant, size, className, children, type = 'button', ...rest }: ButtonProps) {
    return (
        <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
            {children}
        </button>
    );
}
