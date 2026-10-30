// the contact form from the old site (name, phone, email, message), plus a topic and,
// for collection questions, which book. there's no backend: sending opens the visitor's
// own email app with everything filled in, addressed to Darren (src/lib/mailto.ts).
// /contact?book=<slug> (the "Message form" button on a book page) picks that book.
import { useId, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { Check, Copy, Paperclip, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BOOKS, getBook } from '@/data/books';
import { site } from '@/data/site';
import { useHydrated } from '@/hooks/useHydrated';
import { cn } from '@/lib/cn';
import { mailto } from '@/lib/mailto';

const TOPICS = [
    { id: 'collection', label: 'A signed book from the Ditko Collection', subject: 'The Ditko Collection' },
    { id: 'books', label: 'Ordering out-of-print Ditko books', subject: 'Ditko books' },
    { id: 'pressing', label: 'Comic pressing', subject: 'Pressing' },
    { id: 'conventions', label: 'Meeting up at a convention', subject: 'Conventions' },
    { id: 'general', label: 'Something else', subject: 'Question' }
] as const;

type TopicId = (typeof TOPICS)[number]['id'];

const field =
    'w-full border-[3px] border-ink bg-white px-3.5 py-3 text-base text-ink shadow-comic-sm placeholder:text-ink/40 focus:bg-pow-100 focus:outline-none';
const labelClass = 'condensed mb-1.5 block text-sm font-extrabold tracking-widest uppercase';

export default function ContactForm() {
    const ids = { name: useId(), email: useId(), phone: useId(), topic: useId(), book: useId(), message: useId() };
    const hydrated = useHydrated();
    const [params] = useSearchParams();
    // a book picked via ?book= only counts after hydration, so the prerendered form and the first browser pass match
    const preset = hydrated ? getBook(params.get('book') ?? '') : undefined;

    const [topicChoice, setTopicChoice] = useState<TopicId | null>(null);
    const [bookChoice, setBookChoice] = useState<string | null>(null);
    const topic: TopicId = topicChoice ?? (preset ? 'collection' : 'general');
    const bookSlug = bookChoice ?? preset?.slug ?? '';

    const [sent, setSent] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const value = (key: string) => String(data.get(key) ?? '').trim();
        const topicInfo = TOPICS.find((candidate) => candidate.id === topic) ?? TOPICS[TOPICS.length - 1];
        const book = topic === 'collection' ? getBook(bookSlug) : undefined;
        const name = value('name');

        const details = [
            `Name: ${name}`,
            `Email: ${value('email')}`,
            ...(value('phone') ? [`Phone: ${value('phone')}`] : []),
            `About: ${topicInfo.label}`,
            ...(book ? [`Book: ${book.title} (CGC ${book.grade}, cert #${book.cert})`] : [])
        ];
        const body = `${details.join('\n')}\n\n${value('message')}`;

        window.location.href = mailto({ subject: `${topicInfo.subject}${book ? `: ${book.title}` : ''} (from ${name})`, body });
        setSent(true);
    };

    const copyAddress = async () => {
        try {
            await navigator.clipboard.writeText(site.email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            // no clipboard access: the address is printed right there anyway
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-[3px] border-ink bg-white p-5 shadow-comic sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor={ids.name} className={labelClass}>
                        Name <span className="text-crimson-600">*</span>
                    </label>
                    <input id={ids.name} name="name" required autoComplete="name" className={field} />
                </div>
                <div>
                    <label htmlFor={ids.phone} className={labelClass}>
                        Phone
                    </label>
                    <input id={ids.phone} name="phone" type="tel" autoComplete="tel" className={field} />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor={ids.email} className={labelClass}>
                        Email <span className="text-crimson-600">*</span>
                    </label>
                    <input id={ids.email} name="email" type="email" required autoComplete="email" className={field} />
                </div>
                <div className={cn(topic === 'collection' ? '' : 'sm:col-span-2')}>
                    <label htmlFor={ids.topic} className={labelClass}>
                        What’s it about?
                    </label>
                    <select id={ids.topic} value={topic} onChange={(event) => setTopicChoice(event.target.value as TopicId)} className={field}>
                        {TOPICS.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                {topic === 'collection' && (
                    <div>
                        <label htmlFor={ids.book} className={labelClass}>
                            Which book?
                        </label>
                        <select id={ids.book} value={bookSlug} onChange={(event) => setBookChoice(event.target.value)} className={field}>
                            <option value="">Not sure yet</option>
                            {BOOKS.map((book) => (
                                <option key={book.slug} value={book.slug}>
                                    {book.title} (CGC {book.grade}){book.status === 'sold' ? ' · sold' : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="sm:col-span-2">
                    <label htmlFor={ids.message} className={labelClass}>
                        Message <span className="text-crimson-600">*</span>
                    </label>
                    <textarea id={ids.message} name="message" required rows={6} className={field} />
                </div>
            </div>

            <p className="mt-4 flex gap-2 text-sm text-ink-soft">
                <Paperclip className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Want to send photos of your books? Attach them in your email app before you hit send.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button type="submit" variant="crimson" size="lg">
                    <Send className="h-5 w-5" aria-hidden="true" /> Send to {site.ownerFirst}
                </Button>
                <p className="max-w-xs text-sm text-ink-soft">This opens your email app with everything filled in, addressed to {site.ownerFirst}. Just hit send.</p>
            </div>

            {sent && (
                <div role="status" className="animate-pop mt-6 border-[3px] border-ink bg-pow-400 p-4">
                    <p className="font-display text-2xl tracking-wide">Check your email app!</p>
                    <p className="mt-1">
                        Your message should be waiting there, ready to send. Nothing opened? Email {site.ownerFirst} directly at{' '}
                        <a href={`mailto:${site.email}`} className="font-bold underline">
                            {site.email}
                        </a>{' '}
                        or call {site.phone.display}.
                    </p>
                    <button
                        type="button"
                        onClick={copyAddress}
                        className="condensed mt-3 inline-flex items-center gap-2 border-2 border-ink bg-white px-3 py-1.5 text-sm font-extrabold tracking-wide uppercase"
                    >
                        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                        {copied ? 'Copied' : 'Copy the address'}
                    </button>
                </div>
            )}
        </form>
    );
}
