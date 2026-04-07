# Programs and Awards WCAG Checklist Analysis (Strict Pass/Fail)

Source checklist: wcag compliance.md
Scope analyzed: route /programs-awards.

Rule applied: each point is Satisfied only if fully met. If any required part is missing, the point is Not Satisfied.

## Satisfied

### 1.1 Heading Structure and Semantic HTML (WCAG 1.3.1)

- Route has a defined page heading with supporting heading structure in audited components: components/awards/awards-hero.tsx:19.

### 1.2 Landmark Regions (WCAG 1.3.1)

- Route exposes shared main landmark target: app/programs-awards/page.tsx:20.
- Skip-link source targets #main-content: components/HomePage/Header.tsx:299.
- Route-change focus targets the same id: components/RouteChangeFocus.tsx:16.

### 1.3 Skip to Main Content Visibility (WCAG 2.4.1)

- Skip-link target and route main target are aligned (#main-content).
- Main target remains programmatically focusable via tabIndex={-1}.
- Shared focus styling exists: app/globals.css:49.

### 2.1 Alt Text for Images (WCAG 1.1.1)

- Audited route components use explicit informative/decorative alt patterns.

### 2.2 Video Accessibility (WCAG 1.2.2)

- No prerecorded video or embedded iframe media implementation detected in audited route scope.

### 3.1 Keyboard Navigation (WCAG 2.1.1)

- Audited route interactions use semantic button/link controls.

### 3.2 Focus Indicators (WCAG 2.4.7)

- Global focus-visible baseline exists: app/globals.css:33.

### 4.1 Proper Label Association (WCAG 1.3.1, 3.3.2)

- Route-scope form labeling is satisfied where forms exist; otherwise non-applicable.

### 4.2 Error Handling (WCAG 3.3.1)

- Shared modal and route status patterns include explicit text plus ARIA announcement patterns where implemented.

### 5.2 Avoid Color-Only Indicators (WCAG 1.4.1)

- Shared nav/selected-state UI includes non-color indicators in audited patterns.

### 6.1 Proper Button Markup (WCAG 4.1.2)

- Route actions in audited scope use semantic button/link patterns.

### 7.1 Plain Language

- Route labels and CTA copy are understandable in context.

### 7.2 Reduce Motion (WCAG 2.3.3)

- Reduced-motion handling is globally applied: app/globals.css:4.

### 5.1 Color Contrast (WCAG 1.4.3)

- Route-level contrast audit is clean for color-contrast.
- Evidence: wcag compliance/evidence/contrast/programs-awards-contrast.json (0 failing nodes).

## Not Satisfied

### 8.1 Zoom to 200% (WCAG 1.4.4)

Not satisfied.

- No committed route-specific 200% zoom walkthrough artifact bundle yet.

### 9. Testing Requirements

Not satisfied.

- Missing route artifacts: keyboard walkthrough, NVDA/VoiceOver notes, Lighthouse accessibility report, WAVE report, and zoom proof.

## Conclusion

This route is structurally aligned with the shared skip-link/landmark contract. Remaining strict blockers are the unresolved criteria listed above.


