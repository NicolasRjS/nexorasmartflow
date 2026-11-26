# Nexora Intralogistics Solutions website

Company website for Nexora Intralogistics Solutions and its solution, Nexora SmartFlow 360.
Built for SIE 415/515 Technical Sales and Marketing (University of Arizona), Project Assignment 10.
Nexora and its reference customers are fictional.

Live site: https://nexorasmartflow.vercel.app

## Run locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where to edit content

| What | File |
| --- | --- |
| Contact email, phone, location, `showTeamNames` flag, navigation, external links | `src/content/site.ts` |
| Modules, delivery stages, reference customers and KPIs, team | `src/content/data.ts` |
| Capacity Planner rates and reference design | `src/lib/capacity.ts` |
| Page copy | `src/app/<page>/page.tsx` |
| Colors and fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Videos, posters, captions, customer logos | `public/videos/`, `public/images/` |

## Pages

`/` Home · `/smartflow-360` · `/capacity-planner` · `/implementation` · `/results` · `/about` · `/contact`

## Deployment

Pushing to `main` deploys to production on Vercel (`vercel.json` sets the Next.js framework preset).
The site is fully static: no database, API routes, environment variables or analytics.
