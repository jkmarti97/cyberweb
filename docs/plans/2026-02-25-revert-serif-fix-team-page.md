# Revert Serif Font & Fix Team Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Revert serif typography to pure Inter, fix team page rendering bug, maintain all glass effects.

**Architecture:**
- Remove `--font-serif` and `--font-display` variables from CSS
- Remove all `font-family: var(--font-serif)` rules from headings
- Ensure headings explicitly use Inter or font-body variable
- Debug team.js error by checking CSS conflicts that break DOM rendering
- Verify team-card styling doesn't interfere with team.js data loading
- Maintain glass effects on all cards, buttons, forms, CTAs

**Tech Stack:** Plain HTML/CSS/JS, no build tools

**Pages affected:** css/styles.css, team.html

---

## Phase 1: Revert Serif Typography

### Task 1: Remove serif font variables from CSS

**Files:**
- Modify: `css/styles.css:16-30` (root variables)

**Step 1: Read current variables**

Lines 16-30 in css/styles.css contain the root CSS variables including `--font-serif`, `--font-display`.

**Step 2: Remove serif variables**

Replace:
```css
  --font-serif:     'IBM Plex Serif', serif;
  --font-sans:      'Inter', sans-serif;
  --font-display:   var(--font-serif);
  --font-body:      var(--font-sans);
```

With:
```css
  --font-body:      'Inter', sans-serif;
```

(Remove serif and sans variables, keep only font-body pointing to Inter)

**Step 3: Verify no other references to --font-serif exist**

Search css/styles.css for `--font-serif` or `--font-display` — should find 0 matches after edit.

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "refactor: remove serif font variables, revert to pure Inter"
```

---

### Task 2: Remove serif font from all headings

**Files:**
- Modify: `css/styles.css` (all heading rules)

**Step 1: Find all heading rules with serif**

Search for `font-family: var(--font-serif)` in css/styles.css.

**Step 2: Remove serif references from headings**

For each rule with `font-family: var(--font-serif)`:
- If the rule is for h1-h6, .section-title, .hero-heading, etc., remove the `font-family: var(--font-serif)` line entirely
- Headings will inherit Inter from body default

Example:
```css
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
}
```

(Remove the `font-family: var(--font-serif)` line)

**Step 3: Verify headings use correct font**

Check that headings either:
- Have no explicit font-family (inherit from body/--font-body)
- OR explicitly use `font-family: 'Inter', sans-serif` or `font-family: var(--font-body)`

**Step 4: Test in browser**

Open index.html. Verify:
- All headings (h1, h2, h3, section titles) use Inter (sans-serif)
- No serif fonts visible anywhere

**Step 5: Commit**

```bash
git add css/styles.css
git commit -m "refactor: remove serif font-family from all headings, use Inter"
```

---

## Phase 2: Debug & Fix Team Page

### Task 3: Debug team.js error message

**Files:**
- Test: team.html (in browser)
- Debug: js/team.js, data/team.json

**Step 1: Open team.html in browser and check console**

Open `/Users/jeffmartin/cluadecode/cyberweb/team.html` in a web browser (via HTTP server, not file://). Open DevTools (F12) and check Console tab for errors.

**What to look for:**
- JavaScript errors (red text)
- 404 errors for data/team.json
- CORS errors
- CSS-related errors

**Step 2: Document the specific error**

Write down:
- Error message exactly as shown
- Which line of code (if shown)
- Which file (team.js, team.json, etc.)

**Step 3: Identify root cause**

Common causes for "Unable to load team information" error:
- **CSS Breaking DOM:** team-card or team-grid styling prevents team.js from inserting elements
- **Data loading failure:** team.json not found or malformed
- **JavaScript error:** team.js throws error during rendering (console will show this)
- **Conflicting styles:** inline styles in team.html conflict with main CSS

**Step 4: Note findings**

Based on console errors and DOM inspection, document which of the above is the issue.

**No commit yet** — await Task 4 for fix.

---

### Task 4: Fix team.js rendering issue

**Files:**
- Modify: `css/styles.css` (team-card styling)
- Verify: team.html (inline styles)
- Test: js/team.js (runtime behavior)

**Step 1: Check team-card CSS doesn't break positioning**

In css/styles.css, find `.team-card` rule. Verify:
- No `display: none` or `visibility: hidden`
- `position: relative` is set (needed for glass ::before pseudo-element)
- `flex: 0 0 calc(33.333% - 22px)` allows proper sizing
- No conflicting `width` or `height` constraints that break layout

**Step 2: Verify team.html inline styles don't conflict**

In team.html `<style>` block (lines 17-235), check:
- `.team-card` styles don't hide or reposition in a way that breaks rendering
- `.team-grid` flex/grid settings allow cards to display
- No `opacity: 0` or `pointer-events: none` on critical elements

**Step 3: Check if glass ::before pseudo-element breaks DOM**

The glass effect uses `.team-card::before` with `position: absolute`. Verify:
- Parent `.team-card` has `position: relative` (it should, from Step 1)
- `::before` content is empty string (doesn't add visible content)
- `z-index: 0` on `::before` keeps it behind actual content
- `pointer-events: none` on `::before` prevents it interfering with clicks

If `::before` is missing `pointer-events: none`, add it.

**Step 4: Test in browser**

Open team.html in browser. If still showing error:
- Check DevTools Network tab — is data/team.json loading? (should see 200 status)
- Check DevTools Console — copy exact error message
- Check DevTools Elements tab — is `#team-grid` element present? (should be)
- If grid is present but empty, team.js failed to render

