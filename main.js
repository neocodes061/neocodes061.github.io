/* =============================================
   MAIN.JS — WhatsApp Form & Scroll Reveal
   NeoCodes Launch
============================================= */

const WA_NUMBER = '919831756788';

// --- Contact form → WhatsApp ---
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name   = document.getElementById('name').value.trim();
    const phone  = document.getElementById('phone').value.trim();
    const centre = document.getElementById('centre').value.trim();
    const pkg    = document.getElementById('package').value;
    const extra  = document.getElementById('message').value.trim();

    if (!name || !phone || !centre) {
      alert('Please fill in your name, WhatsApp number and centre name.');
      return;
    }

    const text =
`Hi NeoCodes Launch! 👋

Name: ${name}
WhatsApp: ${phone}
Centre: ${centre}
Package: ${pkg || 'Not selected yet'}${extra ? `\nAdditional Info: ${extra}` : ''}

I'd like to get a website for my business.`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  });
}

// --- Scroll reveal ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.style.opacity = '1';
      el.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

function setupReveal(selector) {
  document.querySelectorAll(selector).forEach((el, i) => {
    const siblings = el.parentElement ? el.parentElement.querySelectorAll(selector) : [el];
    const localIndex = Array.from(siblings).indexOf(el);
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${localIndex * 0.08}s, transform 0.5s ease ${localIndex * 0.08}s`;
    observer.observe(el);
  });
}

setupReveal('.why-card');
setupReveal('.pricing-card');
setupReveal('.demo-card');
setupReveal('.step');

['.about-section .section-heading', '.about-body', '.tech-badges'].forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s';
    observer.observe(el);
  });
});

function animateCounters() {
  const stats = document.querySelectorAll('.stat-val');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent.trim();
      const num = parseInt(raw.replace(/[^0-9]/g, ''));
      const prefix = raw.match(/^[^0-9]*/)[0];
      const suffix = raw.match(/[^0-9]*$/)[0];
      let start = 0;
      const duration = 1500;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + Math.floor(eased * num).toLocaleString('en-IN') + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  stats.forEach(s => counterObserver.observe(s));
}
animateCounters();

const typewriterEl = document.getElementById('typewriter-text');
if (typewriterEl) {
  const words = ['Shops','Clinics','Salons','Restaurants','NGOs','Gyms','Photographers','CA Firms'];
  let wi = 0, ci = 0, deleting = false;
  function type() {
    const word = words[wi];
    typewriterEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1200); return; }
    if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; setTimeout(type, 300); return; }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();
}

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });
}

const codeBg = document.getElementById('heroCodeBg');
if (codeBg) {
  const snippets = ['<section>','display: flex;','.container {}','margin: 0 auto;','font-size: 1rem;','</div>','border-radius: 8px;','position: relative;','@media (max-width:','const observer =','grid-template-columns:','transition: all 0.3s;'];
  snippets.forEach((s, i) => {
    const el = document.createElement('span');
    el.className = 'code-snippet';
    el.textContent = s;
    el.style.left = (5 + Math.random() * 90) + '%';
    el.style.animationDuration = (12 + Math.random() * 18) + 's';
    el.style.animationDelay = (Math.random() * 10) + 's';
    codeBg.appendChild(el);
  });
}

const heroCursor = document.getElementById('heroCursor');
if (heroCursor) {
  document.addEventListener('mousemove', (event) => {
    heroCursor.style.left = `${event.clientX}px`;
    heroCursor.style.top = `${event.clientY}px`;
    heroCursor.style.opacity = '1';
  });
  document.addEventListener('mouseleave', () => {
    heroCursor.style.opacity = '0';
  });
  document.addEventListener('mouseout', (event) => {
    if (!event.relatedTarget) {
      heroCursor.style.opacity = '0';
    }
  });
}
