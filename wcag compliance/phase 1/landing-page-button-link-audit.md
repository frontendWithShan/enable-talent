# Landing Page Audit: Button vs Link Activation (WCAG 6.1 focus)

## Scope
- Route audited: `/` (landing page only)
- Components in scope:
  - `components/HomePage/Header.tsx`
  - `components/HomePage/Hero.tsx`
  - `components/HomePage/LatestRolesTopEmployers.tsx`
  - `components/HomePage/SectionCTA.tsx`
  - `components/HomePage/SectionAbout.tsx`
  - `components/HomePage/SectionTechnology.tsx`
  - `components/HomePage/SectionBlog.tsx`
  - `components/Employers/EmployersForwardThinking.tsx`
  - `components/awards/awards-footer.tsx` (footer used on `/` via `components/FooterGate.tsx`)
  - `components/ComingSoonModal.tsx`

## Rule audited
If control is an **action**, it must be a semantic `<button>` and support:
- `Enter` activates
- `Space` activates

If control is **navigation**, it should be a link (`<a>`/`<Link>`), where `Enter` activates navigation.

## Findings

## Header
- **For Employers trigger**: `<button>` — **Pass**
- **Globals trigger**: `<button>` — **Pass**
- **Spain in Globals dropdown** (opens modal): `<button role="menuitem">` — **Pass**
- **Enabled Africa in Globals dropdown** (navigates): `<Link>` — **Pass**
- **Login / Sign up** (external navigation): `<a>` — **Pass**

## Hero
- **Find Your Next Job / Post a Job**: navigation links styled as buttons (`<Link><span>...</span></Link>`) — **Pass**

## Latest Roles / Top Employers section
- **Latest Roles tab / Top Employers tab**: `<button>` — **Pass**
- **Previous / Next arrows**: `<button>` — **Pass**
- **View details / See more**: `<Link>` (navigation) — **Pass**

## For Talents / For Employers CTA cards
- **Start your Job Search / Post a Job**: `<Link>` (navigation) — **Pass**

## Enabled Academy section (landing)
- **Register for free** (opens modal): outer `<button>` — **Pass**

## Smart Technology section
- **Audience tabs**: `<button role="tab">` — **Pass**
- **CTA button when action** (opens modal): `<button>` — **Pass**
- **CTA when navigation**: `<Link>` — **Pass**

## Blogs section
- **Blog cards**: `<a>`/`<Link>` (navigation) — **Pass**
- **Read more**: `<Link>` (navigation) — **Pass**

## Footer (landing footer)
- **Sales demo**: `<button>` via `FancyButton` — **Pass**
- **Footer links that navigate**: `<Link>` — **Pass**
- **Footer items that open Coming Soon modal** (Career Coach, NGOs, Governments, Partners, Spain, etc.): `<button>` — **Pass**

## Coming Soon modal
- **Close (X)**: `<button>` — **Pass**
- **Got it**: `<button>` via `FancyButton` — **Pass**

## Verdict for this specific rule (6.1)
- **Landing page status: SATISFIED** for semantic button/link usage and expected keyboard activation behavior.
- No landing-page control was found using non-semantic clickable elements for actions.

## Notes (non-blocking, future hardening)
- `FancyButtonNoIcon` renders a `<span>` by design; it is valid in current landing usage because every interactive instance is wrapped by semantic `<button>` or `<Link>`. Reusing it alone (without wrapper) would violate this rule.
