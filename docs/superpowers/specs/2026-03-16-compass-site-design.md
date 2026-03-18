# Compass Site — Design Specification
**Date:** 2026-03-16
**Project:** compass-site (Vercel deployment → GHL code blocks)
**Status:** Draft — Pending Client Content Confirmation

---

## Overview

A full redesign of compass-os.ai as a beautiful, animated vanilla HTML/CSS/JS website. Built using **Approach B**: a shared CSS/JS foundation loaded once via GHL global site settings, with each page section as a self-contained GHL code block. Deployed to Vercel for preview/approval before pasting into GoHighLevel.

**Brand:** Compass by Chart Room
**Product:** CRM + marketing automation SaaS (GoHighLevel-based)
**Tagline:** "Convert More Leads Into Sales"

**Brand relationship:** Compass is a product of Chart Room. Legal documents (Privacy Policy, T&C, License) are hosted under the parent brand Wyndi AI at wyndi.ai. This is intentional — not an error.

---

## Tech Stack

- **Vanilla HTML / CSS / JS** — no framework, no React runtime
- **Deployment:** Vercel (preview + approval)
- **Target platform:** GoHighLevel code blocks
- **Animations:** CSS keyframes + vanilla JS IntersectionObserver + scroll events
- **Fonts:** Google Fonts CDN — `Bricolage Grotesque` (headlines) + `Figtree` (body)
- **Browser targets:** Modern evergreen browsers (Chrome 90+, Firefox 90+, Safari 14+, Edge 90+)

---

## Brand Tokens

```css
--navy:        #1f355b;   /* primary brand dark */
--blue:        #3d60a0;   /* primary brand mid */
--light-blue:  #859ac1;   /* accent / muted */
--cream:       #eef3fa;   /* light background */
--white:       #ffffff;
--dark:        #0d1827;   /* near-black text */
--text-muted:  #5a7090;   /* body / secondary text */
--border:      rgba(61, 96, 160, 0.15);  /* utility: card borders */
```

---

## Asset References

| Asset | URL / Path |
|-------|-----------|
| Logo (light, for dark backgrounds) | `https://assets.cdn.filesafe.space/5KNcJcblwftDgsKpBJfp/media/685588248b2950e5056f625d.png` |
| Logo (dark, for light backgrounds) | `https://assets.cdn.filesafe.space/5KNcJcblwftDgsKpBJfp/media/68558801ac9458168baee31e.svg` |
| Platform tour video | ⚠️ URL TBD — use placeholder YouTube embed during preview |
| Video testimonial — Suzy Crawford | ⚠️ URL TBD — use placeholder during preview |
| Video testimonial — Jonathan Kroll | ⚠️ URL TBD — use placeholder during preview |

---

## File Structure

```
compass-site/
├── global/
│   ├── global.css          ← Paste into GHL > Site Settings > Custom CSS
│   └── global.js           ← Paste into GHL > Site Settings > Custom JS
├── sections/
│   ├── 01-announcement-bar.html
│   ├── 02-nav.html
│   ├── 03-hero.html
│   ├── 04-feature-highlights.html
│   ├── 05-platform-overview.html
│   ├── 06-industry-features.html
│   ├── 07-platforms-replaced.html
│   ├── 08-integrations.html
│   ├── 09-zoom-parallax.html
│   ├── 10-testimonials.html
│   ├── 11-pricing.html
│   ├── 12-faq.html
│   ├── 13-bottom-cta.html
│   └── 14-footer.html
└── index.html              ← Full preview (all sections assembled)
```

---

## GHL Loading Strategy

1. **Google Fonts `<link>` tag** → GHL Site Settings > Head Tracking Code
2. **`global.css`** → GHL Site Settings > Custom CSS (site-wide, loads before all pages)
3. **`global.js`** → GHL Site Settings > Custom JS (site-wide, loads on all pages)
4. **Each section file** → GHL page builder > Custom Code block (one block per section)

Section code blocks do **not** include `<link>` or `<script>` tags for the global files — they rely on GHL loading them site-wide. Each section uses CSS variables and JS functions defined in the global files.

---

## Global CSS Foundation (`global/global.css`)

Single source of truth for:

