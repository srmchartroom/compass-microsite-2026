# Compass Site — Implementation Plan: Chunk 4
# Sections 11–14, index.html Assembly, and Vercel Deployment

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Sections 11–14, assemble the full preview in `index.html`, and deploy to Vercel.

**Prerequisites:** Chunks 1–3 complete (all global files and sections 01–10 exist).

**Spec:** `docs/superpowers/specs/2026-03-16-compass-site-design.md`

---

## Chunk 4: Sections 11–14 + Assembly + Deploy

### Task 14: 11-pricing.html

**Files:**
- Create: `sections/11-pricing.html`

5-tier pricing grid. Desktop: full comparison table. Mobile: horizontal scroll with sticky first column.

---

- [ ] **Step 14.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 11: Pricing
  GHL: paste into Custom Code block.
  Requires: global.css loaded site-wide.
  ============================================================ -->

<style>
  #pricing {
    background: var(--cream);
    padding: 96px 0;
  }

  /* Pricing cards row */
  .pricing-cards {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    margin-bottom: 40px;
  }

  .pricing-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px 20px;
    text-align: center;
    position: relative;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    /* 3D tilt on hover via perspective container */
    transform-style: preserve-3d;
  }

  .pricing-card:hover {
    transform: translateY(-4px) perspective(600px) rotateX(-2deg);
    box-shadow: var(--shadow-md);
  }

  /* Established — featured tier */
  .pricing-card.is-featured {
    border: 2px solid var(--blue);
    box-shadow: 0 0 0 4px rgba(61,96,160,0.08);
  }

  .pricing-card.is-featured:hover {
    transform: translateY(-6px) perspective(600px) rotateX(-2deg);
    box-shadow: var(--shadow-lg), 0 0 0 4px rgba(61,96,160,0.12);
  }

  .pricing-badge {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 14px;
    background: var(--blue);
    color: #fff;
    font-family: var(--font-body);
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-radius: var(--radius-pill);
    white-space: nowrap;
  }

  .pricing-tier {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--light-blue);
    margin-bottom: 12px;
  }

  .pricing-price {
    font-family: var(--font-headline);
    font-size: 2rem;
    font-weight: 900;
    color: var(--dark);
    letter-spacing: -0.04em;
    margin-bottom: 4px;
  }

  .pricing-price span {
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-muted);
    letter-spacing: 0;
  }

  .pricing-sub-users {
    font-family: var(--font-body);
    font-size: 0.8125rem;
    color: var(--text-muted);
    margin-bottom: 20px;
  }

  .pricing-cta {
    display: block;
    width: 100%;
    padding: 11px 16px;
    background: var(--navy);
    color: #fff;
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    transition: background 0.2s ease;
  }

  .pricing-cta:hover {
    background: var(--blue);
  }

  .pricing-cta.is-outline {
    background: transparent;
    border: 1.5px solid var(--border);
    color: var(--dark);
  }

  .pricing-cta.is-outline:hover {
    border-color: var(--blue);
    color: var(--blue);
    background: rgba(61,96,160,0.04);
  }

  /* ── Feature matrix ── */
  .pricing-matrix-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
  }

  .pricing-matrix {
    width: 100%;
    min-width: 700px;
    border-collapse: collapse;
    font-family: var(--font-body);
    font-size: 0.875rem;
  }

  .pricing-matrix th {
    font-family: var(--font-headline);
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--dark);
    letter-spacing: -0.01em;
    padding: 14px 16px;
    text-align: center;
    background: var(--cream);
    border-bottom: 2px solid var(--border);
    white-space: nowrap;
  }

  .pricing-matrix th:first-child {
    text-align: left;
    position: sticky;
    left: 0;
    background: var(--cream);
    z-index: 2;
    min-width: 180px;
  }

  /* Highlight Established column */
  .pricing-matrix th.col-featured,
  .pricing-matrix td.col-featured {
    background: rgba(61,96,160,0.05);
  }

  .pricing-matrix td {
    padding: 12px 16px;
    text-align: center;
    border-bottom: 1px solid var(--border);
    color: var(--text-muted);
  }

  .pricing-matrix td:first-child {
    text-align: left;
    font-weight: 600;
    color: var(--dark);
    position: sticky;
    left: 0;
    background: #fff;
    z-index: 1;
  }

  .pricing-matrix tr:last-child td {
    border-bottom: none;
  }

  .pricing-matrix tr:nth-child(even) td { background: rgba(238,243,250,0.5); }
  .pricing-matrix tr:nth-child(even) td.col-featured { background: rgba(61,96,160,0.07); }
  .pricing-matrix tr:nth-child(even) td:first-child { background: rgba(238,243,250,0.5); }

  .check { color: var(--blue); font-weight: 700; font-size: 1rem; }
  .dash  { color: rgba(133,154,193,0.5); font-size: 1.25rem; }

  /* Usage footnote */
  .pricing-footnote {
    margin-top: 24px;
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: var(--text-muted);
    text-align: center;
    line-height: 1.8;
  }

  @media (max-width: 900px) {
    .pricing-cards {
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
  }

  @media (max-width: 600px) {
    .pricing-cards {
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .pricing-price { font-size: 1.5rem; }
  }
</style>

<section id="pricing" class="compass-section" style="padding:96px 0;">
  <div class="compass-container">
    <div class="compass-section-header" data-animate>
      <div class="compass-badge" style="margin:0 auto 16px;">Pricing</div>
      <h2>Plans For Businesses of All Sizes</h2>
      <p>All plans include: 24/7 Chat Support · Landing Pages · Scheduling Tools · Messaging · Unlimited Contacts</p>
    </div>

    <!-- Pricing cards -->
    <div class="pricing-cards">

      <div class="pricing-card" data-animate data-animate-delay="0ms">
        <div class="pricing-tier">Basic</div>
        <div class="pricing-price">$197<span>/mo</span></div>
        <div class="pricing-sub-users">3 sub-users</div>
        <a class="pricing-cta" href="#">Get Started Today</a>
      </div>

      <div class="pricing-card" data-animate data-animate-delay="80ms">
        <div class="pricing-tier">Essential</div>
        <div class="pricing-price">$297<span>/mo</span></div>
        <div class="pricing-sub-users">5 sub-users</div>
        <a class="pricing-cta" href="#">Get Started Today</a>
      </div>

      <div class="pricing-card is-featured" data-animate data-animate-delay="160ms">
        <div class="pricing-badge">Most Popular</div>
        <div class="pricing-tier">Established</div>
        <div class="pricing-price">$397<span>/mo</span></div>
        <div class="pricing-sub-users">10 sub-users</div>
        <a class="pricing-cta" href="#">Get Started Today</a>
      </div>

      <div class="pricing-card" data-animate data-animate-delay="240ms">
        <div class="pricing-tier">Executive</div>
        <div class="pricing-price">$497<span>/mo</span></div>
        <div class="pricing-sub-users">Unlimited sub-users</div>
        <a class="pricing-cta" href="#">Get Started Today</a>
      </div>

      <div class="pricing-card" data-animate data-animate-delay="320ms">
        <div class="pricing-tier">Enterprise</div>
        <div class="pricing-price" style="font-size:1.25rem;letter-spacing:-0.01em;">Custom<br>Pricing</div>
        <div class="pricing-sub-users">Unlimited sub-users</div>
        <a class="pricing-cta is-outline" href="#bottom-cta">Contact Us</a>
      </div>

    </div>

    <!-- Feature matrix -->
    <div class="pricing-matrix-wrap" data-animate>
      <table class="pricing-matrix" role="table" aria-label="Feature comparison">
        <thead>
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">Basic</th>
            <th scope="col">Essential</th>
            <th scope="col" class="col-featured">Established</th>
            <th scope="col">Executive</th>
            <th scope="col">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Smart Notifications</td>     <td><span class="check">✓</span></td><td><span class="check">✓</span></td><td class="col-featured"><span class="check">✓</span></td><td><span class="check">✓</span></td><td><span class="check">✓</span></td></tr>
          <tr><td>Automation Campaigns</td>    <td><span class="check">✓</span></td><td><span class="check">✓</span></td><td class="col-featured"><span class="check">✓</span></td><td><span class="check">✓</span></td><td><span class="check">✓</span></td></tr>
          <tr><td>Push Notifications</td>      <td><span class="check">✓</span></td><td><span class="check">✓</span></td><td class="col-featured"><span class="check">✓</span></td><td><span class="check">✓</span></td><td><span class="check">✓</span></td></tr>
          <tr><td>Reputation Management</td>   <td><span class="check">✓</span></td><td><span class="check">✓</span></td><td class="col-featured"><span class="check">✓</span></td><td><span class="check">✓</span></td><td><span class="check">✓</span></td></tr>
          <tr><td>Web Chat Bot</td>             <td><span class="dash">—</span></td><td><span class="check">✓</span></td><td class="col-featured"><span class="check">✓</span></td><td><span class="check">✓</span></td><td><span class="check">✓</span></td></tr>
          <tr><td>Pipeline Management</td>     <td><span class="dash">—</span></td><td><span class="check">✓</span></td><td class="col-featured"><span class="check">✓</span></td><td><span class="check">✓</span></td><td><span class="check">✓</span></td></tr>
          <tr><td>Team Calendars</td>           <td><span class="dash">—</span></td><td><span class="dash">—</span></td><td class="col-featured"><span class="check">✓</span></td><td><span class="check">✓</span></td><td><span class="check">✓</span></td></tr>
          <tr><td>Email Marketing</td>          <td><span class="dash">—</span></td><td><span class="dash">—</span></td><td class="col-featured"><span class="check">✓</span></td><td><span class="check">✓</span></td><td><span class="check">✓</span></td></tr>
          <tr><td>Funnels &amp; Workflows</td>  <td><span class="dash">—</span></td><td><span class="dash">—</span></td><td class="col-featured"><span class="check">✓</span></td><td><span class="check">✓</span></td><td><span class="check">✓</span></td></tr>
          <tr><td>Marketing Suite</td>          <td><span class="dash">—</span></td><td><span class="dash">—</span></td><td class="col-featured"><span class="dash">—</span></td><td><span class="check">✓</span></td><td><span class="check">✓</span></td></tr>
          <tr><td>Community &amp; Membership</td><td><span class="dash">—</span></td><td><span class="dash">—</span></td><td class="col-featured"><span class="dash">—</span></td><td><span class="check">✓</span></td><td><span class="check">✓</span></td></tr>
          <tr><td>Courses &amp; Webinars</td>   <td><span class="dash">—</span></td><td><span class="dash">—</span></td><td class="col-featured"><span class="dash">—</span></td><td><span class="check">✓</span></td><td><span class="check">✓</span></td></tr>
          <tr><td>White Label</td>              <td><span class="dash">—</span></td><td><span class="dash">—</span></td><td class="col-featured"><span class="dash">—</span></td><td><span class="dash">—</span></td><td><span class="check">✓</span></td></tr>
        </tbody>
      </table>
    </div>

    <p class="pricing-footnote" data-animate>
      Additional usage fees apply: Text $0.015 · Email $0.004 · Local Number $3.00 · Local Minutes $0.05 · Toll-Free Number $5.00
    </p>
  </div>
</section>
```

- [ ] **Step 14.2: Verify in Chrome**

Expected:
- 5 pricing cards in a row; "Established" has blue border, "Most Popular" badge, and elevated shadow
- Enterprise card shows "Contact Us" outline button → `#bottom-cta`
- Feature matrix: 13 rows, Established column highlighted, sticky first column (feature names)
- On mobile/tablet: pricing cards wrap to 2-col; matrix scrolls horizontally while feature names stay pinned
- Cards have subtle 3D tilt on hover (perspective + rotateX)

- [ ] **Step 14.3: Verify feature matrix data matches spec exactly**

Cross-check every ✓ and — in the table against the spec's feature matrix. There are 13 features × 5 tiers = 65 cells. Confirm no row is missing and no value is transposed.

- [ ] **Step 14.4: Commit**

```bash
git add sections/11-pricing.html
git commit -m "feat: add section 11 — pricing 5-tier comparison grid with feature matrix"
```

---

### Task 15: 12-faq.html

**Files:**
- Create: `sections/12-faq.html`

---

- [ ] **Step 15.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 12: FAQ
  GHL: paste into Custom Code block.
  Requires: global.css, global.js loaded site-wide.
  global.js provides: initAccordion() — watches #faq-accordion,
    toggles .is-open on .faq-item, sets .faq-body maxHeight.
  ============================================================ -->

<style>
  #faq {
    background: #fff;
    padding: 96px 0;
  }

  .faq-list {
    max-width: 760px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .faq-item {
    border-bottom: 1px solid var(--border);
    overflow: hidden;
  }

  .faq-item:first-child {
    border-top: 1px solid var(--border);
  }

  .faq-trigger {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 22px 0;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: color 0.2s ease;
  }

  .faq-trigger:hover {
    color: var(--blue);
  }

  .faq-trigger-icon {
    width: 20px;
    height: 20px;
    color: var(--light-blue);
    flex-shrink: 0;
  }

  .faq-trigger-text {
    flex: 1;
    font-family: var(--font-headline);
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--dark);
    letter-spacing: -0.01em;
    transition: color 0.2s ease;
  }

  .faq-trigger:hover .faq-trigger-text {
    color: var(--blue);
  }

  .faq-chevron {
    width: 18px;
    height: 18px;
    color: var(--light-blue);
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  .faq-item.is-open .faq-chevron {
    transform: rotate(180deg);
  }

  /* Answer body — controlled by JS maxHeight */
  .faq-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease;
  }

  .faq-body-inner {
    padding: 0 34px 24px;
    position: relative;
  }

  .faq-answer {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: var(--text-muted);
    line-height: 1.7;
  }

  /* MessageCircle icon in corner */
  .faq-body-icon {
    position: absolute;
    bottom: 16px;
    right: 0;
    width: 18px;
    height: 18px;
    color: rgba(133,154,193,0.35);
  }
</style>

<section id="faq" class="compass-section" style="padding:96px 0;">
  <div class="compass-container">
    <div class="compass-section-header" data-animate>
      <div class="compass-badge" style="margin:0 auto 16px;">FAQ</div>
      <h2>Frequently Asked Questions</h2>
    </div>

    <div class="faq-list" id="faq-accordion">

      <div class="faq-item" data-animate data-animate-delay="0ms">
        <button class="faq-trigger">
          <!-- HelpCircle icon -->
          <svg class="faq-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span class="faq-trigger-text">What platforms and software does Compass replace?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-body">
          <div class="faq-body-inner">
            <p class="faq-answer">Compass replaces a wide range of standalone tools by consolidating them into one platform: calendaring (Calendly), email marketing (Mailchimp), CRM and pipeline management (HubSpot, Salesforce), funnel builders (ClickFunnels), SMS and calling (Twilio), automation workflows (ActiveCampaign), and more. Most businesses save thousands per year by switching.</p>
            <svg class="faq-body-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
        </div>
      </div>

      <div class="faq-item" data-animate data-animate-delay="60ms">
        <button class="faq-trigger">
          <svg class="faq-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span class="faq-trigger-text">What kind of support do you provide?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-body">
          <div class="faq-body-inner">
            <p class="faq-answer">All Compass plans include 24/7 email and live chat support with an average response time of 0–3 minutes. You'll also get access to guided onboarding tours, a full tutorial library, and a dedicated Chart Room success team to help you get up and running fast.</p>
            <svg class="faq-body-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
        </div>
      </div>

      <div class="faq-item" data-animate data-animate-delay="120ms">
        <button class="faq-trigger">
          <svg class="faq-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span class="faq-trigger-text">How do I get started?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-body">
          <div class="faq-body-inner">
            <p class="faq-answer">Simply click any "Get Started" button to choose your plan and create your account. You can also schedule a free demo with our team — we'll walk you through the platform, answer your questions, and help you see exactly how Compass fits your business. White-glove onboarding is included with every plan.</p>
            <svg class="faq-body-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
        </div>
      </div>

      <div class="faq-item" data-animate data-animate-delay="180ms">
        <button class="faq-trigger">
          <svg class="faq-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span class="faq-trigger-text">How secure is my customer data?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-body">
          <div class="faq-body-inner">
            <p class="faq-answer">Compass is fully compliant with applicable data privacy laws and has maintained rigorous data security practices since 2021. All accounts include two-factor authentication, and customer data is hosted off-site on enterprise-grade infrastructure with regular security audits.</p>
            <svg class="faq-body-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
        </div>
      </div>

      <div class="faq-item" data-animate data-animate-delay="240ms">
        <button class="faq-trigger">
          <svg class="faq-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span class="faq-trigger-text">How does your automation work?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-body">
          <div class="faq-body-inner">
            <p class="faq-answer">Compass runs SMART campaigns across SMS, Email, Web Chat, Phone, and Calendar — all on autopilot. You build your workflows once using our visual automation builder, then let the system engage leads at the right time on the right channel. Average response rates reach 80% with multi-channel follow-up sequences.</p>
            <svg class="faq-body-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
        </div>
      </div>

      <div class="faq-item" data-animate data-animate-delay="300ms">
        <button class="faq-trigger">
          <svg class="faq-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span class="faq-trigger-text">Can I cancel my account at any time?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-body">
          <div class="faq-body-inner">
            <p class="faq-answer">Yes. Compass has no long-term contracts. You can cancel your account at any time — no penalties, no questions asked. We're confident that once you see the results, you'll want to stay.</p>
            <svg class="faq-body-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
        </div>
      </div>

      <div class="faq-item" data-animate data-animate-delay="360ms">
        <button class="faq-trigger">
          <svg class="faq-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span class="faq-trigger-text">What platforms do you integrate with?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-body">
          <div class="faq-body-inner">
            <p class="faq-answer">Compass natively integrates with Stripe, QuickBooks, Facebook, Instagram, LinkedIn, TikTok, Google, and Zapier. Through Zapier, you can connect Compass to 2,000+ additional tools — meaning it fits into virtually any existing tech stack.</p>
            <svg class="faq-body-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 15.2: Verify in Chrome**

Expected:
- 7 FAQ items, all collapsed by default
- Clicking any item: expands with smooth max-height transition, chevron rotates 180°
- Clicking another: previous closes, new one opens (single-open mode via `initAccordion()`)
- MessageCircle icon visible in bottom-right of open answer
- Items fade-slide-up on section entry with stagger

- [ ] **Step 15.3: Commit**

```bash
git add sections/12-faq.html
git commit -m "feat: add section 12 — FAQ accordion with 7 items, single-open mode"
```

---

### Task 16: 13-bottom-cta.html

**Files:**
- Create: `sections/13-bottom-cta.html`

---

- [ ] **Step 16.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 13: Bottom CTA
  GHL: paste into Custom Code block.
  Requires: global.css loaded site-wide.
  ============================================================ -->

<style>
  #bottom-cta {
    background: var(--dark);
    padding: 96px 0;
    position: relative;
    overflow: hidden;
  }

  /* Aurora glow at 60% opacity — same gradient + keyframe as hero, with opacity: 0.6 */
  #bottom-cta::before {
    content: '';
    position: absolute;
    inset: 0;
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
    opacity: 0.6;
    pointer-events: none;
  }

  /* Dot grid overlay */
  #bottom-cta::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(133,154,193,0.12) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }

  .cta-inner {
    position: relative;
    z-index: 1;
  }

  .cta-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .cta-header h2 {
    color: #fff;
    margin-bottom: 16px;
  }

  .cta-header p {
    color: rgba(255,255,255,0.55);
    font-size: 1.0625rem;
    max-width: 480px;
    margin: 0 auto;
  }

  .cta-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    max-width: 860px;
    margin: 0 auto;
  }

  /* Moving border card */
  .cta-card-wrap {
    padding: 3px;
    border-radius: var(--radius-lg);
    background: linear-gradient(
      var(--moving-angle, 0deg),
      var(--navy),
      var(--blue),
      var(--light-blue),
      var(--blue),
      var(--navy)
    );
    background-size: 300% 300%;
    animation: moving-border 5s ease infinite;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .cta-card-wrap:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px rgba(13,24,39,0.4);
  }

  /* Ghost moving border (lighter) */
  .cta-card-wrap.ghost {
    background: linear-gradient(
      var(--moving-angle, 0deg),
      rgba(31,53,91,0.6),
      rgba(61,96,160,0.6),
      rgba(133,154,193,0.6),
      rgba(61,96,160,0.6),
      rgba(31,53,91,0.6)
    );
    animation-duration: 7s;
  }

  .cta-card {
    background: rgba(13,24,39,0.88);
    border-radius: calc(var(--radius-lg) - 3px);
    padding: 36px 32px;
    height: 100%;
  }

  .cta-card-label {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--light-blue);
    margin-bottom: 16px;
  }

  .cta-card-headline {
    font-family: var(--font-headline);
    font-size: 1.75rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.03em;
    margin-bottom: 8px;
  }

  .cta-card-price {
    font-family: var(--font-headline);
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--light-blue);
    letter-spacing: -0.04em;
    margin-bottom: 16px;
    line-height: 1;
  }

  .cta-card-price span {
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0;
  }

  .cta-card-body {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: rgba(255,255,255,0.55);
    line-height: 1.65;
    margin-bottom: 28px;
  }

  .cta-card-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 13px 28px;
    background: var(--blue);
    color: #fff;
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: 0.9375rem;
    font-weight: 700;
    text-decoration: none;
    transition: background 0.2s ease;
  }

  .cta-card-btn:hover {
    background: var(--light-blue);
    color: var(--dark);
  }

  .cta-card-btn.ghost-btn {
    background: rgba(61,96,160,0.2);
    border: 1px solid rgba(133,154,193,0.3);
  }

  .cta-card-btn.ghost-btn:hover {
    background: rgba(61,96,160,0.35);
    color: #fff;
  }

  @media (max-width: 700px) {
    .cta-cards { grid-template-columns: 1fr; }
  }
