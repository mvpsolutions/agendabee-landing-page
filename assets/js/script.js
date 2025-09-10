// Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function () {

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
      if (isActive) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile menu when an action is taken inside
    navMenu.addEventListener('click', (e) => {
      // Close if a nav-link is clicked
      if (e.target.closest('.nav-link')) {
        closeMobileMenu();
      }
      // Close if a language button *from the options* is clicked
      if (e.target.closest('.language-switcher-options .language-button')) {
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
    button.addEventListener('click', function (e) {
      // Track CTA clicks
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

      // Console log for debugging
      console.log('CTA clicked:', {
        text: buttonText,
        section: section,
        url: this.href
      });
    });
  });

  // Form validation (if forms are added later)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');

          // Remove error class after user starts typing
          field.addEventListener('input', function () {
            this.classList.remove('error');
          }, { once: true });
        }
      });

      if (!isValid) {
        e.preventDefault();

        // Show error message
        let errorMsg = form.querySelector('.error-message');
        if (!errorMsg) {
          errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.style.color = 'var(--danger)';
          errorMsg.style.marginTop = '1rem';
          errorMsg.style.textAlign = 'center';
          form.appendChild(errorMsg);
        }
        errorMsg.textContent = 'Por favor, preencha todos os campos obrigatórios.';

        // Remove error message after 5 seconds
        setTimeout(() => {
          if (errorMsg.parentNode) {
            errorMsg.remove();
          }
        }, 5000);
      }
    });
  });

  // Lazy loading for images (performance optimization)
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Performance monitoring
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page loaded in ${loadTime}ms`);

      // Report to analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
          'value': loadTime,
          'custom_parameter': 'landing_page'
        });
      }
    });
  }

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('.btn, .feature-card, .problem-card, .testimonial-card');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
    });

    element.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // --- I18N (TRANSLATION) --- //
  const translations = {};
  const defaultLang = 'pt';
  const langOptions = {
    pt: '🇧🇷 PT',
    en: '🇺🇸 EN',
    es: '🇪🇸 ES'
  };

  // ONE-TIME REDIRECT FOR NEW VISITORS
  const path = window.location.pathname;
  const savedLang = localStorage.getItem('language');
  if ((path === '/' || path === '/index.html') && !savedLang) {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'en' || browserLang === 'es') {
      window.location.replace(`/${browserLang}/`);
      return; // Stop script execution until new page loads
    }
  }

  const languageSwitcher = document.querySelector('.language-switcher');
  const activeLangContainer = document.querySelector('.language-switcher-active');
  const langOptionsContainer = document.querySelector('.language-switcher-options');

  async function fetchTranslations(lang) {
    try {
      const path = window.location.pathname;
      const basePath = (path.startsWith('/en') || path.startsWith('/es')) ? '../' : './';
      const response = await fetch(`${basePath}assets/locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Could not load ${lang}.json`);
      }
      translations[lang] = await response.json();
    } catch (error) {
      console.error(error);
      if (lang !== defaultLang) {
        await fetchTranslations(defaultLang); // Fallback to default language
      }
    }
  }

  function applyTranslations(lang) {
    const langData = translations[lang];
    if (!langData) return;

    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (langData[key]) {
        let translatedText = langData[key];
        // Handle year placeholder
        if (translatedText.includes('{year}')) {
          translatedText = translatedText.replace('{year}', new Date().getFullYear());
        }

        if (element.tagName === 'META' && element.name === 'description') {
          element.content = translatedText;
        } else if (element.tagName === 'TITLE') {
          element.textContent = translatedText;
        } else {
          element.innerHTML = translatedText;
        }
      }
    });

    document.documentElement.lang = lang.split('-')[0];
  }

  function updateLanguageSwitcherUI(currentLang) {
    // Update active button
    activeLangContainer.innerHTML = `<button class="language-button active" data-lang="${currentLang}">${langOptions[currentLang]}</button>`;

    // Update options
    langOptionsContainer.innerHTML = '';
    Object.keys(langOptions).forEach(lang => {
      if (lang !== currentLang) {
        let href = '';
        // Check if the current page is a language sub-page
        const isSubPage = window.location.pathname.startsWith('/en') || window.location.pathname.startsWith('/es');

        if (lang === 'pt') {
          href = isSubPage ? '../' : './';
        } else {
          href = isSubPage ? `../${lang}/` : `${lang}/`;
        }

        langOptionsContainer.innerHTML += `<a href="${href}" class="language-button" data-lang="${lang}">${langOptions[lang]}</a>`;
      }
    });
  }

  async function setLanguage(lang) {
    if (!translations[lang]) {
      await fetchTranslations(lang);
    }
    applyTranslations(lang);
    localStorage.setItem('language', lang); // Always update localStorage to the language of the current page
    updateLanguageSwitcherUI(lang);
  }

  activeLangContainer.addEventListener('click', (e) => {
    languageSwitcher.classList.toggle('open');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (event) => {
    if (!languageSwitcher.contains(event.target)) {
      languageSwitcher.classList.remove('open');
    }
  });

  function getLanguageFromPath() {
    const path = window.location.pathname;
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/es')) return 'es';
    return 'pt';
  }

  // Initialize translation on page load
  const langToLoad = getLanguageFromPath();
  setLanguage(langToLoad);

});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
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

// Export functions for potential use in other scripts
window.LandingPageUtils = {
  debounce,
  throttle
};