- CSS custom properties (brand tokens above)
- Google Fonts `<link>` tag goes in GHL Head Tracking Code only — **no `@import` in global.css** to avoid double-loading and FOUT flash
- Base reset and `box-sizing: border-box`
- Typography scale (h1–h6, body, label, badge) using Bricolage Grotesque + Figtree
- Animation keyframes:
  - `aurora-drift` — slow background-position shift (hero background)
  - `shine-sweep` — radial gradient traversal (card border shine)
  - `marquee-scroll` — infinite horizontal translate (logo cloud)
  - `column-scroll` — infinite vertical translate (testimonial columns)
  - `accordion-open` / `accordion-close` — max-height + opacity
  - `loading-dots` — staggered opacity bounce
  - `fade-slide-up` — section entry animation
  - `shimmer` — background-position sweep (announcement bar)
  - `moving-border` — background-position traversal simulating border glow movement
  - *(No `count-up` keyframe — stat counting is handled entirely by JS DOM text mutation; see global.js)*
- Shared utility classes: `.compass-section`, `.compass-container`, `.compass-badge`, `.compass-btn-primary`, `.compass-btn-ghost`, `.compass-card`

## Global JS (`global/global.js`)

- **IntersectionObserver** — adds `.is-visible` class to all `[data-animate]` elements as they enter viewport (triggers fade-slide-up)
- **Scroll shrink nav** — adds `.scrolled` class to `#compass-nav` after 60px scroll
- **Stat counter** — animates integers from 0 to target value when `.stat-val[data-count]` enters viewport
- **Dock magnify** — proximity-based CSS scale on `.dock-item` elements via `mousemove` event
- **Parallax driver** — updates `--scroll-y` CSS custom property on `scroll` event (used by zoom parallax section)
- **Accordion** — toggles `.is-open` on `.faq-item`, closes others (single-open mode)
- **Marquee pause on hover** — sets `animation-play-state: paused` on `.marquee-track` hover, then slows via CSS variable
- **3D scroll tilt** — updates `--tilt-progress` CSS variable based on scroll position within `#platform-overview` section bounds

---

## Section Specifications

### 01 — Announcement Bar
- Dismissable pill banner, fixed top of page, z-index above nav
- Text: *"New: AI Appointment Booking is now live — Learn More →"*
- "Learn More →" links to `#platform-overview` section anchor
- Background: `--navy` with shimmer sweep animation across pill width
- Animated gear icons appear on hover (translate in from offscreen, rotate 360°)
- X button dismisses bar; dismissed state stored in `sessionStorage` (key: `compass-bar-dismissed`)
- When visible, pushes nav down by bar height; when dismissed, nav snaps to top smoothly

### 02 — Nav
- Logo: dark SVG version (`68558801ac9458168baee31e.svg`), 104px height default
- Links: Overview · Features · Pricing · Testimonials · Login
- Each link: underline slides in from left on hover
- CTA: "Schedule a Demo" — Moving Border button (animated light chasing perimeter via `background-position` on a conic-gradient)
- CTA links to `#bottom-cta` section anchor
- **Scroll behavior:** After 60px scroll — logo shrinks to 72px height, nav gets `backdrop-filter: blur(12px)` + semi-transparent `--navy` background (CSS transition, 0.3s ease)
- **Mobile (< 768px):** Hamburger icon replaces nav links; click opens slide-down drawer with vertical links; animated X closes drawer; clicking any nav link inside the drawer also closes it

### 03 — Hero
- **Logo:** Light version (`685588248b2950e5056f625d.png`) centered above headline, 200px height
- **Background:** Aurora effect — two layers of `repeating-linear-gradient` in brand blues (`--navy`, `--blue`, `--light-blue`, `--cream`) animated with `aurora-drift` keyframe (60s infinite linear). Dot grid overlay (`radial-gradient` 1px dots, `rgba(61,96,160,0.12)`, 28px grid). Radial vignette at bottom fades to white.
- **Announcement badge:** Inline pill — *"AI-Powered CRM & Automation Platform"* in `--blue` with dot prefix
- **Headline:** `Convert More Leads Into Sales` — Bricolage Grotesque, 900 weight, `clamp(2.5rem, 6vw, 5rem)`, letter-spacing -3px
- **Subheadline:** *"Chart Room helps you capture, nurture, and close leads on autopilot through SMS, Email, Live Chat, Phone Calls, and more."*
- **CTAs:** Moving Border "Get Started — $197/mo" → `#pricing` anchor; Ghost "Watch Overview →" → `#platform-overview` anchor
- **Stats row** (JS count-up on entry for numeric values; static text for non-numeric):
  - `80` + `%` — Response Rate *(count up: 0→80)*
  - `7` + `×` — Follow-up Channels *(count up: 0→7)*
  - `24/7` — Automation *(static text, no count-up)*
  - `100` + `+` — Integrations *(count up: 0→100)*
