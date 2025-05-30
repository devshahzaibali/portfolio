// DOM Elements
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contactForm');
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
  themeToggle.textContent = newTheme === 'dark' ? '🌞' : '🌓';
  localStorage.setItem('theme', newTheme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);

  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '🌞' : '🌓';
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
        typingSpeed = 1500; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before next word
      }
      
      setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000); // Initial delay
  }

  typeWriter();
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form Submission Handling
if (contactForm) {
  const submitBtn = contactForm.querySelector('.submit-btn');
  const btnText = submitBtn?.querySelector('.btn-text');
  const formSuccess = document.getElementById('form-success');

  contactForm.addEventListener('submit', function(e) {
    if (btnText) {
      btnText.textContent = 'Sending...';
      submitBtn.disabled = true;
    }

    // For FormSubmit.co
    setTimeout(() => {
      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.textContent = 'Message sent successfully!';
      }
      if (btnText) {
        btnText.textContent = 'Send Message';
        submitBtn.disabled = false;
      }
    }, 2000);
  });
}

// Update footer year
if (footerYear) {
  footerYear.textContent = `© ${new Date().getFullYear()} ShahzaibAli. All rights reserved.`;
}

// Project Card Hover Effects
document.addEventListener('DOMContentLoaded', () => {
  const components = document.querySelectorAll('.project-component');
  
  if (components.length) {
    components.forEach((comp, index) => {
      comp.style.setProperty('--order', index);
      
      comp.addEventListener('mousemove', (e) => {
        const rect = comp.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        comp.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
        comp.style.boxShadow = `${angleY * 5}px ${angleX * 5}px 15px rgba(0,0,0,0.2)`;
      });
      
      comp.addEventListener('mouseleave', () => {
        comp.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        comp.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      });
    });
  }
});