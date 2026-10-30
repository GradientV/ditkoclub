// the three steps to buying a signed book. there's no checkout: Darren handles each sale himself.
import { site } from '@/data/site';
import { cn } from '@/lib/cn';

const STEPS = [
    { title: 'Pick a book', text: 'Every book has its own page with the label details, a zoomable photo and the price.' },
    { title: `Contact ${site.ownerFirst}`, text: `Email or call about the book you want. Books listed “or best offer” are open to offers.` },
    { title: 'Make it yours', text: `${site.ownerFirst} confirms it’s still available and works out payment and shipping with you directly.` }
];

export default function HowToBuy({ className, light = false }: { className?: string; light?: boolean }) {
    return (
        <ol className={cn('grid gap-4 sm:grid-cols-3', className)}>
            {STEPS.map((step, i) => (
                <li key={step.title} className={cn('relative border-[3px] border-ink p-5 pt-7 shadow-comic-sm', light ? 'bg-white' : 'bg-paper')}>
                    <span
                        aria-hidden="true"
                        className="absolute -top-5 left-4 grid h-10 w-10 -rotate-6 place-items-center border-[3px] border-ink bg-pow-400 font-display text-2xl shadow-comic-sm"
                    >
                        {i + 1}
                    </span>
                    <h3 className="font-display text-2xl tracking-wide">
                        <span className="sr-only">Step {i + 1}: </span>
                        {step.title}
                    </h3>
                    <p className="mt-1.5 text-ink-soft">{step.text}</p>
                </li>
            ))}
        </ol>
    );
}
