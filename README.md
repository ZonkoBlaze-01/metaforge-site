# MetaForge — Next.js + Supabase Starter (Configured)

This package is pre-configured to use your Supabase project URL:
`https://lbsrzsqvwaztvjvdbnlz.supabase.co`

IMPORTANT: For security, **do not** commit real keys. Use Vercel Environment Variables or create a local `.env.local` with your keys (copy from `.env.example`).

## Quick start (local)
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and fill your Supabase keys.
3. Run locally: `npm run dev`
4. Open `http://localhost:3000`

## Deploy to Vercel (recommended)
1. Push this repo to GitHub.
2. Import project in Vercel and set environment variables:
   - NEXT_PUBLIC_SUPABASE_URL = https://lbsrzsqvwaztvjvdbnlz.supabase.co
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = <your anon key from Supabase>
   - SUPABASE_SERVICE_ROLE_KEY = <service role key - server only>
   - NEXT_PUBLIC_SITE_URL = https://metaforge-site.vercel.app
3. Deploy. After deployment, test Login (Email / Google / Discord) on `/auth/login`.

## Notes
- The anon key is public but should still be stored in env vars, not in the repo.
- If you want me to deploy the site for you or import seed data, say so and I'll prepare the SQL and instructions.
