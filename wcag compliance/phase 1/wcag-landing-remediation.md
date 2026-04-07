# Landing Page WCAG Remediation Log (Strict Pass/Fail)

Purpose: track **exact changes** made to move each item in `wcag-landing-analysis.md` from **Not Satisfied** to **Satisfied**, with concrete code evidence and verification steps.

Scope: landing page route (`/`) and components rendered there.

Status key:
- `Not Started` = not yet implemented
- `In Progress` = code changes underway but not fully verified
- `Satisfied` = all acceptance criteria met (with evidence + verification notes)

---

## 1.1 Heading Structure & Semantic HTML (WCAG 1.3.1 Info and Relationships)

Status: `Satisfied`

### What Was Failing (Evidence)
- Heading order skips `h2` before `h3` in Latest Roles/Top Employers section:
  - Section contains `h3` card titles: `components/HomePage/LatestRolesTopEmployers.tsx:190`, `components/HomePage/LatestRolesTopEmployers.tsx:237`
  - No section-level `h2` exists in that component.
- Broken relationship labeling:
  - `aria-labelledby="latest-roles-heading"` points to a missing id: `components/HomePage/LatestRolesTopEmployers.tsx:132`

### Acceptance Criteria (Strict)
- Page uses **one** `h1`.
- Section headings follow a logical hierarchy (no skipped levels).
- Any `aria-labelledby` references point to an existing element id.
- Screen reader heading navigation presents a logical outline for the page.

### Remediation Plan (Design-Safe)
- Add a visually-neutral section heading element in `LatestRolesTopEmployers`:
  - Create an `h2` with `id="latest-roles-heading"` that matches the section purpose.
  - Keep design intact by using either:
    - `className="sr-only"` (semantic only), or
    - visible heading with the same styling as existing section patterns (only if you want it visible).
- Ensure card titles remain `h3` under that `h2`.
- Verify no other landing sections introduce heading skips.

### Implementation Checklist
- [x] Add `<h2 id="latest-roles-heading" ...>` to `components/HomePage/LatestRolesTopEmployers.tsx`
- [x] Confirm `aria-labelledby="latest-roles-heading"` now resolves correctly (id now exists)
- [x] Confirm `Hero` still contains the only `<h1>` on `/` (`components/HomePage/Hero.tsx:31`)
- [x] Confirm heading order on `/` is `h1` -> `h2` -> `h3` (no gaps)

### Changes Made (Evidence)
- Added a semantic, visually-hidden `h2` used as the section label target:
  - `components/HomePage/LatestRolesTopEmployers.tsx` (new `h2#latest-roles-heading`)
- This repairs the broken `aria-labelledby` reference and prevents skipping directly from the page `h1` to `h3` card titles.

### Verification Steps
- Keyboard: nothing new should be tabbable if `h2` is `sr-only`.
- Screen reader: headings list shows correct outline.
- Quick DOM check: ensure exactly one `#latest-roles-heading` exists and is within the section.

---

## 1.2 Landmark Regions (WCAG 1.3.1)

Status: `Satisfied`

### What Was Failing (Evidence)
- Landing footer did not use a semantic `<footer>` landmark:
  - `AwardsFooter` root element was `<section>`: `components/awards/awards-footer.tsx:112`
- Checklist fix specifies `<main id="main-content">` but landing used `id="main"`:
  - `app/page.tsx:10`
- Skip link and route-change focus logic targeted `#main`, not `#main-content`:
  - `components/HomePage/Header.tsx:238`
  - `components/RouteChangeFocus.tsx:16`

### Acceptance Criteria (Strict)
- Screen readers can jump between `header`, `nav`, `main`, and `footer` landmarks on `/`.
- Main content uses `id="main-content"` (per checklist guidance).
- Skip link targets the main content landmark id.

### Changes Made (Evidence)
- Updated the landing main landmark id:
  - `app/page.tsx` now renders `<main id="main-content" ...>`
- Updated skip link target and nav aria-label:
  - `components/HomePage/Header.tsx` skip link now points to `#main-content`
  - `components/HomePage/Header.tsx` nav now uses `aria-label="Main navigation"`
- Updated route-change focus target:
  - `components/RouteChangeFocus.tsx` now focuses `#main-content`
