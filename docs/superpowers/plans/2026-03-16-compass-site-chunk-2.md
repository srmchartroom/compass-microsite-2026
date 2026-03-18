# Compass Site — Implementation Plan: Chunk 2
# Sections 01–05: Announcement Bar, Nav, Hero, Feature Highlights, Platform Overview

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the top five page sections as self-contained HTML snippet files that read from `global.css` / `global.js`.

**Prerequisites:** Chunk 1 complete (`global/global.css` and `global/global.js` exist).

**Spec:** `docs/superpowers/specs/2026-03-16-compass-site-design.md`

**Each section file:**
- Is a standalone HTML snippet (no `<!DOCTYPE>`, no `<html>`, no `<head>`) — pure markup + a `<style>` block
- References CSS variables defined in `global.css`
- Relies on JS behaviors initialized in `global.js`
- Can be copy-pasted into a GHL Custom Code block

---

## Chunk 2: Sections 01–05

### Task 4: 01-announcement-bar.html

**Files:**
- Create: `sections/01-announcement-bar.html`

---

- [ ] **Step 4.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 01: Announcement Bar
  GHL: paste into Custom Code block ABOVE the nav section.
  Requires: global.css loaded site-wide.
  Dependencies: gear-spin and shimmer @keyframes defined in global.css (Chunk 1).
  ============================================================ -->

<style>
  #announcement-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background: var(--navy);
    overflow: hidden;
    max-height: 44px;
    transition: max-height 0.3s ease, opacity 0.3s ease;
  }

  .ann-bar-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px 16px;
    position: relative;
  }

  /* Shimmer sweep across the bar */
  .ann-bar-inner::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(133, 154, 193, 0.2) 40%,
      rgba(255, 255, 255, 0.12) 50%,
      rgba(133, 154, 193, 0.2) 60%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
    pointer-events: none;
  }

  .ann-bar-text {
    font-family: var(--font-body);
    font-size: 0.8125rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: 0.02em;
    position: relative;
    z-index: 1;
  }

  .ann-bar-link {
    font-family: var(--font-body);
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--light-blue);
    text-decoration: none;
    position: relative;
    z-index: 1;
    transition: color 0.2s ease;
  }

  .ann-bar-link:hover {
    color: #fff;
  }

  /* Gear icons — hidden by default, animate in on bar hover */
  .ann-gear {
    position: relative;
    z-index: 1;
    font-size: 0.875rem;
    opacity: 0;
    transform: translateX(-12px) rotate(0deg);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    user-select: none;
  }

  .ann-gear-right {
    transform: translateX(12px) rotate(0deg);
  }

  #announcement-bar:hover .ann-gear {
    opacity: 0.6;
    transform: translateX(0) rotate(0deg);
    animation: gear-spin 3s linear infinite;
  }

  #announcement-bar:hover .ann-gear-right {
    animation-direction: reverse;
  }

  .ann-dismiss {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.4);
    font-size: 1rem;
    cursor: pointer;
    line-height: 1;
    padding: 4px;
    z-index: 1;
    transition: color 0.2s ease;
  }

  .ann-dismiss:hover {
    color: rgba(255, 255, 255, 0.9);
  }
</style>

<div id="announcement-bar">
  <div class="ann-bar-inner">
    <span class="ann-gear" aria-hidden="true">⚙</span>
    <span class="ann-bar-text">New: AI Appointment Booking is now live —</span>
    <a class="ann-bar-link" href="#platform-overview">Learn More →</a>
    <span class="ann-gear ann-gear-right" aria-hidden="true">⚙</span>
    <button class="ann-dismiss" data-dismiss-bar aria-label="Dismiss announcement">✕</button>
  </div>
</div>

<script>
  // Announcement bar: check sessionStorage on load; wire dismiss button
  (function () {
    var bar = document.getElementById('announcement-bar');
    if (!bar) return;

    // Auto-hide if already dismissed in this session
    if (sessionStorage.getItem('compass-bar-dismissed') === '1') {
      bar.style.display = 'none';
      document.body.classList.add('bar-dismissed');
      return;
    }

    var btn = bar.querySelector('[data-dismiss-bar]');
    if (!btn) return;

    btn.addEventListener('click', function () {
      bar.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
      bar.style.maxHeight = '0px';
      bar.style.opacity = '0';
      setTimeout(function () {
        bar.style.display = 'none';
        document.body.classList.add('bar-dismissed');
      }, 320);
      sessionStorage.setItem('compass-bar-dismissed', '1');
    });
  })();
