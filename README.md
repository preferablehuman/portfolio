# Kunal Maheshwari Portfolio

Interactive recruiter-facing portfolio for Kunal Maheshwari, built with React, Vite, TypeScript, Tailwind CSS, Motion for React, and Lucide icons.

## Features

- Dedicated pages for Overview, About, Experience, Projects, Skills, Education, and Contact
- Project case studies with Overview, Architecture, Technical Work, Evidence, and Stack tabs
- Skill search with focused evidence views and deep links such as `/skills?skill=java`
- Dark/light mode toggle with persisted preference
- Resume preview modal with direct download and PDF open fallback
- Static deployment fallback through `public/_redirects`

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

Recommended near-free deployment target: Cloudflare Pages.

Use these settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`

The `public/_redirects` file keeps direct SPA routes such as `/about`, `/projects`, and `/skills?skill=java` working after deployment.

## Content Notes

The portfolio content is curated from Kunal's resume, LinkedIn PDF export, GitHub repositories, and local project evidence. Project descriptions intentionally avoid unsupported claims about production usage, formal compliance, or sole ownership of team-wide work.
