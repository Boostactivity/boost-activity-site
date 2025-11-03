document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const consentBanner = document.querySelector('[data-consent-banner]');
  const acceptConsent = document.querySelector('[data-consent-accept]');
  const denyConsent = document.querySelector('[data-consent-deny]');
  const carouselTrack = document.querySelector('[data-carousel-track]');
  const prevButton = document.querySelector('[data-carousel-prev]');
  const nextButton = document.querySelector('[data-carousel-next]');
  const slides = carouselTrack ? Array.from(carouselTrack.children) : [];
  let activeIndex = 0;
  const focusableSelectors = 'a[href], button:not([disabled]), [tabindex="0"], [tabindex]:not([tabindex="-1"])';
  let focusableElements = [];
  let trapListener = null;

  const closeMenu = () => {
    if (!mobileMenu || !mobileToggle) return;
    mobileMenu.classList.remove('active');
    mobileMenu.hidden = true;
    mobileToggle.setAttribute('aria-expanded', 'false');
    if (trapListener) {
      document.removeEventListener('keydown', trapListener);
      trapListener = null;
    }
  };

  const openMenu = () => {
    if (!mobileMenu || !mobileToggle) return;
    mobileMenu.classList.add('active');
    mobileMenu.hidden = false;
    mobileToggle.setAttribute('aria-expanded', 'true');
    focusableElements = Array.from(mobileMenu.querySelectorAll(focusableSelectors));
    focusableElements[0]?.focus();
    trapListener = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        mobileToggle.focus();
        return;
      }
      if (event.key !== 'Tab' || !focusableElements.length) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', trapListener);
  };

  if (mobileToggle && mobileMenu) {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileMenu.querySelectorAll('a').forEach((link) =>
      link.addEventListener('click', () => {
        closeMenu();
      })
    );

    document.addEventListener('click', (event) => {
      if (!mobileMenu.classList.contains('active')) return;
      if (mobileMenu.contains(event.target) || mobileToggle.contains(event.target)) return;
      closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        closeMenu();
      }
    });
  }

  const updateCarousel = () => {
    if (!carouselTrack) return;
    if (!slides.length) return;
    const slideWidth = slides[0].getBoundingClientRect().width;
    carouselTrack.style.transform = `translateX(-${activeIndex * (slideWidth + 24)}px)`;
  };

  if (nextButton && slides.length) {
    nextButton.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % slides.length;
      updateCarousel();
    });
  }

  if (prevButton && slides.length) {
    prevButton.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  }

  window.addEventListener('resize', () => {
    activeIndex = 0;
    updateCarousel();
  });

  const consentKey = 'boost-activity-consent';
  if (consentBanner) {
    const stored = localStorage.getItem(consentKey);
    if (!stored) {
      consentBanner.classList.add('active');
    }

    const handleConsent = (value) => {
      localStorage.setItem(consentKey, value);
      consentBanner.classList.remove('active');
    };

    acceptConsent?.addEventListener('click', () => handleConsent('accepted'));
    denyConsent?.addEventListener('click', () => handleConsent('denied'));
  }
});
