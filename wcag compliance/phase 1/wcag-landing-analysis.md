# Landing Page WCAG Checklist Analysis (Strict Pass/Fail)

Source checklist: `wcag compliance.md`  
Scope analyzed: landing page route (`/`) and components rendered there.

Rule applied: each point is **Satisfied** only if fully met. If any required part is missing, the point is **Not Satisfied**.

## Satisfied

### 1.3 Skip to Main Content Visibility (WCAG 2.4.1)
- Skip link is present and keyboard-focus visible: `components/HomePage/Header.tsx:237`.
- Skip target exists and is programmatically focusable (`tabIndex={-1}`): `app/page.tsx:10`, `app/page.tsx:11`.

### 4.1 Proper Label Association (WCAG 1.3.1, 3.3.2)
- Form controls are associated with labels via `htmlFor`/`id` pairs in demo request modal:
  - `components/DemoRequestModal.tsx:264`, `components/DemoRequestModal.tsx:267`
  - `components/DemoRequestModal.tsx:288`, `components/DemoRequestModal.tsx:292`
  - `components/DemoRequestModal.tsx:315`, `components/DemoRequestModal.tsx:319`
  - `components/DemoRequestModal.tsx:338`, `components/DemoRequestModal.tsx:342`
  - `components/DemoRequestModal.tsx:363`, `components/DemoRequestModal.tsx:367`

### 4.2 Error Handling (WCAG 3.3.1)
- Errors are not conveyed by color alone; text messages are rendered.
- Error and success announcements use ARIA live regions:
  - `role="alert" aria-live="assertive"`: `components/DemoRequestModal.tsx:392`
  - `role="status" aria-live="polite"`: `components/DemoRequestModal.tsx:386`

### 7.2 Reduce Motion (WCAG 2.3.3)
- Global reduced-motion CSS exists and reduces animation/transition behavior when user preference is set: `app/globals.css:4`.

## Not Satisfied

### 1.1 Heading Structure & Semantic HTML (WCAG 1.3.1)
Satisfied.
- Landing page has a single `<h1>` in hero: `components/HomePage/Hero.tsx:31`.
- Latest Roles/Top Employers section now defines a semantic section heading (`h2`) and correctly references it via `aria-labelledby`:
  - `components/HomePage/LatestRolesTopEmployers.tsx` (`h2#latest-roles-heading` + `aria-labelledby="latest-roles-heading"`)
- Card titles remain `h3`, preserving a logical `h1 -> h2 -> h3` outline:
  - `components/HomePage/LatestRolesTopEmployers.tsx:190`
  - `components/HomePage/LatestRolesTopEmployers.tsx:237`

### 1.2 Landmark Regions (WCAG 1.3.1)
Satisfied.
- Header landmark exists: `components/HomePage/Header.tsx` (root `<header>`)
- Nav landmark exists and is labeled: `components/HomePage/Header.tsx` (`<nav aria-label="Main navigation">`)
- Main landmark exists and uses the checklist id: `app/page.tsx` (`<main id="main-content" ...>`)
- Footer landmark exists on `/`:
  - Home route uses `AwardsFooter`: `components/FooterGate.tsx:37`
  - `AwardsFooter` root is now `<footer>`: `components/awards/awards-footer.tsx`

### 2.1 Alt Text for Images (WCAG 1.1.1)
Satisfied.
- All landing images include an `alt` attribute (decorative assets use `alt=""`).
- Blog card images no longer use a generic `"Blog image"` fallback; alt is derived from title or summary with a meaningful final fallback:
  - `components/HomePage/SectionBlog.tsx` (`imageAlt` computation)

Image-by-image landing inventory:
- `Decorative alt OK`
  - Hero dots (`alt=""`): `components/HomePage/Hero.tsx:24`
  - Footer brand icon next to brand text (`alt=""`): `components/awards/awards-footer.tsx:155`
- `Informative alt OK`
  - Header brand/logo and menu icons: `components/HomePage/Header.tsx:258`, `components/HomePage/Header.tsx:411`, `components/HomePage/Header.tsx:438`, `components/HomePage/Header.tsx:485`, `components/HomePage/Header.tsx:694`, `components/HomePage/Header.tsx:729`, `components/HomePage/Header.tsx:761`
  - Hero main image: `components/HomePage/Hero.tsx:81`
  - CTA cards: `components/HomePage/SectionCTA.tsx:47`, `components/HomePage/SectionCTA.tsx:96`, `components/HomePage/SectionCTA.tsx:107`
  - Latest roles / employer icons: `components/HomePage/LatestRolesTopEmployers.tsx:205`, `components/HomePage/LatestRolesTopEmployers.tsx:231`
  - Trusted partners logos: `components/HomePage/SectionPartners.tsx:82`
  - Technology panel image (all audience configs provide descriptive `imageAlt`): `components/HomePage/SectionTechnology.tsx:166`, `utils/technologyAudience.ts:64`, `utils/technologyAudience.ts:93`, `utils/technologyAudience.ts:122`, `utils/technologyAudience.ts:151`, `utils/technologyAudience.ts:179`
  - Featured-in logos carousel: `components/Employers/EmployersForwardThinking.tsx:86`
  - Footer social logos: `components/awards/awards-footer.tsx:172`, `components/awards/awards-footer.tsx:184`, `components/awards/awards-footer.tsx:201`, `components/awards/awards-footer.tsx:218`
