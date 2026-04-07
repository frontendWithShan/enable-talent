# Color & Accessibility Quick Reference

## 🎨 Complete Color Palette

### Text Colors (All meet 7:1 AAA contrast)

| Name | Hex | Contrast | Usage |
|------|-----|----------|-------|
| Primary Text | `#1e293b` | 12.6:1 | Body text, headings, primary content |
| Secondary Text | `#334155` | 10.3:1 | Labels, descriptions, secondary info |
| Error Text | `#991b1b` | 8.3:1 | Error messages, validation |
| Success Text | `#064e3b` | 9.7:1 | Success messages, confirmations |
| Warning Text | `#78350f` | 9.1:1 | Warnings, alerts, caution |
| Link Color | `#7c2d12` | 9.4:1 | Links, CTAs, brand accent |
| Focus Ring | `#C27803` | 3:1+ | Keyboard focus indicators |

### Background Colors

| Name | Hex | Purpose |
|------|-----|---------|
| Primary BG | `#ffffff` | Main content areas |
| Secondary BG | `#f8fafc` | Alternative sections, subtle contrast |
| Tertiary BG | `#f1f5f9` | Light backgrounds, hover states |
| Hero Section | `#eef4fc` | Landing page hero |
| Card (Job Seeker) | `#fff7ed` | Warm cream for job seeker sections |
| Card (Employer) | `#e8f1ff` | Soft blue for employer sections |
| Blog Featured | `#f0fdf4` | Green tint for featured posts |

### Border Colors

| Name | Hex | Purpose |
|------|-----|---------|
| Light Border | `#e2e8f0` | Subtle dividers |
| Medium Border | `#cbd5e1` | Standard borders |
| Brand Border | `#7c2d12` | Emphasis, branded sections |

---

## ✅ WCAG 2.2 AAA Checklist

### Visual & Focus
- [ ] All text: 7:1 contrast minimum
- [ ] Focus ring: 3px solid `#C27803`
- [ ] Focus offset: 2px
- [ ] Touch targets: 44×44px minimum
- [ ] Dark buttons: white focus ring (9.4:1 contrast)

### Semantic HTML
- [ ] One `<h1>` per page
- [ ] No skipped heading levels (h1 → h2 → h3)
- [ ] Every interactive element has `aria-label` or `<label>`
- [ ] Form errors linked with `aria-describedby`
- [ ] Images have descriptive `alt` text

### Keyboard & Focus
- [ ] Tab navigation works everywhere
- [ ] Focus trap in modals
- [ ] Escape key closes modals
- [ ] No keyboard trap

### Content
- [ ] No color-only error indication (icon + text)
- [ ] Links underlined, descriptive text
- [ ] List structure: `<ul>`, `<ol>`, `<li>`
- [ ] `<abbr title="...">` for abbreviations

### Responsive
- [ ] Mobile: 44px touch targets
- [ ] Readable at zoom: 200%
- [ ] No horizontal scroll at 320px

---

## 🎯 For CMS Content

### Before Publishing Blog Post or Landing Page Section

**Images:**
- [ ] Has descriptive `alt` text (not "image", "photo", etc.)
- [ ] Alt text fits in 125 characters
- [ ] Decorative images have empty `alt=""` and `aria-hidden="true"`

**Headings:**
- [ ] First heading is `<h1>`
- [ ] No levels skipped (e.g., h1 → h3)
- [ ] Headings are descriptive, not generic ("Intro", "Details", etc.)

**Links:**
- [ ] Link text describes destination ("Learn more about WCAG" not "click here")
- [ ] No link text that's just a URL
- [ ] Links in text are underlined

**Color:**
- [ ] Red/green not used alone for meaning
- [ ] Status badges use text labels, not just color

**Tables:**
- [ ] `<thead>` row with `<th>` for headers
- [ ] Column headers identify column content
- [ ] Data cells properly associated

**Forms:**
- [ ] `<label>` associated with `<input>` via `for`/`id`
- [ ] Required fields marked with text, not just `*`
- [ ] Error messages below field, linked with `aria-describedby`

---

## 🏗️ CSS Custom Properties (Use in All Components)

```css
:root {
  /* Text */
  --text-primary: #1e293b;
  --text-secondary: #334155;
  --text-error: #991b1b;
  --text-success: #064e3b;
  --text-warning: #78350f;
  --link-color: #7c2d12;
  
  /* Focus */
  --focus-ring-color: #C27803;
  --focus-ring-offset: 3px;
  
  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  
  /* Borders */
  --border-light: #e2e8f0;
  --border-medium: #cbd5e1;
  --border-brand: #7c2d12;
}
```

---

## 🔧 Common Patterns

### Focus Ring (All Interactive Elements)

```css
:focus-visible {
  outline: 3px solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
  box-shadow: 0 0 0 6px rgba(194, 120, 3, 0.15);
}

/* Dark backgrounds: use white ring */
[class*="bg-orange-9"]:focus-visible {
  outline-color: #ffffff !important;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.25) !important;
}
```

### Button (Primary)

```html
<a href="/signup" class="inline-flex min-h-[44px] items-center px-6 rounded-lg 
  bg-[linear-gradient(90deg,#7c2d12_0%,#9a3412_100%)] text-white font-medium 
  hover:brightness-105 focus-visible:outline-none focus-visible:ring-3 
  focus-visible:ring-[var(--focus-ring-color)] focus-visible:ring-offset-2">
  Sign Up
</a>
```

### Form Field with Error

```html
<label for="email" class="block font-medium text-[var(--text-primary)]">
  Email Address
</label>
<input 
  id="email" 
  type="email" 
  aria-invalid="true"
  aria-describedby="email-error"
  class="mt-1 rounded-lg border border-[var(--text-error)] px-4 py-2 
    focus-visible:outline-3 focus-visible:outline-[var(--focus-ring-color)]"
/>
<p id="email-error" class="mt-1 text-sm font-medium text-[var(--text-error)]">
  Please enter a valid email address
</p>
```

