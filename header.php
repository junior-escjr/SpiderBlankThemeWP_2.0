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

            <nav id="site-navigation" class="main-navigation">
                <?php
                // Menu de teste para verificar se está funcionando
                if (has_nav_menu('main-menu')) {
                    wp_nav_menu(array(
                        'theme_location' => 'main-menu',
                        'menu_id'        => 'primary-menu',
                        'menu_class'     => 'hidden md:flex md:space-x-8 list-none',
                        'container'      => false,
                    ));
                } else {
                    // Menu de fallback se não houver menu criado
                    echo '<ul id="primary-menu" class="hidden md:flex md:space-x-8 list-none">';
                    echo '<li class="border-b border-gray-200 md:border-b-0"><a href="' . home_url('/') . '" class="block px-5 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-300">Início</a></li>';
                    echo '<li class="border-b border-gray-200 md:border-b-0"><a href="' . home_url('/sobre') . '" class="block px-5 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-300">Sobre</a></li>';
                    echo '<li class="border-b border-gray-200 md:border-b-0"><a href="' . home_url('/contato') . '" class="block px-5 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-300">Contato</a></li>';
                    echo '</ul>';
                }
                ?>
            </nav>

            <button class="mobile-menu-toggle md:hidden bg-none border-none p-2.5 cursor-pointer" aria-expanded="false" aria-label="Toggle mobile menu">
                <span class="menu-icon"></span>
            </button>
        </div>
    </header>
