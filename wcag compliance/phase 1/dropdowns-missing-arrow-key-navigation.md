# Dropdowns Missing Arrow-Key Navigation (Project-Wide)

This inventory lists dropdown-like UI in the repo that **does not** currently implement the same arrow-key navigation behavior we added to the landing-page header dropdown menus.

Search method (repo-wide):

- Looked for `aria-expanded`, `aria-haspopup`, `role="menu"`, `role="menuitem"`, and common “dropdown open” state patterns.
- Findings below reference current file paths.

---

## 1) Events Page - Status/Filter Dropdown ("Pending")

- **File:** `components/events/events-section.tsx`
- **Trigger:** `<button ... aria-expanded={isDropdownOpen} aria-controls="events-filter-dropdown">Pending ...</button>`
- **Panel:** `<div id="events-filter-dropdown" ...>` containing multiple filter `<button>` items.

### Why it lacks the needed logic

- No arrow-key handler exists for the open panel (no `onKeyDown` on the dropdown panel or roving focus between items).
- No focus-management on open (focus stays on trigger; items are only reachable via Tab).
- The panel does not use a menu/listbox pattern (no `role="menu"`/`menuitem` or `role="listbox"`/`option`), so there’s no defined arrow-key behavior at all.

### Expected behavior to match the header pattern

When the dropdown is open and focus is inside its items:

- `ArrowDown` / `ArrowUp` should move focus between the filter options (wrap at ends).
- `Escape` should close the dropdown and return focus to the trigger.
- `Home` / `End` should jump to first/last option.

### Recommended implementation options

Pick one:

1) **Menu pattern**
   - Panel: `role="menu"`
   - Items: `role="menuitemcheckbox"` (since these are toggles)
   - Add roving tabindex and arrow-key handling (Up/Down) similar to the header.

2) **Listbox pattern**
   - If this becomes a single-select status picker, use `role="listbox"` / `role="option"` with Up/Down.
   - Current UI is multi-toggle, so menu-checkbox semantics are typically a better fit.

---

## Not Dropdowns (FYI)

These showed up in search results but are not “dropdown menus” in the same sense:

- `components/faqs/FaqAccordion.tsx`
  - Uses `aria-expanded` for accordion items; arrow-key navigation is not typically required for accordion buttons (Tab navigation is standard).
- Native `<select>` controls (various admin pages)
  - Browser handles arrow-key navigation automatically; no custom logic needed.

---

## Summary

As of this inventory, the **only** custom dropdown in the repo that clearly lacks arrow-key navigation is:

1. `components/events/events-section.tsx` ("Pending" filter dropdown)

