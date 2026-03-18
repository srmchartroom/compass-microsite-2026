# Compass Site — Implementation Plan: Chunk 3
# Sections 06–10: Industry Features, Platforms Replaced, Integrations, Zoom Parallax, Testimonials

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Sections 06–10 as self-contained HTML snippet files.

**Prerequisites:** Chunks 1 and 2 complete.

**Spec:** `docs/superpowers/specs/2026-03-16-compass-site-design.md`

---

## Chunk 3: Sections 06–10

### Task 9: 06-industry-features.html

**Files:**
- Create: `sections/06-industry-features.html`

The spec requires **both Option A and Option B** to be built in `index.html` preview with a toggle. The client selects one; the other is removed before GHL deployment. This file contains both options with the toggle.

---

- [ ] **Step 9.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 06: Industry Features
  GHL: paste ONLY the chosen option (A or B) into Custom Code.
  In index.html preview, both options are shown with a toggle.
  Requires: global.css, global.js loaded site-wide.
  global.js provides: initFeatureCycle() for Option A.
  ============================================================ -->

<style>
  #industry-features {
    background: var(--cream);
    padding: 96px 0;
  }

  /* ── Toggle (preview only — remove before GHL deployment) ── */
  .if-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 48px;
  }

  .if-toggle-btn {
    padding: 8px 20px;
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-size: 0.8125rem;
    font-weight: 600;
    border: 1.5px solid var(--border);
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .if-toggle-btn.is-active {
    background: var(--navy);
    border-color: var(--navy);
    color: #fff;
  }

  #if-option-b { display: none; }

  /* ── OPTION A: Auto-cycling features ── */
  #if-option-a {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .if-list { display: flex; flex-direction: column; gap: 0; }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px 16px;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background 0.2s ease;
    position: relative;
  }

  .feature-item.is-active {
    background: #fff;
    box-shadow: var(--shadow-sm);
  }

  .feature-item-icon {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-sm);
    background: rgba(61,96,160,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--blue);
    font-size: 1rem;
    font-weight: 700;
  }

  .feature-item-icon.is-active-icon {
    background: var(--blue);
    color: #fff;
  }

  .feature-item-text { flex: 1; }

  .feature-item-title {
    font-family: var(--font-headline);
    font-size: 1rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 4px;
  }

  .feature-item-desc {
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.5;
    display: none;
  }

  .feature-item.is-active .feature-item-desc { display: block; }

  /* Progress bar */
  .feature-progress {
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
    height: 2px;
    background: rgba(61,96,160,0.1);
    border-radius: 2px;
    overflow: hidden;
    opacity: 0;
  }

  .feature-item.is-active .feature-progress { opacity: 1; }

  .feature-progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--blue), var(--light-blue));
    border-radius: 2px;
  }

  /* Right: feature image */
  .if-image-wrap {
    position: sticky;
    top: 120px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    aspect-ratio: 4 / 3;
    background: var(--dark);
  }

  .feature-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
  }

  /* ── OPTION B: Hover slideshow ── */
  #if-option-b {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
  }

  .if-slide-list { display: flex; flex-direction: column; }

  .if-slide-item {
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
    cursor: default;
    overflow: hidden;
    position: relative;
  }

  .if-slide-item:first-child { border-top: 1px solid var(--border); }

  .if-slide-title {
    font-family: var(--font-headline);
    font-size: clamp(1.25rem, 2.5vw, 2rem);
    font-weight: 700;
    color: var(--dark);
    letter-spacing: -0.02em;
    overflow: hidden;
    height: 1.2em;
    position: relative;
  }

  /* Character-by-character slide animation on hover */
  .if-slide-item:hover .if-slide-title-inner {
    animation: slide-title-out 0.25s ease forwards;
  }

  @keyframes slide-title-out {
    to { transform: translateY(-100%); opacity: 0; }
  }

  .if-slide-title-inner {
    display: block;
    transition: transform 0.25s ease, opacity 0.25s ease;
  }

  /* Right: image reveal */
  .if-slide-image-col {
    position: sticky;
    top: 120px;
  }

  .if-slide-image-wrap {
    border-radius: var(--radius-lg);
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: var(--dark);
    clip-path: inset(100% 0 0 0);
    transition: clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-lg);
  }

  .if-slide-item:hover ~ .if-slide-image-col .if-slide-image-wrap,
  .if-slide-image-wrap.is-revealed {
    clip-path: inset(0% 0 0 0);
  }

  .if-slide-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    #if-option-a,
    #if-option-b {
      grid-template-columns: 1fr;
    }

    .if-image-wrap,
    .if-slide-image-col {
      display: none; /* Hide right image col on mobile for both options */
    }
  }
</style>

