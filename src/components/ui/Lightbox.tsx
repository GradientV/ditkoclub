// the full-screen photo viewer, on a native modal <dialog>: it keeps keyboard focus
// inside, closes on Escape, and hides the page behind it from screen readers.
// arrow keys and the side buttons step through the set.
import { useEffect, useRef, type MouseEvent } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PHOTOS, type PhotoKey } from '@/data/photos';

export type LightboxItem = { photo: PhotoKey; title: string; caption?: string };

type Props = {
    items: LightboxItem[];
    /** the open item, or null when closed */
    index: number | null;
    onChange: (index: number | null) => void;
};

const navButton =
    'grid h-12 w-12 shrink-0 place-items-center border-[3px] border-ink bg-pow-400 text-ink shadow-comic-sm transition-transform hover:scale-105 focus-visible:outline-white';

export default function Lightbox({ items, index, onChange }: Props) {
    if (index === null) return null;
    return <LightboxDialog items={items} index={index} onChange={onChange} />;
}

function LightboxDialog({ items, index, onChange }: Props & { index: number }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const item = items[index];
    const many = items.length > 1;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (!dialog.open) dialog.showModal();
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previous;
        };
    }, []);

    useEffect(() => {
        if (!many) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') onChange((index + 1) % items.length);
            if (event.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [index, items.length, many, onChange]);

    if (!item) return null;
    const step = (delta: number) => onChange((index + delta + items.length) % items.length);
    const closeOnEmpty = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onChange(null);
    };

    return (
        <dialog
            ref={dialogRef}
            aria-label={item.title}
            onClose={() => onChange(null)}
            className="m-0 h-dvh max-h-none w-full max-w-none bg-ink/95 p-3 text-white backdrop:bg-ink/70 sm:p-6"
        >
            {/* clicking the empty dark space around the photo closes it too (Escape and the X button do the same from the keyboard) */}
            <div role="presentation" className="flex h-full flex-col" onClick={closeOnEmpty}>
                <div className="flex items-center justify-between gap-4">
                    <p className="condensed text-sm font-bold tracking-widest text-white/60 uppercase">{many ? `${index + 1} / ${items.length}` : 'Zoom'}</p>
                    <button type="button" aria-label="Close" className={navButton} onClick={() => onChange(null)}>
                        <X aria-hidden="true" />
                    </button>
                </div>

                <div role="presentation" className="flex min-h-0 flex-1 items-center justify-center gap-2 py-3 sm:gap-5" onClick={closeOnEmpty}>
                    {many && (
                        <button type="button" aria-label="Previous photo" className={navButton} onClick={() => step(-1)}>
                            <ChevronLeft aria-hidden="true" />
                        </button>
                    )}
                    <img
                        key={item.photo}
                        src={PHOTOS[item.photo].src}
                        alt={PHOTOS[item.photo].alt}
                        className="animate-pop max-h-full min-w-0 max-w-full border-[3px] border-white bg-white object-contain"
                    />
                    {many && (
                        <button type="button" aria-label="Next photo" className={navButton} onClick={() => step(1)}>
                            <ChevronRight aria-hidden="true" />
                        </button>
                    )}
                </div>

                <div className="mx-auto max-w-2xl pb-2 text-center">
                    <p className="font-display text-3xl tracking-wide">{item.title}</p>
                    {item.caption && <p className="mt-1 text-white/75">{item.caption}</p>}
                </div>
            </div>
        </dialog>
    );
}
