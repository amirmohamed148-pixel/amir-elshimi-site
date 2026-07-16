// ===========================================================
// Amir Elshimi — core.js v4
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  // year
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // nav scroll
  const nav = document.getElementById('siteNav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- unified nav: mobile drawer + "More" dropdown (click-based on all sizes) ----------
  const menuBtn = document.getElementById('navMenuBtn');
  const navLinksEl = document.querySelector('.nav-links');
  const moreItem = navLinksEl ? navLinksEl.querySelector('.nav-more') : null;
  const moreLabel = moreItem ? moreItem.querySelector('.nav-more-label') : null;

  const closeMore = () => {
    if (moreItem) {
      moreItem.classList.remove('open');
      if (moreLabel) moreLabel.setAttribute('aria-expanded', 'false');
    }
  };

  if (menuBtn && navLinksEl) {
    const closeDrawer = () => {
      navLinksEl.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      closeMore();
    };
    const openDrawer = () => {
      navLinksEl.classList.add('open');
      menuBtn.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
    };
    menuBtn.addEventListener('click', () => {
      if (navLinksEl.classList.contains('open')) closeDrawer(); else openDrawer();
    });
    navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); closeMore(); } });
  }

  if (moreItem && moreLabel) {
    moreLabel.setAttribute('role', 'button');
    moreLabel.setAttribute('tabindex', '0');
    moreLabel.setAttribute('aria-expanded', 'false');

    const toggleMore = () => {
      const isOpen = moreItem.classList.toggle('open');
      moreLabel.setAttribute('aria-expanded', String(isOpen));
    };

    moreLabel.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMore();
    });
    moreLabel.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMore(); }
    });
    // click outside closes the dropdown (desktop) without affecting the drawer
    document.addEventListener('click', (e) => {
      if (!moreItem.contains(e.target)) closeMore();
    });
    // close when a submenu link is chosen
    moreItem.querySelectorAll('.nav-more-menu a').forEach(a => a.addEventListener('click', closeMore));
  }

  // reveal — immediately show if already in viewport, otherwise observe
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal, .tl-item').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add('in');
    } else {
      revealObs.observe(el);
    }
  });

  // animated counters — immediately fire if already in viewport
  function runCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dec = parseInt(el.dataset.dec || '0');
    const dur = 1600;
    let start = null;
    const frame = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (dec ? val.toFixed(dec) : Math.round(val)).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { runCounter(e.target); counterObs.unobserve(e.target); }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-count]').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      runCounter(el);
    } else {
      counterObs.observe(el);
    }
  });

  // hero entrance (home page)
  const heroLines = document.querySelectorAll('.hero-name .line span');
  if (heroLines.length) {
    setTimeout(() => heroLines.forEach((l,i) => setTimeout(() => l.style.transform='translateY(0)', i*90)), 200);
    [
      ['.hero-eyebrow', 150], ['.hero-sub', 420], ['.hero-desc', 560],
      ['.hero-actions', 700], ['.hero-stats', 860]
    ].forEach(([sel, delay]) => {
      const el = document.querySelector(sel);
      if (el) setTimeout(() => { el.style.opacity=1; el.style.transform='translateY(0)'; }, delay);
    });
    const pw = document.getElementById('heroPhotoWrap');
    const pf = document.getElementById('heroPhotoFrame');
    if (pw) setTimeout(() => { pw.style.opacity=1; pw.style.transform='translateY(0)'; }, 350);
    if (pf) setTimeout(() => pf.classList.add('sweep'), 750);
  }

  // contact intent buttons
  const intentBtns = document.querySelectorAll('.intent-btn');
  const emailBtn = document.getElementById('emailBtn');
  const subjects = {
    hiring: 'Hiring inquiry — Amir Elshimi',
    project: 'Project inquiry — Amir Elshimi',
    collab: 'Collaboration — Amir Elshimi',
    speaking: 'Speaking / judging inquiry — Amir Elshimi'
  };
  intentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      intentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (emailBtn) emailBtn.href = `mailto:amirelshimi.eg@gmail.com?subject=${encodeURIComponent(subjects[btn.dataset.intent] || 'Hello')}`;
    });
  });

  // lightbox
  const imgs = document.querySelectorAll('.gallery-item img, .people-card img');
  if (imgs.length) {
    const ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(10,10,11,0.96);display:none;align-items:center;justify-content:center;z-index:2000;cursor:zoom-out;padding:40px;';
    const img = document.createElement('img');
    img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:4px;box-shadow:0 40px 80px rgba(0,0,0,0.6);';
    ov.appendChild(img);
    document.body.appendChild(ov);
    imgs.forEach(el => {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', () => { img.src = el.src; ov.style.display='flex'; });
    });
    ov.addEventListener('click', () => { ov.style.display='none'; });
    document.addEventListener('keydown', e => { if (e.key==='Escape') ov.style.display='none'; });
  }

  // gallery filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item[data-cat]').forEach(item => {
        item.style.display = (filter === 'all' || filter === item.dataset.cat) ? '' : 'none';
      });
    });
  });

});