<section id="industry-features" class="compass-section" style="padding:96px 0;">
  <div class="compass-container">
    <div class="compass-section-header" data-animate>
      <div class="compass-badge" style="margin:0 auto 16px;">Platform Features</div>
      <h2>Industry Leading Features</h2>
      <p>Everything your team needs to capture, nurture, and close — in one intelligent platform.</p>
    </div>

    <!-- Preview-only toggle — remove before GHL deployment -->
    <div class="if-toggle" id="if-toggle">
      <button class="if-toggle-btn is-active" data-option="a">Option A — Auto-Cycling</button>
      <button class="if-toggle-btn" data-option="b">Option B — Hover Slideshow</button>
    </div>
  </div>

  <!-- ── Option A: Auto-cycling ── -->
  <div id="if-option-a">

    <div class="if-list" id="feature-cycle">
      <div class="feature-item is-active" data-img="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop">
        <div class="feature-item-icon is-active-icon">1</div>
        <div class="feature-item-text">
          <div class="feature-item-title">7-Channel Automated Follow Up</div>
          <p class="feature-item-desc">Reach leads across SMS, Email, Voicemail, Facebook DM, Instagram DM, Live Chat, and Google My Business — automatically.</p>
        </div>
        <div class="feature-progress"><div class="feature-progress-bar"></div></div>
      </div>

      <div class="feature-item" data-img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop">
        <div class="feature-item-icon">2</div>
        <div class="feature-item-text">
          <div class="feature-item-title">AI Appointment Booking</div>
          <p class="feature-item-desc">Let AI qualify leads and book appointments on your calendar 24/7 — no human intervention required.</p>
        </div>
        <div class="feature-progress"><div class="feature-progress-bar"></div></div>
      </div>

      <div class="feature-item" data-img="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop">
        <div class="feature-item-icon">3</div>
        <div class="feature-item-text">
          <div class="feature-item-title">Live Call Transfer</div>
          <p class="feature-item-desc">Transfer hot leads directly to your sales team the moment they're ready to buy — zero wait time.</p>
        </div>
        <div class="feature-progress"><div class="feature-progress-bar"></div></div>
      </div>

      <div class="feature-item" data-img="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop">
        <div class="feature-item-icon">4</div>
        <div class="feature-item-text">
          <div class="feature-item-title">Communication Center</div>
          <p class="feature-item-desc">Every conversation — SMS, email, chat, calls — in a single unified inbox. No more switching apps.</p>
        </div>
        <div class="feature-progress"><div class="feature-progress-bar"></div></div>
      </div>

      <div class="feature-item" data-img="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop">
        <div class="feature-item-icon">5</div>
        <div class="feature-item-text">
          <div class="feature-item-title">Mobile App</div>
          <p class="feature-item-desc">Manage leads, conversations, and appointments from anywhere on iOS and Android.</p>
        </div>
        <div class="feature-progress"><div class="feature-progress-bar"></div></div>
      </div>

      <div class="feature-item" data-img="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop">
        <div class="feature-item-icon">6</div>
        <div class="feature-item-text">
          <div class="feature-item-title">Team Management</div>
          <p class="feature-item-desc">Assign leads, set permissions, track performance, and keep your whole team aligned in one place.</p>
        </div>
        <div class="feature-progress"><div class="feature-progress-bar"></div></div>
      </div>

      <div class="feature-item" data-img="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop">
        <div class="feature-item-icon">7</div>
        <div class="feature-item-text">
          <div class="feature-item-title">Lead Round Robin</div>
          <p class="feature-item-desc">Automatically distribute leads fairly across your team so every rep gets their fair share of opportunities.</p>
        </div>
        <div class="feature-progress"><div class="feature-progress-bar"></div></div>
      </div>

      <div class="feature-item" data-img="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop">
        <div class="feature-item-icon">8</div>
        <div class="feature-item-text">
          <div class="feature-item-title">Advanced Reporting</div>
          <p class="feature-item-desc">Deep insights into campaign performance, call tracking, conversion rates, and team productivity.</p>
        </div>
        <div class="feature-progress"><div class="feature-progress-bar"></div></div>
      </div>

      <div class="feature-item" data-img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop">
        <div class="feature-item-icon">9</div>
        <div class="feature-item-text">
          <div class="feature-item-title">Seamless Integration</div>
          <p class="feature-item-desc">Connect to Stripe, QuickBooks, Google, Facebook, Zapier, and 100+ other tools your business already uses.</p>
        </div>
        <div class="feature-progress"><div class="feature-progress-bar"></div></div>
      </div>
    </div>

    <div class="if-image-wrap">
      <img
        class="feature-image"
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
        alt="Feature screenshot"
        width="800"
        height="600"
        loading="lazy"
      />
    </div>
  </div>

  <!-- ── Option B: Hover slideshow ── -->
  <div id="if-option-b">
    <div class="if-slide-list">
      <div class="if-slide-item"><div class="if-slide-title"><span class="if-slide-title-inner">7-Channel Automated Follow Up</span></div></div>
      <div class="if-slide-item"><div class="if-slide-title"><span class="if-slide-title-inner">AI Appointment Booking</span></div></div>
      <div class="if-slide-item"><div class="if-slide-title"><span class="if-slide-title-inner">Live Call Transfer</span></div></div>
      <div class="if-slide-item"><div class="if-slide-title"><span class="if-slide-title-inner">Communication Center</span></div></div>
      <div class="if-slide-item"><div class="if-slide-title"><span class="if-slide-title-inner">Mobile App</span></div></div>
      <div class="if-slide-item"><div class="if-slide-title"><span class="if-slide-title-inner">Team Management</span></div></div>
      <div class="if-slide-item"><div class="if-slide-title"><span class="if-slide-title-inner">Lead Round Robin</span></div></div>
      <div class="if-slide-item"><div class="if-slide-title"><span class="if-slide-title-inner">Advanced Reporting</span></div></div>
      <div class="if-slide-item"><div class="if-slide-title"><span class="if-slide-title-inner">Seamless Integration</span></div></div>
    </div>
    <div class="if-slide-image-col">
      <div class="if-slide-image-wrap is-revealed">
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" alt="Feature preview" width="800" height="600" loading="lazy" />
      </div>
    </div>
  </div>