- **Entry sequence:** Loading-dots (`...`) shows for 800ms on page load, then fades out; hero badge fades in (delay 0.1s), headline (0.2s), subheadline (0.4s), CTAs (0.6s), stats (0.8s)
- **Scroll indicator:** Animated chevron bounce at section bottom, fades out after first scroll

### 04 — Feature Highlights
- Section heading: *"Everything You Need To Convert More Leads"*
- 5 cards in CSS grid: 3-col top row, 2-col centered bottom row (desktop); single column (mobile)
- Card content:
  1. **SPEED** — *"Double Your Speed to Lead"* — Stop missing conversations. Streamline all communication in one place.
  2. **CALENDAR** — *"Instantly Fill Your Calendar"* — Say goodbye to missed sales opportunities. Compass schedules appointments automatically.
  3. **CALLS** — *"Drive More Phone Calls"* — Automatically route calls and convert inbound leads to sales opportunities.
  4. **SMART** — *"Build Smart Nurture Campaigns"* — Get up to 80% response rate with SMART automation across multiple channels.
  5. **PERFORMANCE** — *"Gain Key Performance Insights"* — See how your campaigns and sales team are performing in real time.
- Each card: inline SVG icon (lightning bolt, calendar, phone, sparkles, chart), keyword label in `--blue`, headline, body
- **Shine border on hover:** `before` pseudo-element with `radial-gradient` sweeping around perimeter using `shine-sweep` keyframe
- Cards enter with `fade-slide-up` staggered (0.1s per card)

### 05 — Platform Overview
- Section heading: *"See Compass in Action"*
- **3D ContainerScroll effect** (vanilla JS):
  - On scroll through this section, `--tilt-progress` goes 0→1
  - Product dashboard screenshot: `transform: perspective(1000px) rotateX(calc(20deg * (1 - var(--tilt-progress))))` + `scale(calc(0.95 + 0.05 * var(--tilt-progress)))`
  - Box shadow reduces as tilt progress increases (landing effect)
  - Placeholder image: Unsplash dashboard/SaaS screenshot until real screenshot provided
- **Video Thumbnail Player** (below 3D image):
  - Thumbnail with play button overlay
  - Click opens modal with YouTube embed (`?autoplay=1`)
  - Placeholder: YouTube embed URL TBD; use `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1` during preview
  - ESC key closes modal; click outside modal closes modal

### 06 — Industry Features
- Section heading: *"Industry Leading Features"*
- **Both Option A and Option B are built in `index.html` preview.** A toggle button at top of section switches between them. Client selects one; the other is removed before GHL deployment. The selected option is implemented as `06-industry-features.html`.
- **Option A — Auto-cycling features:**
  - Left: list of 9 features, each with icon, title, description, animated progress bar (10s per feature, auto-advances, clickable to jump)
  - Right: feature screenshot/illustration fades in on feature change
  - Progress gradient uses `--blue` → `--light-blue`
- **Option B — Hover slideshow:**
  - 9 feature names stacked, large type, character-by-character text stagger on hover (characters slide up, replacement slides in from below)
  - Right: image clip-path reveals from top on hover
- **9 Features:**
  1. 7-Channel Automated Follow Up
  2. AI Appointment Booking
  3. Live Call Transfer
  4. Communication Center
  5. Mobile App
  6. Team Management
  7. Lead Round Robin
  8. Advanced Reporting
  9. Seamless Integration

### 07 — Platforms Replaced
- Section heading: *"What Does Compass Replace?"*
- Subheading: *"One platform that consolidates the tools you're already paying for — saving thousands per year."*
- **Bento grid** (3-col desktop, 2-col tablet, 1-col mobile)
- **Provisional platform list** (build with this list; client to confirm or revise):
  1. Calendly → Scheduling & Calendar Booking
  2. Mailchimp → Email Marketing
  3. HubSpot / Salesforce → CRM & Pipeline
  4. ClickFunnels → Funnels & Landing Pages
  5. Twilio → SMS & Calling
  6. ActiveCampaign → Automation Workflows
  7. WordPress → Websites
  8. Zendesk → Support & Chat
  9. SurveyMonkey → Surveys & Forms
  10. Kajabi → Courses & Memberships
  11. ManyChat → Messenger Bots
  12. Stripe Billing → Payments & Invoicing
