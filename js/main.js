/* =============================================
   MAIN JS – Apex Pain Clinic v2
   ============================================= */

'use strict';

// --- Mobile Nav Toggle ---
const navToggle = document.querySelector('.nav__toggle');
const navLinks  = document.querySelector('.nav__links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });
}

// --- Sticky nav shadow on scroll ---
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? 'var(--shadow-md)'
      : 'var(--shadow-sm)';
  }, { passive: true });
}

// --- Appointment form demo submission ---
const appointmentForm = document.querySelector('#appointment-form');
const formSuccess = document.querySelector('#form-success');

if (appointmentForm && formSuccess) {
  appointmentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!appointmentForm.checkValidity()) {
      appointmentForm.reportValidity();
      return;
    }

    appointmentForm.reset();
    formSuccess.hidden = false;
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}
