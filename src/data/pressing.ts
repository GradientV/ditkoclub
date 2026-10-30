// the Press Room: prices and process from the old Pressing page and Darren's press form.
import type { PhotoKey } from './photos';

export const PRESS_PRICE = 15;

export const PRESS_SERVICES = [
    {
        id: 'press',
        name: 'Pressing & light cleaning',
        price: '$15',
        unit: 'per book',
        items: [
            'Light dry cleaning of the front and back covers',
            'Humidity chamber, if your book needs it',
            'A 15-minute press in a photographic-quality SEAL dry mount press (not a T-shirt press), then a 24-hour cold press',
            'Flipped over, then another 15-minute SEAL press and another 24-hour cold press'
        ]
    },
    {
        id: 'deep',
        name: 'Deep cleaning',
        price: '$25–$150',
        unit: 'per book',
        items: ['Cleaning to reduce or remove foxing and stains', 'A free review of your book first, to see whether a deep cleaning would help']
    }
] as const;

/** the 48-hour method, one comic panel per step */
export const PRESS_STEPS = [
    { title: 'Clean', text: 'Light dry cleaning of the front and back covers.', sfx: 'Swish!' },
    { title: 'Humidify', text: 'Time in the humidity chamber, if the book needs it.', sfx: 'Hsss…' },
    { title: 'Hot press', text: '15 minutes in a photographic-quality SEAL dry mount press. Not a T-shirt press.', sfx: 'Ka-chunk!' },
    { title: 'Cold press', text: 'Then 24 hours in the cold press.', sfx: 'Zzz…' },
    { title: 'Flip & repeat', text: 'Flipped over: another 15 minutes in the SEAL press, another 24 hours cold.', sfx: 'Flip!' },
    { title: 'Done right', text: 'At least 48 hours in the press, the best way to keep creases from coming back.', sfx: 'Ta-da!' }
] as const;

export type PressResult = { photo: PhotoKey; title: string; caption: string };

/** before-and-after photos from the old Pressing page. the first two are the headliners */
export const PRESS_RESULTS: PressResult[] = [
    { photo: 'pressDaredevil', title: 'Daredevil #1', caption: 'A CGC 4.0 before pressing. Back from CGC at 6.0 after.' },
    { photo: 'pressBatman', title: 'Batman Adventures #12', caption: 'Raw on the mat before pressing. Back from CGC at 9.8.' },
    { photo: 'pressAsm129', title: 'Amazing Spider-Man #129', caption: 'Waves and bends, pressed flat.' },
    { photo: 'pressAsm5', title: 'Amazing Spider-Man #5', caption: 'Ditko’s Doctor Doom issue: the corner, before and after.' },
    { photo: 'pressFlash', title: 'The Flash #139', caption: 'Before and after, side by side.' },
    { photo: 'pressSuspense', title: 'Tales of Suspense', caption: 'A rippled top edge, flattened.' },
    { photo: 'pressCorner', title: 'A 1960s corner', caption: 'Edge waves and a bent corner, gone.' },
    { photo: 'pressStain', title: 'Green Lantern', caption: 'Cleaning lifted the stain from the middle of the cover.' },
    { photo: 'pressBackCover', title: 'The back cover', caption: 'Even the mail-order ads get the full treatment.' }
];