### Link with Underline

```html
<a href="/blog/post" class="text-[var(--link-color)] underline 
  text-decoration-thickness-[2px] text-underline-offset-4
  hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 
  focus-visible:ring-[var(--focus-ring-color)]">
  Read our blog post on accessibility
</a>
```

### Status Badge (Not Color-Only)

```html
<span class="inline-flex items-center gap-2 rounded-full px-3 py-1
  bg-[#dcfce7] text-[#15803d] text-sm font-semibold">
  <svg class="w-4 h-4" aria-hidden="true">✓</svg>
  Active
</span>
```

### Heading with Border

```html
<h2 class="text-2xl font-bold text-[var(--text-primary)]
  border-b-2 border-[var(--border-light)]
  pb-2 mb-6">
  Section Title
</h2>
```

---

## 📋 For Blog & Landing Pages

### Hero Section Structure

```html
<section class="bg-[var(--bg-hero)] py-24">
  <div class="max-w-6xl mx-auto px-4">
    <!-- Subheading (optional) -->
    <p class="text-sm uppercase text-[var(--link-color)]">
      From our community
    </p>
    
    <!-- Main Heading -->
    <h1 class="mt-2 text-5xl font-bold text-[var(--text-primary)]">
      Insights & Stories
    </h1>
    
    <!-- Description -->
    <p class="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl">
      Discover resources, career tips, and stories...
    </p>
    
    <!-- CTA -->
    <a href="/signup" class="mt-8 inline-flex min-h-[44px] items-center px-6
      bg-[linear-gradient(90deg,#7c2d12_0%,#9a3412_100%)] text-white rounded-lg
      hover:brightness-105">
      Get Started
    </a>
  </div>
</section>
```

### Blog Post Card Structure

```html
<article class="border border-[var(--border-light)] rounded-lg overflow-hidden
  hover:shadow-md focus-within:ring-2 focus-within:ring-[var(--focus-ring-color)]">
  <!-- Featured Image -->
  <img src="" alt="Featured image for: Article Title" class="w-full h-48 object-cover" />
  
  <div class="p-6">
    <!-- Category Badge -->
    <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold
      bg-[#dbeafe] text-[#1d4ed8]">
      accessibility
    </span>
    
    <!-- Title (Link) -->
    <h3 class="mt-3 text-xl font-bold text-[var(--text-primary)]">
      <a href="/blog/post" class="hover:text-[var(--link-color)]">
        Article Title
      </a>
    </h3>
    
    <!-- Excerpt -->
    <p class="mt-2 text-[var(--text-secondary)]">
      Brief description of the article...
    </p>
    
    <!-- Meta Info -->
    <div class="mt-4 flex gap-2 text-sm text-[var(--text-muted)]">
      <span>By <strong>Author Name</strong></span>
      <span aria-hidden="true">•</span>
      <time>March 15, 2024</time>
    </div>
    
    <!-- Read More Link -->
    <a href="/blog/post" class="mt-4 inline-flex items-center gap-2 
      text-[var(--link-color)] font-medium hover:gap-3">
      Read more <span aria-hidden="true">→</span>
    </a>
  </div>
</article>
```

### FAQ (Details/Summary)

```html
<details class="border-b border-[var(--border-light)] py-6">
  <summary class="cursor-pointer font-bold text-[var(--text-primary)]
    flex justify-between items-center
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)]">
    <span>What is your pricing?</span>
    <span aria-hidden="true" class="text-[var(--link-color)] group-open:rotate-180">+</span>
  </summary>
  
  <p class="pt-4 text-[var(--text-secondary)]">
    Answer goes here...
  </p>
</details>
```

---

## 🧪 Testing Checklist

**Before deploying to production:**

1. **Color Contrast**
   - Use: WebAIM Contrast Checker, WAVE, aXe DevTools
   - All text: 7:1 ratio
   - Check on both light AND dark backgrounds

2. **Keyboard Navigation**
   - Tab through entire page
   - All interactive elements reachable
   - Focus ring visible (3px amber)
   - No keyboard traps

3. **Screen Reader** (NVDA, JAWS, VoiceOver)
   - Headings announced correctly
   - Images have alt text
   - Links have descriptive text
   - Form labels associated

4. **Mobile**
   - Touch targets: 44×44px minimum
   - Readable at 200% zoom
   - No horizontal scroll

5. **Automated Testing**
   ```bash
   npm run test:a11y
   ```

---

## 🚀 Implementation Checklist for New Pages

- [ ] Color palette imported from globals.css
- [ ] H1 tag present and unique
- [ ] No heading levels skipped
- [ ] All images have alt text
- [ ] Links underlined, descriptive text
- [ ] 3px amber focus ring on all interactive elements
- [ ] 44×44px minimum touch targets
- [ ] Form errors linked with aria-describedby
- [ ] Status indicators use text + icon (not color-only)
- [ ] Tested with keyboard navigation (Tab, Enter, Escape)
- [ ] Tested with screen reader
- [ ] Contrast checked (all text 7:1+)
- [ ] Mobile responsive, no horizontal scroll

---

## 📚 References

- **WCAG 2.2**: https://www.w3.org/WAI/WCAG22/quickref/
- **WebAIM**: https://webaim.org/
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/
- **Next.js Accessibility**: https://nextjs.org/docs/accessibility
- **Tailwind Accessibility**: https://tailwindcss.com/docs/hover-focus-and-other-states

---

**Last Updated**: April 2026 | **WCAG Level**: AAA | **AODA Compliant**
