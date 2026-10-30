/**
 * addresses from the old IONOS site, plus a few people are likely to type, and the
 * page each one should land on. vercel.json sends the same ones as real (308)
 * redirects in production; App.tsx uses this list so they also work in `npm run dev`.
 */
export const ALIASES: Record<string, string> = {
    '/pressing': '/press-room',
    '/comic-conventions': '/conventions',
    '/order-ditko-books-here': '/ditko-books',
    '/contact-me': '/contact',
    '/the-ditko-collection': '/collection',
    '/signed': '/collection',
    '/order': '/ditko-books',
    '/books': '/ditko-books',
    '/shop': '/ditko-books',
    '/press': '/press-room',
    '/cons': '/conventions',
    '/events': '/conventions',
    '/steve-ditko': '/about'
};
