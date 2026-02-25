# Glassmorphism + Editorial Sophistication Design Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Transform CyberClean into a boutique regulatory consultancy aesthetic through serif typography, clean single-layer glassmorphism on interactive sections, and refined visual hierarchy.

**Architecture:**
- Introduce IBM Plex Serif for headings/display; keep Inter for body
- Add glassmorphism CSS utilities (backdrop-filter: blur, semi-transparent backgrounds)
- Apply glass treatment strategically to: navigation, interactive cards (modules/team/differentiators), CTAs, form elements, key emphasis boxes
- Maintain dark theme with enhanced lighting/border effects on glass elements
- No multilayering, no clutter — single, clean glass layer per component

**Tech Stack:** Plain HTML/CSS/JS, Google Fonts (IBM Plex Serif + Inter), CSS backdrop-filter, CSS transitions

**Pages to Update:** index.html, services.html, about.html, team.html, contact.html

---

## Phase 1: Typography & CSS Foundation

### Task 1: Import IBM Plex Serif and update CSS variables

**Files:**
- Modify: `css/styles.css:1-30` (imports and variables)

**Step 1: Add IBM Plex Serif to Google Fonts import**

In `css/styles.css`, replace the existing `@import` line:

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;600;700&family=Inter:wght@400;600;700;800&display=swap');
```

**Step 2: Update CSS variables to include font stacks**

In `:root {}` block, add after line 28:

```css
  --font-serif:     'IBM Plex Serif', serif;
  --font-sans:      'Inter', sans-serif;
  --font-display:   var(--font-serif);
  --font-body:      var(--font-sans);
```

**Step 3: Verify changes**

Open `index.html` in browser (via HTTP server). Headings should load with serif font. If fonts don't load, check browser DevTools Network tab.

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: import IBM Plex Serif, add font stack variables"
```

---

### Task 2: Update typography for all headings (h1-h6) to use serif

**Files:**
- Modify: `css/styles.css:200-300` (heading styles)

**Step 1: Locate heading styles in styles.css**

Search for `h1 {`, `h2 {`, `h3 {`, etc.

**Step 2: Add font-family to each heading**

For each heading rule, add:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  font-weight: 700;
}

.section-title {
  font-family: var(--font-serif);
  font-weight: 700;
}

.hero-heading {
  font-family: var(--font-serif);
  font-weight: 700;
}
```

**Step 3: Update body and paragraph styles to explicitly use sans-serif**

```css
body {
  font-family: var(--font-body);
}

p, .section-body {
  font-family: var(--font-body);
  font-weight: 400;
}
```

**Step 4: Test in browser**

Open all 5 pages. Verify headings are serif, body text is sans-serif. Check line heights and spacing look balanced.

**Step 5: Commit**

```bash
git add css/styles.css
git commit -m "feat: apply IBM Plex Serif to all headings, maintain Inter for body"
```

---

## Phase 2: Glassmorphism CSS Utilities

### Task 3: Create glass effect CSS utility classes

**Files:**
- Modify: `css/styles.css:500-600` (add new utilities section)

**Step 1: Add glassmorphism utility classes**

Add this block to `css/styles.css` (at the end, before component styles):

```css
/* ── Glassmorphism Utilities ──────────────────────────────── */
.glass {
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: var(--radius);
}

.glass-sm {
  background: rgba(26, 26, 46, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: var(--radius-sm);
}

.glass-lg {
  background: rgba(26, 26, 46, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 212, 255, 0.12);
  border-radius: var(--radius);
}

.glass::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(139, 92, 246, 0.05));
  border-radius: var(--radius);
  pointer-events: none;
  z-index: 0;
}

.glass-sm::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.03), rgba(139, 92, 246, 0.03));
  border-radius: var(--radius-sm);
  pointer-events: none;
  z-index: 0;
}

