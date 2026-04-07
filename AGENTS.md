# Agent Instructions

These instructions apply to the entire repository.

## Accessibility Default

- All future UI changes must be implemented to meet WCAG 2.2 and AODA accessibility expectations.
- Minimum baseline for new or modified UI is WCAG 2.2 AA.
- If a task, spec, or reviewer requires a stricter bar such as AAA, follow the stricter requirement.
- Accessibility is part of the definition of done. Do not treat it as a later cleanup item.

## Required Implementation Rules

- Use semantic HTML first. Use ARIA only when native HTML cannot express the interaction correctly.
- All interactive elements must be fully keyboard operable with logical tab order and no keyboard traps.
- Maintain visible focus indicators. Do not remove focus styling without replacing it with a clear custom state.
- Do not rely on color alone to communicate status, errors, selection, or validation state.
- Provide persistent labels, accessible names, helper text, and programmatically associated errors for forms.
- Support screen readers for navigation, forms, dialogs, async updates, and dynamic state changes.
- Respect `prefers-reduced-motion` and avoid non-essential motion.
- Check contrast, zoom/reflow, and target sizing for new or modified flows.
- Prefer reusing existing accessible components and patterns when they already meet the requirement.
- If a requested implementation cannot meet accessibility expectations, stop and call out the blocker explicitly.

## Required Validation For UI Changes

- Keyboard-only walkthrough completed
- Focus states verified
- Contrast checked
- Zoom and reflow checked
- Reduced-motion behavior checked
- Basic screen-reader behavior checked for changed flows

## Reference

- Detailed project guidance lives in `guideline.md`.
