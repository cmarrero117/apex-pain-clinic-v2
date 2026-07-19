/**
 * cms.js — Apex Pain Clinic
 * Fetches live content from the CMS-V1 API and injects it into all [data-cms] elements.
 * Falls back gracefully if the API is unreachable — page content remains as-is.
 * No dependencies. Runs after DOM is ready (loaded with defer).
 */

(function () {
  var CMS_API = 'https://cms-v1-flame.vercel.app/api/site-content/apex-pain-clinic';

  fetch(CMS_API)
    .then(function (res) {
      if (!res.ok) throw new Error('CMS API returned ' + res.status);
      return res.json();
    })
    .then(function (doc) {
      inject(buildFlatMap(doc));
    })
    .catch(function (err) {
      console.warn('[CMS] Could not load content from API:', err.message);
    });

  /**
   * Maps the CMS-V1 API document (camelCase structured fields)
   * to the flat data-cms keys used in the Apex HTML.
   */
  function buildFlatMap(d) {
    var map = {};

    // SEO / meta
    if (d.seoTitle)       map['seo-title']       = d.seoTitle;
    if (d.seoDescription) map['seo-description']  = d.seoDescription;

    // Hero
    if (d.heroHeadline)    map['hero-headline']    = d.heroHeadline;
    if (d.heroSubheadline) map['hero-subheadline'] = d.heroSubheadline;
    if (d.heroCtaText)     map['hero-cta']         = d.heroCtaText;
    if (d.heroCtaUrl)      map['hero-cta-url']     = d.heroCtaUrl;

    // Business name
    if (d.businessName)    map['business-name']    = d.businessName;

    // Services (array of up to 6)
    var serviceKeys = ['pain', 'scs', 'joint', 'nerve', 'prp', 'meds'];
    if (Array.isArray(d.services)) {
      d.services.forEach(function (svc, i) {
        var k = serviceKeys[i];
        if (!k) return;
        if (svc.title) map['service-title-' + k] = svc.title;
        if (svc.description) map['service-desc-' + k] = svc.description;
      });
    }

    // Contact
    if (d.contactAddress) {
      map['contact-address']        = d.contactAddress;
      map['contact-address-footer'] = d.contactAddress;
    }
    if (d.contactPhone) {
      map['contact-phone']        = d.contactPhone;
      map['contact-phone-footer'] = d.contactPhone;
    }
    if (d.contactEmail) {
      map['contact-email']        = d.contactEmail;
      map['contact-email-footer'] = d.contactEmail;
    }

    return map;
  }

  function inject(cfg) {
    // Text / innerHTML injection
    document.querySelectorAll('[data-cms]').forEach(function (el) {
      var key = el.getAttribute('data-cms');
      if (!(key in cfg)) return;
      var val = cfg[key];
      var tag = el.tagName.toLowerCase();

      if (tag === 'title') { document.title = val; return; }
      if (tag === 'meta')  { el.setAttribute('content', val); return; }

      el.innerHTML = val;
    });

    // href injection
    document.querySelectorAll('[data-cms-href]').forEach(function (el) {
      var key = el.getAttribute('data-cms-href');
      if (key in cfg) el.setAttribute('href', cfg[key]);
    });

    // tel: injection
    document.querySelectorAll('[data-cms-tel]').forEach(function (el) {
      var key = el.getAttribute('data-cms-tel');
      if (key in cfg) el.setAttribute('href', 'tel:' + cfg[key].replace(/\D/g, ''));
    });

    // mailto: injection
    document.querySelectorAll('[data-cms-mailto]').forEach(function (el) {
      var key = el.getAttribute('data-cms-mailto');
      if (key in cfg) el.setAttribute('href', 'mailto:' + cfg[key]);
    });
  }
})();