.glass:hover,
.glass-sm:hover,
.glass-lg:hover {
  background: rgba(26, 26, 46, 0.75);
  border-color: rgba(0, 212, 255, 0.25);
  transition: all 0.3s ease;
}
```

**Step 2: Test glass effect**

Add `class="glass"` to any element temporarily and view in browser. Should see frosted glass effect with subtle gradient overlay.

**Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: add glassmorphism utility classes (.glass, .glass-sm, .glass-lg)"
```

---

## Phase 3: Apply Glass to Navigation

### Task 4: Apply glass effect to navigation bar

**Files:**
- Modify: `css/styles.css` (nav styles)
- Test: All pages

**Step 1: Locate nav styles**

Search for `.nav {` in `css/styles.css`.

**Step 2: Update nav styles**

Replace or update the `.nav` rule:

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(17, 17, 17, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 212, 255, 0.1);
  transition: all 0.3s ease;
}

.nav:hover {
  background: rgba(17, 17, 17, 0.85);
  border-bottom-color: rgba(0, 212, 255, 0.2);
}
```

**Step 3: Test in browser**

Open `index.html`. Nav should have frosted glass effect. Scroll down to confirm glass effect is visible. Test hover state.

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: apply glass effect to navigation bar"
```

---

## Phase 4: Apply Glass to Interactive Cards

### Task 5: Apply glass to module cards (5-step methodology)

**Files:**
- Modify: `css/styles.css` (module-card styles)
- Test: `index.html`, `services.html`

**Step 1: Locate `.module-card` or `.card` styles**

Search for `.module-card {` or `.card {`.

**Step 2: Update module card styles**

Add or replace the `.module-card` rule:

```css
.module-card {
  position: relative;
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: var(--radius);
  padding: 32px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.module-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(139, 92, 246, 0.08));
  border-radius: var(--radius);
  pointer-events: none;
  z-index: 0;
}

.module-card > * {
  position: relative;
  z-index: 1;
}

.module-card:hover {
  background: rgba(26, 26, 46, 0.75);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 212, 255, 0.1);
}
```

**Step 3: Test in browser**

Open `index.html` and scroll to "5 Modules" section. Cards should have glass effect with gradient overlay. Test hover — card should lift slightly and border glow.

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: apply glass effect to module cards with hover elevation"
```

---

### Task 6: Apply glass to team cards

**Files:**
- Modify: `css/styles.css` (team card styles)
- Test: `team.html`

**Step 1: Locate team card styles**

Search for `.team-card {` or similar.

**Step 2: Update team card styles**

Add or replace the `.team-card` rule:

```css
.team-card {
  position: relative;
  background: rgba(26, 26, 46, 0.65);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: var(--radius);
  padding: 28px;
  text-align: center;
  transition: all 0.3s ease;
  overflow: hidden;
}

.team-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.06), rgba(139, 92, 246, 0.06));
  border-radius: var(--radius);
  pointer-events: none;
  z-index: 0;
}

.team-card > * {
  position: relative;
  z-index: 1;
}

.team-card:hover {
  background: rgba(26, 26, 46, 0.8);
  border-color: rgba(0, 212, 255, 0.25);
}
```

**Step 3: Test in browser**

Open `team.html`. Cards should have glass effect. Test hover state.

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: apply glass effect to team cards"
```

---

### Task 7: Apply glass to differentiator items

**Files:**
- Modify: `css/styles.css` (diff-item styles)
- Test: `index.html`

**Step 1: Locate `.diff-item` styles**

Search for `.diff-item {`.

**Step 2: Update differentiator styles**

```css
.diff-item {
  position: relative;
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: var(--radius);
  padding: 32px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.diff-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(139, 92, 246, 0.05));
  border-radius: var(--radius);
  pointer-events: none;
  z-index: 0;
}

.diff-item > * {
  position: relative;
  z-index: 1;
}

.diff-item:hover {
  background: rgba(26, 26, 46, 0.75);
  border-color: rgba(0, 212, 255, 0.25);
}
```

**Step 3: Test in browser**

