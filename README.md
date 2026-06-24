# Kunal Maheshwari Portfolio

Interactive recruiter-facing portfolio for Kunal Maheshwari, built with React, Vite, TypeScript, Tailwind CSS, Motion for React, and Lucide icons.

## Features

- Dedicated pages for Overview, About, Experience, Projects, Skills, Education, and Contact
- Project case studies with Overview, Architecture, Technical Work, Evidence, and Stack tabs
- Skill search with focused evidence views and deep links such as `/skills?skill=java`
- Dark/light mode toggle with persisted preference
- Resume preview modal with direct download and PDF open fallback
- GitHub Pages deep-link fallback through the generated `404.html`

## Local Development

```bash
npm.cmd install
npm.cmd run dev
```

## Verification

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

## Deployment

Active deployment target: GitHub Pages at
`https://preferablehuman.github.io/portfolio/`.

The deployment workflow builds the Vite application, uploads `dist`, adds the
SPA fallback, and verifies that GitHub Pages is serving compiled assets rather
than the repository's raw `src/main.tsx` entry point.

Repository setting:

- Settings → Pages → Build and deployment → Source: **GitHub Actions**

The workflow copies the built `index.html` to `404.html`, which keeps direct
SPA routes such as `/portfolio/about`, `/portfolio/projects`, and
`/portfolio/skills?skill=java` working after deployment.

Cloudflare files are parked under `deployment-archive/cloudflare/` with
`.disabled` extensions. No Vercel deployment configuration is active.

## Content Notes

The portfolio content is curated from Kunal's resume, LinkedIn PDF export, GitHub repositories, and local project evidence. Project descriptions intentionally avoid unsupported claims about production usage, formal compliance, or sole ownership of team-wide work.
