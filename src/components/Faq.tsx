import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

export type FaqItem = { question: string; answer: ReactNode };

/** questions that open like a comic panel flipping down. native <details>, so it works without JavaScript */
export default function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
    return (
        <div className={cn('space-y-4', className)}>
            {items.map(({ question, answer }) => (
                <details key={question} className="group border-[3px] border-ink bg-white shadow-comic-sm open:shadow-comic">
                    <summary className="flex list-none items-center justify-between gap-4 p-4 text-lg font-bold sm:p-5 [&::-webkit-details-marker]:hidden">
                        {question}
                        <span className="grid h-9 w-9 shrink-0 place-items-center border-[3px] border-ink bg-pow-400 transition-transform duration-200 group-open:rotate-45">
                            <Plus className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
                        </span>
                    </summary>
                    <div className="border-t-[3px] border-dashed border-ink/20 px-4 py-4 text-ink-soft sm:px-5 [&_a]:font-semibold [&_a]:text-crimson-700 [&_a]:underline [&_a]:underline-offset-2">
                        {answer}
                    </div>
                </details>
            ))}
        </div>
    );
}
