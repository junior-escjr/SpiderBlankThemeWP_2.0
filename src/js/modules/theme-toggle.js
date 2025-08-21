// Theme toggle module (for dark/light mode)

export default class ThemeToggle {
  constructor() {
    this.init();
  }

  init() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.setupThemeToggle();
    this.applyTheme();
  }

  setupThemeToggle() {
    const toggleButton = document.querySelector('.theme-toggle');

    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        this.toggleTheme();
      });

      // Set initial button state
      this.updateToggleButton();
    }

    // Listen for system theme changes
    this.setupSystemThemeListener();
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    this.saveTheme();
    this.updateToggleButton();
  }

  applyTheme() {
    if (this.theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  saveTheme() {
    localStorage.setItem('theme', this.theme);
  }

  updateToggleButton() {
    const toggleButton = document.querySelector('.theme-toggle');
    const toggleIcon = toggleButton?.querySelector('i, svg');

    if (toggleButton) {
      const isDark = this.theme === 'dark';
      toggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

      if (toggleIcon) {
        toggleIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
  }

  setupSystemThemeListener() {
    // Listen for system theme changes if no manual preference is set
    if (!localStorage.getItem('theme')) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      mediaQuery.addEventListener('change', (e) => {
        this.theme = e.matches ? 'dark' : 'light';
        this.applyTheme();
      });
    }
  }

  // Get current theme
  getCurrentTheme() {
    return this.theme;
  }

  // Set specific theme
  setTheme(theme) {
    this.theme = theme;
    this.applyTheme();
    this.saveTheme();
    this.updateToggleButton();
  }
}