</script>
```

- [ ] **Step 4.2: Paste into index.html and verify**

Add `<div id="bar-preview">` above the `<script>` tag in `index.html`, paste section content inside, open in Chrome.

Expected:
- Dark navy banner fixed at top of page
- "Learn More →" is in light blue
- Shimmer animation sweeps across
- Hovering over the bar causes gear icons to animate in and spin
- Clicking ✕ collapses the bar; refreshing the page keeps it dismissed (sessionStorage)

- [ ] **Step 4.3: Commit**

```bash
git add sections/01-announcement-bar.html
git commit -m "feat: add section 01 — announcement bar with shimmer and gear hover"
```

---

### Task 5: 02-nav.html

**Files:**
- Create: `sections/02-nav.html`

---

- [ ] **Step 5.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 02: Nav
  GHL: paste into Custom Code block directly after announcement bar.
  Requires: global.css, global.js loaded site-wide.
  ============================================================ -->

<style>
  #compass-nav {
    position: fixed;
    top: 44px; /* matches announcement bar height */
    left: 0;
    right: 0;
    z-index: 100;
    transition: top 0.3s ease, background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;
  }

  /* When announcement bar is dismissed (body class set by bar's inline script), nav moves to top */
  body.bar-dismissed #compass-nav {
    top: 0;
  }

  #compass-nav.scrolled {
    background: rgba(15, 26, 47, 0.88);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 rgba(61, 96, 160, 0.2);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 40px;
    max-width: 1280px;
    margin: 0 auto;
    transition: padding 0.3s ease;
  }

  #compass-nav.scrolled .nav-inner {
    padding: 10px 40px;
  }

  /* Logo */
  .nav-logo img {
    height: 104px;
    width: auto;
    object-fit: contain;
    transition: height 0.3s ease;
    display: block;
  }

  #compass-nav.scrolled .nav-logo img {
    height: 72px;
  }

  /* Nav links */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 36px;
    list-style: none;
  }

  .nav-links a {
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    position: relative;
    transition: color 0.2s ease;
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1.5px;
    background: var(--light-blue);
    transition: width 0.25s ease;
  }

  .nav-links a:hover {
    color: #fff;
  }

  .nav-links a:hover::after {
    width: 100%;
  }

  /* Nav CTA — uses the shared .compass-btn-moving-border utility from global.css.
     Override only the inner padding/font-size to fit the nav's compact scale. */
  .nav-cta-wrap.compass-btn-moving-border .compass-btn-moving-border-inner {
    padding: 9px 22px;
    font-size: 0.8125rem;
  }

  /* Hamburger (mobile only) */
  #nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 8px;
    background: none;
    border: none;
  }

  #nav-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    transition: transform 0.25s ease, opacity 0.25s ease;
  }

  /* Mobile drawer */
  #nav-drawer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(13, 24, 39, 0.97);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    z-index: 150;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    transform: translateY(-100%);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  #nav-drawer.is-open {
    transform: translateY(0);
    pointer-events: all;
  }

  .drawer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    text-align: center;
  }

  .drawer-links a {
    font-family: var(--font-headline);
    font-size: 2rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .drawer-links a:hover {
    color: var(--light-blue);
  }

  #nav-drawer-close {
    position: absolute;
    top: 24px;
    right: 24px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  #nav-drawer-close:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    .nav-links,
    .nav-cta-wrap {
      display: none;
    }

    #nav-hamburger {
      display: flex;
    }

    .nav-inner {
      padding: 14px 20px;
    }

    .nav-logo img {
      height: 72px;
    }
  }
</style>

<nav id="compass-nav" role="navigation" aria-label="Main navigation">
  <div class="nav-inner">
    <a class="nav-logo" href="/">
      <img
        src="https://assets.cdn.filesafe.space/5KNcJcblwftDgsKpBJfp/media/68558801ac9458168baee31e.svg"
        alt="Compass by Chart Room"
        width="280"
        height="104"
      />
    </a>

    <ul class="nav-links" role="list">
      <li><a href="#feature-highlights">Overview</a></li>
      <li><a href="#industry-features">Features</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#testimonials">Testimonials</a></li>
      <li><a href="#">Login</a></li>
    </ul>

    <a class="nav-cta-wrap compass-btn-moving-border" href="#bottom-cta">
      <span class="compass-btn-moving-border-inner">Schedule a Demo</span>
    </a>

    <button id="nav-hamburger" aria-label="Open menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</nav>

<!-- Mobile drawer -->
<div id="nav-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
  <button id="nav-drawer-close" aria-label="Close menu">✕</button>
  <ul class="drawer-links" role="list">
    <li><a href="#feature-highlights" data-nav-link>Overview</a></li>
    <li><a href="#industry-features" data-nav-link>Features</a></li>
    <li><a href="#pricing" data-nav-link>Pricing</a></li>
    <li><a href="#testimonials" data-nav-link>Testimonials</a></li>
    <li><a href="#bottom-cta" data-nav-link>Get Started</a></li>
    <li><a href="#" data-nav-link>Login</a></li>
  </ul>
</div>
```

