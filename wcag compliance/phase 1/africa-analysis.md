# Enabled Africa WCAG Checklist Analysis (Strict Pass/Fail)

Source checklist: `wcag compliance.md`  
Scope analyzed: route `/africa` and shared route-level shell behavior affecting that page.

Rule applied: each point is **Satisfied** only if fully met. If any required part is missing, the point is **Not Satisfied**.

## Satisfied

### 1.1 Heading Structure & Semantic HTML (WCAG 1.3.1)
- Route contains a single visible `<h1>` in the hero:
  - `components/Africa/AfricaLandingPage.tsx:145`
- Section headings use `<h2>` and card headings use `<h3>`, preserving a logical page outline:
  - `components/Africa/AfricaLandingPage.tsx:173`
  - `components/Africa/AfricaLandingPage.tsx:222`
  - `components/Africa/AfricaLandingPage.tsx:267`
  - `components/Africa/AfricaLandingPage.tsx:312`
  - `components/Africa/AfricaLandingPage.tsx:332`
  - `components/Africa/AfricaLandingPage.tsx:396`
  - `components/Africa/AfricaLandingPage.tsx:452`
  - `components/Africa/AfricaLandingPage.tsx:289`
  - `components/Africa/AfricaLandingPage.tsx:362`
  - `components/Africa/AfricaLandingPage.tsx:427`
  - `components/Africa/AfricaLandingPage.tsx:528`
- Primary page content is wrapped in a semantic `<main>`:
  - `components/Africa/AfricaLandingPage.tsx:115`

### 1.2 Landmark Regions (WCAG 1.3.1)
- Shared header landmark is rendered on `/africa` because the route is not one of the standalone shell exceptions:
  - `components/AppShell.tsx:15`
  - `components/AppShell.tsx:23`
- Shared header includes a labeled nav landmark:
  - `components/HomePage/Header.tsx:328`
  - `components/HomePage/Header.tsx:338`
- Route exposes the expected main landmark target:
  - `components/Africa/AfricaLandingPage.tsx:116`
- Shared footer landmark is present on this route:
  - `components/FooterGate.tsx`
  - `components/awards/awards-footer.tsx:112`

### 1.3 Skip to Main Content Visibility (WCAG 2.4.1)
- Shared skip link is rendered in the header and targets `#main-content`:
  - `components/HomePage/Header.tsx:330`
- Route main target uses the same id and remains programmatically focusable with `tabIndex={-1}`:
  - `components/Africa/AfricaLandingPage.tsx:116`
- Shared focus styling exists for the main target:
  - `app/globals.css:49`

### 2.1 Alt Text for Images (WCAG 1.1.1)
- Audited route images include alt text, including descriptive alt on informative media and empty alt on decorative icons:
  - Hero image: `components/Africa/AfricaLandingPage.tsx:132`
  - Foreground Africa map: `components/Africa/AfricaLandingPage.tsx:185`, `components/Africa/AfricaLandingPage.tsx:233`
  - Profile images: `components/Africa/AfricaLandingPage.tsx:201`, `components/Africa/AfricaLandingPage.tsx:240`, `components/Africa/AfricaLandingPage.tsx:243`, `components/Africa/AfricaLandingPage.tsx:246`, `components/Africa/AfricaLandingPage.tsx:249`, `components/Africa/AfricaLandingPage.tsx:252`
  - Why Enabled Africa cards: `components/Africa/AfricaLandingPage.tsx:280`
  - Banner and section imagery: `components/Africa/AfricaLandingPage.tsx:305`, `components/Africa/AfricaLandingPage.tsx:309`, `components/Africa/AfricaLandingPage.tsx:383`, `components/Africa/AfricaLandingPage.tsx:416`, `components/Africa/AfricaLandingPage.tsx:516`
  - Decorative checklist icon uses `alt=""`: `components/Africa/AfricaLandingPage.tsx:356`, `components/Africa/AfricaLandingPage.tsx:505`

### 2.2 Video Accessibility (WCAG 1.2.2)
- No prerecorded video, iframe media player, or caption-dependent media implementation is present in route scope:
  - `components/Africa/AfricaLandingPage.tsx`

### 3.1 Keyboard Navigation (WCAG 2.1.1)
- Route actions use semantic links and inherited semantic controls rather than clickable non-semantic containers.
- CTA links are implemented as `Link` elements with the visual button rendered as a non-focusable span:
  - `components/Africa/AfricaLandingPage.tsx:104`
  - `components/Africa/AfricaLandingPage.tsx:107`