- Each card: platform name + category + Compass replacement value
- **Hover effect:** Card lifts + green checkmark badge reveals: *"✓ Included in Compass"*
- Dot grid background on section

### 08 — Integrations
- Section heading: *"Seamless Integration With 100+ Tools"*
- Subheading: *"Integrate Compass with tools you already love — with custom integrations and Zapier."*
- **Two-row infinite marquee:** Row 1 scrolls left; Row 2 scrolls right
- **Logo list** (use SVG logos from svgl.app or text fallbacks):
  Stripe · QuickBooks · Facebook · Instagram · LinkedIn · TikTok · Google · Zapier · Zoom · Slack · Google Calendar · Twilio · Mailgun · SendGrid · PayPal · Shopify · WordPress · Calendly · ActiveCampaign · Salesforce · HubSpot + more
- Logos fade at edges via `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`
- On hover: marquee slows to ~25% speed (CSS variable `--marquee-duration` updated via JS)

### 09 — Zoom Parallax
- Full-width visual break section, no text, dark background (`--dark`)
- **7 platform screenshot images** at fixed positions, each with different scroll scale rate:
  - Image 1 (center, large): scale 1→4
  - Image 2 (top-left): scale 1→5
  - Image 3 (top-right, tall): scale 1→6
  - Image 4 (center-right): scale 1→5
  - Image 5 (bottom-left): scale 1→6
  - Image 6 (bottom-center-left): scale 1→8
  - Image 7 (bottom-right): scale 1→9
- Scale driven by `--scroll-y` CSS variable updated by global.js; `useTransform` equivalent via JS lerp on scroll
- Use these Unsplash placeholder images until platform screenshots are provided:
  - `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=720&fit=crop` (dashboard)
  - `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&fit=crop` (analytics)
  - `https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=800&fit=crop` (metrics)
  - `https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1280&h=720&fit=crop` (CRM)
  - `https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=800&fit=crop` (pipeline)
  - `https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1280&h=720&fit=crop` (sales)
  - `https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1280&h=720&fit=crop` (automation)
- Final images: platform screenshots to be provided by client; swap by updating `src` in `09-zoom-parallax.html`

### 10 — Testimonials
- Section heading: *"What Our Customers Say"*
- **Video testimonials row** (above text cards):
  - 2 video thumbnail cards side by side (Suzy Crawford, CEO Crawford Digital Media · Jonathan Kroll, Executive Director)
  - Each: thumbnail image, play button overlay, title/name, click opens YouTube modal
  - Placeholder thumbnails from Unsplash until real thumbnails provided
- **3-column infinite scroll cards** (below video row):
  - Column 1 (15s): Vaidehi Desai, Brooke Vulinovich, Lexi Rector
  - Column 2 (19s, hidden on mobile): same 3 testimonials as Column 1, duplicated for visual continuity (no unique content required)
  - Column 3 (17s, hidden on tablet): same 3 testimonials duplicated again
  - Cards: white background, rounded corners, quote text, avatar, name, role, company
  - Hover: card lifts, shadow deepens
  - Columns fade at top and bottom via `mask-image`
- **Testimonial content** (from existing site):
  - *"I highly recommend Chart Room to any business looking to elevate their marketing efforts. It truly delivers results."* — Vaidehi Desai, D&S Entertainment
  - *"I wholeheartedly recommend Chart Room to anyone seeking top-tier expertise, prompt delivery, and a collaborative experience that goes above and beyond expectations."* — Brooke Vulinovich, Social Club Community
  - *"Chart Room hooked me up with an amazing onboarding package! The automations and templates made it easy to just plug and play which saved me so much time."* — Lexi Rector, Archer Growth Marketing
  - Additional cards: duplicated/extended from above for visual continuity

### 11 — Pricing
- Section heading: *"Plans For Businesses of All Sizes"*
- Subheading: *"All plans include: 24/7 Chat Support · Landing Pages · Scheduling Tools · Messaging · Unlimited Contacts"*
- **5-tier comparison grid:**

| Tier | Price | Sub-users |
|------|-------|-----------|
| Basic | $197/mo | 3 |
| Essential | $297/mo | 5 |
| Established | $397/mo | 10 — **"Most Popular" badge** |
| Executive | $497/mo | Unlimited |
| Enterprise | Custom Pricing | Unlimited |

- **Feature matrix rows** (✓ = included, — = not included):

