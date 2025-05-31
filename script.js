// DOM Elements
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn?.querySelector('.btn-text');
const footerYear = document.querySelector('.footer-bottom p');

// Mobile Menu Toggle
function toggleMobileMenu() {
  mobileMenu.classList.toggle('show');
  overlay.classList.toggle('show');
  hamburger.textContent = mobileMenu.classList.contains('show') ? '✕' : '☰';
  document.body.style.overflow = mobileMenu.classList.contains('show') ? 'hidden' : 'auto';
}

if (hamburger && mobileMenu && overlay) {
  hamburger.addEventListener('click', toggleMobileMenu);
  overlay.addEventListener('click', toggleMobileMenu);
}

if (mobileNavLinks.length) {
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
  });
}

// Theme Toggle
function toggleTheme() {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '🌞' : '🌙';
  localStorage.setItem('theme', newTheme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '🌞' : '🌙';
}

// Typing Animation
if (typingText) {
  function typeWriter() {
    const words = ["Web Developer", "Software Engineer", "Freelancer", "BlockChain Engineer"];
    let wordIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 50;
    
    function type() {
      const currentWord = words[wordIndex];
      typingText.textContent = isDeleting ? 
        currentWord.substring(0, charIndex--) : 
        currentWord.substring(0, charIndex++);
      
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
      }
      setTimeout(type, typingSpeed);
    }
    setTimeout(type, 1000);
  }
  typeWriter();
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (btnText) btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    try {
      const response = await fetch('https://formsubmit.co/ajax/techzaibx@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
      });

      if (!response.ok) throw new Error('Failed to send');
      
      formSuccess.style.display = 'block';
      formSuccess.textContent = 'Message sent successfully!';
      formSuccess.style.color = '';
      contactForm.reset();

      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);

    } catch (error) {
      formSuccess.style.display = 'block';
      formSuccess.textContent = 'Error: ' + error.message;
      formSuccess.style.color = '#ff4444';
    } finally {
      if (btnText) btnText.textContent = 'Send Message';
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  });

  // Real-time validation
  contactForm.addEventListener('input', (e) => {
    if (e.target.validity) {
      e.target.classList.toggle('invalid', !e.target.validity.valid);
    }
  });
}

// Footer Year
if (footerYear) {
  footerYear.textContent = `© ${new Date().getFullYear()} ShahzaibAli. All rights reserved.`;
}

// Project Card Hover (Desktop only)
document.addEventListener('DOMContentLoaded', () => {
  const components = document.querySelectorAll('.project-component');
  
  if (components.length && !('ontouchstart' in window)) {
    components.forEach((comp, index) => {
      comp.style.setProperty('--order', index);
      
      comp.addEventListener('mousemove', (e) => {
        const rect = comp.getBoundingClientRect();
        const angleX = (e.clientY - rect.top - rect.height/2) / 20;
        const angleY = (rect.width/2 - e.clientX + rect.left) / 20;
        
        comp.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
      });
      
      comp.addEventListener('mouseleave', () => {
        comp.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }
});