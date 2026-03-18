# Compass Site — Implementation Plan: Chunk 1
# Project Setup + Global Foundation (global.css + global.js)

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the compass-site project directory and build the shared CSS/JS foundation that every section file depends on.

**Architecture:** Vanilla HTML/CSS/JS with no framework. A `global/` directory holds `global.css` (brand tokens, reset, typography, keyframes, utility classes) and `global.js` (all interactive behaviors). Each section is a standalone HTML snippet that reads CSS variables and calls functions defined in these global files. In GoHighLevel, `global.css` is pasted into Site Settings > Custom CSS and `global.js` into Site Settings > Custom JS.

**Tech Stack:** Vanilla CSS (custom properties, keyframes, clamp), Vanilla JS (IntersectionObserver, scroll events, mousemove), Google Fonts CDN (Bricolage Grotesque + Figtree), Vercel CLI for preview deployment.

**Spec:** `docs/superpowers/specs/2026-03-16-compass-site-design.md`

---

## Chunk 1: Project Setup + Global Foundation

### Task 1: Directory Scaffold

**Files:**
- Create: `global/global.css`
- Create: `global/global.js`
- Create: `sections/` (empty directory placeholder)
- Create: `index.html` (stub — filled in Chunk 4)

---

- [ ] **Step 1.1: Create directory structure**

```bash
mkdir -p global sections
touch global/global.css global/global.js
touch index.html
```

- [ ] **Step 1.2: Verify structure**

```bash
ls -R global/ sections/
```

Expected output:
```
global/:
global.css  global.js

sections/:
(empty)
```

- [ ] **Step 1.3: Create stub index.html**

Create `index.html` with this minimal content (sections will be pasted in Task 18):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compass — Convert More Leads Into Sales</title>
  <!-- Google Fonts: paste this tag into GHL > Site Settings > Head Tracking Code -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Figtree:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="global/global.css">
</head>
<body>
  <!-- Sections will be assembled here in Task 18 -->
  <script src="global/global.js"></script>
</body>
</html>
```

- [ ] **Step 1.4: Commit**

```bash
git add global/ sections/ index.html
git commit -m "chore: scaffold compass-site directory structure"
```

---

### Task 2: global.css — Brand Foundation

**Files:**
- Modify: `global/global.css`

This file is the single source of truth for brand tokens, resets, typography, keyframes, and utility classes. It is loaded site-wide in GHL. **No `@import` for fonts** — fonts are loaded via a `<link>` tag in GHL Head Tracking Code to avoid FOUT.

---

- [ ] **Step 2.1: Write CSS custom properties + reset**

Write the following into `global/global.css`:

```css
/* ============================================================
   COMPASS GLOBAL CSS
   Paste into: GoHighLevel > Site Settings > Custom CSS
   Do NOT add @import for fonts here — add the <link> tag
   in GHL > Site Settings > Head Tracking Code instead.
   ============================================================ */

/* --- Brand Tokens --- */
:root {
  --navy:        #1f355b;
  --blue:        #3d60a0;
  --light-blue:  #859ac1;
  --cream:       #eef3fa;
  --white:       #ffffff;
  --dark:        #0d1827;
  --text-muted:  #5a7090;
  --border:      rgba(61, 96, 160, 0.15);

  --font-headline: 'Bricolage Grotesque', sans-serif;
  --font-body:     'Figtree', sans-serif;

  --radius-sm:  6px;
  --radius-md:  12px;
  --radius-lg:  20px;
  --radius-pill: 100px;

  --shadow-sm: 0 1px 3px rgba(13,24,39,0.08), 0 1px 2px rgba(13,24,39,0.06);
  --shadow-md: 0 4px 16px rgba(13,24,39,0.10), 0 2px 6px rgba(13,24,39,0.08);
  --shadow-lg: 0 12px 40px rgba(13,24,39,0.14), 0 4px 12px rgba(13,24,39,0.10);

  --transition: 0.25s ease;
}

/* --- Reset --- */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--dark);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
}

img, video {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}
```

- [ ] **Step 2.2: Write typography scale**

Append to `global/global.css`:

```css
/* --- Typography Scale --- */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-headline);
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--dark);
}

