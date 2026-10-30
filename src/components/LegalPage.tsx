// the shared frame for the privacy policy, terms and accessibility statement
import type { ReactNode } from 'react';
import { Caption } from '@/components/ui/Comic';
import { site } from '@/data/site';

type Props = {
    eyebrow: string;
    title: string;
    intro: string;
    updated: string;
    children: ReactNode;
};

export default function LegalPage({ eyebrow, title, intro, updated, children }: Props) {
    return (
        <>
            <section className="relative overflow-hidden border-b-[3px] border-ink bg-newsprint">
                <div aria-hidden="true" className="halftone absolute inset-0 text-ink/[0.06]" />
                <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6">
                    <Caption>{eyebrow}</Caption>
                    <h1 className="mt-5 font-display text-6xl leading-none tracking-wide sm:text-7xl">{title}</h1>
                    <p className="mt-4 text-lg text-ink-soft">{intro}</p>
                    <p className="condensed mt-4 text-sm font-bold tracking-wide text-ink-soft uppercase">Last updated: {updated}</p>
                </div>
            </section>
            <article className="prose-legal mx-auto px-4 py-14 sm:px-6">
                {children}
                <h2>Contact us</h2>
                <p>
                    {site.name} ({site.owner})
                    <br />
                    {site.town}
                    <br />
                    Phone: <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
                    <br />
                    Email: <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
            </article>
        </>
    );
}
