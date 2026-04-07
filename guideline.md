# Accessibility Guidelines for Next.js Frontend (AODA + WCAG 2.2)

This repository serves a product used by people with disabilities. Accessibility is a default engineering requirement for all future work.

These rules apply to every new or modified component, page, form, admin workflow, public route, and interactive pattern.

## 1. Standard

- Working standard for the repository is WCAG 2.2 plus AODA-aligned implementation.
- Minimum baseline for new or modified UI is WCAG 2.2 AA.
- If a task, approved plan, or reviewer sets a higher bar such as AAA for a particular flow, follow the stricter requirement.
- Existing historical analysis under `wcag compliance/` may still mention WCAG 2.1 AA. Treat those files as historical audit artifacts, not the current standard for new work.

## 2. Core Principles

- Perceivable: content must be available to sighted users, screen-reader users, and users with low vision.
- Operable: all interactions must be keyboard accessible and assistive-technology friendly.
- Understandable: content, navigation, labels, and errors must be clear and predictable.
- Robust: components must work with modern browsers, zoom, screen readers, and reduced-motion settings.

## 3. Semantic HTML First

- Use native elements before ARIA.
- Use `<button>` for actions and `<a>` for navigation.
- Use `<label>` with form controls. Do not use placeholders as the only label.
- Use proper page landmarks such as `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>`.
- Use a correct heading hierarchy with one clear page `<h1>`.
- Do not use clickable `<div>` or `<span>` elements for core interaction patterns.

## 4. Keyboard and Focus

- All interactive controls must be usable with keyboard only.
- Support `Tab`, `Shift+Tab`, `Enter`, and `Space` for appropriate controls.
- Support arrow-key patterns where the widget model requires it.
- Do not create keyboard traps.
- Focus order must follow the visual and semantic order.
- Focus indicators must remain visible and clear.
- Do not remove focus styling unless it is replaced with a stronger custom focus treatment.
- Provide a skip link to main content on page layouts.

## 5. Forms, Validation, and Errors

- Every field must have a visible label.
- Helper text and errors must be programmatically associated with the input.
- Invalid fields must expose error state via text and semantics, not color alone.
- Error summaries should be used when a form has multiple errors or when the flow benefits from a top-level summary.
- On failed submit, move focus to the error summary or first invalid field.
- Use `aria-invalid`, `aria-describedby`, `role="alert"`, and `role="status"` only where appropriate.

## 6. Screen Reader Support

- Icon-only buttons must have accessible names.
- Dynamic status changes must be announced when users need the update to continue the task.
- Dialogs, menus, accordions, tabs, and custom widgets must expose the correct semantics and state.
- Decorative images should use empty alt text. Informative images must have meaningful alt text.
- Do not duplicate content for screen readers unless the duplication is intentional and helpful.

## 7. Visual Accessibility

- Text and essential UI contrast must meet WCAG 2.2 expectations for the applicable level.
- Do not use color alone to communicate required fields, selected state, validation state, or status.
- Content must remain usable at increased zoom and under narrow reflow conditions.
- Target sizes should meet WCAG 2.2 expectations where applicable.
- Avoid low-contrast placeholder text and low-contrast disabled states.

## 8. Motion and Timing

- Respect `prefers-reduced-motion`.
- Avoid non-essential motion for core comprehension.
- Do not create flashing or rapidly pulsing content.
- If content auto-updates, auto-rotates, or times out, provide appropriate user control where required.

## 9. Navigation and Routing

- Every route should expose a unique and descriptive page title.
- After route changes, focus should land at a sensible destination such as the page heading or main region when the interaction requires it.
- Use `aria-current="page"` for active navigation items.
- Menus and navigation disclosures must be operable by keyboard and clear to assistive technology.

## 10. Dialogs and Composite Widgets

- Dialogs must trap focus, close on escape where appropriate, and return focus to the trigger after closing.
- Use the correct roles and labelling for dialogs.
- Custom dropdowns, accordions, tabs, and menu buttons should reuse proven accessible patterns or accessible component libraries.
- Prefer reusing existing accessible components in the repo before introducing a new pattern.

## 11. Development Rules

- Accessibility is part of done, not a follow-up ticket.
- If a requested design or interaction cannot be implemented accessibly, call it out and propose an accessible alternative.
- Do not ship a new third-party UI dependency without checking whether it supports keyboard and assistive technology requirements.
- Prefer simple, semantic implementations over visually clever but fragile custom widgets.

## 12. Validation Required For UI Changes

Minimum manual checks for every new or modified UI flow:

- keyboard-only walkthrough
- visible focus verification
- contrast check
- zoom and reflow check
- reduced-motion check
- basic screen-reader check for the changed flow

Automated tooling is helpful but not sufficient on its own. Lighthouse, axe, and linting support validation; they do not replace manual review.

## 13. Definition of Done

A UI change is not done unless:

- it is keyboard accessible
- it uses correct semantics
- its labels, errors, and status messages are understandable and exposed correctly
- focus states are visible
- contrast and reflow have been checked
- reduced-motion behavior has been considered
- accessibility risks or exceptions are explicitly called out if anything remains unresolved
