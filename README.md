# Enable Talent - Web Platform Foundation

Short description
This repository currently serves the Enable Talent public website and is being modernized into a fuller web platform layer. The current phase now includes Supabase foundation infrastructure, admin auth, core schema/storage primitives, a Supabase-backed blog CMS, live public blog pages rendered from published CMS content, a Supabase-backed careers CMS, live public careers and applications, and a centralized Supabase-backed inquiry inbox.

Live site


Key features
- Accessible, responsive UI built with Next.js and Tailwind CSS
- Navigation, event listings, programs and awards, and resources for employers and talents
- Minimal, tree-shakable icons via lucide-react
- Mobile-friendly hamburger menu and desktop dropdowns
- Shared Supabase foundation helpers for auth, data, and storage
- Supabase-backed admin workflows for blogs, careers, inquiries, and job applications

Tech stack
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- lucide-react
- Supabase client foundation
- PostCSS, ESLint

Repository structure (relevant)
- `app/` - Next.js app routes and pages
- `components/` - shared React components
- `lib/data/` - server-only Supabase repositories for core platform domains
- `lib/supabase/` - shared Supabase environment and client helpers
- `docs/` - modernization and setup documentation
- `public/` - assets, icons, images, and logo files

Requirements
- Node.js 20+ is recommended
- npm or pnpm

Quick start (development)
1. Install dependencies
   `npm install`
2. Copy `.env.example` to `.env.local` and fill in the Supabase values if you are working on Supabase-backed features
3. Verify the Supabase connection
   `npm run supabase:check`
4. Run the dev server
   `npm run dev`
5. Open `http://localhost:3000`

Build for production
- `npm run build`
- `npm start`

Useful scripts
- `npm run dev` - run the development server
- `npm run build` - build the production app
- `npm run start` - run the production build
- `npm run lint` - run ESLint
- `npm run supabase:check` - verify the configured Supabase auth and Data API endpoints
- `npm run supabase:smoke` - run CRUD smoke checks against the applied core schema migration
- `node scripts/import-legacy-blogs.mjs --input <path> [--write]` - dry-run or import legacy blog JSON exports
- `node scripts/import-legacy-jobs.mjs --input <path> [--write]` - dry-run or import legacy careers JSON exports

Environment
- Supabase foundation notes live in `docs/supabase-foundation.md`
- Admin auth and role setup notes live in `docs/admin-auth-and-roles.md`
- Core schema and storage notes live in `docs/core-schema-and-storage.md`
- Blog CMS backend notes live in `docs/blog-cms-backend.md`
- Tiptap article editor notes live in `docs/tiptap-article-editor.md`
- Medium-style blog composer notes live in `docs/medium-style-blog-composer.md`
- Public blog live-data notes live in `docs/public-blog-live-data.md`
- Careers CMS notes live in `docs/careers-cms.md`
- Cutover and operations runbook lives in `docs/cutover-and-operations.md`
- Manual QA checklist lives in `docs/manual-qa-checklist.md`
- Primary variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SECRET_KEY`
- Temporary legacy fallbacks are still supported by the helpers:
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Supabase is now the source of truth for:
  - blogs and public blog pages
  - careers, public careers pages, and job applications
  - contact, demo, and consultation inquiries
- Legacy Firebase remains only for:
  - newsletter subscriptions
  - volunteer applications
- Before team use, apply all migrations in order and review `docs/cutover-and-operations.md` for import and setup steps

Accessibility and inclusive design
- Use semantic HTML, ARIA attributes where needed, and meaningful alt text for images
- Focus states and keyboard navigation are important for users relying on keyboards or assistive tech
- Maintain high color contrast and legible font sizes
- Agent-level standing instructions live in `AGENTS.md`
- Detailed accessibility guidance lives in `guideline.md`

Contributing
1. Create a branch for your feature or fix
2. Follow the existing TypeScript and Tailwind patterns
3. Run linting locally and add tests where appropriate
4. Open a PR with a clear summary of changes

Contact / Maintainers
- Project maintained by the Enable Talent team
