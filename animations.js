/**
 * animations.js — efecte vizuale avansate pentru chimia in alimentatie
 * Inlocuieste chem-burst simplu cu animatii moleculare interactive
 */

// ─── 1. CURSOR PERSONALIZAT ──────────────────────────────────────────────────
const initCustomCursor = () => {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip pe touch

  const cursor = document.createElement('div');
  cursor.className = 'chem-cursor';
  cursor.innerHTML = `<div class="chem-cursor-dot"></div><div class="chem-cursor-ring"></div>`;
  document.body.appendChild(cursor);

  const dot  = cursor.querySelector('.chem-cursor-dot');
  const ring = cursor.querySelector('.chem-cursor-ring');

  let mx = -100, my = -100, rx = -100, ry = -100;

  window.addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px)`;
  }, { passive: true });

  const followRing = () => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(followRing);
  };
  followRing();

  // Cursor se mareste pe elemente interactive
  document.querySelectorAll('a, button, .clickable-card, .timeline-card, .link-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });

  document.addEventListener('mousedown', () => cursor.classList.add('is-click'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('is-click'));
};

// ─── 2. ANIMATIE CLICK — BURST CLASIC CU CULORI NOI ──────────────────────────
// Pastreaza stilul original chem-burst dar cu o paleta de culori mai vie

const BURST_PALETTE = [
  '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6',
  '#f97316', '#06b6d4', '#84cc16', '#ef4444', '#a78bfa'
];

const createChemBurst = (x, y) => {
  const burst = document.createElement('span');
  burst.className = 'chem-burst';
  burst.style.setProperty('--burst-x', `${x}px`);
  burst.style.setProperty('--burst-y', `${y}px`);

  // Alege o culoare aleatorie din paleta
  const color = BURST_PALETTE[Math.floor(Math.random() * BURST_PALETTE.length)];
  burst.style.setProperty('--burst-color', color);

  document.body.appendChild(burst);
  window.setTimeout(() => burst.remove(), 820);
};

// Inlocuieste vechiul handler
window.addEventListener('pointerdown', e => {
  document.querySelectorAll('.chem-burst').forEach(b => b.remove());
  createChemBurst(e.clientX, e.clientY);
}, { passive: true });

// ─── 3. SCROLL REVEAL CU STAGGER ANIMAT ──────────────────────────────────────
const initScrollReveal = () => {
  const targets = document.querySelectorAll(
    '.stat-chip, .detail-card, .feature-card, .photo-card, .visual-card, .timeline-card, .case-card, .info-card, .link-card'
  );

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

  targets.forEach((el, i) => {
    el.classList.add('anim-ready');
    el.style.setProperty('--anim-delay', `${(i % 8) * 60}ms`);
    observer.observe(el);
  });

  requestAnimationFrame(() => {
    targets.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('anim-in');
        observer.unobserve(el);
      }
    });
  });
};

// ─── 4. COUNTER ANIMAT PE STAT-CHIPS ─────────────────────────────────────────
const initCounters = () => {
  const chips = document.querySelectorAll('.stat-chip strong');
  if (!chips.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent.trim();
      const match = text.match(/^(~?)([\d.]+)(.*)/);
      if (!match) return;

      const prefix = match[1];
      const target = parseFloat(match[2]);
      const suffix = match[3];
      const isFloat = match[2].includes('.');
      const duration = 1200;
      const start = performance.now();

      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = target * ease;
        el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  chips.forEach(el => observer.observe(el));
};

// ─── 5. GRADIENT ANIMAT PE HERO ──────────────────────────────────────────────
const initHeroGradient = () => {
  const hero = document.querySelector('.hero-home');
  if (!hero) return;

  let angle = 135;
  const animate = () => {
    angle = (angle + 0.08) % 360;
    hero.style.backgroundImage = `
      radial-gradient(circle at 18% 18%, rgba(33,212,253,0.28), transparent 28%),
      radial-gradient(circle at 85% 24%, rgba(255,107,87,0.22), transparent 25%),
      linear-gradient(${angle}deg, #061b1f 0%, #0b4034 42%, #14795d 100%)
    `;
    requestAnimationFrame(animate);
  };

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animate();
  }
};

// ─── 6. MAGNETIC BUTTONS ─────────────────────────────────────────────────────
const initMagneticButtons = () => {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.button-primary, .button-secondary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-1px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
};

// ─── 7. TYPING EFFECT PE HERO LEAD ───────────────────────────────────────────
const initTypingEffect = () => {
  const lead = document.querySelector('.hero-lead');
  if (!lead || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const text = lead.textContent.trim();
  lead.textContent = '';
  lead.style.opacity = '1';

  let i = 0;
  const type = () => {
    if (i < text.length) {
      lead.textContent += text[i++];
      setTimeout(type, 18 + Math.random() * 12);
    }
  };

  // Porneste dupa un mic delay
  setTimeout(type, 800);
};

// ─── 8. RIPPLE PE CARDURI LA CLICK ───────────────────────────────────────────
const initCardRipple = () => {
  document.querySelectorAll('.link-card, .timeline-card, .detail-card, .clickable-card').forEach(card => {
    card.addEventListener('click', e => {
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.className = 'card-ripple';
      ripple.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        border-radius:50%;
        background:rgba(29,158,117,0.18);
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        transform:scale(0);
        animation:cardRipple 600ms ease-out forwards;
        pointer-events:none;
      `;

      const pos = getComputedStyle(card).position;
      if (pos === 'static') card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 620);
    });
  });
};

// ─── 9. PROGRESS BAR COLORATA ────────────────────────────────────────────────
const initScrollProgress = () => {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  bar.style.background = 'linear-gradient(90deg, #1d9e75, #21d4fd, #ff6b57, #c77f26)';
  bar.style.backgroundSize = '200% 100%';

  window.addEventListener('scroll', () => {
    const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.backgroundPosition = `${100 - progress * 100}% 0`;
  }, { passive: true });
};

// ─── 10. HOVER GLOW PE SECTIUNE HEADER ───────────────────────────────────────
const initSectionGlow = () => {
  document.querySelectorAll('.section-header h2, .page-title').forEach(el => {
    el.style.transition = 'text-shadow 0.3s ease';
    el.addEventListener('mouseenter', () => {
      el.style.textShadow = '0 0 40px rgba(29,158,117,0.25)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.textShadow = '';
    });
  });
};

// ─── INIT ─────────────────────────────────────────────────────────────────────
const initAnimations = () => {
  initCustomCursor();
  initScrollReveal();
  initCounters();
  initHeroGradient();
  initMagneticButtons();
  initTypingEffect();
  initCardRipple();
  initScrollProgress();
  initSectionGlow();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}
