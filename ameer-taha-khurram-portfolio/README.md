# Ameer Taha Khurram — AI Creative Portfolio

A single-page portfolio for Ameer Taha Khurram, AI creative specialist: AI UGC ads, AI
influencer campaigns, cinematic AI commercials, CGI & 3D product ads, AI product
photography, and Meta ad creatives.

Dark cinematic theme (lime accent), Space Grotesk + Inter, motion kit with custom cursor
and loader, filterable project gallery with per-project detail overlays.

## Stack

- TanStack Start v1 (React 19, Vite 7, TypeScript)
- Tailwind CSS v4
- All project photos and videos live in `src/assets/media/` — nothing is fetched from an
  external service, so the site works wherever you host it.

## Development

```sh
npm i
npm run dev
```

Open http://localhost:8080.

## Build and preview

```sh
npm run build
npm run preview
```

The production output lands in `dist/`.

## Deploy to GitHub

The repository is standard open-source web code — push it to GitHub and host it from
there, or run it in your own environment.

```sh
git init
git add .
git commit -m "Portfolio: initial import"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

### Hosting options

**Vercel / Netlify / Cloudflare Pages** — build command `npm run build`, output directory
`dist`. Nothing else to configure.

**GitHub Pages** — set the site's base path first, because Pages serves from
`/<repository-name>/`:

1. In `vite.config.ts`, add `base: "/<repository-name>/"` to the config.
2. Run `npm run build`.
3. Publish `dist/` with GitHub Actions, or push it to a `gh-pages` branch.

## Editing content

Everything shown on the page comes from one file: `src/lib/portfolio-data.ts`.

- `CONTACT` — email, WhatsApp, LinkedIn, Instagram. Empty strings hide their buttons.
- `SHOWREEL_URL` — set an mp4 URL to enable the showreel player.
- `services` — the six service cards.
- `projects` — the gallery entries, built from the media arrays above.
- `categories` — the gallery filter chips.

To swap a photo or video, drop the new file into `src/assets/media/` and change the
matching import at the top of `src/lib/portfolio-data.ts`.

## Notes

- Sample work is labelled as concept/spec where no client brief applies.
- `public/robots.txt` and `public/favicon.ico` are served as-is.