</style>

<section id="bottom-cta" class="compass-section" style="padding:96px 0;">
  <div class="compass-container cta-inner">
    <div class="cta-header" data-animate>
      <div class="compass-badge" style="margin:0 auto 16px;background:rgba(133,154,193,0.15);border-color:rgba(133,154,193,0.3);color:rgba(255,255,255,0.8);">Get Started</div>
      <h2>Ready To Close More Deals?</h2>
      <p>Join hundreds of businesses already using Compass to capture, nurture, and close.</p>
    </div>

    <div class="cta-cards">

      <!-- Left: Get Started (solid moving border) -->
      <div class="cta-card-wrap" data-animate data-animate-delay="0ms">
        <div class="cta-card">
          <div class="cta-card-label">Start Today</div>
          <div class="cta-card-headline">Start Today</div>
          <div class="cta-card-price">$197 <span>/ month</span></div>
          <p class="cta-card-body">No contracts. Cancel anytime. White-glove onboarding included.</p>
          <a class="cta-card-btn" href="#">Get Started Now →</a>
        </div>
      </div>

      <!-- Right: Schedule Demo (ghost moving border) -->
      <div class="cta-card-wrap ghost" data-animate data-animate-delay="100ms">
        <div class="cta-card">
          <div class="cta-card-label">See It Live</div>
          <div class="cta-card-headline">See It Live</div>
          <p class="cta-card-body" style="margin-bottom:28px;margin-top:16px;">Book a free demo. Ask anything. See exactly how Compass fits your business.</p>
          <a class="cta-card-btn ghost-btn" href="#">Schedule a Demo →</a>
        </div>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 16.2: Verify in Chrome**