- [ ] **Step 5.2: Add a `padding-top` spacer to body in index.html**

Since nav and bar are `position: fixed`, add this to `index.html`'s `<style>` tag (or inline `<style>` in body):

```html
<style>
  body { padding-top: 148px; } /* 44px bar + 104px nav logo height */
</style>
```

- [ ] **Step 5.3: Verify in Chrome**

Expected:
- Dark logo visible at 104px height, fixed at top
- Nav links visible with hover underline slide-in effect
- "Schedule a Demo" CTA has animated glowing border
- Scroll 60px → logo shrinks to 72px, nav background blurs in
- On mobile (< 768px): hamburger replaces links, tap opens full-screen drawer, links and X close drawer

- [ ] **Step 5.4: Commit**

```bash
git add sections/02-nav.html
git commit -m "feat: add section 02 — fixed nav with scroll shrink, moving border CTA, mobile drawer"
```

---

### Task 6: 03-hero.html

**Files:**
- Create: `sections/03-hero.html`

---

- [ ] **Step 6.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 03: Hero
  GHL: paste into Custom Code block below nav.
  Requires: global.css, global.js loaded site-wide.
  ============================================================ -->

<style>
  #hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 60% 0%, rgba(61,96,160,0.35) 0%, transparent 55%),
      radial-gradient(ellipse at 0% 90%, rgba(133,154,193,0.25) 0%, transparent 50%),
      linear-gradient(
        135deg,
        var(--navy) 0%,
        #1a2e52 15%,
        #1e3a6a 35%,
        #243f78 55%,
        #1a2e52 75%,
        var(--dark) 100%
      );
    background-size: 400% 400%;
    animation: aurora-drift 60s ease infinite;
    text-align: center;
    padding: 80px 24px 60px;
  }

  /* Dot grid overlay */
  #hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(133,154,193,0.18) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }

  /* Bottom fade to white (transition to next section) */
  #hero::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 180px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 60%, #fff);
    pointer-events: none;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 760px;
    width: 100%;
  }

  /* Loading dots */
  .hero-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 40px;
    margin-bottom: 32px;
  }

  .hero-loader.is-hidden {
    display: none;
  }

  .hero-loader span {
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--light-blue);
    animation: loading-dots 1.2s ease-in-out infinite;
  }

  .hero-loader span:nth-child(2) { animation-delay: 0.2s; }
  .hero-loader span:nth-child(3) { animation-delay: 0.4s; }

  /* Hero content — hidden until loader finishes */
  .hero-content {
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .hero-content.is-visible {
    opacity: 1;
  }

  /* Logo */
  .hero-logo {
    height: 200px;
    width: auto;
    object-fit: contain;
    margin: 0 auto 32px;
    display: block;
  }

  /* Badge */
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: rgba(61, 96, 160, 0.18);
    border: 1px solid rgba(133, 154, 193, 0.4);
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: 0.04em;
    margin-bottom: 28px;
  }

  .hero-badge::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--light-blue);
    flex-shrink: 0;
  }

  /* Headline */
  .hero-headline {
    font-family: var(--font-headline);
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 900;
    line-height: 1.0;
    letter-spacing: -0.04em;
    color: #fff;
    margin-bottom: 24px;
  }

  .hero-headline .accent {
    color: var(--light-blue);
  }

  /* Subheadline */
  .hero-sub {
    font-family: var(--font-body);
    font-size: clamp(1rem, 2vw, 1.1875rem);
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.65;
    max-width: 520px;
    margin: 0 auto 40px;
  }

  /* CTAs */
  .hero-ctas {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 56px;
  }

  /* Stats row */
  .hero-stats {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 48px;
    flex-wrap: wrap;
    border-top: 1px solid rgba(133, 154, 193, 0.2);
    padding-top: 32px;
  }

  .stat-item {
    text-align: center;
  }

  .stat-val {
    display: block;
    font-family: var(--font-headline);
    font-size: 2.5rem;
    font-weight: 900;
    color: #fff;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .stat-suffix {
    font-family: var(--font-headline);
    font-size: 2rem;
    font-weight: 700;
    color: var(--light-blue);
  }

  .stat-label {
    display: block;
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(133, 154, 193, 0.75);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-top: 6px;
  }

  /* Scroll indicator */
  .hero-scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    color: rgba(255, 255, 255, 0.35);
    font-size: 1.25rem;
    animation: chevron-bounce 2s ease-in-out infinite;
    cursor: pointer;
    transition: opacity 0.4s ease;
  }

  .hero-scroll-indicator.is-hidden {
    opacity: 0;
    pointer-events: none;
  }

  /* Staggered entry animation delays */
  .hero-badge    { transition-delay: 0.1s; }
  .hero-headline { transition-delay: 0.2s; }
  .hero-sub      { transition-delay: 0.4s; }
  .hero-ctas     { transition-delay: 0.6s; }
  .hero-stats    { transition-delay: 0.8s; }

  @media (max-width: 600px) {
    .hero-logo { height: 140px; }
    .hero-stats { gap: 28px; }
    .stat-val { font-size: 2rem; }
    .hero-ctas { flex-direction: column; align-items: center; }
  }
