import { ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import Web from '@/components/brand/Web';
import { ButtonLink } from '@/components/ui/Button';
import { Balloon, Burst } from '@/components/ui/Comic';
import Photo from '@/components/ui/Photo';
import { nav } from '@/data/site';

export default function NotFound() {
    return (
        <>
            <Seo title="Page not found | Ditko Club" description="This page doesn’t exist. Find the Ditko Collection, Ditko books, pressing and conventions here." />
            <section className="relative overflow-hidden border-b-[3px] border-ink bg-mystic-700 text-white">
                <div aria-hidden="true" className="dimension absolute top-1/2 left-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 text-white/[0.06]" />
                <Web className="absolute -top-1 -left-1 w-52 text-white/15 sm:w-72" />
                <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
                    <div className="relative mx-auto w-36">
                        <div className="rotate-3 border-[3px] border-ink bg-crimson-600 shadow-comic">
                            <Photo photo="mascot" alt="" sizes="144px" className="aspect-[275/304] w-full" eager />
                        </div>
                        <Burst tone="pow" className="absolute -top-8 -right-16 w-24">
                            <span className="font-display text-2xl text-ink">404</span>
                        </Burst>
                    </div>
                    <h1 className="comic-stroke mt-10 font-display text-6xl leading-none tracking-wide sm:text-8xl">
                        …Wha…!?
                    </h1>
                    <Balloon tail="right" className="mx-auto mt-6 max-w-md text-left">
                        This page isn’t in the collection. Let’s get you back to the good stuff.
                    </Balloon>
                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        <ButtonLink to="/" size="lg">
                            Back home <ArrowRight className="h-5 w-5" aria-hidden="true" />
                        </ButtonLink>
                        <ButtonLink to="/collection" variant="white" size="lg">
                            See the collection
                        </ButtonLink>
                    </div>
                    <ul className="mt-10 flex flex-wrap justify-center gap-2">
                        {nav.map((item) => (
                            <li key={item.to}>
                                <ButtonLink to={item.to} variant="ink" size="sm">
                                    {item.label}
                                </ButtonLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}