Expected:
- Dark section with aurora glow and dot grid overlay
- Two side-by-side cards with animated moving border glow (left: solid; right: lighter ghost)
- Hovering either card: floats up 8px with shadow
- Left card shows $197/mo price in light blue
- Right card has ghost-style button

- [ ] **Step 16.3: Commit**

```bash
git add sections/13-bottom-cta.html
git commit -m "feat: add section 13 — bottom CTA with two moving border cards"
```

---

### Task 17: 14-footer.html

**Files:**
- Create: `sections/14-footer.html`

The footer uses the sticky scroll-reveal technique: a wrapper div with `clip-path` and `position: relative`, containing a tall inner div, with the footer element `position: sticky` inside it.

---

- [ ] **Step 17.1: Write the section file**

```html
<!-- ============================================================
  COMPASS — Section 14: Footer
  GHL: paste as the LAST code block on the page.
  Requires: global.css, global.js loaded site-wide.
  global.js provides: initDockMagnify() — watches #compass-dock.
  Sticky scroll technique: wrapper clips overflow; inner div is tall;
    footer is sticky inside the inner div. Result: footer slides up
    from beneath the preceding section as user scrolls to bottom.
  ============================================================ -->

<style>
  /* ── Sticky footer wrapper technique ── */
  .footer-sticky-wrapper {
    position: relative;
    height: 70vh;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }

  .footer-sticky-inner {
    position: relative;
    height: calc(100vh + 70vh);
    top: -100vh;
  }

  #compass-footer {
    position: sticky;
    top: calc(100vh - 70vh);
    height: 70vh;
    background: var(--dark);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 48px 24px 36px;
    overflow: hidden;
  }

  /* Oversized COMPASS typographic treatment */
  .footer-bg-text {
    position: absolute;
    bottom: -0.1em;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-headline);
    font-size: clamp(3rem, 12vw, 10rem);
    font-weight: 900;
    letter-spacing: -0.04em;
    white-space: nowrap;
    background: linear-gradient(to bottom, rgba(31,53,91,0.25), transparent);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    pointer-events: none;
    user-select: none;
    line-height: 1;
  }

  /* Floating logo card */
  .footer-logo-card {
    border: 1px solid rgba(61,96,160,0.25);
    border-radius: var(--radius-lg);
    padding: 12px 20px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background: rgba(31,53,91,0.3);
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
  }

  .footer-logo-card img {
    height: 48px;
    width: auto;
    object-fit: contain;
    display: block;
  }

  /* Social dock */
  #compass-dock {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    padding: 10px 16px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radius-pill);
    margin-bottom: 32px;
    position: relative;
    z-index: 1;
  }

  .dock-item {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: rgba(255,255,255,0.65);
    font-size: 1rem;
    transition: background 0.2s ease, color 0.2s ease;
    /* transform set by initDockMagnify() */
  }

  .dock-item:hover {
    background: rgba(61,96,160,0.3);
    color: #fff;
  }

  /* Brand links row */
  .footer-brand-links {
    display: flex;
    gap: 28px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  /* Nav links */
  .footer-nav-links {
    display: flex;
    gap: 24px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  .footer-link {
    font-family: var(--font-body);
    font-size: 0.8125rem;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    position: relative;
    transition: color 0.2s ease;
  }

  .footer-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--light-blue);
    transition: width 0.25s ease;
  }

  .footer-link:hover {
    color: rgba(255,255,255,0.85);
  }

  .footer-link:hover::after {
    width: 100%;
  }

  .footer-brand-link {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(133,154,193,0.55);
  }

  .footer-brand-link:hover {
    color: var(--light-blue);
  }

  /* Legal + copyright */
  .footer-legal {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }

  .footer-legal a {
    font-family: var(--font-body);
    font-size: 0.6875rem;
    color: rgba(255,255,255,0.25);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer-legal a:hover {
    color: rgba(255,255,255,0.5);
  }

  .footer-copy {
    font-family: var(--font-body);
    font-size: 0.6875rem;
    color: rgba(255,255,255,0.2);
    text-align: center;
    position: relative;
    z-index: 1;
  }
</style>

<!-- Sticky wrapper — this wraps the entire footer for the slide-up effect -->
<div class="footer-sticky-wrapper">
  <div class="footer-sticky-inner">

    <footer id="compass-footer" role="contentinfo">

      <!-- Oversized background text -->
      <div class="footer-bg-text" aria-hidden="true">COMPASS</div>

      <!-- Floating logo card -->
      <!-- Light logo PNG: for use on dark backgrounds (footer bg is --dark) -->
      <div class="footer-logo-card">
        <img
          src="https://assets.cdn.filesafe.space/5KNcJcblwftDgsKpBJfp/media/685588248b2950e5056f625d.png"
          alt="Compass by Chart Room"
          width="200"
          height="48"
        />
      </div>

      <!-- Social dock -->
      <div id="compass-dock" role="list" aria-label="Social media links">
        <a class="dock-item" href="#" role="listitem" aria-label="Facebook" title="Facebook">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a class="dock-item" href="#" role="listitem" aria-label="Instagram" title="Instagram">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a class="dock-item" href="#" role="listitem" aria-label="LinkedIn" title="LinkedIn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a class="dock-item" href="#" role="listitem" aria-label="Twitter / X" title="Twitter / X">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a class="dock-item" href="#" role="listitem" aria-label="YouTube" title="YouTube">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--dark)"/></svg>
        </a>
      </div>

      <!-- Brand links -->
      <div class="footer-brand-links">
        <a class="footer-link footer-brand-link" href="https://chartroomcreative.com" target="_blank" rel="noopener">Chart Room Creative</a>
        <a class="footer-link footer-brand-link" href="https://chartroomlocal.com" target="_blank" rel="noopener">Chart Room Local</a>
        <a class="footer-link footer-brand-link" href="https://wyndi.ai" target="_blank" rel="noopener">Wyndi AI</a>
      </div>

      <!-- Nav links -->
      <div class="footer-nav-links">
        <a class="footer-link" href="#industry-features">Features</a>
        <a class="footer-link" href="#pricing">Pricing</a>
        <a class="footer-link" href="#testimonials">Testimonials</a>
        <a class="footer-link" href="#">Login</a>
      </div>

      <!-- Legal links -->
      <div class="footer-legal">
        <a href="https://wyndi.ai/wyndi-privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>
        <a href="https://wyndi.ai/wyndi-terms-conditions" target="_blank" rel="noopener">Terms &amp; Conditions</a>
        <a href="https://wyndi.ai/wyndi-license" target="_blank" rel="noopener">License</a>
      </div>

      <!-- Copyright -->
      <p class="footer-copy">© 2026 Chart Room. All rights reserved.</p>

    </footer>

  </div>
</div>
```

