
  // DOM Elements
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const typingText = document.getElementById('typing-text');
  const form = document.querySelector('form');
  const footerYear = document.querySelector('.footer-bottom p');

  // Mobile Menu Toggle
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('show');
    overlay.classList.toggle('show');
    document.body.style.overflow = mobileMenu.classList.contains('show') ? 'hidden' : 'auto';
  }

  hamburger.addEventListener('click', toggleMobileMenu);
  overlay.addEventListener('click', toggleMobileMenu);
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
  });

  // Theme Toggle
  function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌞' : '🌓';
    localStorage.setItem('theme', newTheme);
  }

  themeToggle.addEventListener('click', toggleTheme);

  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '🌞' : '🌓';
  }

  // Typing Animation
  function typeWriter() {
    const words = ["Web Developer", "Designer", "Freelancer"];
    let wordIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;
    
    function type() {
      const currentWord = words[wordIndex];
      typingText.textContent = isDeleting ? currentWord.substring(0, charIndex--) : currentWord.substring(0, ++charIndex);
      
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

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Form Submission Handling
  if (form) {
    form.addEventListener('submit', function(e) {
      const submitBtn = this.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const spinner = submitBtn.querySelector('.loading-spinner');
      
      // Show loading state
      btnText.style.display = 'none';
      spinner.style.display = 'inline-block';
      
      // Optional: Add a timeout to handle cases where FormSubmit doesn't redirect
      setTimeout(() => {
        btnText.style.display = 'inline-block';
        spinner.style.display = 'none';
      }, 10000);
    });
  }

  // Update footer year
  if (footerYear) {
    footerYear.innerHTML = `© ${new Date().getFullYear()} ShahzaibAli. All rights reserved.`;
  }

  // Project Card Hover Effects
  document.addEventListener('DOMContentLoaded', () => {
    const components = document.querySelectorAll('.project-component');
    components.forEach((comp, index) => comp.style.setProperty('--order', index));
    
    components.forEach(component => {
      component.addEventListener('mousemove', (e) => {
        const rect = component.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        component.style.transform = `translateY(-10px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      });
      
      component.addEventListener('mouseleave', () => {
        component.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
      });
    });
  });