h1 { font-size: clamp(2.5rem, 6vw, 5rem);  font-weight: 800; }
h2 { font-size: clamp(1.75rem, 4vw, 3rem);  font-weight: 700; }
h3 { font-size: clamp(1.25rem, 2.5vw, 1.875rem); font-weight: 700; }
h4 { font-size: clamp(1.1rem, 2vw, 1.5rem);  font-weight: 600; }

p {
  font-family: var(--font-body);
  line-height: 1.65;
}

.text-muted {
  color: var(--text-muted);
}

.label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--light-blue);
}
```

- [ ] **Step 2.3: Write animation keyframes**

Append to `global/global.css`:

```css
/* --- Keyframes (12 total) ---
   aurora-drift, shine-sweep, marquee-scroll, column-scroll,
   accordion-open, accordion-close, loading-dots, fade-slide-up,
   shimmer, moving-border, gear-spin, chevron-bounce
   Note: hover float effects (cards, CTA) use CSS transition, not @keyframes.
   Note: count-up is JS-only DOM mutation — no keyframe needed.
*/

/* Hero aurora background drift */
@keyframes aurora-drift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Shine sweep on card borders */
@keyframes shine-sweep {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

/* Logo cloud horizontal scroll */
@keyframes marquee-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Testimonial column vertical scroll */
@keyframes column-scroll {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

/* FAQ accordion open/close */
@keyframes accordion-open {
  from { max-height: 0; opacity: 0; }
  to   { max-height: 600px; opacity: 1; }
}

@keyframes accordion-close {
  from { max-height: 600px; opacity: 1; }
  to   { max-height: 0; opacity: 0; }
}

/* Hero loading dots */
@keyframes loading-dots {
  0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
  40%            { opacity: 1;   transform: scale(1.0); }
}

/* General section entry (triggered by .is-visible via JS) */
@keyframes fade-slide-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Announcement bar shimmer */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Moving border button (background-position traversal) */
@keyframes moving-border {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Gear rotation on hover (announcement bar) */
@keyframes gear-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Scroll indicator chevron bounce */
@keyframes chevron-bounce {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50%       { transform: translateY(8px); opacity: 1; }
}

/* IntersectionObserver entry animation base state */
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 2.4: Write utility classes**

Append to `global/global.css`:

```css
/* --- Layout Utilities --- */
.compass-section {
  width: 100%;
  padding: 96px 0;
  position: relative;
  overflow: hidden;
}

.compass-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .compass-section { padding: 64px 0; }
  .compass-container { padding: 0 16px; }
}

/* --- Badge --- */
.compass-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(61, 96, 160, 0.08);
  border: 1px solid rgba(61, 96, 160, 0.2);
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--blue);
  letter-spacing: 0.04em;
}

.compass-badge::before {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blue);
  flex-shrink: 0;
}

/* --- Buttons --- */
.compass-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: var(--navy);
  color: var(--white);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
  border: none;
  text-decoration: none;
}

.compass-btn-primary:hover {
  background: var(--blue);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.compass-btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: rgba(61, 96, 160, 0.06);
  color: var(--blue);
  border: 1.5px solid rgba(61, 96, 160, 0.25);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition), border-color var(--transition), transform var(--transition);
  text-decoration: none;
}

.compass-btn-ghost:hover {
  background: rgba(61, 96, 160, 0.12);
  border-color: rgba(61, 96, 160, 0.45);
  transform: translateY(-1px);
}

/* Moving border button */
.compass-btn-moving-border {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 3px;
  border-radius: var(--radius-md);
  background: linear-gradient(
    var(--angle, 0deg),
    var(--navy) 0%,
    var(--blue) 25%,
    var(--light-blue) 50%,
    var(--blue) 75%,
    var(--navy) 100%
  );
  background-size: 300% 300%;
  animation: moving-border 4s ease infinite;
  text-decoration: none;
  cursor: pointer;
}

.compass-btn-moving-border-inner {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 29px;
  background: var(--navy);
  border-radius: calc(var(--radius-md) - 3px);
  color: var(--white);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
  transition: background var(--transition);
}

.compass-btn-moving-border:hover .compass-btn-moving-border-inner {
  background: var(--blue);
}

/* --- Card --- */
.compass-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  transition: transform var(--transition), box-shadow var(--transition);
  position: relative;
  overflow: hidden;
}

.compass-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Shine border on hover */
.compass-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(61, 96, 160, 0.4),
    rgba(133, 154, 193, 0.6),
    rgba(61, 96, 160, 0.4),
    transparent
  );
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity var(--transition);
  animation: shine-sweep 2s linear infinite;
  pointer-events: none;
  z-index: 0;
}

.compass-card:hover::before {
  opacity: 1;
}

/* Dot grid background utility */
.compass-dot-grid {
  background-image: radial-gradient(circle, rgba(61, 96, 160, 0.12) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* Section headings block */
.compass-section-header {
  text-align: center;
  margin-bottom: 64px;
}

.compass-section-header h2 {
  margin-bottom: 16px;
}

.compass-section-header p {
  font-size: 1.0625rem;
  color: var(--text-muted);
  max-width: 560px;
  margin: 0 auto;
}

/* Video modal overlay */
.compass-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(13, 24, 39, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.compass-modal-overlay.is-open {
  opacity: 1;
  pointer-events: all;
}

.compass-modal-inner {
  width: min(860px, 90vw);
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  background: #000;
  box-shadow: var(--shadow-lg);
}

.compass-modal-inner iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.compass-modal-close {
  position: absolute;
  top: -44px;
  right: 0;
  color: rgba(255,255,255,0.7);
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  transition: color var(--transition);
}

.compass-modal-close:hover {
  color: #fff;
}
```

- [ ] **Step 2.5: Verify CSS loads and `[data-animate]` base state works**

1. Temporarily add `<p data-animate style="margin:40px">Test animate</p>` inside `<body>` of `index.html`.
2. Open `index.html` in Chrome.
3. Expected: the paragraph is **invisible** on load (opacity: 0, translateY 24px applied).
4. Open DevTools > Console — no errors. DevTools > Network — `global.css` loads, Google Fonts CDN requests succeed.
5. Remove the temporary test element from `index.html` before the Step 2.6 commit.

- [ ] **Step 2.6: Commit**

```bash
git add global/global.css
git commit -m "feat: add global.css — brand tokens, reset, typography, keyframes, utilities"
```

---

### Task 3: global.js — All Interactive Behaviors

**Files:**
- Modify: `global/global.js`

All vanilla JS behaviors live here. Sections rely on these being loaded. In GHL, this file is pasted into Site Settings > Custom JS (loads on every page after the DOM).

---

- [ ] **Step 3.1: Write IntersectionObserver + scroll shrink nav**

Write the following into `global/global.js`:

```js
/* ============================================================
   COMPASS GLOBAL JS
   Paste into: GoHighLevel > Site Settings > Custom JS
   This file initializes all interactive behaviors.
   Safe to run multiple times — uses guards where needed.
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. INTERSECTION OBSERVER — fade-slide-up on [data-animate] ── */
  function initAnimateOnScroll() {
    const targets = document.querySelectorAll('[data-animate]');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.animateDelay || '0ms';
            entry.target.style.transitionDelay = delay;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ── 2. SCROLL SHRINK NAV ── */
  function initScrollNav() {
    const nav = document.getElementById('compass-nav');
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load in case already scrolled
  }

  /* ── 3. STAT COUNTER — animates .stat-val[data-count] integers ── */
  function initStatCounters() {
    const stats = document.querySelectorAll('.stat-val[data-count]');
    if (!stats.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1400; // ms
          const start = performance.now();

          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out quad
            const eased = 1 - Math.pow(1 - progress, 2);
            const current = Math.round(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach((el) => observer.observe(el));
  }

  /* ── 4. DOCK MAGNIFY — proximity-based scale on .dock-item ── */
  function initDockMagnify() {
    const dock = document.getElementById('compass-dock');
    if (!dock) return;

    const items = dock.querySelectorAll('.dock-item');

    dock.addEventListener('mousemove', (e) => {
      const dockRect = dock.getBoundingClientRect();
      const mouseX = e.clientX - dockRect.left;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2 - dockRect.left;
        const distance = Math.abs(mouseX - itemCenter);
        const maxDist = 80;
        const scale = distance < maxDist
          ? 1 + (1 - distance / maxDist) * 0.7  // up to 1.7×
          : 1;
        item.style.transform = `scale(${scale})`;
        item.style.transformOrigin = 'bottom center';
      });
    });

    dock.addEventListener('mouseleave', () => {
      items.forEach((item) => {
        item.style.transform = 'scale(1)';
      });
    });
  }

  /* ── 5. PARALLAX DRIVER — updates --scroll-y on scroll ── */
  function initParallaxDriver() {
    function updateScrollY() {
      document.documentElement.style.setProperty('--scroll-y', window.scrollY + 'px');
    }
    window.addEventListener('scroll', updateScrollY, { passive: true });
    updateScrollY();
  }

  /* ── 6. FAQ ACCORDION — single-open mode ── */
  function initAccordion() {
    const container = document.getElementById('faq-accordion');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const trigger = e.target.closest('.faq-trigger');
      if (!trigger) return;

      const item = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      // Close all
      container.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
        openItem.classList.remove('is-open');
        const body = openItem.querySelector('.faq-body');
        if (body) body.style.maxHeight = '0px';
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('is-open');
        const body = item.querySelector('.faq-body');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  }

  /* ── 7. MARQUEE SLOW ON HOVER ──
     Slows marquee to ~25% speed (4× duration) on hover by updating
     --marquee-duration CSS variable on each .marquee-track element.
     Section 08 CSS must declare: animation-duration: var(--marquee-duration, 20s)
     so this variable takes effect. ── */
  function initMarqueePause() {
    document.querySelectorAll('.marquee-track').forEach((track) => {
      const wrapper = track.closest('.marquee-wrapper') || track.parentElement;

      wrapper.addEventListener('mouseenter', () => {
        // Read the current computed animation-duration and quadruple it (≈ 25% speed)
        const computed = getComputedStyle(track).animationDuration;
        const seconds = parseFloat(computed) || 20;
        track.style.setProperty('--marquee-duration', (seconds * 4) + 's');
      });

      wrapper.addEventListener('mouseleave', () => {
        // Remove the override — animation-duration falls back to CSS default
        track.style.removeProperty('--marquee-duration');
      });
    });
  }

  /* ── 8. 3D SCROLL TILT — updates --tilt-progress for #platform-overview ── */
  function initPlatformTilt() {
    const section = document.getElementById('platform-overview');
    if (!section) return;

    function updateTilt() {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      // progress: 0 when section top enters viewport, 1 when section top reaches top
      const progress = Math.min(Math.max((viewH - rect.top) / (viewH + rect.height * 0.5), 0), 1);
      section.style.setProperty('--tilt-progress', progress.toFixed(4));
    }

    window.addEventListener('scroll', updateTilt, { passive: true });
    updateTilt();
  }

  /* ── 9. VIDEO MODAL ── */
  function initVideoModal() {
    document.querySelectorAll('[data-video-trigger]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const videoUrl = trigger.dataset.videoTrigger;
        const overlay = document.getElementById('compass-video-modal');
        const iframe = overlay && overlay.querySelector('iframe');
        if (!overlay || !iframe) return;

        iframe.src = videoUrl;
        overlay.classList.add('is-open');
      });
    });

    function closeModal() {
      const overlay = document.getElementById('compass-video-modal');
      if (!overlay) return;
      const iframe = overlay.querySelector('iframe');
      if (iframe) iframe.src = '';
      overlay.classList.remove('is-open');
    }

    document.addEventListener('click', (e) => {
      const overlay = document.getElementById('compass-video-modal');
      if (e.target === overlay) closeModal();
      if (e.target.closest('.compass-modal-close')) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ── 10. ANNOUNCEMENT BAR DISMISS ── */
  function initAnnouncementBar() {
    const bar = document.getElementById('announcement-bar');
    if (!bar) return;

    // Check sessionStorage
    if (sessionStorage.getItem('compass-bar-dismissed') === '1') {
      bar.style.display = 'none';
      return;
    }

    const dismissBtn = bar.querySelector('[data-dismiss-bar]');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        bar.style.maxHeight = bar.scrollHeight + 'px';
        requestAnimationFrame(() => {
          bar.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
          bar.style.maxHeight = '0px';
          bar.style.opacity = '0';
        });
        setTimeout(() => {
          bar.style.display = 'none';
        }, 320);
        sessionStorage.setItem('compass-bar-dismissed', '1');
      });
    }
  }

  /* ── 11. MOBILE NAV DRAWER ── */
  function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const closeBtn = document.getElementById('nav-drawer-close');
    const drawer = document.getElementById('nav-drawer');
    if (!hamburger || !drawer) return;

    hamburger.addEventListener('click', () => {
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });

    function closeDrawer() {
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Close on nav link click
    drawer.querySelectorAll('a, [data-nav-link]').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
  }

  /* ── 12. INDUSTRY FEATURES — Option A (auto-cycling) ── */
  function initFeatureCycle() {
    const container = document.getElementById('feature-cycle');
    if (!container) return;

    const items = container.querySelectorAll('.feature-item');
    const image = container.querySelector('.feature-image');
    const DURATION = 10000;
    let current = 0;
    let timer = null;

    function activate(index) {
      items.forEach((item, i) => {
        item.classList.toggle('is-active', i === index);
        const bar = item.querySelector('.feature-progress-bar');
        if (bar) {
          bar.style.transition = 'none';
          bar.style.width = '0%';
          if (i === index) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                bar.style.transition = `width ${DURATION}ms linear`;
                bar.style.width = '100%';
              });
            });
          }
        }
      });

      if (image) {
        const src = items[index] && items[index].dataset.img;
        if (src) {
          image.style.opacity = '0';
          setTimeout(() => {
            image.src = src;
            image.style.opacity = '1';
          }, 200);
        }
      }
    }

    function advance() {
      current = (current + 1) % items.length;
      activate(current);
    }

    items.forEach((item, i) => {
      item.addEventListener('click', () => {
        clearInterval(timer);
        current = i;
        activate(current);
        timer = setInterval(advance, DURATION);
      });
    });

    activate(0);
    timer = setInterval(advance, DURATION);
  }

  /* ── 13. ZOOM PARALLAX — per-image scale tied to scroll progress ──
     The spec notes "--scroll-y CSS variable" as the driver mechanism.
     --scroll-y (set by initParallaxDriver) is a raw pixel value; to compute
     a meaningful scale we still need section bounds. This implementation
     reads --scroll-y via getComputedStyle to stay architecturally consistent
     with the spec, then uses section bounds to derive a 0–1 progress value.
     Section 09 CSS uses `will-change: transform` on each image for GPU promotion. ── */
  function initZoomParallax() {
    const section = document.getElementById('zoom-parallax');
    if (!section) return;

    const images = section.querySelectorAll('[data-zoom-rate]');
    const root = document.documentElement;

    function updateZoom() {
      // Read --scroll-y set by initParallaxDriver
      const scrollY = parseFloat(getComputedStyle(root).getPropertyValue('--scroll-y')) || window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionH = section.offsetHeight;
      const viewH = window.innerHeight;
      const progress = Math.min(Math.max((scrollY - sectionTop + viewH) / (sectionH + viewH), 0), 1);

      images.forEach((img) => {
        const minScale = 1;
        const maxScale = parseFloat(img.dataset.zoomRate) || 2;
        const scale = minScale + (maxScale - minScale) * progress;
        img.style.transform = `scale(${scale.toFixed(3)})`;
      });
    }

    window.addEventListener('scroll', updateZoom, { passive: true });
    updateZoom();
  }

  /* ── INIT ALL ── */
  function init() {
    initAnimateOnScroll();
    initScrollNav();
    initStatCounters();
    initDockMagnify();
    initParallaxDriver();
    initAccordion();
    initMarqueePause();
    initPlatformTilt();
    initVideoModal();
    initAnnouncementBar();
    initMobileNav();
    initFeatureCycle();
    initZoomParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
```

- [ ] **Step 3.2: Verify global.js loads without errors**

Open `index.html` in Chrome. Open DevTools Console. Expected: no errors, no warnings. The script runs but finds no targets (no sections yet) — all init functions return early safely.

- [ ] **Step 3.3: Commit**

```bash
git add global/global.js
git commit -m "feat: add global.js — IntersectionObserver, scroll behaviors, accordion, dock magnify, video modal, all interactive behaviors"
```

---

## End of Chunk 1

**Next:** Chunk 2 covers Sections 01–05 (Announcement Bar, Nav, Hero, Feature Highlights, Platform Overview).
See: `docs/superpowers/plans/2026-03-16-compass-site-chunk-2.md`
