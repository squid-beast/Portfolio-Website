# Lohith Kumar Neerukonda, portfolio

One-page site for job applications. The page turns from day to night as you scroll: enterprise work by day, side products by night. The sky, sun, moon and stars are drawn on a canvas from scroll position (`components/Sky.tsx`); no images, no gradients, no animation loop.

- `content/site.ts` holds every word on the page: profile, roles, projects, skills, education, graph data. Edit that, not the markup.
- `app/page.tsx` is the page. `components/Sky.tsx` is the scroll-driven scene. Fonts: Hanken Grotesk and DM Mono via next/font. `components/Cursor.tsx` is the ring-and-dot cursor (pointer devices only). `components/Scramble.tsx` decodes text into place; `components/Now.tsx` is the live day-shift/night-shift clock (America/Detroit).
- Set `NEXT_PUBLIC_SITE_URL` (for example `https://lohithkumar.dev`) so canonical URLs, sitemap and OG image use the real domain. On Vercel it falls back to the production URL automatically.

```bash
npm install
npm run dev
npm run build
```

No analytics, no cookies, no forms, no header: the page is the navigation. Deploys as a static Next.js site on Vercel.