- [ ] **Step 17.2: Verify in Chrome**

Expected:
- Scrolling to bottom of page: footer "slides up" from beneath previous section (sticky wrapper effect)
- Oversized "COMPASS" text visible as a transparent background treatment
- Logo card floats above content in a blurred card
- Social dock: hovering icons — magnification scale increases toward cursor (initDockMagnify)
- All footer links have underline slide-in on hover
- Legal links open to wyndi.ai URLs in new tab
- Copyright reads "© 2026 Chart Room. All rights reserved."

- [ ] **Step 17.3: Commit**

```bash
git add sections/14-footer.html
git commit -m "feat: add section 14 — sticky-reveal footer with dock magnify and typographic COMPASS treatment"
```

---

### Task 18: index.html — Full Assembly

**Files:**
- Modify: `index.html`

Assemble all 14 sections into `index.html` for the Vercel preview.

---

- [ ] **Step 18.1: Write the complete index.html**

Replace the stub `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compass — Convert More Leads Into Sales</title>
  <meta name="description" content="Compass by Chart Room — AI-Powered CRM &amp; Marketing Automation. Capture, nurture, and close leads on autopilot.">
  <!-- Google Fonts — add this <link> to GHL > Site Settings > Head Tracking Code -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Figtree:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="global/global.css">
  <style>
    /* Preview-only: account for fixed nav + announcement bar */
    body { padding-top: 148px; }
  </style>
</head>
<body>

  <!-- ── Sections (each = one GHL Custom Code block) ── -->

  <!-- Section 01: Announcement Bar -->
  <!-- PASTE: sections/01-announcement-bar.html -->

  <!-- Section 02: Nav -->
  <!-- PASTE: sections/02-nav.html -->

  <!-- Section 03: Hero -->
  <!-- PASTE: sections/03-hero.html -->

  <!-- Section 04: Feature Highlights -->
  <!-- PASTE: sections/04-feature-highlights.html -->

  <!-- Section 05: Platform Overview -->
  <!-- PASTE: sections/05-platform-overview.html -->

  <!-- Section 06: Industry Features -->
  <!-- PASTE: sections/06-industry-features.html -->

  <!-- Section 07: Platforms Replaced -->
  <!-- PASTE: sections/07-platforms-replaced.html -->

  <!-- Section 08: Integrations -->
  <!-- PASTE: sections/08-integrations.html -->

  <!-- Section 09: Zoom Parallax -->
  <!-- PASTE: sections/09-zoom-parallax.html -->

  <!-- Section 10: Testimonials -->
  <!-- PASTE: sections/10-testimonials.html -->

  <!-- Section 11: Pricing -->
  <!-- PASTE: sections/11-pricing.html -->

  <!-- Section 12: FAQ -->
  <!-- PASTE: sections/12-faq.html -->

  <!-- Section 13: Bottom CTA -->
  <!-- PASTE: sections/13-bottom-cta.html -->

  <!-- Section 14: Footer -->
  <!-- PASTE: sections/14-footer.html -->

  <script src="global/global.js"></script>
</body>
</html>
```