Open `index.html`, scroll to "Why CyberClean" section. Differentiator boxes should have glass effect.

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: apply glass effect to differentiator items"
```

---

## Phase 5: Apply Glass to CTA and Form Elements

### Task 8: Apply glass to CTA sections and buttons

**Files:**
- Modify: `css/styles.css` (button and CTA styles)
- Test: All pages

**Step 1: Update button styles**

Find `.btn-primary` and `.btn-secondary` rules. Update them:

```css
.btn-primary {
  position: relative;
  display: inline-block;
  background: rgba(0, 212, 255, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 212, 255, 0.3);
  color: var(--grad-from);
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 1;
}

.btn-primary:hover {
  background: rgba(0, 212, 255, 0.25);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.2);
  transform: translateY(-2px);
}

.btn-secondary {
  position: relative;
  display: inline-block;
  background: rgba(26, 26, 46, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  color: var(--text);
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 1;
}

.btn-secondary:hover {
  background: rgba(26, 26, 46, 0.7);
  border-color: rgba(0, 212, 255, 0.4);
  color: var(--grad-from);
  transform: translateY(-2px);
}
```

**Step 2: Update CTA banner styles**

Find `.cta-banner` rule:

```css
.cta-banner-inner {
  position: relative;
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: var(--radius);
  padding: 48px;
  text-align: center;
  overflow: hidden;
}

.cta-banner-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(139, 92, 246, 0.08));
  border-radius: var(--radius);
  pointer-events: none;
  z-index: 0;
}

.cta-banner-inner > * {
  position: relative;
  z-index: 1;
}
```

**Step 3: Test in browser**

Test all pages. Buttons should have glass effect with glow on hover. CTA sections should have glass background.

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: apply glass effect to buttons and CTA sections"
```

---

### Task 9: Apply glass to form inputs (contact page)

**Files:**
- Modify: `css/styles.css` (form styles)
- Test: `contact.html`

**Step 1: Add form input glass styles**

```css
input,
textarea,
select {
  position: relative;
  background: rgba(26, 26, 46, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  color: var(--text);
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  background: rgba(26, 26, 46, 0.85);
  border-color: rgba(0, 212, 255, 0.4);
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.15);
}

input::placeholder,
textarea::placeholder {
  color: var(--muted);
}
```

**Step 2: Test in browser**

Open `contact.html`. Form inputs should have glass effect. Test focus state — border and glow should enhance.

**Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: apply glass effect to form inputs with focus glow"
```

---

## Phase 6: Key Emphasis Sections

### Task 10: Apply glass to approach section and traceability chain

**Files:**
- Modify: `css/styles.css` (approach and chain-box styles)
- Test: `index.html`, `services.html`

**Step 1: Update chain-box styles**

Find or create `.chain-box` rule:

```css
.chain-box {
  position: relative;
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: var(--radius);
  padding: 28px;
  margin-top: 24px;
  overflow: hidden;
}

.chain-box::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(139, 92, 246, 0.08));
  border-radius: var(--radius);
  pointer-events: none;
  z-index: 0;
}

.chain-box > * {
  position: relative;
  z-index: 1;
}
```

**Step 2: Test in browser**

Open `index.html`, scroll to approach section. Traceability chain box should have glass effect.

**Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: apply glass effect to approach/traceability chain box"
```

---

## Phase 7: Polish & Refinement

### Task 11: Test all pages for visual consistency

**Files:**
- Test: All HTML pages
- Verify: `index.html`, `services.html`, `about.html`, `team.html`, `contact.html`

**Step 1: Open each page in browser (via HTTP server)**

For each page, verify:
- Typography: Headings are serif, body is sans-serif
- Glass effects: Nav, cards, CTAs, buttons all have glass
- Hover states: All interactive elements respond to hover
- Spacing: No clutter, maintains refinement
- Colors: Dark theme consistent, borders have cyan tint

**Step 2: Check responsive design**

