// a spider web for the corner of a panel, drawn from the top-left: spokes fanning out
// from the corner and threads that sag toward the middle between them.
// flip it with -scale-x-100 for a top-right corner. the color is the text color.

const SPOKES = [0, 15, 30, 45, 60, 75, 90].map((deg) => (deg * Math.PI) / 180);
const RINGS = [34, 72, 114, 160, 210, 264];
const REACH = 300;

const f = (n: number) => n.toFixed(1);

function webPath(): string {
    const spokes = SPOKES.map((a) => `M0 0L${f(REACH * Math.cos(a))} ${f(REACH * Math.sin(a))}`).join('');
    const rings = RINGS.map((r) => {
        let d = `M${f(r * Math.cos(SPOKES[0]))} ${f(r * Math.sin(SPOKES[0]))}`;
        for (let i = 0; i < SPOKES.length - 1; i++) {
            const mid = (SPOKES[i] + SPOKES[i + 1]) / 2;
            const sag = r * 0.86;
            d += `Q${f(sag * Math.cos(mid))} ${f(sag * Math.sin(mid))} ${f(r * Math.cos(SPOKES[i + 1]))} ${f(r * Math.sin(SPOKES[i + 1]))}`;
        }
        return d;
    }).join('');
    return spokes + rings;
}

const PATH = webPath();

export default function Web({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 300 300" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d={PATH} />
        </svg>
    );
}
