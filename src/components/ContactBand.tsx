// the yellow "talk to Darren" strip near the bottom of most pages, with the mascot
import type { ReactNode } from 'react';
import { Mail, MessageSquareText, Phone } from 'lucide-react';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { Balloon } from '@/components/ui/Comic';
import Photo from '@/components/ui/Photo';
import { site } from '@/data/site';

type Props = {
    title?: string;
    children?: ReactNode;
    balloon?: string;
};

export default function ContactBand({ title = 'Questions? Talk to Darren.', balloon = 'Call, email, or drop me a line!', children }: Props) {
    return (
        <section aria-labelledby="contact-band" className="relative overflow-hidden border-y-[3px] border-ink bg-pow-400">
            <div aria-hidden="true" className="halftone absolute inset-0 text-pow-600/45" />
            <div className="relative mx-auto grid max-w-7xl items-center gap-x-10 gap-y-8 px-4 py-14 sm:px-6 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto]">
                <div className="mx-auto flex w-56 flex-col items-start gap-6 md:mx-0">
                    <Balloon tail="left" className="rotate-1">
                        {balloon}
                    </Balloon>
                    <div className="ml-3 w-36 -rotate-3 border-[3px] border-ink bg-crimson-600 shadow-comic">
                        <Photo photo="mascot" sizes="144px" className="aspect-[275/304] w-full" />
                    </div>
                </div>

                <div>
                    <h2 id="contact-band" className="font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl">
                        {title}
                    </h2>
                    <div className="mt-3 max-w-xl text-lg text-ink-soft">
                        {children ?? (
                            <p>
                                {site.owner} answers every question himself: books in the collection, Ditko book orders, pressing, or where to find him at the next show.
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-1 lg:flex-col">
                    <ButtonAnchor href={`tel:${site.phone.tel}`} variant="ink">
                        <Phone className="h-5 w-5" aria-hidden="true" /> {site.phone.display}
                    </ButtonAnchor>
                    <ButtonAnchor href={`mailto:${site.email}`} variant="white">
                        <Mail className="h-5 w-5" aria-hidden="true" /> Email Darren
                    </ButtonAnchor>
                    <ButtonLink to="/contact" variant="crimson">
                        <MessageSquareText className="h-5 w-5" aria-hidden="true" /> Send a message
                    </ButtonLink>
                </div>
            </div>
        </section>
    );
}