</section>

<script>
  // Option A/B toggle (preview only)
  (function () {
    var toggle = document.getElementById('if-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function (e) {
      var btn = e.target.closest('.if-toggle-btn');
      if (!btn) return;

      var option = btn.dataset.option;
      document.querySelectorAll('.if-toggle-btn').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });

      var optA = document.getElementById('if-option-a');
      var optB = document.getElementById('if-option-b');
      if (optA) optA.style.display = option === 'a' ? 'grid' : 'none';
      if (optB) optB.style.display = option === 'b' ? 'grid' : 'none';
    });
  })();
</script>
```

- [ ] **Step 9.2: Verify `id="feature-cycle"` placement is correct**

After writing the file, confirm the id placement in the HTML is:
```html
<div id="if-option-a">                        ← outer: only if-option-a
  <div class="if-list" id="feature-cycle">    ← inner: feature-cycle for JS
```
`initFeatureCycle()` in `global.js` calls `document.getElementById('feature-cycle')`. If `id="feature-cycle"` is missing or on the wrong element, the auto-cycle will silently fail. Verify in DevTools: `document.getElementById('feature-cycle')` should return the `.if-list` div.

- [ ] **Step 9.3: Verify in Chrome**

Expected:
- Default: Option A visible, auto-cycles through 9 features every 10 seconds
- Active feature: white card lifts, description visible, progress bar animates across 10s
- Clicking a feature: jumps to that feature, restarts timer
- Right image fades in/out on feature change
- Toggle buttons switch to Option B view
- Option B: hovering a feature title triggers slide-out animation; right image is shown

- [ ] **Step 9.4: Commit**

```bash
git add sections/06-industry-features.html
git commit -m "feat: add section 06 — industry features with auto-cycle (A) and hover slideshow (B) options"
```

---

### Task 10: 07-platforms-replaced.html

**Files:**
- Create: `sections/07-platforms-replaced.html`

---

- [ ] **Step 10.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 07: Platforms Replaced
  GHL: paste into Custom Code block.
  Requires: global.css loaded site-wide.
  ============================================================ -->

<style>
  #platforms-replaced {
    background: #fff;
    padding: 96px 0;
  }

  .pr-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 48px;
  }

  .pr-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    cursor: default;
  }

  .pr-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: rgba(61,96,160,0.3);
  }

  /* Checkmark badge — hidden by default, reveals on hover */
  .pr-check {
    position: absolute;
    top: 14px;
    right: 14px;
    padding: 4px 10px;
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 700;
    color: #16a34a;
    opacity: 0;
    transform: translateY(-6px);
    transition: opacity 0.25s ease, transform 0.25s ease;
    white-space: nowrap;
  }

  .pr-card:hover .pr-check {
    opacity: 1;
    transform: translateY(0);
  }

  .pr-platform {
    font-family: var(--font-headline);
    font-size: 1.0625rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 4px;
    letter-spacing: -0.01em;
  }

  .pr-category {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--light-blue);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .pr-value {
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  @media (max-width: 900px) {
    .pr-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 560px) {
    .pr-grid { grid-template-columns: 1fr; }
  }
</style>

<section id="platforms-replaced" class="compass-section compass-dot-grid" style="padding:96px 0;">
  <div class="compass-container">
    <div class="compass-section-header" data-animate>
      <div class="compass-badge" style="margin:0 auto 16px;">Platform Consolidation</div>
      <h2>What Does Compass Replace?</h2>
      <p>One platform that consolidates the tools you're already paying for — saving thousands per year.</p>
    </div>

    <div class="pr-grid">

      <div class="pr-card" data-animate data-animate-delay="0ms">
        <div class="pr-check">✓ Included in Compass</div>
        <div class="pr-platform">Calendly</div>
        <div class="pr-category">Scheduling &amp; Calendar Booking</div>
        <p class="pr-value">Compass books appointments automatically without third-party scheduling apps.</p>
      </div>

      <div class="pr-card" data-animate data-animate-delay="50ms">
        <div class="pr-check">✓ Included in Compass</div>
        <div class="pr-platform">Mailchimp</div>
        <div class="pr-category">Email Marketing</div>
        <p class="pr-value">Full email marketing suite with campaigns, automations, and analytics built in.</p>
      </div>

      <div class="pr-card" data-animate data-animate-delay="100ms">
        <div class="pr-check">✓ Included in Compass</div>
        <div class="pr-platform">HubSpot / Salesforce</div>
        <div class="pr-category">CRM &amp; Pipeline</div>
        <p class="pr-value">Full CRM with pipeline management, deal tracking, and team visibility.</p>
      </div>

      <div class="pr-card" data-animate data-animate-delay="150ms">
        <div class="pr-check">✓ Included in Compass</div>
        <div class="pr-platform">ClickFunnels</div>
        <div class="pr-category">Funnels &amp; Landing Pages</div>
        <p class="pr-value">Build high-converting funnels and landing pages without extra subscriptions.</p>
      </div>

      <div class="pr-card" data-animate data-animate-delay="200ms">
        <div class="pr-check">✓ Included in Compass</div>
        <div class="pr-platform">Twilio</div>
        <div class="pr-category">SMS &amp; Calling</div>
        <p class="pr-value">Built-in SMS, MMS, and voice calling — no separate Twilio account needed.</p>
      </div>

      <div class="pr-card" data-animate data-animate-delay="250ms">
        <div class="pr-check">✓ Included in Compass</div>
        <div class="pr-platform">ActiveCampaign</div>
        <div class="pr-category">Automation Workflows</div>
        <p class="pr-value">Visual automation builder with multi-channel triggers, conditions, and actions.</p>
      </div>

      <div class="pr-card" data-animate data-animate-delay="300ms">
        <div class="pr-check">✓ Included in Compass</div>
        <div class="pr-platform">WordPress</div>
        <div class="pr-category">Websites</div>
        <p class="pr-value">Build and host your business website directly inside Compass.</p>
      </div>

      <div class="pr-card" data-animate data-animate-delay="350ms">
        <div class="pr-check">✓ Included in Compass</div>
        <div class="pr-platform">Zendesk</div>
        <div class="pr-category">Support &amp; Chat</div>
        <p class="pr-value">Live chat, web chat bots, and support ticketing in your unified inbox.</p>
      </div>

      <div class="pr-card" data-animate data-animate-delay="400ms">
        <div class="pr-check">✓ Included in Compass</div>
        <div class="pr-platform">SurveyMonkey</div>
        <div class="pr-category">Surveys &amp; Forms</div>
        <p class="pr-value">Create surveys, forms, and quizzes to capture lead data and feedback.</p>
      </div>

      <div class="pr-card" data-animate data-animate-delay="450ms">
        <div class="pr-check">✓ Included in Compass</div>
        <div class="pr-platform">Kajabi</div>
        <div class="pr-category">Courses &amp; Memberships</div>
        <p class="pr-value">Sell courses, memberships, and digital products — all from one dashboard.</p>
      </div>

      <div class="pr-card" data-animate data-animate-delay="500ms">
        <div class="pr-check">✓ Included in Compass</div>
        <div class="pr-platform">ManyChat</div>
        <div class="pr-category">Messenger Bots</div>
        <p class="pr-value">Build automated chat sequences across Facebook, Instagram, and SMS.</p>
      </div>

      <div class="pr-card" data-animate data-animate-delay="550ms">
        <div class="pr-check">✓ Included in Compass</div>
        <div class="pr-platform">Stripe Billing</div>
        <div class="pr-category">Payments &amp; Invoicing</div>
        <p class="pr-value">Collect payments, send invoices, and manage subscriptions in Compass.</p>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 10.2: Verify in Chrome**

Expected:
- 3-col bento grid of 12 platform cards
- Dot grid background visible on section
- Cards fade up on scroll with stagger
- Hover: card lifts + green "✓ Included in Compass" badge slides in from top-right

- [ ] **Step 10.3: Commit**

```bash
git add sections/07-platforms-replaced.html
git commit -m "feat: add section 07 — platforms replaced bento grid with hover checkmark reveal"
```

---

### Task 11: 08-integrations.html

**Files:**
- Create: `sections/08-integrations.html`

**Important:** Each `.marquee-track` must use `animation-duration: var(--marquee-duration, 20s)` so `global.js`'s `initMarqueePause()` can slow it to 25% speed by setting `--marquee-duration` on the track element.

---

- [ ] **Step 11.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 08: Integrations Marquee
  GHL: paste into Custom Code block.
  Requires: global.css, global.js loaded site-wide.
  global.js provides: initMarqueePause() — reads computed
    animation-duration and sets --marquee-duration to 4× on hover.
  IMPORTANT: Both .marquee-track elements MUST use
    animation-duration: var(--marquee-duration, 20s) (or 26s)
    so JS can override via the CSS variable.
  ============================================================ -->

<style>
  #integrations {
    background: var(--cream);
    padding: 96px 0;
    overflow: hidden;
  }

  .int-logos-section {
    margin-top: 48px;
  }

  /* Marquee row */
  .marquee-wrapper {
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
  }

  /* Fade edges via mask-image (per spec) — avoids background overlay issues */
  .marquee-wrapper {
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  }

  /* Track: contains two copies of the logo list for infinite loop */
  .marquee-track {
    display: flex;
    align-items: center;
    gap: 48px;
    width: max-content;
    animation: marquee-scroll var(--marquee-duration, 20s) linear infinite;
    will-change: transform;
  }

  /* Row 2 goes right (reverse) */
  .marquee-track.reverse {
    animation: marquee-scroll var(--marquee-duration, 26s) linear infinite reverse;
  }

  .marquee-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    white-space: nowrap;
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--dark);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .marquee-logo:hover {
    border-color: rgba(61,96,160,0.35);
    box-shadow: var(--shadow-sm);
  }

  .marquee-logo-icon {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background: var(--blue);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 0.625rem;
    font-weight: 900;
    color: #fff;
    letter-spacing: 0;
  }
</style>

<section id="integrations" class="compass-section" style="padding:96px 0;">
  <div class="compass-container">
    <div class="compass-section-header" data-animate>
      <div class="compass-badge" style="margin:0 auto 16px;">Integrations</div>
      <h2>Seamless Integration With 100+ Tools</h2>
      <p>Integrate Compass with tools you already love — with custom integrations and Zapier.</p>
    </div>
  </div>

  <div class="int-logos-section">
    <!-- Row 1: scrolls left -->
    <div class="marquee-wrapper">
      <div class="marquee-track">
        <!-- First copy -->
        <div class="marquee-logo"><div class="marquee-logo-icon">S</div>Stripe</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Q</div>QuickBooks</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">f</div>Facebook</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">IG</div>Instagram</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">in</div>LinkedIn</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">T</div>TikTok</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">G</div>Google</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Z</div>Zapier</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Zm</div>Zoom</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Sl</div>Slack</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">GC</div>Google Calendar</div>
        <!-- Second copy (identical — for seamless loop) -->
        <div class="marquee-logo"><div class="marquee-logo-icon">S</div>Stripe</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Q</div>QuickBooks</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">f</div>Facebook</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">IG</div>Instagram</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">in</div>LinkedIn</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">T</div>TikTok</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">G</div>Google</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Z</div>Zapier</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Zm</div>Zoom</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Sl</div>Slack</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">GC</div>Google Calendar</div>
      </div>
    </div>

    <!-- Row 2: scrolls right (reverse direction) -->
    <div class="marquee-wrapper">
      <div class="marquee-track reverse">
        <!-- First copy -->
        <div class="marquee-logo"><div class="marquee-logo-icon">Tw</div>Twilio</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Mg</div>Mailgun</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">SG</div>SendGrid</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">PP</div>PayPal</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Sh</div>Shopify</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">WP</div>WordPress</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Cl</div>Calendly</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">AC</div>ActiveCampaign</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">SF</div>Salesforce</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">HS</div>HubSpot</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">+</div>2000+ via Zapier</div>
        <!-- Second copy (identical) -->
        <div class="marquee-logo"><div class="marquee-logo-icon">Tw</div>Twilio</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Mg</div>Mailgun</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">SG</div>SendGrid</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">PP</div>PayPal</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Sh</div>Shopify</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">WP</div>WordPress</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">Cl</div>Calendly</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">AC</div>ActiveCampaign</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">SF</div>Salesforce</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">HS</div>HubSpot</div>
        <div class="marquee-logo"><div class="marquee-logo-icon">+</div>2000+ via Zapier</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 11.2: Verify in Chrome**

Expected:
- Row 1 scrolls left continuously; Row 2 scrolls right continuously
- Logo pills fade out at left and right edges (mask gradient)
- Hovering anywhere in the marquee wrapper: both rows slow to ~25% speed (4× duration via `--marquee-duration` set by global.js)
- Moving mouse away: speed returns to normal

- [ ] **Step 11.3: Commit**

```bash
git add sections/08-integrations.html
git commit -m "feat: add section 08 — integrations dual-row marquee with edge fade and hover slowdown"
```

---

### Task 12: 09-zoom-parallax.html

**Files:**
- Create: `sections/09-zoom-parallax.html`

---

- [ ] **Step 12.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 09: Zoom Parallax
  GHL: paste into Custom Code block.
  Requires: global.css, global.js loaded site-wide.
  global.js provides: initZoomParallax() — reads --scroll-y and
    applies per-image scale based on [data-zoom-rate] attribute.
  Images: replace src with platform screenshots when available.
  ============================================================ -->

<style>
  #zoom-parallax {
    position: relative;
    height: 100vh;
    background: var(--dark);
    overflow: hidden;
  }

  .zp-image {
    position: absolute;
    border-radius: var(--radius-md);
    overflow: hidden;
    will-change: transform;
    transform-origin: center center;
    box-shadow: var(--shadow-lg);
  }

  .zp-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Position each image — 7 images at fixed absolute positions */
  /* Image 1: center large */
  .zp-img-1 {
    width: 48%;
    height: 55%;
    top: 22%;
    left: 26%;
  }

  /* Image 2: top-left */
  .zp-img-2 {
    width: 22%;
    height: 28%;
    top: 8%;
    left: 4%;
  }

  /* Image 3: top-right tall */
  .zp-img-3 {
    width: 18%;
    height: 50%;
    top: 4%;
    right: 4%;
  }

  /* Image 4: center-right */
  .zp-img-4 {
    width: 22%;
    height: 28%;
    top: 32%;
    right: 10%;
  }

  /* Image 5: bottom-left */
  .zp-img-5 {
    width: 20%;
    height: 30%;
    bottom: 8%;
    left: 6%;
  }

  /* Image 6: bottom-center-left */
  .zp-img-6 {
    width: 24%;
    height: 26%;
    bottom: 4%;
    left: 28%;
  }

  /* Image 7: bottom-right */
  .zp-img-7 {
    width: 20%;
    height: 28%;
    bottom: 6%;
    right: 6%;
  }

  /* Overlay: slight vignette to blend edges */
  #zoom-parallax::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(13,24,39,0.6) 100%);
    pointer-events: none;
    z-index: 10;
  }
</style>

<section id="zoom-parallax">

  <div class="zp-image zp-img-1" data-zoom-rate="4">
    <img
      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=720&fit=crop"
      alt="CRM dashboard"
      loading="lazy"
    />
  </div>

  <div class="zp-image zp-img-2" data-zoom-rate="5">
    <img
      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&fit=crop"
      alt="Analytics"
      loading="lazy"
    />
  </div>

  <div class="zp-image zp-img-3" data-zoom-rate="6">
    <img
      src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=800&fit=crop"
      alt="Metrics"
      loading="lazy"
    />
  </div>

  <div class="zp-image zp-img-4" data-zoom-rate="5">
    <img
      src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1280&h=720&fit=crop"
      alt="CRM pipeline"
      loading="lazy"
    />
  </div>

  <div class="zp-image zp-img-5" data-zoom-rate="6">
    <img
      src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=800&fit=crop"
      alt="Pipeline view"
      loading="lazy"
    />
  </div>

  <div class="zp-image zp-img-6" data-zoom-rate="8">
    <img
      src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1280&h=720&fit=crop"
      alt="Sales view"
      loading="lazy"
    />
  </div>

  <div class="zp-image zp-img-7" data-zoom-rate="9">
    <img
      src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1280&h=720&fit=crop"
      alt="Automation"
      loading="lazy"
    />
  </div>

</section>
```

