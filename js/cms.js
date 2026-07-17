/**
 * cms.js — Apex Pain Clinic
 * Reads cms-config.json and injects content into all [data-cms] elements.
 * No dependencies. Runs after DOM is ready (loaded with defer).
 */

(function () {
  const CONFIG_URL = 'cms-config.json';

  fetch(CONFIG_URL)
    .then(function (res) {
      if (!res.ok) throw new Error('cms-config.json not found (' + res.status + ')');
      return res.json();
    })
    .then(function (cfg) {
      inject(cfg);
    })
    .catch(function (err) {
      console.warn('[CMS] Could not load cms-config.json:', err.message);
    });

  function inject(cfg) {
    // --- Text / innerHTML injection ---
    document.querySelectorAll('[data-cms]').forEach(function (el) {
      var key = el.getAttribute('data-cms');
      if (!(key in cfg)) return;
      var val = cfg[key];

      var tag = el.tagName.toLowerCase();

      // <title> and <meta> are special
      if (tag === 'title') {
        document.title = val;
        return;
      }
      if (tag === 'meta') {
        el.setAttribute('content', val);
        return;
      }

      // For everything else set innerHTML (supports <br> in addresses, etc.)
      el.innerHTML = val;
    });

    // --- href injection (links / CTAs) ---
    document.querySelectorAll('[data-cms-href]').forEach(function (el) {
      var key = el.getAttribute('data-cms-href');
      if (key in cfg) el.setAttribute('href', cfg[key]);
    });

    // --- tel: link injection ---
    document.querySelectorAll('[data-cms-tel]').forEach(function (el) {
      var key = el.getAttribute('data-cms-tel');
      if (key in cfg) el.setAttribute('href', 'tel:' + cfg[key].replace(/\D/g, ''));
    });

    // --- mailto: link injection ---
    document.querySelectorAll('[data-cms-mailto]').forEach(function (el) {
      var key = el.getAttribute('data-cms-mailto');
      if (key in cfg) el.setAttribute('href', 'mailto:' + cfg[key]);
    });
  }
})();
