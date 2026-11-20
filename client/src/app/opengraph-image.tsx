import { ImageResponse } from "next/og";
import { hero, person } from "@/content/site";
import { lightToken } from "@/lib/token-values";

export const alt = `${person.name} — ${hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Fetches a Geist weight from Google Fonts at build time; falls back to the default font offline. */
async function geist(weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Geist:wght@${weight}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const text = person.name + hero.headline;
  const [semibold, regular] = await Promise.all([geist(600, text), geist(400, text)]);
  const fonts = [
    ...(semibold ? [{ name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const }] : []),
    ...(regular ? [{ name: "Geist", data: regular, weight: 400 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: lightToken("paper"),
          color: lightToken("ink"),
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", width: 96, height: 10, borderRadius: 3, background: lightToken("jacaranda") }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02 }}>{person.name}</div>
          <div style={{ fontSize: 34, fontWeight: 400, lineHeight: 1.35, color: lightToken("ink-muted"), maxWidth: 900 }}>
            {hero.headline}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
