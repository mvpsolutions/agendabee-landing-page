// Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function () {

  // --- ONE-TIME REDIRECT FOR NEW VISITORS --- //
  (function () {
    const path = window.location.pathname;
    const savedLang = localStorage.getItem('language');
    // Redirect only if on the root page and language isn't saved
    if ((path === '/' || path === '/index.html') && !savedLang) {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en' || browserLang === 'es') {
        // Save the preference so it doesn't redirect again
        localStorage.setItem('language', browserLang);
        window.location.replace(`/${browserLang}/`);
      } else {
        // For other languages (like 'pt'), save the preference so we don't check again
        localStorage.setItem('language', 'pt');
      }
    }
  })();

  // --- DYNAMIC YEAR IN FOOTER --- //
  (function () {
    const yearSpan = document.getElementById('footer-year-text');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  })();

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }

    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const currentScroll = window.scrollY;
        const targetOffset = target.offsetTop;

        // Verifica direção do scroll
        let targetPosition;

        if (targetOffset < currentScroll) {
          // Scroll de baixo para cima → desconta header
          targetPosition = targetOffset - headerHeight;
        } else {
          // Scroll de cima para baixo → não desconta
          targetPosition = targetOffset;
        }

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all FAQ items
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuToggle && navMenu) {
    const icon = mobileMenuToggle.querySelector('i');

    const closeMobileMenu = () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    };

    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the document click listener from firing immediately
      const isActive = navMenu.classList.toggle('active');
      icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
    });

    navMenu.addEventListener('click', (e) => {
      if (e.target.closest('.nav-link, .language-switcher-options .language-button')) {
        closeMobileMenu();
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.feature-card, .problem-card, .testimonial-card, .step');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // CTA button tracking (for analytics)
  const ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function () {
      const buttonText = this.textContent.trim();
      const section = this.closest('section')?.className || 'unknown';

      // Google Analytics event (if gtag is available)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
          'button_text': buttonText,
          'section': section,
          'page_location': window.location.href
        });
      }
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Scroll to top functionality
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--box-shadow-lg);
    `;

  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Language switcher dropdown
  const languageSwitcher = document.querySelector('.language-switcher');
  if (languageSwitcher) {
    const activeLangContainer = languageSwitcher.querySelector('.language-switcher-active');
    activeLangContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      languageSwitcher.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
      if (!languageSwitcher.contains(event.target)) {
        languageSwitcher.classList.remove('open');
      }
    });
  }
});

// Utility functions
window.LandingPageUtils = {
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  throttle: (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
};
