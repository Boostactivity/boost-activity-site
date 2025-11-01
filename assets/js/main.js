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

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach((link) =>
      link.addEventListener('click', () => mobileMenu.classList.remove('active'))
    );
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