</style>

<section id="hero">
  <div class="hero-inner">

    <!-- Loading dots (shown for 800ms, then replaced by hero content) -->
    <div class="hero-loader" id="hero-loader">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <!-- Hero content -->
    <div class="hero-content" id="hero-content">
      <img
        class="hero-logo"
        src="https://assets.cdn.filesafe.space/5KNcJcblwftDgsKpBJfp/media/685588248b2950e5056f625d.png"
        alt="Compass by Chart Room"
        width="400"
        height="200"
      />
      <div class="hero-badge">AI-Powered CRM &amp; Automation Platform</div>
      <h1 class="hero-headline">
        Convert More<br>
        <span class="accent">Leads</span><br>
        Into Sales
      </h1>
      <p class="hero-sub">
        Chart Room helps you capture, nurture, and close leads on autopilot through
        SMS, Email, Live Chat, Phone Calls, and more.
      </p>
      <div class="hero-ctas">
        <a class="compass-btn-moving-border" href="#pricing">
          <span class="compass-btn-moving-border-inner">Get Started — $197/mo</span>
        </a>
        <a class="compass-btn-ghost" href="#platform-overview" style="color:rgba(255,255,255,0.8);border-color:rgba(133,154,193,0.35);background:rgba(61,96,160,0.1);">
          Watch Overview →
        </a>
      </div>

      <!-- Stats row -->
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-val" data-count="80" data-suffix="%">0%</span>
          <span class="stat-label">Response Rate</span>
        </div>
        <div class="stat-item">
          <span class="stat-val" data-count="7" data-suffix="×">0×</span>
          <span class="stat-label">Follow-up Channels</span>
        </div>
        <div class="stat-item">
          <!-- 24/7 is static — no data-count -->
          <span class="stat-val">24<span class="stat-suffix">/7</span></span>
          <span class="stat-label">Automation</span>
        </div>
        <div class="stat-item">
          <span class="stat-val" data-count="100" data-suffix="+">0+</span>
          <span class="stat-label">Integrations</span>
        </div>
      </div>
    </div>

  </div>

  <!-- Scroll chevron -->
  <div class="hero-scroll-indicator" id="hero-scroll-chevron" aria-hidden="true">&#8964;</div>
