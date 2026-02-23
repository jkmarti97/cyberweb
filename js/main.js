/*
© 2026–Present Jeffery Martin.
Dual-licensed: Commercial license required for business use.
Apache 2.0 applies only if explicitly included.
No implied rights granted.
*/

/* ============================================================
   CyberClean™ — Main JS
   Nav scroll, mobile menu, scroll reveal
   ============================================================ */

(function () {
  'use strict';

  /* ── Nav scroll behavior ────────────────────────────────── */
  const nav = document.querySelector('.nav');

  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  if (nav) {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run once on load
  }

  /* ── Active nav link ────────────────────────────────────── */
  // Strip hash and query string from pathname before comparing
  var rawPage = window.location.pathname.split('/').pop() || 'index.html';
  var currentPage = rawPage.split('?')[0].split('#')[0] || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    // Strip hash from link href too (e.g. "services.html#module-1" → "services.html")
    var href = (link.getAttribute('href') || '').split('#')[0].split('?')[0];
    if (href === currentPage || (currentPage === 'index.html' && (href === '' || href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  /* ── Mobile hamburger menu ──────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  }

  /* ── Scroll reveal ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      // rootMargin triggers reveal 80px before element enters viewport — smoother feel
      { threshold: 0.08, rootMargin: '0px 0px -80px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── Contact form (Formspree AJAX) ──────────────────────── */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const statusEl  = document.getElementById('form-status');
      const submitBtn = contactForm.querySelector('[type="submit"]');
      const formData  = new FormData(contactForm);

      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sending…';

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          if (res.ok) {
            contactForm.reset();
            showStatus(statusEl, 'success', 'Message sent! We\'ll respond within 1 business day.');
          } else {
            return res.json().then(function (data) {
              throw new Error(data.error || 'Submission failed');
            });
          }
        })
        .catch(function (err) {
          showStatus(statusEl, 'error', 'Something went wrong. Please email us directly.');
          console.error('Form error:', err);
        })
        .finally(function () {
          submitBtn.disabled    = false;
          submitBtn.textContent = 'Send Message';
        });
    });
  }

  function showStatus(el, type, message) {
    if (!el) return;
    el.className   = 'form-status ' + type;
    el.textContent = message;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
})();
