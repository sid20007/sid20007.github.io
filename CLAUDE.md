# sid20007 — Personal Portfolio

Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + Framer Motion.

## Stack
- **Framework:** Next.js 16.2 with React 19.2 (both have breaking changes — check `node_modules/next/dist/docs/` if unsure)
- **Styling:** Tailwind CSS 4 (uses `@import "tailwindcss"` and `@theme inline` — no `tailwind.config.ts`)
- **Animation:** Framer Motion 12 with `whileInView` for scroll-triggered animations
- **Fonts:** Geist Sans + Geist Mono via `next/font/google`

## Theme (dark)
- Background: `#0a0a0b` (page), `#111113` (surface/cards)
- Foreground: `#e4e4e7` (primary text), `#a1a1aa` (secondary), `#71717a` (muted)
- Borders: `white/[0.06]` default, `white/[0.1]` hover
- CSS custom properties defined in `globals.css` as `--color-*`
- Interactive hover: `hover:bg-white/[0.04]`, `hover:text-white`

## Project structure
```
src/
  app/                    # Next.js App Router pages
    api/contact/          # Contact form API route (POST)
    blog/[slug]/          # Dynamic blog post pages (SSG)
    blog/                 # Blog listing
    projects/             # Projects listing
    contact/              # Contact page with form
  components/             # All UI components
  data/                   # Static data — site config, projects, blog posts, tech stack
```

## Conventions
- Page components default to server components; only add `"use client"` when interactivity/animations are needed
- Blog content uses a custom block-based format (`BlogBlock[]`) rendered by `BlogContent`
- All data is static/colocated in `src/data/` — no CMS or database
- Contact form logs to console — no email integration wired yet