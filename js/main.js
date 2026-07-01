/* =============================================
   MAIN.JS – Apex Pain Clinic v2
   Handles:
   1. Mobile nav toggle
   2. Scroll-triggered fade-in animations (IntersectionObserver)
   3. Active nav link detection
   4. Contact form – async Formspree submission
   ============================================= */

(function () {
  'use strict';

  /* ---- 1. MOBILE NAV TOGGLE ---- */
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
      });
    });

    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- 2. SCROLL-TRIGGERED FADE-IN ---- */
  const animTargets = document.querySelectorAll(
    '.service-card, .doctor-card, .teaser__inner, .about-mission, ' +
    '.stats-band__grid, .contact__grid, .section__header, .page-banner'
  );

  if ('IntersectionObserver' in window) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      animTargets.forEach(function (el) {
        el.classList.add('fade-up');
      });

      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      animTargets.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  /* ---- 3. ACTIVE NAV LINK ---- */
  // aria-current="page" is set in HTML on inner pages.
  // Homepage has no dedicated nav link, so nothing extra needed.

  /* ---- 4. CONTACT FORM – ASYNC FORMSPREE ---- */
  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const successEl = document.getElementById('form-success');
  const errorEl   = document.getElementById('form-error');

  if (form && submitBtn) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Basic HTML5 validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      if (successEl) successEl.hidden = true;
      if (errorEl)   errorEl.hidden   = true;

      try {
        const response = await fetch(form.action, {
          method:  'POST',
          headers: { 'Accept': 'application/json' },
          body:    new FormData(form)
        });

        if (response.ok) {
          // Success
          form.reset();
          if (successEl) successEl.hidden = false;
          submitBtn.textContent = 'Sent!';
          submitBtn.disabled = false;
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        // Error
        if (errorEl) errorEl.hidden = false;
        submitBtn.textContent = 'Send Request';
        submitBtn.disabled = false;
      }
    });
  }

})();
