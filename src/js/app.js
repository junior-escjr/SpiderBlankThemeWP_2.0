// App JavaScript - Entry point - jQuery version
import Navigation from './modules/navigation.js';
import ScrollReveal from './modules/scroll-reveal.js';
import FormValidation from './modules/form-validation.js';

// Initialize app
$(document).ready(function() {
    console.log('Spider Theme loaded');
    
    // Add any global initialization here
    initializeTheme();
});

function initializeTheme() {
    // Global theme initialization
    console.log('Theme initialized');
    
    // Initialize all modules
    new Navigation();
    new ScrollReveal();
    new FormValidation();
}
