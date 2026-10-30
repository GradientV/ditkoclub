// the site has no backend, so every "send" opens the visitor's own email app with
// everything filled in, addressed to Darren. to collect messages through a form
// service later (Formspree and the like), swap the submit handlers that call this.
import { site } from '@/data/site';

export function mailto({ to = site.email, subject, body }: { to?: string; subject: string; body?: string }): string {
    const params = [`subject=${encodeURIComponent(subject)}`];
    // mail apps want CRLF line breaks in a mailto body
    if (body) params.push(`body=${encodeURIComponent(body.replace(/\r?\n/g, '\r\n'))}`);
    return `mailto:${to}?${params.join('&')}`;
}
