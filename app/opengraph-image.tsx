import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = `${profile.name}, software engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori needs TTF/OTF. Google Fonts serves TTF to old user agents.
async function hanken(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500&display=swap", {
      signal: AbortSignal.timeout(8000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    }).then((r) => r.text());
    const url = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url, { signal: AbortSignal.timeout(8000) }).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const font = await hanken();
  const display = font ? "Hanken" : "sans-serif";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f3ecdd",
          color: "#171411",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: 96, top: 72, width: 300, height: 300, borderRadius: 150, background: "#ff6a2a" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: "#e3d8c0" }} />
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", opacity: 0.7, fontFamily: "monospace" }}>
          {profile.name} · {profile.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ display: "flex", fontFamily: display, fontSize: 136, lineHeight: 0.95, letterSpacing: -5, fontWeight: 500 }}>
            Lohith Kumar
          </div>
          <div style={{ display: "flex", fontSize: 38, marginTop: 28, maxWidth: 760, lineHeight: 1.2 }}>
            By day, enterprise software. By night, my own products.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", opacity: 0.7, fontFamily: "monospace", position: "relative" }}>
          Full-stack software engineer · open to full-time roles
        </div>
      </div>
    ),
    {
      ...size,
      ...(font ? { fonts: [{ name: "Hanken", data: font, style: "normal", weight: 500 }] } : {}),
    },
  );
}