</section>

<script>
  // Hero entry sequence: 800ms loader → fade in content with staggered delays
  (function () {
    var loader = document.getElementById('hero-loader');
    var content = document.getElementById('hero-content');
    var chevron = document.getElementById('hero-scroll-chevron');

    if (!loader || !content) return;

    setTimeout(function () {
      loader.classList.add('is-hidden');
      // Stagger children by adding is-visible class
      content.classList.add('is-visible');
      var children = content.querySelectorAll('.hero-badge,.hero-headline,.hero-sub,.hero-ctas,.hero-stats');
      children.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      });
      children.forEach(function (el, i) {
        setTimeout(function () {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 100 + i * 150);
      });
    }, 800);

    // Hide chevron after first scroll
    var hideChevron = function () {
      if (chevron) chevron.classList.add('is-hidden');
      window.removeEventListener('scroll', hideChevron);
    };
    window.addEventListener('scroll', hideChevron, { passive: true });
  })();
</script>
```

- [ ] **Step 6.2: Verify in Chrome**

Expected:
- Full-screen dark section with aurora gradient animation
- Three loading dots appear for ~800ms
- Logo, badge, headline, subheadline, CTAs, and stats row fade in sequentially
- Stat numbers count up (80%, 7×, 100+) when visible; "24/7" is static text
- Scroll chevron bounces at bottom, disappears on first scroll
- On mobile, CTAs stack vertically

- [ ] **Step 6.3: Commit**

```bash
git add sections/03-hero.html
git commit -m "feat: add section 03 — hero with aurora background, loading sequence, stat counters"
```

---

### Task 7: 04-feature-highlights.html

**Files:**
- Create: `sections/04-feature-highlights.html`

---

- [ ] **Step 7.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 04: Feature Highlights
  GHL: paste into Custom Code block after hero.
  Requires: global.css, global.js loaded site-wide.
  ============================================================ -->

<style>
  #feature-highlights {
    background: #fff;
    padding: 96px 0;
  }

  /* 6-column base grid: each card spans 2 cols.
     Row 1: 3 cards fill cols 1-2, 3-4, 5-6.
     Row 2: 2 cards at cols 2-4 and 4-6 → visually centered with 1 col margin each side. */
  .fh-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 24px;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .fh-card { grid-column: span 2; }

  /* Bottom row: 2 cards centered in the 6-col grid */
  .fh-grid .fh-card:nth-child(4) { grid-column: 2 / 4; }
  .fh-grid .fh-card:nth-child(5) { grid-column: 4 / 6; }

  .fh-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 32px;
    position: relative;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .fh-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(31,53,91,0.12);
  }

  /* Shine border */
  .fh-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(61,96,160,0.5) 30%,
      rgba(133,154,193,0.8) 50%,
      rgba(61,96,160,0.5) 70%,
      transparent 100%
    );
    background-size: 200% 100%;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: shine-sweep 2s linear infinite paused;
  }

  .fh-card:hover::before {
    opacity: 1;
    animation-play-state: running;
  }

  /* Icon */
  .fh-icon {
    width: 44px;
    height: 44px;
    margin-bottom: 16px;
    color: var(--blue);
  }

  /* Keyword label */
  .fh-keyword {
    font-family: var(--font-body);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 10px;
    display: block;
  }

  .fh-title {
    font-family: var(--font-headline);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dark);
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }

  .fh-body {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  @media (max-width: 900px) {
    /* Switch to 4-col grid: 2 cards per row, all span 2 */
    .fh-grid {
      grid-template-columns: repeat(4, 1fr);
    }
    .fh-card { grid-column: span 2; }
    .fh-grid .fh-card:nth-child(4),
    .fh-grid .fh-card:nth-child(5) {
      grid-column: span 2;
    }
  }

  @media (max-width: 560px) {
    .fh-grid { grid-template-columns: 1fr; }
    .fh-card,
    .fh-grid .fh-card:nth-child(4),
    .fh-grid .fh-card:nth-child(5) {
      grid-column: 1 / -1;
    }
  }
</style>

<section id="feature-highlights" class="compass-section" style="padding:96px 0;">
  <div class="compass-container">
    <div class="compass-section-header" data-animate>
      <h2>Everything You Need To Convert More Leads</h2>
    </div>
  </div>

  <div class="fh-grid">

    <!-- Card 1: Speed -->
    <div class="fh-card" data-animate data-animate-delay="0ms">
      <svg class="fh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
      <span class="fh-keyword">Speed</span>
      <div class="fh-title">Double Your Speed to Lead</div>
      <p class="fh-body">Stop missing conversations. Streamline all communication in one place and respond before your competitors do.</p>
    </div>

    <!-- Card 2: Calendar -->
    <div class="fh-card" data-animate data-animate-delay="100ms">
      <svg class="fh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      <span class="fh-keyword">Calendar</span>
      <div class="fh-title">Instantly Fill Your Calendar</div>
      <p class="fh-body">Say goodbye to missed sales opportunities. Compass schedules appointments automatically around the clock.</p>
    </div>

    <!-- Card 3: Calls -->
    <div class="fh-card" data-animate data-animate-delay="200ms">
      <svg class="fh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.08 6.08l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
      <span class="fh-keyword">Calls</span>
      <div class="fh-title">Drive More Phone Calls</div>
      <p class="fh-body">Automatically route calls and convert inbound leads to sales opportunities without lifting a finger.</p>
    </div>

    <!-- Card 4: Smart (centered, col 2-4) -->
    <div class="fh-card" data-animate data-animate-delay="300ms">
      <!-- Sparkles icon: 3 stars of different sizes (Lucide-style) -->
      <svg class="fh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
        <path d="M20 3v4"/>
        <path d="M22 5h-4"/>
        <path d="M4 17v2"/>
        <path d="M5 18H3"/>
      </svg>
      <span class="fh-keyword">Smart</span>
      <div class="fh-title">Build Smart Nurture Campaigns</div>
      <p class="fh-body">Get up to 80% response rate with SMART automation across SMS, Email, Voicemail, and more channels.</p>
    </div>

    <!-- Card 5: Performance (centered, col 4-6) -->
    <div class="fh-card" data-animate data-animate-delay="400ms">
      <svg class="fh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
      <span class="fh-keyword">Performance</span>
      <div class="fh-title">Gain Key Performance Insights</div>
      <p class="fh-body">See how your campaigns and sales team are performing in real time with advanced reporting dashboards.</p>
    </div>

  </div>
</section>
```

