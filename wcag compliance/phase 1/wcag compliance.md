
Enabled Talent – Accessibility Audit & Remediation Plan

Website: https://www.enabledtalent.com
Standard Target: WCAG 2.1 Level AA Compliance
Prepared For: Development Team
Goal: Ensure the platform is accessible, usable, and inclusive for people with disabilities.




1. Global Accessibility Improvements (High Priority)




1.1 Heading Structure & Semantic HTML

Severity: High
WCAG Reference: 1.3.1 Info and Relationships

Issue

Heading hierarchy may not follow proper semantic structure (H1 → H2 → H3). Visual styling may be used instead of semantic headings.

Why This Matters

Screen reader users rely on headings to navigate content quickly.

Required Fix

Use only ONE <h1> per page.

Maintain logical hierarchy.

Avoid skipping heading levels.


Example

<h1>Where Ability Meets Opportunity</h1>
<h2>For Talents</h2>
<h2>For Employers</h2>
<h3>Post a Job</h3>

Acceptance Criteria

Screen reader heading navigation presents a logical outline.

No skipped heading levels.




1.2 Landmark Regions

Severity: High
WCAG Reference: 1.3.1

Issue

Navigation and main content may not use semantic landmarks.

Required Fix

Use proper structural elements:

<header>
<nav aria-label="Main navigation">
<main id="main-content">
<footer>

Acceptance Criteria

Screen readers can jump between header, nav, main, and footer.




1.3 Skip to Main Content Visibility

Severity: Medium
WCAG Reference: 2.4.1 Bypass Blocks

Issue

Skip link exists but may not be visually prominent when focused.

Fix

Ensure skip link is visible when tabbed to:

.skip-link:focus {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #000;
  color: #fff;
  padding: 10px;
  z-index: 1000;
}

Acceptance Criteria

Pressing TAB immediately reveals a visible skip link.





2. Images & Media




2.1 Alt Text for Images

Severity: Critical
WCAG Reference: 1.1.1 Non-text Content

Issue

Images may lack descriptive alt text.

Fix

Informative images: meaningful alt text.

Decorative images: alt="".


Example:

<img src="team.jpg" alt="Enabled Talent team collaborating in office">

Acceptance Criteria

No image without an alt attribute.

Screen reader announces meaningful descriptions.




2.2 Video Accessibility

Severity: High
WCAG Reference: 1.2.2 Captions (Prerecorded)

Issue

Intro video may not include captions.

Fix

Add closed captions.

Provide transcript below video.

Ensure controls are keyboard accessible.


Acceptance Criteria

Captions toggle available.

Full transcript accessible.

Play/pause accessible via keyboard.




3. Keyboard Accessibility




3.1 Keyboard Navigation

Severity: Critical
WCAG Reference: 2.1.1 Keyboard

Issue

All interactive elements must be usable without a mouse.

Required Fix

Ensure all buttons and links are focusable.

No clickable divs without role or tabindex.

Avoid keyboard traps.


Acceptance Criteria

Entire site usable with only TAB, ENTER, SPACE, SHIFT+TAB.



3.2 Focus Indicators

Severity: High
WCAG Reference: 2.4.7 Focus Visible

Issue

Focus outline may be missing or too subtle.

Fix

a:focus,
button:focus,
input:focus {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}

Acceptance Criteria

Every interactive element clearly shows focus.




4. Forms (Critical for Signup / Job Posting)



4.1 Proper Label Association

Severity: Critical
WCAG Reference: 1.3.1, 3.3.2

Issue

Inputs may not be programmatically associated with labels.

Fix

<label for="email">Email Address</label>
<input id="email" type="email">

Acceptance Criteria

Screen reader announces label when input is focused.




4.2 Error Handling

Severity: High
WCAG Reference: 3.3.1 Error Identification

Issue

Errors may rely only on color (e.g., red border).

Fix

Add descriptive error messages.

Use aria-live for dynamic errors.


Example:

<div role="alert">
  Please enter a valid email address.
</div>

Acceptance Criteria

Errors are announced by screen readers.

Errors not conveyed by color alone.



5. Color & Visual Design



5.1 Color Contrast

Severity: Critical
WCAG Reference: 1.4.3 Contrast (Minimum)

Requirements

4.5:1 ratio for normal text.

3:1 for large text.

3:1 for UI components.


Acceptance Criteria

All text passes WCAG contrast checker.

Buttons and links meet minimum ratio.


5.2 Avoid Color-Only Indicators

Severity: Medium
WCAG Reference: 1.4.1 Use of Color

Fix

Add icons or text labels in addition to color.

Example: ❌ Incorrect field
✔ Success message




6. Buttons & Links



6.1 Proper Button Markup

Severity: High
WCAG Reference: 4.1.2 Name, Role, Value

Issue

Links styled as buttons may not have proper role.

Fix

Use <button> for actions.

Use <a> only for navigation.


Example:

<button type="submit">Register for Free</button>

Acceptance Criteria

Screen reader announces element as “button”.




7. Cognitive Accessibility Improvements


7.1 Plain Language

Severity: Medium

Recommendation

Simplify navigation labels:

“For Talents” → “Find Jobs”

“Enabled Agent” → Add short description beneath


Acceptance Criteria

Navigation understandable without prior context.



7.2 Reduce Motion

WCAG Reference: 2.3.3 Animation from Interactions

Fix

Allow reduced motion:

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none;
    transition: none;
  }
}


8. Mobile & Zoom Accessibility



8.1 Zoom to 200%

WCAG Reference: 1.4.4 Resize Text

Acceptance Criteria

No horizontal scrolling at 200% zoom.

Layout remains functional.



9. Testing Requirements

Developer must test using:

1. Keyboard-only navigation


2. NVDA (Windows) or VoiceOver (Mac)


3. Lighthouse Accessibility Audit


4. WAVE Accessibility Tool


5. Contrast Checker






PRIORITY IMPLEMENTATION ROADMAP

Phase 1 – Critical (Immediate)

Alt text implementation

Keyboard navigation fixes

Focus indicators

Form label association

Color contrast corrections


Phase 2 – High

Landmark roles

Video captions

Error messaging improvements

Proper button semantics


Phase 3 – Enhancement

Plain language improvements

Reduced motion support

Additional ARIA refinements




Final Compliance Goal

Achieve:

WCAG 2.1 AA compliance

ADA & AODA alignment

Full keyboard usability

Screen reader compatibility

Inclusive UX for cognitive, motor, visual, and hearing disabilities






