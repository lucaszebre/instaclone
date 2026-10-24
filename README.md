# Instaclone

An Instagram-style social app built with Next.js 14 (App Router), Prisma and Postgres: photo posts, likes, comments, follows, profiles, search and real-time direct messages.

Live demo: https://instaclone-gules-one.vercel.app

## What it does

- Sign in with GitHub, Google or LinkedIn (Auth.js v5); a unique username is generated on first login
- Upload a photo (UploadThing), crop it in the browser, add a caption and post it
- Home feed with infinite scroll, likes, comments and saved posts
- Follow / unfollow with followers and following lists
- Public profile pages (`/username`) with post grid, avatar upload, bio editing and a shareable QR code
- User search
- Direct messages (`/direct`) with conversations pushed in real time through Pusher
- Light / dark theme

## Stack

- Next.js 14 (App Router, route handlers), React 18, TypeScript
- Prisma 5 with PostgreSQL
- Auth.js (`next-auth` v5 beta) with GitHub, Google and LinkedIn providers
- UploadThing for image storage, Pusher for real-time events, Upstash Redis client
- Tailwind CSS 3, Radix UI primitives (shadcn/ui), lucide-react icons
- TanStack Query, Zustand, react-hook-form + zod, axios

## Run locally

Requirements: Node 20+ and npm, a PostgreSQL database, plus accounts for the services listed below.

```bash
git clone https://github.com/lucaszebre/instaclone.git
cd instaclone
npm install            # also runs `prisma generate`
cp .env.example .env   # then fill in the values
npx prisma migrate deploy
npm run dev            # http://localhost:3000
```

Environment variables (see `.env.example`):

| Variable | Used for |
| --- | --- |
| `DATABASE_URL` | Postgres connection string for Prisma |
| `AUTH_SECRET` | Auth.js session encryption (`npx auth secret`) |
| `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` | GitHub OAuth app |
| `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` | Google OAuth client |
| `AUTH_LINKEDIN_ID`, `AUTH_LINKEDIN_SECRET` | LinkedIn OAuth app |
| `UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID` | UploadThing project |
| `PUSHER_APP_ID`, `NEXT_PUBLIC_PUSHER_APP_KEY`, `PUSHER_APP_SECRET` | Pusher Channels app (cluster is hard-coded to `eu`) |
| `REDIS_URL`, `REDIS_KEY` | Upstash Redis REST URL and token |
| `DIRECT_URL`, `SUPABASE_KEY`, `PUSHER_APP_CLUSTER` | Legacy, not read by the current code |

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

`next build` and `next dev` work without any of these values set; sign-in, uploads and messaging need the real ones.

## Status

Built between late 2023 and August 2024 as a learning project. Not actively maintained; dependencies were last refreshed in October 2026.