| Feature | Basic | Essential | Established | Executive | Enterprise |
|---------|-------|-----------|-------------|-----------|------------|
| Smart Notifications | ✓ | ✓ | ✓ | ✓ | ✓ |
| Automation Campaigns | ✓ | ✓ | ✓ | ✓ | ✓ |
| Push Notifications | ✓ | ✓ | ✓ | ✓ | ✓ |
| Reputation Management | ✓ | ✓ | ✓ | ✓ | ✓ |
| Web Chat Bot | — | ✓ | ✓ | ✓ | ✓ |
| Pipeline Management | — | ✓ | ✓ | ✓ | ✓ |
| Team Calendars | — | — | ✓ | ✓ | ✓ |
| Email Marketing | — | — | ✓ | ✓ | ✓ |
| Funnels & Workflows | — | — | ✓ | ✓ | ✓ |
| Marketing Suite | — | — | — | ✓ | ✓ |
| Community & Membership | — | — | — | ✓ | ✓ |
| Courses & Webinars | — | — | — | ✓ | ✓ |
| White Label | — | — | — | — | ✓ |

- **Established column:** highlighted border in `--blue`, "Most Popular" badge, slightly elevated card
- **Enterprise CTA:** "Contact Us" button → links to `#bottom-cta` section anchor
- All other tiers: "Get Started Today" → links to GHL checkout (placeholder `#` during preview)
- Horizontal scroll on mobile (`overflow-x: auto`), sticky first column (feature names)
- Cards tilt subtly on hover (2deg max, CSS perspective)
- Additional usage footnote: *"Text $0.015 · Email $0.004 · Local Number $3.00 · Local Minutes $0.05 · Toll-Free Number $5.00"*

### 12 — FAQ
- Section heading: *"Frequently Asked Questions"*
- 7 accordion items (single-open at a time):
  1. *What platforms and software does Compass replace?* — Answer covers consolidation of calendaring, email, funnels, CRM, pipeline management
  2. *What kind of support do you provide?* — 24/7 email & chat, 0–3 min response avg, guided tours, tutorial library
  3. *How do I get started?* — Sign up via Get Started buttons, free demo available, white-glove onboarding
  4. *How secure is my customer data?* — Compliance with governing laws, 2FA, off-site hosting, data privacy since 2021
  5. *How does your automation work?* — SMS, Email, Web Chat, Phone, Calendar on autopilot; smart campaigns
  6. *Can I cancel my account at any time?* — Yes, no contracts, cancel anytime
  7. *What platforms do you integrate with?* — Stripe, QuickBooks, Facebook, Instagram, LinkedIn, TikTok, Google, Zapier + 2000+ via Zapier
- Each item: HelpCircle icon + question + ChevronDown (rotates 180° on open)
- Answer: smooth max-height + opacity transition, MessageCircle icon in corner
- Items stagger fade-slide-up on section entry

### 13 — Bottom CTA
- Section id: `bottom-cta`
- Full-width section, aurora glow background (same keyframe as hero at 60% opacity)
- Section heading: *"Ready To Close More Deals?"*
- Subheading: *"Join hundreds of businesses already using Compass to capture, nurture, and close."*
- **Two animated CTA cards side by side** (stack vertically on mobile):
  - **Left — Get Started:**
    - Moving border effect (animated glow chasing perimeter)
    - Headline: *"Start Today"*
    - Price: *"$197 / month"* (large, bold)
    - Body: *"No contracts. Cancel anytime. White-glove onboarding included."*
    - CTA button: "Get Started Now →" → GHL checkout (placeholder `#` during preview)
  - **Right — Schedule a Demo:**
    - Ghost moving border (lighter glow)
    - Headline: *"See It Live"*
    - Body: *"Book a free demo. Ask anything. See exactly how Compass fits your business."*
    - CTA button: "Schedule a Demo →" → GHL calendar booking (placeholder `#` during preview)
- Cards float up 8px on hover with shadow
- Section has subtle dot grid overlay