- [ ] **Step 12.2: Verify in Chrome**

Expected:
- Full-viewport dark section with 7 positioned screenshot images
- Scrolling through the section: each image scales up at its own rate (zoom-rate 4–9)
- Images farther from center scale faster (more dramatic zoom)
- Radial vignette overlay blends the edges
- No JS errors in console

- [ ] **Step 12.3: Commit**

```bash
git add sections/09-zoom-parallax.html
git commit -m "feat: add section 09 — zoom parallax with 7 images at variable scale rates"
```

---

### Task 13: 10-testimonials.html

**Files:**
- Create: `sections/10-testimonials.html`

---

- [ ] **Step 13.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 10: Testimonials
  GHL: paste into Custom Code block.
  Requires: global.css, global.js loaded site-wide.
  global.js provides: initVideoModal() for video thumbnails.
  Note: compass-video-modal div is defined ONCE in section 05.
    If section 05 is not on the page, duplicate the modal div here.
  ============================================================ -->

<style>
  #testimonials {
    background: var(--white);
    padding: 96px 0;
    overflow: hidden;
  }

  /* ── Video testimonials row ── */
  .test-video-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    max-width: 900px;
    margin: 0 auto 64px;
    padding: 0 24px;
  }

  .test-video-card {
    border-radius: var(--radius-lg);
    overflow: hidden;
    position: relative;
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    aspect-ratio: 16 / 9;
    background: var(--dark);
  }

  .test-video-card:hover {
    transform: scale(1.03);
    box-shadow: var(--shadow-lg);
  }

  .test-video-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
    transition: opacity 0.25s ease;
  }

  .test-video-card:hover img {
    opacity: 0.65;
  }

  .test-video-play {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .test-play-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(255,255,255,0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
  }

  .test-video-card:hover .test-play-icon {
    transform: scale(1.1);
  }

  .test-play-icon svg {
    width: 22px;
    height: 22px;
    color: var(--navy);
    margin-left: 3px;
  }

  .test-video-meta {
    text-align: center;
  }

  .test-video-name {
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 700;
    color: #fff;
  }

  .test-video-role {
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: rgba(255,255,255,0.6);
  }

  /* ── Infinite scroll columns ── */
  .test-cols-wrapper {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 0 24px;
    max-width: 1100px;
    margin: 0 auto;
    /* Fade top and bottom */
    mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
    height: 600px;
    overflow: hidden;
  }

  .test-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Duplicate content for seamless loop */
  .test-col-inner {
    display: flex;
    flex-direction: column;
    gap: 20px;
    animation: column-scroll linear infinite;
    will-change: transform;
  }

  .test-col:nth-child(1) .test-col-inner { animation-duration: 15s; }
  .test-col:nth-child(2) .test-col-inner { animation-duration: 19s; animation-direction: reverse; }
  .test-col:nth-child(3) .test-col-inner { animation-duration: 17s; }

  /* Hide col 2 on mobile, col 3 on tablet */
  @media (max-width: 900px) {
    .test-col:nth-child(3) { display: none; }
    .test-cols-wrapper { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 600px) {
    .test-col:nth-child(2) { display: none; }
    .test-cols-wrapper { grid-template-columns: 1fr; }
    .test-video-row { grid-template-columns: 1fr; }
  }

  /* Testimonial card */
  .test-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 24px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    position: relative;
  }

  .test-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
  }

  .test-quote {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: var(--dark);
    line-height: 1.65;
    margin-bottom: 20px;
  }

  .test-quote::before {
    content: '\201C';
    font-size: 2rem;
    color: var(--light-blue);
    line-height: 0;
    vertical-align: -0.6em;
    margin-right: 4px;
  }

  .test-author {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .test-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--blue), var(--light-blue));
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-headline);
    font-size: 0.875rem;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
  }

  .test-name {
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--dark);
  }

  .test-role {
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: var(--text-muted);
  }