- [ ] **Step 18.2: Replace comment placeholders with actual section content**

Run the following to inline each section file into `index.html`. Replace each comment block with the full content of the corresponding section file. Do this by reading each `sections/0X-*.html` file and inserting its full contents in place of the matching comment.

Expected final result: `index.html` contains all 14 sections' HTML inline, with `global/global.js` loaded at the bottom. The file will be large (1000–1500 lines) — that is expected.

- [ ] **Step 18.3: Open index.html in Chrome and do a full scroll-through**

Check list (work top to bottom):
- [ ] Announcement bar: visible, shimmer, gear icons on hover, dismiss works
- [ ] Nav: fixed at correct position, logo size, links, moving border CTA
- [ ] Hero: aurora background, loader, fade-in sequence, stat count-ups, chevron
- [ ] Feature highlights: 5 cards, 3+2 centered layout, shine on hover
- [ ] Platform overview: 3D tilt effect as you scroll, video modal on click
- [ ] Industry features: Option A cycles, progress bar advances, toggle to Option B
- [ ] Platforms replaced: 12 cards, hover checkmark badge
- [ ] Integrations: dual marquee scrolls, slows on hover
- [ ] Zoom parallax: 7 images scale at different rates on scroll
- [ ] Testimonials: video thumbnails, 3-col infinite scroll
- [ ] Pricing: 5 tiers, matrix table, horizontal scroll on narrow viewport
- [ ] FAQ: accordion opens/closes, single-open mode
- [ ] Bottom CTA: two moving border cards, floats on hover
- [ ] Footer: sticky reveal, dock magnify, all links correct

