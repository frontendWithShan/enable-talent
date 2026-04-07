# Dropdown Arrow-Key Navigation (Landing Page Header - Desktop + Mobile)

This document defines the required keyboard behavior for the landing page header dropdown menus, on both:

- Desktop header navigation
- Mobile navigation (hamburger/drawer menu)

Menus in scope:

- For Employers dropdown
- Globals dropdown

Goal: users should be able to navigate dropdown items using arrow keys, in addition to Tab / Shift+Tab.

---

## Scope

- Page: `/` (landing page)
- Component: `components/HomePage/Header.tsx`
- Menus:
  - For Employers dropdown
  - Globals dropdown

Notes about layout:
- Desktop: For Employers menu items are displayed horizontally (side-by-side).
- Mobile (drawer): For Employers menu items are displayed vertically (stacked).
- Globals is displayed vertically in both layouts.

---

## Baseline Keyboard Requirements (Applies to Both Menus)

### Trigger button behavior

When focus is on the dropdown trigger button:

- Enter / Space:
  - Opens the menu (if closed)
  - Moves focus to the first enabled menu item (or the last focused menu item if we store it)
- ArrowDown:
  - Opens the menu and focuses the first item
- ArrowUp:
  - Opens the menu and focuses the last item
- Escape:
  - Closes the menu (if open)
- Tab:
  - Normal browser behavior (focus moves to next focusable control)

### Menu behavior (when open)

When focus is inside the menu:

- Escape:
  - Closes the menu and returns focus to the trigger button
- Enter / Space:
  - Activates the focused menu item (navigate or perform the action)
- Home:
  - Focus first menu item
- End:
  - Focus last menu item
- Arrow keys:
  - Move focus between menu items (direction depends on visual layout; see below)

### Click-away behavior

- Clicking outside the menu closes it.
- Closing the menu should return focus to the trigger only if the close was initiated from keyboard (Escape) or focus would otherwise be lost.

---

## For Employers Dropdown - Arrow Keys Follow Visual Layout

Rule: arrow key direction should match the visual direction of the menu items.

### Desktop (horizontal) - ArrowLeft / ArrowRight

When focus is on a menu item in the For Employers dropdown:

- ArrowRight: move focus to the next item (wrap to first when on last)
- ArrowLeft: move focus to the previous item (wrap to last when on first)

Optional (recommended):
- ArrowDown / ArrowUp: behave like ArrowRight / ArrowLeft for redundancy.

### Mobile drawer (vertical) - ArrowUp / ArrowDown

When focus is on a menu item in the For Employers dropdown:

- ArrowDown: move focus to the next item (wrap to first when on last)
- ArrowUp: move focus to the previous item (wrap to last when on first)

Optional (recommended):
- ArrowRight / ArrowLeft: mirror Down/Up, or do nothing consistently.

---

## Globals Dropdown (Vertical) - ArrowUp / ArrowDown

When focus is on a menu item in the Globals dropdown:

- ArrowDown: move focus to the next item (wrap to first when on last)
- ArrowUp: move focus to the previous item (wrap to last when on first)

Optional (recommended):
- ArrowRight / ArrowLeft: do nothing, or mirror Up/Down, but must not break page scrolling.

---

## Recommended Implementation Pattern (Roving Tabindex)

Use a roving tabindex approach:

- Only the currently focusable item has tabIndex={0}
- All other items have tabIndex={-1}

On arrow key press:

- Prevent default (so the page does not scroll)
- Compute next index (with wrap)
- Set focus to that element
- Update roving tabindex state

Minimal data needed per menu:

- An ordered array of refs to menu item elements
- A focusedIndex state per open menu (or derived from document.activeElement)

---

## ARIA / Semantics Expectations

If the dropdown is implemented as a menu:

- Trigger button:
  - aria-haspopup="true"
  - aria-expanded={true|false}
  - aria-controls="...menu-id..."
- Menu container:
  - role="menu"
- Menu items:
  - role="menuitem" (or menuitemcheckbox / menuitemradio if appropriate)

Note:
- If the dropdown is primarily site navigation, an alternative accessible pattern is a disclosure + list of links without role="menu".
- If we keep role="menu", we should implement arrow-key navigation as described above to match user expectations for menus.

---

## Acceptance Criteria (Manual Test)

### For Employers (Desktop)

1. Tab to "For Employers" trigger.
2. Press Enter -> menu opens, focus first option.
3. Press Right -> focus second option.
4. Press Left -> focus first option.
5. Press Escape -> menu closes and focus returns to trigger.

### For Employers (Mobile Drawer + Hardware Keyboard)

1. Open the mobile menu (hamburger) and Tab to "For Employers" trigger.
2. Press Enter -> menu opens, focus first option.
3. Press Down -> focus next option.
4. Press Up -> focus previous option.
5. Press Escape -> menu closes and focus returns to trigger.

### Globals (Desktop)

1. Tab to "Globals" trigger.
2. Press Enter -> menu opens, focus first option.
3. Press Down -> focus next option (wrap at end).
4. Press Up -> focus previous option (wrap at start).
5. Press Escape -> menu closes and focus returns to trigger.

### Globals (Mobile Drawer + Hardware Keyboard)

1. Open the mobile menu (hamburger) and Tab to "Globals" trigger.
2. Press Enter -> menu opens, focus first option.
3. Press Down -> focus next option (wrap at end).
4. Press Up -> focus previous option (wrap at start).
5. Press Escape -> menu closes and focus returns to trigger.

---

## Mobile Reality Check (Touch Devices)

- Most mobile users will not have arrow keys available (soft keyboards typically do not expose them).
- This spec is still relevant for:
  - Mobile + external keyboard users (iPad keyboard, Bluetooth keyboards)
  - Assistive tech users who emulate arrow key navigation
- Regardless of arrow key support, Tab / Shift+Tab navigation must still work.