### 14 — Footer
- **Oversized "COMPASS" typographic treatment:** `font-family: Bricolage Grotesque`, `clamp(3rem, 12vw, 10rem)`, bold, `background: linear-gradient(to bottom, rgba(31,53,91,0.25), transparent)`, `background-clip: text`, positioned absolutely behind footer content
- **Floating logo icon:** Dark logo SVG in rounded card (border, backdrop-blur), centered, positioned above brand name
- **Social animated dock:** Mac-style magnifying dock with icons for: Facebook · Instagram · LinkedIn · Twitter/X · YouTube (URLs: placeholders `#` during preview; client to supply)
- **Brand links row:** Chart Room Creative (chartroomcreative.com) · Chart Room Local (chartroomlocal.com) · Wyndi AI (wyndi.ai) — hover underline slide-in
- **Nav links:** Features · Pricing · Testimonials · Login
- **Legal links:**
  - Privacy Policy → `https://wyndi.ai/wyndi-privacy-policy`
  - Terms & Conditions → `https://wyndi.ai/wyndi-terms-conditions`
  - License → `https://wyndi.ai/wyndi-license`
- **Copyright:** *"© 2026 Chart Room. All rights reserved."*
- **Sticky scroll technique:** Footer uses a wrapper div with `position: relative; height: 70vh; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)`. Inside is a second div with `position: relative; height: calc(100vh + 70vh); top: -100vh`. The footer element inside is `position: sticky; top: calc(100vh - 70vh)`. This creates the effect of the footer "sliding up" from beneath the preceding section as the user scrolls to the bottom — not a simple `position: sticky` on the footer itself.

---

## Scroll & Micro-interaction Inventory

| Trigger | Element | Effect |
|---------|---------|--------|
| Page load | Hero content | Loading dots 800ms → staggered fade-slide-up per element |
| Scroll into viewport | All `[data-animate]` elements | `.is-visible` class → `fade-slide-up` CSS animation |
| Scroll into viewport | `.stat-val[data-count]` | Integer count-up from 0 to target |
| Scroll into viewport | Feature cards | Staggered fade-slide-up (0.1s per card) |
| Scroll into viewport | FAQ items | Staggered fade-slide-up |
| Scroll into viewport | Pricing cards | Staggered fade-slide-up |
| Scroll position | `#compass-nav` | Shrinks logo + adds backdrop blur at 60px |
| Scroll position | `#platform-overview` | 3D tilt progress: `rotateX(20deg→0)` |
| Scroll position | `#zoom-parallax` | `--scroll-y` drives per-image scale transforms |
| Scroll position | Footer | Sticky reveal from bottom |
| Hover | Feature cards | Lift 4px + shine border sweep animation |
| Hover | Pricing cards | 2deg 3D tilt (CSS perspective) |
| Hover | Nav links | Underline slides in from left |
| Hover | Footer links | Underline slides in from left |
| Hover | Dock icons | Proximity-based scale magnify (JS mousemove) |
| Hover | Logo marquee | Slows to 25% speed |
| Hover | Testimonial cards | Lift 8px + shadow deepens |
| Hover | CTA cards (section 13) | Float up 8px |
| Hover | Platforms Replaced cards | Lift + checkmark badge reveals |
| Hover | Video thumbnails | Scale 1.03 + shadow |
| Hover | Announcement bar | Gear icons animate in |
| Click | Video thumbnail | Modal opens with YouTube embed |
| Click | Modal backdrop / ESC | Modal closes |
| Click | FAQ trigger | Accordion open/close (single-open) |
| Click | Announcement bar X | Dismisses, persists in `sessionStorage` |
| Click | Mobile nav hamburger | Slide-down drawer opens |
| Click | Mobile nav X | Drawer closes |
| Click | Mobile nav link (inside drawer) | Drawer closes + scrolls to anchor |

---

## Open Questions (Require Client Input Before Final Deployment)

| # | Question | Impact |
|---|----------|--------|
| 1 | Industry Features: Option A (auto-cycling) or Option B (hover slideshow)? | Section 06 final file |
| 2 | Font pairing confirmation: Bricolage Grotesque + Figtree? | Global CSS |
| 3 | YouTube URL: Platform tour video | Section 05 |
| 4 | YouTube URL: Suzy Crawford video testimonial | Section 10 |
| 5 | YouTube URL: Jonathan Kroll video testimonial | Section 10 |
| 6 | Social links: Facebook, Instagram, LinkedIn, Twitter/X, YouTube URLs | Section 14 |
| 7 | Platforms Replaced: confirm or revise the 12-platform provisional list | Section 07 |
| 8 | GHL checkout URLs for "Get Started" buttons | Sections 11, 13 |
| 9 | GHL calendar booking URL for "Schedule a Demo" | Sections 02, 13 |

**All open items use placeholder values during Vercel preview. None block the build.**