- `Needs fix`
  - (Resolved) Blog image fallback alt text is no longer generic.

### 2.2 Video Accessibility (WCAG 1.2.2)
Not satisfied because the “video” area is not an actual video implementation and cannot meet caption/transcript requirements.
- The section renders a static image (`discussion.png`) plus an overlaid play button only:
  - `components/HomePage/SectionAbout.tsx:64`
  - `components/HomePage/SectionAbout.tsx:74`
- There is no `<video>` element, no caption track, and no transcript content on page:
  - `components/HomePage/SectionAbout.tsx` (entire component)
- The overlay play button has no media behavior (`onClick`/player wiring is absent), so “play/pause accessible via keyboard” cannot be satisfied:
  - `components/HomePage/SectionAbout.tsx:74`

### 3.1 Keyboard Navigation (WCAG 2.1.1)
Satisfied.
- All interactive elements on landing are operable via keyboard using native semantics.
- Latest Roles / Top Employers toggles are now real `<button type="button">` controls (keyboard-focusable and activatable by default):
  - `components/HomePage/LatestRolesTopEmployers.tsx` (tab toggle buttons wrapping `FancyButtonNoIcon`)

### 3.2 Focus Indicators (WCAG 2.4.7)
Satisfied.
- A global `:focus-visible` baseline is applied to common interactive elements (links, buttons, form controls, and tabbables), ensuring focus is always clearly visible and not dependent on browser defaults:
  - `app/globals.css` (global `:where(...):focus-visible` rule)
- Main landmark focus styling was updated to match the landing id (`#main-content`), keeping skip-link/route-change focus clearly visible:
  - `app/globals.css` (`#main-content:focus-visible`)

### 5.1 Color Contrast (WCAG 1.4.3)
Satisfied.
- Previously failing colors were replaced with darker accessible shades while preserving design intent:
  - `components/HomePage/LatestRolesTopEmployers.tsx`
    - `#D9933F` -> `#8C4A0E`
    - `#b0732b` -> `#6F390B` (hover)
  - `components/HomePage/SectionAbout.tsx`
    - `#f38b2a` -> `#A45312`
- These changes resolve the documented landing text contrast failures for normal text.

### 5.2 Avoid Color-Only Indicators (WCAG 1.4.1)
Satisfied.
- Active/selected states now include non-color indicators in key landing controls:
  - Header active nav link uses underline + stronger weight, not color alone:
    - `components/HomePage/Header.tsx` (`getNavLinkClasses`)
  - Latest Roles / Top Employers selected tab includes visible ring:
    - `components/HomePage/LatestRolesTopEmployers.tsx`
  - Smart Technology selected tab includes visible ring:
    - `components/HomePage/SectionTechnology.tsx`
- Selected state is now perceivable without relying on color-only difference.

### 6.1 Proper Button Markup (WCAG 4.1.2)
Satisfied.
- Actions use semantic `<button>` elements and navigation uses semantic links.
- Latest Roles / Top Employers toggles are semantic buttons:
  - `components/HomePage/LatestRolesTopEmployers.tsx` (tab toggle buttons)

### 7.1 Plain Language
Satisfied.
- Navigation uses task-based language for job seekers:
  - Header link label updated from “For Talents” to “Find Jobs”: `components/HomePage/Header.tsx`
- Branded navigation item includes clarifying plain-language descriptor:
  - “Enabled Agent” now includes “AI matching assistant” beneath the label (desktop + mobile dropdown items): `components/HomePage/Header.tsx`

### 8.1 Zoom to 200% (WCAG 1.4.4)
Not satisfied because 200% zoom behavior is not validated and current code includes overflow-risk patterns.
- No test artifact in repo demonstrates “no horizontal scrolling” at 200% zoom.
- Root main wrapper enforces `overflow-hidden`, which can hide clipped content instead of preserving access:
  - `app/page.tsx:12`
- Multiple landing elements force no-wrap / fixed sizing that can overflow at zoom:
  - `whitespace-nowrap` in desktop dropdown menu: `components/HomePage/Header.tsx:386`
  - `whitespace-nowrap` on job card links: `components/HomePage/LatestRolesTopEmployers.tsx:215`, `components/HomePage/LatestRolesTopEmployers.tsx:259`

### 9. Testing Requirements
Not satisfied because checklist-required test outputs are not present in repository:
- Keyboard-only walkthrough evidence: missing (no test notes/video/checklist file)
- NVDA/VoiceOver evidence: missing (no SR transcript/log file)
- Lighthouse accessibility report: missing
- WAVE report: missing
- Contrast checker report: missing
- Repo search only returns policy/analysis docs, not test artifacts:
  - `wcag compliance.md`
  - `wcag-landing-analysis.md`

## Conclusion
Strictly applying all-or-nothing criteria, only points with complete implementation evidence are marked satisfied.