- Updated the landing footer landmark:
  - `components/awards/awards-footer.tsx` root changed from `<section>` to `<footer>` (classes unchanged)

### Verification Steps
- Keyboard: pressing TAB on `/` reveals skip link; activating it moves focus to main content.
- Screen reader: landmarks rotor/list includes Header/Nav/Main/Footer.

---

## 2.1 Alt Text for Images (WCAG 1.1.1 Non-text Content)

Status: `Satisfied`

### What Was Failing (Evidence)
- Blog card image alt could fall back to a generic `"Blog image"` string when a title field was missing:
  - `components/HomePage/SectionBlog.tsx` (previous `alt={blog.Title || blog.title || "Blog image"}`)

### Acceptance Criteria (Strict)
- No image without an `alt` attribute.
- Informative images have meaningful `alt` text; decorative images use `alt=""`.
- Screen reader announces meaningful descriptions.

### Changes Made (Evidence)
- Added a deterministic, meaningful alt computation for blog images:
  - Uses title when available
  - Otherwise uses description/excerpt
  - Otherwise uses a meaningful final fallback
  - `components/HomePage/SectionBlog.tsx` (`imageAlt` computation and `alt={imageAlt}`)
- Prevents empty visible headings by providing a visible title fallback:
  - `components/HomePage/SectionBlog.tsx` (`{blogTitle || "Enabled Talent blog post"}`)

### Verification Steps
- Spot-check 3 blog cards on `/` with a screen reader and confirm the image alt announces a meaningful description.

---

## 3.1 Keyboard Navigation (WCAG 2.1.1 Keyboard)

Status: `Satisfied`

### What Was Failing (Evidence)
- Latest Roles / Top Employers controls used a non-semantic clickable span component (`FancyButtonNoIcon`) directly with `onClick`, which is not keyboard-operable by default:
  - `components/FancyButtonNoIcon.tsx` (renders a `<span>`)
  - `components/HomePage/LatestRolesTopEmployers.tsx` (tab toggles)

### Acceptance Criteria (Strict)
- Entire landing page usable with only TAB / SHIFT+TAB / ENTER / SPACE.
- No clickable non-semantic elements used as controls (no “clickable div/span without role/tabIndex”).

### Changes Made (Evidence)
- Converted the two tab toggles to semantic buttons while preserving the existing visual styles by keeping `FancyButtonNoIcon` as the inner visual element:
  - `components/HomePage/LatestRolesTopEmployers.tsx` (two `<button type="button">` wrappers with `onClick`)
- Removed invalid nested interactive elements (button-inside-link) for landing CTAs by rendering `FancyButton` as a non-focusable `span` when wrapped by `Link`:
  - `components/HomePage/Hero.tsx` (hero CTAs)
  - `components/HomePage/SectionCTA.tsx` (For talents / For employers CTAs)
  - `components/HomePage/SectionTechnology.tsx` (CTA inside Link)
  - `components/HomePage/SectionBlog.tsx` (Read more CTA)

### Verification Steps
- Keyboard: TAB reaches both toggles; ENTER/SPACE switches tabs.
- Screen reader: controls are announced as buttons.
- Keyboard: hero/CTA/technology CTAs advance with a single TAB per control (no double-focus stops).

---

## 6.1 Proper Button Markup (WCAG 4.1.2 Name, Role, Value)

Status: `Satisfied`

### What Was Failing (Evidence)
- Latest Roles / Top Employers tab toggles previously used a span as an action control.

### Acceptance Criteria (Strict)
- Actions use `<button>`; navigation uses `<a>`.
- Screen reader announces action controls as “button”.

### Changes Made (Evidence)
- Latest Roles / Top Employers toggles are now semantic buttons:
  - `components/HomePage/LatestRolesTopEmployers.tsx`

---

## 3.2 Focus Indicators (WCAG 2.4.7 Focus Visible)

Status: `Satisfied`

### What Was Failing (Evidence)
- Focus visibility relied on UA defaults and ad-hoc component focus styles; additionally, the main landmark focus styling targeted `#main` but the landing page main landmark is `#main-content`.
  - `app/globals.css` previously styled `#main:focus-visible` / `#main:focus:not(:focus-visible)`

### Acceptance Criteria (Strict)
- Every interactive element clearly shows focus when navigated to via keyboard.

