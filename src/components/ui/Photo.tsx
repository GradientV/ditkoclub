// a responsive <img>: the phone-sized file on small screens, the big one on large
// screens, and the real width/height from src/data/image-manifest.json so the
// page doesn't jump while it loads.
import manifest from '@/data/image-manifest.json';
import { PHOTOS, type PhotoInfo, type PhotoKey } from '@/data/photos';
import { cn } from '@/lib/cn';

type Size = { w: number; h: number };
const SIZES = manifest as Record<string, Size & { sm?: Size }>;

type Props = {
    photo: PhotoKey | PhotoInfo;
    /** the CSS width the image is shown at, for the browser to pick a file. e.g. '(min-width: 1024px) 40vw, 100vw' */
    sizes: string;
    className?: string;
    /** the main above-the-fold image: loads right away, ahead of everything else */
    priority?: boolean;
    /** other above-the-fold images: load right away, at normal priority */
    eager?: boolean;
    alt?: string;
    /** 'contain' keeps the whole slab in view; the default crops to fill */
    fit?: 'cover' | 'contain';
};

export default function Photo({ photo, sizes, className, priority = false, eager = false, alt, fit = 'cover' }: Props) {
    const info: PhotoInfo = typeof photo === 'string' ? PHOTOS[photo] : photo;
    const size = SIZES[info.src];
    const small = info.src.replace(/\.webp$/, '-sm.webp');
    const srcSet = size?.sm && size.sm.w < size.w ? `${small} ${size.sm.w}w, ${info.src} ${size.w}w` : undefined;

    return (
        <img
            src={info.src}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
            width={size?.w}
            height={size?.h}
            alt={alt ?? info.alt}
            loading={priority || eager ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : undefined}
            className={cn(fit === 'contain' ? 'object-contain' : 'object-cover', className)}
            style={info.focus ? { objectPosition: info.focus } : undefined}
        />
    );
}

/** the file to use when a photo is shown big (the zoom view) */
export function fullSize(photo: PhotoKey): string {
    return PHOTOS[photo].src;
}
