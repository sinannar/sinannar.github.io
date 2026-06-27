# sinannar.github.io

Personal site and blog of [Sinan Nar](https://sinannar.github.io) — **Microsoft MVP**, Senior Software Engineer, based in Auckland, NZ.

Built with [Astro](https://astro.build/). The site uses a terminal / TUI-inspired design with a dark-first theme (and a light "paper" theme toggle), JetBrains Mono headings and Inter body type, and Shiki for code highlighting.

## Local development

Requires Node 18+.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static build -> ./dist
npm run preview
```

## Project layout

- `src/pages/` — routes (`index`, `about`, `experience`, `certifications`, `speaking`, `blog/`)
- `src/layouts/BlogPost.astro` — blog post layout (sticky TOC on desktop)
- `src/components/` — `Header`, `Footer`, `TerminalWindow`, `MvpBadge`, etc.
- `src/styles/global.css` — design tokens + themes + terminal accents
- `src/content/blog/` — Markdown / MDX posts
- `public/` — static assets

## Theming

The theme is set via `data-theme` on the root element and persisted in `localStorage`. The toggle lives in the header. System preference (`prefers-color-scheme`) is honoured on first load.

## License

Content © Sinan Nar. Code is provided as-is.
