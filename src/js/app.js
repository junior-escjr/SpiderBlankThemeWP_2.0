// App JavaScript - Entry point
import './modules/navigation.js';
import './modules/scroll-reveal.js';
import './modules/theme-toggle.js';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Spider Theme loaded');
    
    // Add any global initialization here
    initializeTheme();
});

function initializeTheme() {
    // Global theme initialization
    console.log('Theme initialized');
}
