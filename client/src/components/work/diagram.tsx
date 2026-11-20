import { ui, type Diagram as Data } from "@/content/site";
import { cn } from "@/lib/utils";

const COL = 270; // grid cell width (room for edge labels between boxes)
const ROW = 140; // grid cell height
const W = 176; // box width
const H = 64; // box height
const PAD = 22;

/** Point where the line from a box centre towards (dx, dy) leaves the box. */
export function edgePoint(cx: number, cy: number, dx: number, dy: number, w = W, h = H) {
  const t = Math.min(dx ? w / 2 / Math.abs(dx) : Infinity, dy ? h / 2 / Math.abs(dy) : Infinity);
  return { x: cx + dx * t, y: cy + dy * t };
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/**
 * Architecture diagram drawn from data. Colours come from CSS classes (fill-*, stroke-*), not SVG
 * presentation attributes, so theme tokens resolve in every browser. On phones it keeps a readable
 * minimum width inside a horizontal scroller.
 */
export function Diagram({ data, className }: { data: Data; className?: string }) {
  const cols = Math.max(...data.nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...data.nodes.map((n) => n.row)) + 1;
  const width = cols * COL + PAD * 2 - (COL - W);
  const height = rows * ROW + PAD * 2 - (ROW - H);
  const markerId = `arrow-${slug(data.title)}`;
  const centre = Object.fromEntries(data.nodes.map((n) => [n.id, { x: PAD + n.col * COL + W / 2, y: PAD + n.row * ROW + H / 2 }]));

  return (
    <figure className={cn("m-0", className)}>
      {/* Focusable so keyboard users can scroll it on phones (WCAG 2.1.1). */}
      <div tabIndex={0} role="region" aria-label={data.title} className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={data.title} className="h-auto w-full min-w-160 sm:min-w-0">
          <defs>
            <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" className="fill-ink-faint" />
            </marker>
          </defs>
          {data.edges.map((e) => {
            const a = centre[e.from];
            const b = centre[e.to];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const start = edgePoint(a.x, a.y, dx, dy);
            const end = edgePoint(b.x, b.y, -dx, -dy);
            const vertical = dy !== 0 && dx === 0;
            return (
              <g key={`${e.from}-${e.to}`}>
                <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} strokeWidth="1.5" markerEnd={`url(#${markerId})`} className="stroke-ink-faint" />
                {e.label && (
                  <text
                    x={(start.x + end.x) / 2 + (vertical ? 8 : 0)}
                    y={(start.y + end.y) / 2 - (dx ? 8 : 0)}
                    textAnchor={vertical ? "start" : "middle"}
                    fontSize="13"
                    className="fill-ink-muted font-mono"
                  >
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}
          {data.nodes.map((n) => {
            const x = PAD + n.col * COL;
            const y = PAD + n.row * ROW;
            return (
              <g key={n.id}>
                <rect
                  x={x}
                  y={y}
                  width={W}
                  height={H}
                  rx="12"
                  strokeWidth={n.hot ? 2 : 1}
                  className={n.hot ? "fill-jacaranda-mist stroke-jacaranda" : "fill-surface stroke-line"}
                />
                <text x={x + W / 2} y={y + 28} textAnchor="middle" fontSize="15" fontWeight="600" className="fill-ink font-sans">
                  {n.label}
                </text>
                <text x={x + W / 2} y={y + 48} textAnchor="middle" fontSize="12" className="fill-ink-muted font-sans">
                  {n.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-sm text-ink-faint">
        {data.title}
        <span className="sm:hidden"> · {ui.diagramScroll}</span>
      </figcaption>
    </figure>
  );
}
