# Triland Tour website

Next.js 16 (App Router), Tailwind CSS 4 and Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

`npm run dev` starts Node with `--use-system-ca` so image optimisation works on networks that inspect HTTPS traffic.

## Where things live

| What | File |
| --- | --- |
| All copy, English | `lib/i18n/en.ts` |
| All copy, German | `lib/i18n/de.ts` (must match the English shape; TypeScript enforces it) |
| Photos (placeholders) | `lib/images.ts` |
| Contact email, site URL | `lib/site.ts` |
| Colours and fonts | `app/globals.css` (`@theme`) and `app/layout.tsx` |
| SEO metadata | `app/layout.tsx`; structured data in `app/page.tsx` |

## Replacing the placeholder photos

1. Put the photo in `public/images/`, e.g. `public/images/hero.jpg`.
2. In `lib/images.ts`, set that entry's `src` to `"/images/hero.jpg"`.
3. Update its alt text in `lib/i18n/en.ts` and `de.ts` under `images`.

Each slot paints a colour gradient behind the photo, so a missing image still looks intentional.

## Before launch

- Set the real domain in `lib/site.ts` (or `NEXT_PUBLIC_SITE_URL`); it drives the canonical URL and Open Graph links.
- Replace the Open Graph image URL in `app/layout.tsx` with your own photo.