- [ ] **Step 7.2: Verify in Chrome**

Expected:
- 3 cards on top row, 2 cards centered on bottom row (desktop)
- Cards fade up on scroll (IntersectionObserver stagger)
- Hover: card lifts 4px, shine border sweep animates around perimeter
- Mobile: 2-col then 1-col at narrower breakpoints

- [ ] **Step 7.3: Commit**

```bash
git add sections/04-feature-highlights.html
git commit -m "feat: add section 04 — feature highlights grid with shine border hover"
```

---

### Task 8: 05-platform-overview.html

**Files:**
- Create: `sections/05-platform-overview.html`

---

- [ ] **Step 8.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 05: Platform Overview
  GHL: paste into Custom Code block after feature highlights.
  Requires: global.css, global.js loaded site-wide.
  global.js provides: initPlatformTilt() (updates --tilt-progress),
                       initVideoModal() (opens YouTube modal on click)
  ============================================================ -->

<style>
  #platform-overview {
    background: var(--white);
    padding: 96px 0 80px;
    --tilt-progress: 0;
  }

  .po-header {
    text-align: center;
    margin-bottom: 64px;
  }

  /* ── 3D ContainerScroll ── */
  .po-scroll-container {
    perspective: 1000px;
    max-width: 960px;
    margin: 0 auto 64px;
    padding: 0 24px;
  }

  .po-screenshot-wrap {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 40px 120px rgba(13,24,39,0.18), 0 8px 32px rgba(31,53,91,0.12);
    transform:
      rotateX(calc(20deg * (1 - var(--tilt-progress))))
      scale(calc(0.95 + 0.05 * var(--tilt-progress)));
    transition: box-shadow 0.1s ease;
    background: var(--cream);
  }

  .po-screenshot-wrap img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 16px;
  }

  /* ── Video thumbnail ── */
  .po-video-section {
    max-width: 760px;
    margin: 0 auto;
    padding: 0 24px;
    text-align: center;
  }

  .po-video-heading {
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-muted);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .po-video-thumb {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    aspect-ratio: 16 / 9;
    background: var(--dark);
  }

  .po-video-thumb:hover {
    transform: scale(1.03);
    box-shadow: 0 20px 60px rgba(13,24,39,0.2);
  }

  .po-video-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
    transition: opacity 0.25s ease;
  }

  .po-video-thumb:hover img {
    opacity: 0.7;
  }

  /* Play button overlay */
  .po-play-btn {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .po-play-icon {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 32px rgba(13,24,39,0.2);
    transition: transform 0.2s ease, background 0.2s ease;
  }

  .po-video-thumb:hover .po-play-icon {
    transform: scale(1.08);
    background: #fff;
  }

  .po-play-icon svg {
    width: 28px;
    height: 28px;
    color: var(--navy);
    margin-left: 4px; /* optical centering for play triangle */
  }

  .po-video-label {
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-top: 16px;
  }
</style>

<section id="platform-overview" class="compass-section" style="padding:96px 0 80px;">
  <div class="compass-container">
    <div class="po-header compass-section-header" data-animate>
      <div class="compass-badge" style="margin:0 auto 16px;">Platform Overview</div>
      <h2>See Compass in Action</h2>
      <p>Watch how Compass captures, nurtures, and closes leads — all on autopilot.</p>
    </div>
  </div>

  <!-- 3D ContainerScroll screenshot -->
  <div class="po-scroll-container" data-animate>
    <div class="po-screenshot-wrap">
      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=720&fit=crop"
        alt="Compass CRM dashboard"
        width="1280"
        height="720"
        loading="lazy"
      />
    </div>
  </div>

  <!-- Video thumbnail -->
  <div class="po-video-section">
    <p class="po-video-heading">Platform Tour Video</p>
    <div
      class="po-video-thumb"
      data-video-trigger="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
      role="button"
      tabindex="0"
      aria-label="Watch the Compass platform tour"
    >
      <img
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&fit=crop"
        alt="Platform tour thumbnail"
        width="1280"
        height="720"
        loading="lazy"
      />
      <div class="po-play-btn">
        <div class="po-play-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
      </div>
    </div>
    <p class="po-video-label">3-minute platform overview</p>
  </div>
</section>

<!-- Video modal (shared; only one needed per page) -->
<div class="compass-modal-overlay" id="compass-video-modal" role="dialog" aria-modal="true" aria-label="Video player">
  <div class="compass-modal-inner">
    <button class="compass-modal-close" aria-label="Close video">✕</button>
    <iframe
      src=""
      allow="autoplay; encrypted-media"
      allowfullscreen
      title="Compass platform overview"
    ></iframe>
  </div>
</div>
```

- [ ] **Step 8.2: Verify in Chrome**

Expected:
- Screenshot appears with 3D `rotateX(20deg)` tilt when scrolled to section
- As user scrolls through the section, tilt gradually unfolds to `rotateX(0)` (flat)
- Video thumbnail hover: scales 1.03×, play button enlarges
- Clicking video thumbnail opens modal overlay with YouTube embed
- ESC key or clicking backdrop closes modal (handled by `initVideoModal` in global.js)

- [ ] **Step 8.3: Commit**

```bash
git add sections/05-platform-overview.html
git commit -m "feat: add section 05 — platform overview with 3D scroll tilt and video thumbnail modal"
```

---

## End of Chunk 2

**Next:** Chunk 3 covers Sections 06–10 (Industry Features, Platforms Replaced, Integrations, Zoom Parallax, Testimonials).
See: `docs/superpowers/plans/2026-03-16-compass-site-chunk-3.md`
