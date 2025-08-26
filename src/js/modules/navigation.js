// Navigation module - jQuery version

export default class Navigation {
  constructor() {
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupDropdownMenus();
    this.setupStickyNavigation();
    this.setupScrollSpy();
  }

  setupMobileMenu() {
    const $mobileToggle = $('.mobile-menu-toggle');
    const $mainNavigation = $('.main-navigation');

    if ($mobileToggle.length && $mainNavigation.length) {
      $mobileToggle.on('click', function() {
        $mainNavigation.toggleClass('mobile-open');
        const isExpanded = $mobileToggle.attr('aria-expanded') === 'true';
        $mobileToggle.attr('aria-expanded', !isExpanded);
      });

      // Close menu when clicking outside
      $(document).on('click', function(e) {
        if (!$mainNavigation.is(e.target) && $mainNavigation.has(e.target).length === 0 && 
            !$mobileToggle.is(e.target) && $mobileToggle.has(e.target).length === 0) {
          $mainNavigation.removeClass('mobile-open');
          $mobileToggle.attr('aria-expanded', 'false');
        }
      });

      // Close menu on escape key
      $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
          $mainNavigation.removeClass('mobile-open');
          $mobileToggle.attr('aria-expanded', 'false');
        }
      });
    }
  }

  setupDropdownMenus() {
    const $dropdownToggles = $('.dropdown-toggle');

    $dropdownToggles.on('click', function(e) {
      e.preventDefault();
      const $dropdown = $(this).closest('.dropdown');
      const $menu = $dropdown.find('.dropdown-menu');

      // Close other dropdowns
      $('.dropdown-menu.show').not($menu).removeClass('show');

      // Toggle current dropdown
      $menu.toggleClass('show');
    });

    // Close dropdowns when clicking outside
    $(document).on('click', function(e) {
      if (!$(e.target).closest('.dropdown').length) {
        $('.dropdown-menu.show').removeClass('show');
      }
    });
  }

  setupStickyNavigation() {
    const $header = $('.site-header');
    const scrollThreshold = 100;

    if ($header.length) {
      const handleScroll = function() {
        if ($(window).scrollTop() > scrollThreshold) {
          $header.addClass('sticky-nav');
        } else {
          $header.removeClass('sticky-nav');
        }
      };

      $(window).on('scroll', handleScroll);
      handleScroll(); // Initialize
    }
  }

  setupScrollSpy() {
    const $sections = $('section[id]');
    const $navLinks = $('.main-navigation a[href^="#"]');

    if ($sections.length && $navLinks.length) {
      const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            $navLinks.removeClass('active');
            $navLinks.filter('[href="#' + currentId + '"]').addClass('active');
          }
        });
      }, observerOptions);

      $sections.each(function() {
        observer.observe(this);
      });
    }
  }
}