**Step 5: Fix based on findings**

**If team.json is 404:**
- Verify data/team.json exists at correct path
- No fix needed if file exists — may be HTTP server issue

**If team.js threw error in console:**
- Read error message carefully
- Look at team.js around the line number mentioned
- Most likely cause: CSS changes broke DOM structure assumptions
- Fix: restore team-card styling to original working state, keep glass effects overlay

**If team-grid is empty:**
- team.js ran but found 0 team members or error during render
- Check team.json is valid JSON (no syntax errors)
- Verify team.js can find elements it needs in CSS

**Step 6: Commit fix**

```bash
git add css/styles.css team.html
git commit -m "fix: restore team page rendering, ensure team-card styling allows team.js DOM injection"
```

---

## Phase 3: Verify Glass Effects Still Work

### Task 5: Verify glass effects on all interactive elements

**Files:**
- Test: All 5 pages (index.html, services.html, about.html, team.html, contact.html)

**Step 1: Open each page in browser and verify glass effects**

For each page, check:
- Navigation: glass background, blur visible
- Cards: module-cards, team-cards, differentiator-cards have glass
- Buttons: primary/secondary buttons have glass effect
- Forms: input fields (on contact.html) have glass styling
- CTAs: cta-banner-inner has glass background

**Step 2: Check hover states work**

For each glass element:
- Hover over it (mouse or focus)
- Verify border brightness increases
- Verify background opacity increases slightly
- Verify smooth 0.3s transition

**Step 3: Check responsive design**

Test on mobile (DevTools: iPhone 12 viewport):
- Glass effects still visible at small screens
- No layout breaks from glass styling
- Cards still stack properly
- Buttons still clickable

**Step 4: Verify no visual regressions**

Compare current state to expected design:
- No serif fonts anywhere ✓
- Glass effects on cards/buttons/forms ✓
- Professional, refined aesthetic maintained ✓
- Dark theme still intact ✓

**Step 5: Commit**

```bash
git add -A
git commit -m "test: verify glass effects work correctly after serif revert"
```

---

## Success Criteria

- ✓ No `--font-serif` variable in CSS
- ✓ All headings use Inter (no serif)
- ✓ Team page displays team cards (no error message)
- ✓ Glass effects still visible on nav, cards, buttons, forms, CTAs
- ✓ Responsive design works (mobile/tablet/desktop)
- ✓ All pages load without JavaScript errors
- ✓ All changes committed

---

## Execution

Use **3-agent team approach:**
1. **Developer Agent:** Tasks 1-2 (revert typography), Task 4 (fix team page), Task 5 part 1-2 (verify glass)
2. **QA Agent:** Task 3 (debug team.js), Task 5 part 3-4 (responsive + regression testing)
3. **Coordination Agent:** Track progress, ensure handoff points met, report final status
