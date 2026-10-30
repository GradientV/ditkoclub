// the shows Ditko Club works, from the old Comic Conventions page.
// venues and Empire Comic Fest's exact days were checked against each show's listings (RESEARCH.md).
//
// new season: replace the list and change CONVENTIONS_YEAR. a show is marked "wrapped"
// automatically the day after its `end` date, in the visitor's own time zone.

export const CONVENTIONS_YEAR = 2026;

export type Convention = {
    id: string;
    name: string;
    /** 'YYYY-MM-DD' */
    start: string;
    end: string;
    city: string;
    venue: string;
    url: string;
};

export const CONVENTIONS: Convention[] = [
    {
        id: 'sc-comicon-2026',
        name: 'South Carolina Comic Con',
        start: '2026-04-11',
        end: '2026-04-12',
        city: 'Greenville, SC',
        venue: 'Greenville Convention Center',
        url: 'https://www.sccomicon.com/'
    },
    {
        id: 'heroescon-2026',
        name: 'HeroesCon',
        start: '2026-06-12',
        end: '2026-06-14',
        city: 'Charlotte, NC',
        venue: 'Charlotte Convention Center',
        url: 'https://www.heroesonline.com/heroescon/exhibitors/'
    },
    {
        id: 'empire-comic-fest-2026',
        name: 'Empire Comic Fest',
        start: '2026-07-10',
        end: '2026-07-11',
        city: 'Rochester, NY',
        venue: 'Louis S. Wolk JCC',
        url: 'http://empirecomicfest.com/'
    },
    {
        id: 'nycc-2026',
        name: 'New York Comic Con',
        start: '2026-10-08',
        end: '2026-10-11',
        city: 'New York, NY',
        venue: 'Javits Center',
        url: 'https://www.newyorkcomiccon.com/en-us.html'
    }
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function parts(date: string) {
    const [y, m, d] = date.split('-').map(Number);
    return { y, m, d };
}

/** 'April 11–12, 2026' or 'June 30 – July 2, 2026' */
export function formatDates({ start, end }: Pick<Convention, 'start' | 'end'>): string {
    const a = parts(start);
    const b = parts(end);
    if (a.m === b.m) return `${MONTHS[a.m - 1]} ${a.d}–${b.d}, ${b.y}`;
    return `${MONTHS[a.m - 1]} ${a.d} – ${MONTHS[b.m - 1]} ${b.d}, ${b.y}`;
}

/** for the calendar tile: 'Apr' and '11–12' */
export function calendarTile({ start, end }: Pick<Convention, 'start' | 'end'>): { month: string; days: string } {
    const a = parts(start);
    const b = parts(end);
    return { month: MONTHS[a.m - 1].slice(0, 3), days: a.m === b.m ? (a.d === b.d ? `${a.d}` : `${a.d}–${b.d}`) : `${a.d}+` };
}

export type ShowStatus = 'upcoming' | 'on-now' | 'wrapped';

/** compares calendar days in the visitor's time zone, so a show is "on now" all day on its last day */
export function showStatus(show: Pick<Convention, 'start' | 'end'>, today: Date): ShowStatus {
    const key = (date: Date) => date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    const toKey = (iso: string) => {
        const { y, m, d } = parts(iso);
        return y * 10000 + m * 100 + d;
    };
    const now = key(today);
    if (now < toKey(show.start)) return 'upcoming';
    if (now <= toKey(show.end)) return 'on-now';
    return 'wrapped';
}