Test on mobile (DevTools: iPhone 12). Verify:
- Nav still works and looks good
- Cards stack properly
- Glass effect doesn't break layout
- Text remains readable

**Step 3: Document any issues**

Note any pages that need fixes. Create separate tasks if needed.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: verify glassmorphism + serif typography across all pages"
```

---

### Task 12: Optimize CSS and remove redundancy

**Files:**
- Modify: `css/styles.css`

**Step 1: Check for duplicate glass effects**

Review CSS for redundant glass utility usage. Consolidate if needed.

**Step 2: Test performance**

Open DevTools, check CSS file size. If > 50KB, consider optimization.

**Step 3: Verify no layout shifts**

Test each page, look for unexpected layout jumps on load or scroll.

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "refactor: optimize glass effect CSS, remove redundancy"
```

---

## Phase 8: QA & Testing

### Task 13: Accessibility audit

**Files:**
- Test: All pages via `tests/audit.html` or axe DevTools

**Step 1: Run accessibility checks**

Open each page in browser. Use axe DevTools or similar to check:
- Contrast ratios (glass backgrounds may affect contrast)
- Color blindness simulation
- Focus order (keyboard navigation)
- ARIA labels on interactive elements

**Step 2: Document failures**

Note any WCAG violations. Adjust glass opacity/colors if needed.

**Step 3: Test keyboard navigation**

Tab through each page. Verify all buttons/links are reachable.

**Step 4: Commit**

```bash
git add -A
git commit -m "test: verify accessibility across glassmorphism design"
```

---

### Task 14: Cross-browser testing

**Files:**
- Test: All pages on Chrome, Safari, Firefox

**Step 1: Test on Chrome**

Open all pages. Verify glass effect works (backdrop-filter supported).

**Step 2: Test on Safari**

Open all pages. Verify glass effect works (-webkit-backdrop-filter fallback).

**Step 3: Test on Firefox**

Open all pages. Verify glass effect works (backdrop-filter supported in recent versions).

**Step 4: Document any fallbacks needed**

If glass doesn't work on older browsers, consider graceful degradation.

**Step 5: Commit**

```bash
git add -A
git commit -m "test: verify cross-browser compatibility for glassmorphism"
```

---

### Task 15: Final visual review and QA sign-off

**Files:**
- Review: All pages

**Step 1: Compare against design brief**

Verify:
- ✓ IBM Plex Serif on headings
- ✓ Single-layer glass on interactive/key sections
- ✓ Balanced intensity (not subtle, not bold)
- ✓ No multilayering/clutter
- ✓ Cyan/purple accent borders on glass
- ✓ Refined sophistication aesthetic
- ✓ Professional regulatory tone maintained

**Step 2: Screenshot comparison**

Take before/after screenshots of key sections (hero, cards, nav, CTAs).

**Step 3: QA sign-off**

Mark design as complete and ready for production.

**Step 4: Commit**

```bash
git add -A
git commit -m "test: final QA review and visual verification complete"
```

---

## Execution Approach

This plan is designed for **parallel execution** using 3 agents:

1. **Developer Agent**: Implement Tasks 1-12 (typography, CSS, glass effects)
2. **QA Agent**: Execute Tasks 13-15 (testing, accessibility, cross-browser)
3. **Coordination Agent**: Track progress, resolve blockers, ensure quality gates are met

**Handoff Points:**
- After Task 5: QA begins accessibility audit in parallel
- After Task 11: QA completes visual testing and reports
- After Task 15: All agents merge findings, create final verification report

---

## Success Criteria

- All 5 pages load with serif headings, sans-serif body
- Glass effect visible on nav, cards, CTAs, buttons, form inputs
- Hover states work on all interactive elements
- No accessibility violations (WCAG AA minimum)
- Cross-browser compatible (Chrome, Safari, Firefox recent versions)
- No performance degradation (CSS file < 50KB increase)
- Visual consistency across all pages
- Professional, refined appearance maintained
