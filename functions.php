<?php
/**
 * Spider Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Spider_Theme
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function spider_theme_setup() {
    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title.
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support('post-thumbnails');

    // This theme uses wp_nav_menu() in one location.
    register_nav_menus(array(
        'main-menu' => esc_html__('Menu Principal', 'spider-theme'),
    ));

    // Switch default core markup for search form, comment form, and comments to output valid HTML5.
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Add theme support for selective refresh for widgets.
    add_theme_support('customize-selective-refresh-widgets');

    // Add support for custom logo.
    add_theme_support('custom-logo', array(
        'height'      => 250,
        'width'       => 250,
        'flex-width'  => true,
        'flex-height' => true,
    ));

    // Add support for custom background.
    add_theme_support('custom-background', array(
        'default-color' => 'ffffff',
    ));

    // Add support for editor styles.
    add_theme_support('editor-styles');
    add_editor_style('style.css');
}
add_action('after_setup_theme', 'spider_theme_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 */
function spider_theme_content_width() {
    $GLOBALS['content_width'] = apply_filters('spider_theme_content_width', 1200);
}
add_action('after_setup_theme', 'spider_theme_content_width', 0);

/**
 * Register widget areas.
 */
function spider_theme_widgets_init() {
    register_sidebar(array(
        'name'          => esc_html__('Sidebar Principal', 'spider-theme'),
        'id'            => 'sidebar-1',
        'description'   => esc_html__('Adicione widgets aqui para aparecer na sidebar.', 'spider-theme'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => esc_html__('Footer 1', 'spider-theme'),
        'id'            => 'footer-1',
        'description'   => esc_html__('Primeira coluna do footer.', 'spider-theme'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => esc_html__('Footer 2', 'spider-theme'),
        'id'            => 'footer-2',
        'description'   => esc_html__('Segunda coluna do footer.', 'spider-theme'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'spider_theme_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function spider_theme_scripts() {
    // Enqueue Tailwind CSS from CDN (v4.1.12 - latest stable)
    wp_enqueue_style('tailwindcss', 'https://cdn.jsdelivr.net/npm/tailwindcss@4.1.12/dist/tailwind.min.css', array(), '4.1.12');

    // Check if we have compiled assets, fallback to source files
    $css_file = file_exists(get_template_directory() . '/static/css/app.min.css')
        ? '/static/css/app.min.css'
        : (file_exists(get_template_directory() . '/static/css/app.css') 
            ? '/static/css/app.css' 
            : get_stylesheet_uri());

    $js_file = file_exists(get_template_directory() . '/static/js/app.min.js')
        ? '/static/js/app.min.js'
        : '/src/js/app.js';

    // Enqueue main stylesheet
    wp_enqueue_style('spider-theme-style', get_template_directory_uri() . $css_file, array('tailwindcss'), wp_get_theme()->get('Version'));

    // Enqueue comment reply script on single posts
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    // Enqueue main JavaScript
    wp_enqueue_script('spider-theme-main', get_template_directory_uri() . $js_file, array(), wp_get_theme()->get('Version'), true);

    // Localize script for AJAX and other dynamic data
    wp_localize_script('spider-theme-main', 'spider_theme_vars', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'theme_url' => get_template_directory_uri(),
        'is_mobile' => wp_is_mobile(),
        'current_user_id' => get_current_user_id(),
    ));
}
add_action('wp_enqueue_scripts', 'spider_theme_scripts');

/**
 * Custom excerpt length
 */
function spider_theme_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'spider_theme_excerpt_length', 999);

/**
 * Custom excerpt more
 */
function spider_theme_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'spider_theme_excerpt_more');

/**
 * Add custom classes to body
 */
function spider_theme_body_classes($classes) {
    // Adds a class of hfeed to non-singular pages.
    if (!is_singular()) {
        $classes[] = 'hfeed';
    }

    // Adds a class of no-sidebar when there is no sidebar present.
    if (!is_active_sidebar('sidebar-1')) {
        $classes[] = 'no-sidebar';
    }

    return $classes;
}
add_filter('body_class', 'spider_theme_body_classes');

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function spider_theme_pingback_header() {
    if (is_singular() && pings_open()) {
        printf('<link rel="pingback" href="%s">', esc_url(get_bloginfo('pingback_url')));
    }
}
add_action('wp_head', 'spider_theme_pingback_header');