</style>

<section id="testimonials" class="compass-section" style="padding:96px 0;">
  <div class="compass-container">
    <div class="compass-section-header" data-animate>
      <div class="compass-badge" style="margin:0 auto 16px;">Customer Stories</div>
      <h2>What Our Customers Say</h2>
      <p>Businesses just like yours are closing more deals with Compass.</p>
    </div>
  </div>

  <!-- Video testimonials -->
  <div class="test-video-row" data-animate>
    <div
      class="test-video-card"
      data-video-trigger="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
      role="button"
      tabindex="0"
      aria-label="Watch Suzy Crawford testimonial"
    >
      <img
        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=450&fit=crop"
        alt="Suzy Crawford testimonial thumbnail"
        loading="lazy"
      />
      <div class="test-video-play">
        <div class="test-play-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div class="test-video-meta">
          <div class="test-video-name">Suzy Crawford</div>
          <div class="test-video-role">CEO, Crawford Digital Media</div>
        </div>
      </div>
    </div>

    <div
      class="test-video-card"
      data-video-trigger="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
      role="button"
      tabindex="0"
      aria-label="Watch Jonathan Kroll testimonial"
    >
      <img
        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop"
        alt="Jonathan Kroll testimonial thumbnail"
        loading="lazy"
      />
      <div class="test-video-play">
        <div class="test-play-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div class="test-video-meta">
          <div class="test-video-name">Jonathan Kroll</div>
          <div class="test-video-role">Executive Director</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 3-column infinite scroll cards -->
  <div class="test-cols-wrapper">

    <!-- Column 1 (15s) -->
    <div class="test-col">
      <div class="test-col-inner">
        <!-- Set 1 -->
        <div class="test-card">
          <p class="test-quote">I highly recommend Chart Room to any business looking to elevate their marketing efforts. It truly delivers results.</p>
          <div class="test-author">
            <div class="test-avatar">VD</div>
            <div>
              <div class="test-name">Vaidehi Desai</div>
              <div class="test-role">D&amp;S Entertainment</div>
            </div>
          </div>
        </div>
        <div class="test-card">
          <p class="test-quote">I wholeheartedly recommend Chart Room to anyone seeking top-tier expertise, prompt delivery, and a collaborative experience that goes above and beyond.</p>
          <div class="test-author">
            <div class="test-avatar">BV</div>
            <div>
              <div class="test-name">Brooke Vulinovich</div>
              <div class="test-role">Social Club Community</div>
            </div>
          </div>
        </div>
        <div class="test-card">
          <p class="test-quote">Chart Room hooked me up with an amazing onboarding package! The automations and templates made it easy to just plug and play — saved me so much time.</p>
          <div class="test-author">
            <div class="test-avatar">LR</div>
            <div>
              <div class="test-name">Lexi Rector</div>
              <div class="test-role">Archer Growth Marketing</div>
            </div>
          </div>
        </div>
        <!-- Set 2 (duplicate for seamless loop) -->
        <div class="test-card">
          <p class="test-quote">I highly recommend Chart Room to any business looking to elevate their marketing efforts. It truly delivers results.</p>
          <div class="test-author">
            <div class="test-avatar">VD</div>
            <div>
              <div class="test-name">Vaidehi Desai</div>
              <div class="test-role">D&amp;S Entertainment</div>
            </div>
          </div>
        </div>
        <div class="test-card">
          <p class="test-quote">I wholeheartedly recommend Chart Room to anyone seeking top-tier expertise, prompt delivery, and a collaborative experience that goes above and beyond.</p>
          <div class="test-author">
            <div class="test-avatar">BV</div>
            <div>
              <div class="test-name">Brooke Vulinovich</div>
              <div class="test-role">Social Club Community</div>
            </div>
          </div>
        </div>
        <div class="test-card">
          <p class="test-quote">Chart Room hooked me up with an amazing onboarding package! The automations and templates made it easy to just plug and play — saved me so much time.</p>
          <div class="test-author">
            <div class="test-avatar">LR</div>
            <div>
              <div class="test-name">Lexi Rector</div>
              <div class="test-role">Archer Growth Marketing</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Column 2 (19s reverse — duplicated content per spec) -->
    <div class="test-col">
      <div class="test-col-inner">
        <div class="test-card">
          <p class="test-quote">Chart Room hooked me up with an amazing onboarding package! The automations and templates made it easy to just plug and play — saved me so much time.</p>
          <div class="test-author">
            <div class="test-avatar">LR</div>
            <div>
              <div class="test-name">Lexi Rector</div>
              <div class="test-role">Archer Growth Marketing</div>
            </div>
          </div>
        </div>
        <div class="test-card">
          <p class="test-quote">I highly recommend Chart Room to any business looking to elevate their marketing efforts. It truly delivers results.</p>
          <div class="test-author">
            <div class="test-avatar">VD</div>
            <div>
              <div class="test-name">Vaidehi Desai</div>
              <div class="test-role">D&amp;S Entertainment</div>
            </div>
          </div>
        </div>
        <div class="test-card">
          <p class="test-quote">I wholeheartedly recommend Chart Room to anyone seeking top-tier expertise, prompt delivery, and a collaborative experience that goes above and beyond.</p>
          <div class="test-author">
            <div class="test-avatar">BV</div>
            <div>
              <div class="test-name">Brooke Vulinovich</div>
              <div class="test-role">Social Club Community</div>
            </div>
          </div>
        </div>
        <!-- Duplicate -->
        <div class="test-card">
          <p class="test-quote">Chart Room hooked me up with an amazing onboarding package! The automations and templates made it easy to just plug and play — saved me so much time.</p>
          <div class="test-author">
            <div class="test-avatar">LR</div>
            <div>
              <div class="test-name">Lexi Rector</div>
              <div class="test-role">Archer Growth Marketing</div>
            </div>
          </div>
        </div>
        <div class="test-card">
          <p class="test-quote">I highly recommend Chart Room to any business looking to elevate their marketing efforts. It truly delivers results.</p>
          <div class="test-author">
            <div class="test-avatar">VD</div>
            <div>
              <div class="test-name">Vaidehi Desai</div>
              <div class="test-role">D&amp;S Entertainment</div>
            </div>
          </div>
        </div>
        <div class="test-card">
          <p class="test-quote">I wholeheartedly recommend Chart Room to anyone seeking top-tier expertise, prompt delivery, and a collaborative experience that goes above and beyond.</p>
          <div class="test-author">
            <div class="test-avatar">BV</div>
            <div>
              <div class="test-name">Brooke Vulinovich</div>
              <div class="test-role">Social Club Community</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Column 3 (17s — duplicated content per spec) -->
    <div class="test-col">
      <div class="test-col-inner">
        <div class="test-card">
          <p class="test-quote">I wholeheartedly recommend Chart Room to anyone seeking top-tier expertise, prompt delivery, and a collaborative experience that goes above and beyond.</p>
          <div class="test-author">
            <div class="test-avatar">BV</div>
            <div>
              <div class="test-name">Brooke Vulinovich</div>
              <div class="test-role">Social Club Community</div>
            </div>
          </div>
        </div>
        <div class="test-card">
          <p class="test-quote">Chart Room hooked me up with an amazing onboarding package! The automations and templates made it easy to just plug and play — saved me so much time.</p>
          <div class="test-author">
            <div class="test-avatar">LR</div>
            <div>
              <div class="test-name">Lexi Rector</div>
              <div class="test-role">Archer Growth Marketing</div>
            </div>
          </div>
        </div>
        <div class="test-card">
          <p class="test-quote">I highly recommend Chart Room to any business looking to elevate their marketing efforts. It truly delivers results.</p>
          <div class="test-author">
            <div class="test-avatar">VD</div>
            <div>
              <div class="test-name">Vaidehi Desai</div>
              <div class="test-role">D&amp;S Entertainment</div>
            </div>
          </div>
        </div>
        <!-- Duplicate -->
        <div class="test-card">
          <p class="test-quote">I wholeheartedly recommend Chart Room to anyone seeking top-tier expertise, prompt delivery, and a collaborative experience that goes above and beyond.</p>
          <div class="test-author">
            <div class="test-avatar">BV</div>
            <div>
              <div class="test-name">Brooke Vulinovich</div>
              <div class="test-role">Social Club Community</div>
            </div>
          </div>
        </div>
        <div class="test-card">
          <p class="test-quote">Chart Room hooked me up with an amazing onboarding package! The automations and templates made it easy to just plug and play — saved me so much time.</p>
          <div class="test-author">
            <div class="test-avatar">LR</div>
            <div>
              <div class="test-name">Lexi Rector</div>
              <div class="test-role">Archer Growth Marketing</div>
            </div>
          </div>
        </div>
        <div class="test-card">
          <p class="test-quote">I highly recommend Chart Room to any business looking to elevate their marketing efforts. It truly delivers results.</p>
          <div class="test-author">
            <div class="test-avatar">VD</div>
            <div>
              <div class="test-name">Vaidehi Desai</div>
              <div class="test-role">D&amp;S Entertainment</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>
```

- [ ] **Step 13.2: Verify in Chrome**

Expected:
- Video thumbnails row: 2 cards with thumbnail image, play button, name/role overlay
- Clicking either video: opens modal (requires `compass-video-modal` div from section 05 to be on the page)
- 3-column infinite scroll: columns scroll at different speeds (15s, 19s reverse, 17s)
- Column 2 hidden on mobile; Column 3 hidden on tablet
- Top/bottom fade via mask-image
- Card hover: lifts 8px with deeper shadow

- [ ] **Step 13.3: Commit**

```bash
git add sections/10-testimonials.html
git commit -m "feat: add section 10 — testimonials with video thumbnails and 3-col infinite scroll"
```

---

## End of Chunk 3

**Next:** Chunk 4 covers Sections 11–14, `index.html` assembly, and Vercel deployment.
See: `docs/superpowers/plans/2026-03-16-compass-site-chunk-4.md`