- [ ] **Step 18.4: Commit**

```bash
git add index.html
git commit -m "feat: assemble index.html — all 14 sections inlined for Vercel preview"
```

---

### Task 19: Deploy to Vercel

**Files:**
- No new files — deploys the existing project

---

- [ ] **Step 19.1: Run Vercel deployment**

```bash
npx vercel deploy --prod
```

Note: `./vercel deploy --prod` also works if the Vercel CLI was installed locally (see project history), but `npx` is the reliable cross-platform form.

- [ ] **Step 19.2: Confirm deployment URL**

Expected output includes a production URL (e.g., `https://compass-site.vercel.app`). Open the URL in Chrome.

- [ ] **Step 19.3: Verify live deployment**

Repeat the Step 18.3 scroll-through checklist on the live Vercel URL. Pay special attention to:
- Google Fonts loading (network tab should show font CDN requests)
- CSS variables resolved correctly (no unstyled text)
- All animations running (no fallback to un-animated state)
- Announce bar dismiss persists through page refresh (sessionStorage)

- [ ] **Step 19.4: Final commit (if any files remain unstaged)**

All section files and `index.html` were committed in prior steps. This step only applies if new files were created during deployment (e.g., `.vercel/project.json` updates). Do not use `git add .` — check `git status` first and stage only intentional changes:

```bash
git status
# Stage only if needed:
# git add .vercel/project.json
# git commit -m "chore: update vercel project config after prod deployment"
```

If `git status` shows a clean tree, no commit is needed.

---

## End of Chunk 4 — Implementation Plan Complete

All four chunk files are now complete:
- `docs/superpowers/plans/2026-03-16-compass-site-chunk-1.md` ✅
- `docs/superpowers/plans/2026-03-16-compass-site-chunk-2.md` ✅
- `docs/superpowers/plans/2026-03-16-compass-site-chunk-3.md` ✅
- `docs/superpowers/plans/2026-03-16-compass-site-chunk-4.md` ← this file

**To execute:** Use `superpowers:subagent-driven-development` skill.
Each task (Tasks 1–19) is an independent unit that can be assigned to a subagent.
