/* =====================================================================
   Breathe Easy Heating & Air Conditioning — interactions
   Vanilla JS · no dependencies
   ===================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     1. Sticky header state
     --------------------------------------------------------------- */
  var header = doc.getElementById('site-header');
  var actionBar = doc.getElementById('action-bar');

  function onScroll() {
    var y = window.pageYOffset || root.scrollTop;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (actionBar) actionBar.classList.toggle('is-visible', y > 520 && window.innerWidth < 1000);
  }

  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(function () {
      onScroll();
      scrollTicking = false;
    });
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------
     2. Mobile menu
     --------------------------------------------------------------- */
  var menu = doc.getElementById('mobile-menu');
  var scrim = doc.getElementById('menu-scrim');
  var toggle = doc.getElementById('menu-toggle');
  var closeBtn = doc.getElementById('menu-close');
  var lastFocused = null;

  function openMenu() {
    if (!menu || !scrim || !toggle) return;
    lastFocused = doc.activeElement;
    menu.hidden = false;
    scrim.hidden = false;
    // allow the browser to paint before transitioning
    window.requestAnimationFrame(function () {
      menu.classList.add('is-open');
      scrim.classList.add('is-open');
    });
    toggle.setAttribute('aria-expanded', 'true');
    doc.body.classList.add('is-locked');
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeMenu() {
    if (!menu || !scrim || !toggle) return;
    menu.classList.remove('is-open');
    scrim.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    doc.body.classList.remove('is-locked');
    var hide = function () {
      if (!menu.classList.contains('is-open')) {
        menu.hidden = true;
        scrim.hidden = true;
      }
    };
    if (reduceMotion) hide(); else window.setTimeout(hide, 420);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus({ preventScroll: true });
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      if (open) closeMenu(); else openMenu();
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (scrim) scrim.addEventListener('click', closeMenu);

  if (menu) {
    menu.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link) closeMenu();
    });
  }

  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && !menu.hidden) closeMenu();
  });

  // close the menu if the viewport grows into the desktop layout
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1000 && menu && !menu.hidden) closeMenu();
  });

  /* ---------------------------------------------------------------
     3. Services: list drives the media panel
     --------------------------------------------------------------- */
  var serviceList = doc.getElementById('service-list');
  var panels = doc.querySelectorAll('.service-panel__img');
  var pointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (serviceList && panels.length) {
    var items = serviceList.querySelectorAll('.service-item');

    var setActive = function (index) {
      items.forEach(function (item) {
        item.classList.toggle('is-active', item.dataset.service === index);
      });
      panels.forEach(function (img) {
        img.classList.toggle('is-active', img.dataset.panel === index);
      });
    };

    items.forEach(function (item) {
      if (pointerFine) {
        item.addEventListener('mouseenter', function () { setActive(item.dataset.service); });
      }
      item.addEventListener('focusin', function () { setActive(item.dataset.service); });
      item.addEventListener('click', function () { setActive(item.dataset.service); });
    });
  }

  /* ---------------------------------------------------------------
     4. FAQ accordion
     --------------------------------------------------------------- */
  var accordion = doc.getElementById('accordion');

  if (accordion) {
    var triggers = accordion.querySelectorAll('.accordion__trigger');

    triggers.forEach(function (trigger) {
      var item = trigger.closest('.accordion__item');
      var panel = doc.getElementById(trigger.getAttribute('aria-controls'));

      if (!item || !panel) return;
      // remove the no-JS hidden attribute so panels can animate
      panel.hidden = false;

      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      item.classList.toggle('is-open', expanded);
      trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        triggers.forEach(function (other) {
          var otherItem = other.closest('.accordion__item');
          if (!otherItem) return;
          if (other !== trigger) {
            otherItem.classList.remove('is-open');
            other.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('is-open', !isOpen);
        trigger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      });
    });
  }

  /* ---------------------------------------------------------------
     5. Review slider
     --------------------------------------------------------------- */
  var slider = doc.getElementById('review-slider');
  var dotsWrap = doc.getElementById('slider-dots');
  var prevBtn = doc.querySelector('[data-slide="prev"]');
  var nextBtn = doc.querySelector('[data-slide="next"]');

  if (slider && prevBtn && nextBtn) {
    var cards = slider.querySelectorAll('.quote-card');
    var dots = [];

    function step() {
      if (!cards.length) return slider.clientWidth;
      var cardW = cards[0].getBoundingClientRect().width;
      var gap = parseFloat(getComputedStyle(slider).columnGap || getComputedStyle(slider).gap) || 12;
      return cardW + gap;
    }

    function pages() {
      return Math.max(1, Math.ceil((slider.scrollWidth - slider.clientWidth) / step()) + 1);
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      dots = [];
      var total = pages();
      for (var i = 0; i < total; i++) {
        var dot = doc.createElement('span');
        dots.push(dot);
        dotsWrap.appendChild(dot);
      }
      paint();
    }

    function paint() {
      var max = slider.scrollWidth - slider.clientWidth;
      var x = slider.scrollLeft;
      prevBtn.disabled = x <= 2;
      nextBtn.disabled = x >= max - 2;

      if (!dots.length) return;
      var index = Math.round(x / step());
      if (index > dots.length - 1) index = dots.length - 1;
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === index);
      });
    }

    prevBtn.addEventListener('click', function () {
      slider.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    nextBtn.addEventListener('click', function () {
      slider.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    var slideTimer = null;
    slider.addEventListener('scroll', function () {
      if (slideTimer) window.cancelAnimationFrame(slideTimer);
      slideTimer = window.requestAnimationFrame(paint);
    }, { passive: true });

    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); nextBtn.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prevBtn.click(); }
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(buildDots, 160);
    });

    buildDots();
  }

  /* ---------------------------------------------------------------
     6. Scroll reveal
     --------------------------------------------------------------- */
  var revealItems = doc.querySelectorAll('.reveal');

  if (!reduceMotion && 'IntersectionObserver' in window && revealItems.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealItems.forEach(function (el) { observer.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------------------------------------------------------------
     7. Current year
     --------------------------------------------------------------- */
  var year = doc.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
