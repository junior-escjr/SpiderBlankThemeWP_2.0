// Scroll reveal module

export default class ScrollReveal {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupParallaxEffects();
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe elements with reveal classes
    const revealElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-up, .scroll-reveal-down'
    );

    revealElements.forEach(element => observer.observe(element));
  }

  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length) {
      const handleScroll = () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
          const speed = element.getAttribute('data-parallax') || 0.5;
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px)`;
        });
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initialize
    }
  }

  // Static method to add reveal animation to element
  static reveal(element, animation = 'fadeInUp', delay = 0) {
    setTimeout(() => {
      element.classList.add('animate-' + animation);
    }, delay);
  }

  // Static method to hide element
  static hide(element) {
    element.classList.remove('revealed');
  }
}
