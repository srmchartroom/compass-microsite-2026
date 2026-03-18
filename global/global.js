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
        const inner = overlay && overlay.querySelector('.compass-modal-inner');
        if (!overlay || !inner) return;

        // Remove any existing media element
        const existing = inner.querySelector('iframe, video');
        if (existing) existing.remove();

        if (videoUrl.match(/\.mp4(\?|$)/i)) {
          const vid = document.createElement('video');
          vid.src = videoUrl;
          vid.controls = true;
          vid.autoplay = true;
          vid.style.cssText = 'width:100%;height:100%;display:block;background:#000;';
          inner.appendChild(vid);
        } else {
          const iframe = document.createElement('iframe');
          iframe.src = videoUrl;
          iframe.allow = 'autoplay; encrypted-media';
          iframe.allowFullscreen = true;
          iframe.title = 'Video';
          iframe.style.cssText = 'width:100%;height:100%;border:none;display:block;';
          inner.appendChild(iframe);
        }

        overlay.classList.add('is-open');
      });
    });

    function closeModal() {
      const overlay = document.getElementById('compass-video-modal');
      if (!overlay) return;
      const media = overlay.querySelector('iframe, video');
      if (media) media.remove();
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
    const image = container.parentElement ? container.parentElement.querySelector('.feature-image') : null;
    const DURATION = 15000;
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
        const isPortrait = items[index] && items[index].dataset.portrait;
        if (src) {
          image.style.opacity = '0';
          setTimeout(() => {
            image.src = src;
            image.style.objectFit = isPortrait ? 'contain' : 'cover';
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
