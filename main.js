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

document.querySelectorAll('.why-card, .pricing-card, .demo-card, .step').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.8s ease ${i * 0.9}s, transform 0.8s ease ${i * 0.07}s`;
  observer.observe(el);
});
