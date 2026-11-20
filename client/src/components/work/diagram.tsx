import type { Diagram as Data } from "@/content/site";

const COL = 270; // grid cell width (room for edge labels between boxes)
const ROW = 140; // grid cell height
const W = 176; // box width
const H = 64; // box height
const PAD = 22;

/** Point where the line from a box centre towards (dx, dy) leaves the box. */
function edgePoint(cx: number, cy: number, dx: number, dy: number) {
  const t = Math.min(dx ? W / 2 / Math.abs(dx) : Infinity, dy ? H / 2 / Math.abs(dy) : Infinity);
  return { x: cx + dx * t, y: cy + dy * t };
}

/** Architecture diagram drawn from data, in theme tokens (works in light and dark). */
export function Diagram({ data, className }: { data: Data; className?: string }) {
  const cols = Math.max(...data.nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...data.nodes.map((n) => n.row)) + 1;
  const width = cols * COL + PAD * 2 - (COL - W);
  const height = rows * ROW + PAD * 2 - (ROW - H);
  const centre = Object.fromEntries(
    data.nodes.map((n) => [n.id, { x: PAD + n.col * COL + W / 2, y: PAD + n.row * ROW + H / 2 }]),
  );

  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={data.title} className="h-auto w-full">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--ink-faint)" />
          </marker>
        </defs>
        {data.edges.map((e) => {
          const a = centre[e.from];
          const b = centre[e.to];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const start = edgePoint(a.x, a.y, dx, dy);
          const end = edgePoint(b.x, b.y, -dx, -dy);
          return (
            <g key={`${e.from}-${e.to}`}>
              <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="var(--ink-faint)" strokeWidth="1.5" markerEnd="url(#arrow)" />
              {e.label && (
                <text
                  x={(start.x + end.x) / 2 + (dy && !dx ? 8 : 0)}
                  y={(start.y + end.y) / 2 - (dx ? 8 : 0)}
                  textAnchor={dy && !dx ? "start" : "middle"}
                  fontSize="13"
                  fontFamily="var(--font-mono)"
                  fill="var(--ink-muted)"
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
                fill={n.hot ? "var(--jacaranda-mist)" : "var(--surface)"}
                stroke={n.hot ? "var(--jacaranda)" : "var(--line)"}
                strokeWidth={n.hot ? 2 : 1}
              />
              <text x={x + W / 2} y={y + 28} textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--ink)" fontFamily="var(--font-sans)">
                {n.label}
              </text>
              <text x={x + W / 2} y={y + 48} textAnchor="middle" fontSize="12" fill="var(--ink-muted)" fontFamily="var(--font-sans)">
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-sm text-ink-faint">{data.title}</figcaption>
    </figure>
  );
}
