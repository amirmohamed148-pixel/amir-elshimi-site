// ===========================================================
// Amir Elshimi — shared site interactions (all pages)
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- nav scroll state ---------- */
  const nav = document.getElementById('siteNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  /* ---------- generic scroll reveal ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .tl-item').forEach(el => {
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) {
      el.classList.add('in');
    } else {
      observer.observe(el);
    }
  });

  /* ---------- animated counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1400;
    let startTime = null;
    function frame(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = target * eased;
      el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val)).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  /* ---------- hero entrance sequence (home page only) ---------- */
  const heroNameLines = document.querySelectorAll('.hero-name .line span');
  if (heroNameLines.length) {
    setTimeout(() => {
      heroNameLines.forEach((l, i) => {
        setTimeout(() => { l.style.transform = 'translateY(0)'; }, i * 90);
      });
    }, 200);

    const seq = [
      ['.hero-eyebrow', 150],
      ['.hero-sub', 420],
      ['.hero-desc', 560],
      ['.hero-actions', 700],
      ['.hero-stats', 860]
    ];
    seq.forEach(([sel, delay]) => {
      const el = document.querySelector(sel);
      if (!el) return;
      setTimeout(() => {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      }, delay);
    });

    const photoWrap = document.getElementById('heroPhotoWrap');
    const photoFrame = document.getElementById('heroPhotoFrame');
    if (photoWrap) {
      setTimeout(() => {
        photoWrap.style.opacity = 1;
        photoWrap.style.transform = 'translateY(0)';
      }, 350);
    }
    if (photoFrame) {
      setTimeout(() => { photoFrame.classList.add('sweep'); }, 750);
    }
  }

  /* ---------- contact intent selector (contact page) ---------- */
  const intentBtns = document.querySelectorAll('.intent-btn');
  const emailBtn = document.getElementById('emailBtn');
  const subjects = {
    hiring: 'Hiring inquiry',
    project: "I have a project I'd like to discuss",
    collab: "Let's collaborate",
    speaking: "Speaking / judging inquiry"
  };
  intentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      intentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const intent = btn.dataset.intent;
      const subject = encodeURIComponent(subjects[intent] || 'Hello');
      if (emailBtn) emailBtn.href = `mailto:amirelshimi.eg@gmail.com?subject=${subject}`;
    });
  });

  /* ---------- simple lightbox for galleries ---------- */
  const galleryImgs = document.querySelectorAll('.gallery-item img, .people-card img');
  if (galleryImgs.length) {
    const overlay = document.createElement('div');
    overlay.id = 'lightboxOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(10,26,20,0.94);display:none;align-items:center;justify-content:center;z-index:1000;cursor:zoom-out;padding:40px;';
    const img = document.createElement('img');
    img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:8px;box-shadow:0 40px 80px rgba(0,0,0,0.5);';
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    galleryImgs.forEach(el => {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', () => {
        img.src = el.src;
        overlay.style.display = 'flex';
      });
    });
    overlay.addEventListener('click', () => { overlay.style.display = 'none'; });
  }

  /* ---------- mobile nav toggle ---------- */
  const menuBtn = document.querySelector('.nav-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }
});
