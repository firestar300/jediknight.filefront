# jediknight.filefront

A nostalgic tribute to **Jedi Knight Files** (`jediknight3.filefront.com`), the FileFront community hub where
_Jedi Knight II: Jedi Outcast_ and _Jedi Knight: Jedi Academy_ players downloaded maps, mods, skins and models
throughout the 2000s.

The goal is to bring back the look and feel of the site as it was in 2011, as preserved by the
[Wayback Machine](https://web.archive.org/web/20110828152922/http://jediknight3.filefront.com/), rebuilt with
modern, standards-based markup: semantic HTML, accessibility, SEO and web performance best practices, without
losing the original vibe.

> This is an unofficial fan project. It is not affiliated with FileFront, Activision, LucasArts, Lucasfilm or
> Raven Software.

## Pages

| Page | Path | Archived original |
| --- | --- | --- |
| Home | `/` | [2011-08-28 capture](https://web.archive.org/web/20110828152922/http://jediknight3.filefront.com/) |
| File page (Force Icon Mod) | `/file/force-icon-mod-119639/` | [2011-10-12 capture](https://web.archive.org/web/20111012145421/http://jediknight3.filefront.com/file/Force_Icon_Mod;119639) |

## Tech stack

- [Vite](https://vite.dev/) for the dev server and the static multi-page build
- [Tailwind CSS v4](https://tailwindcss.com/) for styling, with the original skin colours defined as theme tokens
  in `src/style.css`
- Plain HTML pages and a tiny bit of vanilla JavaScript (network menu, missing thumbnail fallback)
- A small in-house Vite plugin to share HTML partials between pages (no templating dependency)

## Getting started

Requirements: Node.js 24 (see `.nvmrc`).

```bash
npm install
npm run dev       # start the dev server
npm run build     # build the static site into dist/
npm run preview   # serve the production build locally
```

## Project structure

```text
.
├── index.html                          # Home page
├── file/force-icon-mod-119639/         # File detail page
├── partials/                           # Shared HTML blocks (member bar + banner, sidebars, footer)
├── public/
│   ├── images/                         # Banner (JPEG, WebP, AVIF)
│   └── thumbs/                         # File and Picture of the Day screenshots
├── src/
│   ├── main.js                         # Network menu and thumbnail fallback
│   └── style.css                       # Tailwind entry, theme tokens and components
└── vite.config.js                      # Partials plugin, base path and page inputs
```

### Shared partials

Any page can include a file from `partials/` with an HTML comment:

```html
<!-- @include partials/sidebar-left.html -->
```

Includes are resolved at build time and in the dev server. Editing a partial triggers a full page reload.

### Adding a page

1. Create `some/path/index.html`, reusing the partials and the layout of an existing page.
2. Register it in `build.rollupOptions.input` in `vite.config.js`.
3. Put its screenshots in `public/thumbs/` and always set `width`, `height` and a descriptive `alt` on images.

### Base path

Internal links are written as absolute paths (`/files/...`). When the site is served from a sub-folder (like a
GitHub Pages project site), set `BASE_PATH` at build time and every internal link, asset and image will be
prefixed automatically:

```bash
BASE_PATH=/jediknight.filefront npm run build
```

## Deployment

The site is deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`, or manually from
the _Actions_ tab.

One-time setup: in the repository settings, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

The workflow reads the base path from GitHub Pages, so the build works for a project site
(`https://<user>.github.io/jediknight.filefront/`) as well as for a custom domain. If you use a custom domain,
also update the `canonical` and `og:url` URLs in each page, which currently point to a placeholder domain.

## Best practices

- **Semantics**: landmarks (`header`, `nav`, `main`, `aside`, `footer`), one `h1` per page, sectioned content,
  data tables with captions and scoped headers, breadcrumb as an ordered list.
- **Accessibility**: skip link, labelled form controls, keyboard-friendly network menu (`aria-expanded`, `Escape`
  to close), visible focus, WCAG AA contrast, `prefers-reduced-motion` support.
- **SEO**: unique titles and descriptions, canonical URLs, Open Graph, JSON-LD (`WebSite`, `BreadcrumbList`,
  `SoftwareApplication`).
- **Performance**: no web fonts, AVIF/WebP banner with `fetchpriority="high"`, lazy-loaded thumbnails with fixed
  dimensions (no layout shift), purged and minified CSS (about 5 kB gzipped).
- **Responsive**: the original fixed 980px layout on desktop, stacked columns on smaller screens.

## Content and credits

- Original site design by Jos Jongejan aka Pro-Filer & Blumenkohl, for FileFront.
- The banner and the screenshots are archived images from the original site and belong to their respective
  authors. Most news items, file names and comments shown on the pages are sample data written for this
  project; file metadata on the file page comes from the archived page.
- Star Wars, Jedi Knight and related marks are trademarks of their respective owners.

If you are the author of an image or a file featured here and want it removed or credited differently, please
open an issue.