- Shared `LatestRolesTopEmployers` controls included on the route are already semantic buttons/links from the audited landing implementation:
  - `components/Africa/AfricaLandingPage.tsx:163`

### 3.2 Focus Indicators (WCAG 2.4.7)
- Global `:focus-visible` styling is applied to common interactive elements:
  - `app/globals.css:33`
- Main landmark focus styling exists for the route target:
  - `app/globals.css:49`

### 4.1 Proper Label Association (WCAG 1.3.1, 3.3.2)
- No route-specific form controls are present on `/africa`, so there are no label-association failures in scope:
  - `components/Africa/AfricaLandingPage.tsx`

### 4.2 Error Handling (WCAG 3.3.1)
- No route-specific form submission or validation flow is present on `/africa`, so there are no route-level error-message failures in scope:
  - `components/Africa/AfricaLandingPage.tsx`

### 5.2 Avoid Color-Only Indicators (WCAG 1.4.1)
- Route content does not use color alone to communicate state or meaning in its primary CTAs and section cards.
- Shared nav and selected-state UI rendered on this route already include non-color indicators from the audited shared header/landing patterns.

### 6.1 Proper Button Markup (WCAG 4.1.2)
- Route navigation/actions use semantic links, while the visual button treatment is delegated to `FancyButton` rendered as `span` inside the link:
  - `components/Africa/AfricaLandingPage.tsx:107`
  - `components/Africa/AfricaLandingPage.tsx:108`
- No route action is implemented as a clickable `div` or `span`.

### 7.1 Plain Language
- Core route copy is understandable in context and uses task-oriented phrasing:
  - `Africa's Largest Talent Bank`
  - `Get Started Now`
  - `Find opportunities that match your potential and support your long-term growth.`
  - `Why Employers Choose Us`
  - `About Enabled Africa`
- Route does not use the more problematic `For Talents` / `For Employers` style labels as section-level navigation.

### 7.2 Reduce Motion (WCAG 2.3.3)
- Global reduced-motion handling is present and applies to this route:
  - `app/globals.css:4`

## Not Satisfied

### 5.1 Color Contrast (WCAG 1.4.3)
Not satisfied because there is no committed route-specific contrast audit artifact for `/africa`, and the page contains several image-overlay and low-contrast-risk combinations that should not be assumed compliant without evidence.
- No Africa-specific contrast report exists in the evidence folder:
  - `wcag compliance/phase 1/evidence/contrast`
- White hero text sits directly on a photographic background:
  - `components/Africa/AfricaLandingPage.tsx:145`
  - `components/Africa/AfricaLandingPage.tsx:153`
- White banner text also sits directly on a photographic background:
  - `components/Africa/AfricaLandingPage.tsx:312`
- Until route-specific contrast verification is added, this point remains a strict failure.

### 8.1 Zoom to 200% (WCAG 1.4.4)
Not satisfied because current route layout includes multiple fixed-height/overflow-constrained regions and there is no committed route-specific zoom verification.
- Root main wrapper forces `overflow-hidden`:
  - `components/Africa/AfricaLandingPage.tsx:118`
- Hero uses fixed-height image treatment:
  - `components/Africa/AfricaLandingPage.tsx:133`
- Connection section relies on fixed-height visual containers and large absolutely-positioned art/profile placements:
  - `components/Africa/AfricaLandingPage.tsx:181`
  - `components/Africa/AfricaLandingPage.tsx:219`
- Additional fixed-height sections and image containers exist further down the page:
  - `components/Africa/AfricaLandingPage.tsx:277`
  - `components/Africa/AfricaLandingPage.tsx:305`
  - `components/Africa/AfricaLandingPage.tsx:380`
  - `components/Africa/AfricaLandingPage.tsx:413`
- No route-specific 200% zoom walkthrough artifact is committed.

### 9. Testing Requirements
Not satisfied because checklist-required test artifacts are not present for `/africa`.
- Missing keyboard-only walkthrough evidence
- Missing NVDA or VoiceOver evidence
- Missing Lighthouse accessibility report
- Missing WAVE report
- Missing route-specific zoom proof
- Missing route-specific contrast checker output

## Conclusion

This route is structurally aligned with the shared header/footer, skip-link, and `#main-content` contract, and its route-scope semantics are in solid shape. Remaining strict blockers are route-specific contrast verification, zoom/reflow proof for a highly visual fixed-layout page, and the absence of the required testing artifact bundle.
