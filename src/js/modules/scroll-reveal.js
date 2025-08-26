// Scroll reveal module - jQuery version

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

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe elements with reveal classes
    const $revealElements = $(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-up, .scroll-reveal-down'
    );

    $revealElements.each(function() {
      observer.observe(this);
    });
  }

  setupParallaxEffects() {
    const $parallaxElements = $('[data-parallax]');

    if ($parallaxElements.length) {
      const handleScroll = function() {
        const scrolled = $(window).scrollTop();

        $parallaxElements.each(function() {
          const speed = $(this).attr('data-parallax') || 0.5;
          const yPos = -(scrolled * speed);
          $(this).css('transform', 'translateY(' + yPos + 'px)');
        });
      };

      $(window).on('scroll', handleScroll);
      handleScroll(); // Initialize
    }
  }

  // Static method to add reveal animation to element
  static reveal(element, animation = 'fadeInUp', delay = 0) {
    setTimeout(function() {
      $(element).addClass('animate-' + animation);
    }, delay);
  }

  // Static method to hide element
  static hide(element) {
    $(element).removeClass('revealed');
  }
}
