import { Link } from 'react-router';
import { Mail, MapPin, MessageSquareText, Phone } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import Marquee from '@/components/ui/Marquee';
import { nav, site, ticker } from '@/data/site';

const YEAR = new Date().getFullYear();

function FooterHeading({ children }: { children: string }) {
    return <h2 className="font-display text-2xl tracking-wide text-pow-300">{children}</h2>;
}

export default function Footer() {
    return (
        <footer className="border-t-[3px] border-ink bg-cobalt-950 text-paper/80">
            <Marquee className="border-b-[3px] border-ink bg-pow-400 py-2.5 text-ink" duration="70s">
                {ticker.map((item) => (
                    <span key={item} className="flex items-center font-display text-xl tracking-wider uppercase sm:text-2xl">
                        <span className="px-6">{item}</span>
                        <span aria-hidden="true" className="text-crimson-600">
                            ★
                        </span>
                    </span>
                ))}
            </Marquee>

            <div className="relative">
                <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 text-white/[0.04]" />
                <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_0.8fr_1fr]">
                    <div>
                        <Link to="/" aria-label="Ditko Club home" className="inline-block">
                            <Logo />
                        </Link>
                        <p className="mt-6 max-w-xs font-letter text-2xl leading-snug text-white">{site.tagline}.</p>
                        <p className="mt-2 max-w-xs text-sm text-paper/60">
                            {site.owner} · {site.town}
                        </p>
                    </div>

                    <div>
                        <FooterHeading>Get in touch</FooterHeading>
                        <ul className="mt-4 space-y-3 text-[0.95rem]">
                            <li>
                                <a href={`tel:${site.phone.tel}`} className="flex gap-3 font-semibold hover:text-pow-300">
                                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-pow-400" aria-hidden="true" />
                                    {site.phone.display}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-pow-300">
                                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-pow-400" aria-hidden="true" />
                                    {site.email}
                                </a>
                            </li>
                            <li>
                                <Link to="/contact" className="flex gap-3 hover:text-pow-300">
                                    <MessageSquareText className="mt-0.5 h-5 w-5 shrink-0 text-pow-400" aria-hidden="true" />
                                    Send a message
                                </Link>
                            </li>
                            <li className="flex gap-3 text-paper/60">
                                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-pow-400" aria-hidden="true" />
                                {site.town}
                            </li>
                        </ul>
                    </div>

                    <div>
                        <FooterHeading>Explore</FooterHeading>
                        <ul className="condensed mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[1.02rem] font-bold tracking-wide uppercase md:grid-cols-1">
                            {nav.map((item) => (
                                <li key={item.to}>
                                    <Link to={item.to} className="hover:text-pow-300">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <FooterHeading>Pay Ditko Club</FooterHeading>
                        <dl className="mt-4 space-y-2 text-[0.95rem]">
                            {site.payments.map((payment) => (
                                <div key={payment.name} className="flex flex-wrap gap-x-2">
                                    <dt className="condensed font-bold tracking-wide text-white uppercase">{payment.name}</dt>
                                    <dd className="break-all">{payment.handle}</dd>
                                </div>
                            ))}
                        </dl>
                        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-paper/60">
                            <li>
                                <Link to="/privacy" className="hover:text-pow-300">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:text-pow-300">
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link to="/accessibility" className="hover:text-pow-300">
                                    Accessibility
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/15">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-paper/60 sm:px-6 md:flex-row md:items-center md:justify-between">
                    <p>
                        © <span suppressHydrationWarning>{YEAR}</span> {site.name} · {site.town}
                    </p>
                    <p>
                        Designed &amp; built by{' '}
                        <a
                            href="https://gradientv.com"
                            target="_blank"
                            rel="noopener"
                            className="font-semibold text-paper underline decoration-pow-400/60 underline-offset-2 hover:text-pow-300"
                        >
                            GradientV
                        </a>
                    </p>
                </div>
                <p className="mx-auto max-w-7xl px-4 pb-8 text-xs leading-relaxed text-paper/40 sm:px-6">
                    Ditko Club is an independent dealer, not affiliated with Marvel, DC, CGC or JSA. Characters, titles and logos shown are trademarks of their respective
                    owners. The 1959 photo of Steve Ditko and the Charlton covers on the About page are in the public domain, via Wikimedia Commons.
                </p>
            </div>
        </footer>
    );
}
