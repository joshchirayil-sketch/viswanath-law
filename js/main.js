// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
hamburger?.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav?.classList.remove('open'));
});

// Scroll fade-in animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Contact form (basic handler - replace with real endpoint)
const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate send — replace with actual API endpoint
  try {
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    console.log('Form submission:', data);

    // TODO: Replace with actual endpoint
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });

    btn.textContent = 'Sent ✓';
    contactForm.reset();
    setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 3000);
  } catch (err) {
    btn.textContent = 'Error — Try Again';
    btn.disabled = false;
    setTimeout(() => { btn.textContent = originalText; }, 3000);
  }
});

// Active nav highlighting
const currentPath = window.location.pathname;
document.querySelectorAll('.nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath.includes('/professionals') && href.includes('/professionals'))) {
    link.classList.add('active');
  }
});
