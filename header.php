<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <header id="masthead" class="site-header">
        <div class="container flex items-center justify-between py-5">
            <div class="site-branding">
                <h1 class="site-title">
                    <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                        <?php bloginfo('name'); ?>
                    </a>
                </h1>
                <?php
                $description = get_bloginfo('description', 'display');
                if ($description || is_customize_preview()) :
                ?>
                    <p class="site-description text-gray-600 mt-1"><?php echo $description; ?></p>
                <?php endif; ?>
            </div>

            <nav id="site-navigation" class="main-navigation hidden md:block">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'main-menu',
                    'menu_id'        => 'primary-menu',
                    'menu_class'     => 'flex space-x-8',
                    'container'      => false,
                ));
                ?>
            </nav>

            <button class="mobile-menu-toggle md:hidden" aria-expanded="false" aria-label="Toggle mobile menu">
                <span class="menu-icon"></span>
            </button>
        </div>
    </header>
