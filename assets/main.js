// ===========================================================
// Amir Elshimi — site interactions
// ===========================================================

document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('DOMContentLoaded', () => {
  const lines = document.querySelectorAll('.hero-name .line span');
  const photoWrap = document.getElementById('heroPhotoWrap');
  const photoFrame = document.getElementById('heroPhotoFrame');

  setTimeout(() => {
    lines.forEach((l, i) => {
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

  setTimeout(() => {
    photoWrap.style.opacity = 1;
    photoWrap.style.transform = 'translateY(0)';
  }, 350);
  setTimeout(() => {
    photoFrame.classList.add('sweep');
  }, 750);
});

const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('section:not(.hero) .reveal').forEach(el => {
  el.style.transitionDelay = '0s';
  observer.observe(el);
});

const intentBtns = document.querySelectorAll('.intent-btn');
const emailBtn = document.getElementById('emailBtn');
const subjects = {
  hiring: 'Hiring inquiry',
  project: "I have a project I'd like to discuss",
  collab: "Let's collaborate"
};
intentBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    intentBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const intent = btn.dataset.intent;
    const subject = encodeURIComponent(subjects[intent] || 'Hello');
    emailBtn.href = `mailto:amirelshimi.eg@gmail.com?subject=${subject}`;
  });
});
