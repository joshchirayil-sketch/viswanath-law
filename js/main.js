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
const fadeEls = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  // Fallback: if anything hasn't become visible after 3s, force it
  setTimeout(() => {
    fadeEls.forEach(el => el.classList.add('visible'));
  }, 3000);
} else {
  // No IntersectionObserver support — show everything
  fadeEls.forEach(el => el.classList.add('visible'));
}

// Contact form (basic handler)
const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    console.log('Form submission:', data);
    // TODO: wire to actual endpoint
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
  if (currentPath.includes('/paige') && href.includes('/paige')) {
    link.classList.add('active');
  }
});
