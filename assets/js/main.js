/* AVHS IB Hub — shared JS
   Keep this lightweight. No frameworks. */

(function () {
  'use strict';

  // ---------- Mobile nav toggle ----------
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close ✕' : 'Menu ☰';
    });

    // Close menu when a link is clicked (mobile)
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 880) {
          menu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.textContent = 'Menu ☰';
        }
      });
    });
  }

  // ---------- Mark current page in nav ----------
  function markCurrent() {
    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-menu a').forEach(function (a) {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (href === here || (here === '' && href === 'index.html')) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  // ---------- Smooth-scroll for in-page anchors ----------
  function smoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        const id = a.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  // ---------- Lightweight language toggle ----------
  // Hides/shows .lang-en / .lang-es blocks. Default: show both side-by-side
  // via .bilingual containers; toggle gives a one-language reading mode.
  function initLang() {
    const btn = document.querySelector('[data-lang-toggle]');
    if (!btn) return;
    const KEY = 'avhs_ib_lang';
    const root = document.documentElement;

    function apply(mode) {
      root.setAttribute('data-lang', mode);
      btn.textContent = mode === 'es' ? 'English ↔' : 'Español ↔';
      btn.setAttribute('aria-pressed', mode === 'es' ? 'true' : 'false');
    }

    let saved = 'both';
    try { saved = localStorage.getItem(KEY) || 'both'; } catch (_) {}
    apply(saved);

    btn.addEventListener('click', function () {
      const cur = root.getAttribute('data-lang') || 'both';
      const next = cur === 'es' ? 'both' : (cur === 'en' ? 'es' : 'en');
      try { localStorage.setItem(KEY, next); } catch (_) {}
      apply(next);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    markCurrent();
    smoothAnchors();
    initLang();
  });
})();