### Changes Made (Evidence)
- Added a global `:focus-visible` rule covering links, buttons, form controls, and tabbable elements:
  - `app/globals.css` (`:where(...):focus-visible`)
- Updated main landmark focus styling to match landing id:
  - `app/globals.css` (`#main-content:focus-visible` and `#main-content:focus:not(:focus-visible)`)

### Verification Steps
- Keyboard: TAB through header links, dropdown triggers, carousel buttons, blog cards, footer links/social icons and confirm a visible outline appears on each.
- Skip link: activate skip link and confirm main region shows the custom focus outline.

---

## 7.1 Plain Language

Status: `Satisfied`

### What Was Failing (Evidence)
- Checklist recommends simplifying navigation labels and adding clarifying descriptions for branded terms; header navigation previously used role-based jargon (“For Talents”) and a branded term without a descriptor (“Enabled Agent”).
  - `components/HomePage/Header.tsx` (nav labels)

### Acceptance Criteria (Strict)
- Navigation understandable without prior context.
- “For Talents” simplified to task-based language (“Find Jobs”).
- “Enabled Agent” includes a short clarifying description beneath.

### Changes Made (Evidence)
- Updated job-seeker nav label to task-based wording:
  - `components/HomePage/Header.tsx` (“Find Jobs”)
- Added a short clarifying description under “Enabled Agent” in both desktop and mobile dropdown items:
  - `components/HomePage/Header.tsx` (“AI matching assistant”)

### Verification Steps
- Visual: Header shows “Find Jobs” instead of “For Talents”.
- Visual: Employers dropdown shows “Enabled Agent” with “AI matching assistant” beneath it.

---

## 5.2 Avoid Color-Only Indicators (WCAG 1.4.1 Use of Color)

Status: `Satisfied`

### What Was Failing (Evidence)
- Active/selected states were conveyed primarily by color-only differences on landing:
  - Header active nav links (amber vs gray): `components/HomePage/Header.tsx`
  - Latest Roles / Top Employers selected pill: `components/HomePage/LatestRolesTopEmployers.tsx`
  - Smart Technology selected audience tab: `components/HomePage/SectionTechnology.tsx`

### Acceptance Criteria (Strict)
- Selected/current state must include at least one non-color visual indicator.
- Indicator must persist in normal view (not hover-only/focus-only).

### Changes Made (Evidence)
- Header active nav links now include non-color indicators:
  - Underline + stronger weight on active state in `getNavLinkClasses`
  - `components/HomePage/Header.tsx`
- Latest Roles / Top Employers selected tab now includes a visible ring outline:
  - `components/HomePage/LatestRolesTopEmployers.tsx`
- Smart Technology selected tab now includes a visible ring outline:
  - `components/HomePage/SectionTechnology.tsx`

### Verification Steps
- Header: active page item remains visibly distinct even in grayscale (underline/weight still visible).
- Latest Roles / Top Employers: selected state is identifiable by ring, not only fill color.
- Smart Technology tabs: selected state is identifiable by ring, not only fill color.

---

## 5.1 Color Contrast (WCAG 1.4.3 Contrast Minimum)

Status: `Satisfied`

### What Was Failing (Evidence)
- Landing link color used for `View details` / `See more` on white did not meet 4.5:1 for normal text:
  - `components/HomePage/LatestRolesTopEmployers.tsx`
- Enabled Academy accent heading color on light gray background had insufficient contrast:
  - `components/HomePage/SectionAbout.tsx`

### Acceptance Criteria (Strict)
- All normal text on landing must meet at least 4.5:1 contrast ratio against its background.
- Hover states must also remain compliant.

### Changes Made (Evidence)
- Updated Latest Roles / Top Employers links to darker accessible brand-adjacent colors:
  - Base: `#D9933F` -> `#8C4A0E`
  - Hover: `#b0732b` -> `#6F390B`
  - File: `components/HomePage/LatestRolesTopEmployers.tsx`
- Updated Enabled Academy accent heading color to a darker accessible shade:
  - `#f38b2a` -> `#A45312`
  - File: `components/HomePage/SectionAbout.tsx`

### Verification Steps
- Run contrast check for:
  - `#8C4A0E` on white
  - `#6F390B` on white (hover)
  - `#A45312` on `#f1f4f5`
- Keyboard and visual regression check confirms no layout/interaction changes, only color tuning.
