<?php
/**
 * The main template file
 */

get_header();
?>

    <main id="main" class="site-main">
        <div class="container">
            <?php if (have_posts()) : ?>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <?php while (have_posts()) : the_post(); ?>
                        <article id="post-<?php the_ID(); ?>" <?php post_class('site-content'); ?>>
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="post-thumbnail mb-4">
                                    <?php the_post_thumbnail('medium', array('class' => 'w-full h-48 object-cover rounded-t-lg')); ?>
                                </div>
                            <?php endif; ?>

                            <header class="entry-header mb-4">
                                <?php the_title('<h2 class="entry-title text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"><a href="' . esc_url(get_permalink()) . '" rel="bookmark" class="block">', '</a></h2>'); ?>
                                <div class="entry-meta text-sm text-gray-500 space-x-4">
                                    <span class="posted-on">
                                        <i class="far fa-calendar-alt mr-1"></i><?php echo get_the_date(); ?>
                                    </span>
                                    <span class="byline">
                                        <i class="far fa-user mr-1"></i><?php echo get_the_author(); ?>
                                    </span>
                                </div>
                            </header>

                            <div class="entry-content mb-4">
                                <p class="text-gray-600"><?php echo wp_trim_words(get_the_excerpt(), 20, '...'); ?></p>
                            </div>

                            <footer class="entry-footer">
                                <a href="<?php the_permalink(); ?>" class="read-more inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                    <?php _e('Ler mais', 'spider-theme'); ?>
                                </a>

                                <div class="mt-3 flex flex-wrap gap-2">
                                    <?php
                                    $categories = get_the_category();
                                    if ($categories) {
                                        foreach ($categories as $category) {
                                            echo '<span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">' . $category->name . '</span>';
                                        }
                                    }
                                    ?>
                                </div>
                            </footer>
                        </article>
                    <?php endwhile; ?>
                </div>

                <div class="navigation mt-12">
                    <?php
                    the_posts_navigation(array(
                        'prev_text' => '<span class="nav-previous">' . __('Posts anteriores', 'spider-theme') . '</span>',
                        'next_text' => '<span class="nav-next">' . __('Posts seguintes', 'spider-theme') . '</span>',
                    ));
                    ?>
                </div>

            <?php else : ?>
                <div class="site-content text-center py-12">
                    <h1 class="entry-title text-3xl font-bold text-gray-900 mb-4"><?php _e('Nenhum post encontrado', 'spider-theme'); ?></h1>
                    <p class="text-gray-600 mb-6"><?php _e('Desculpe, mas não há posts para exibir no momento.', 'spider-theme'); ?></p>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                        <?php _e('Voltar ao início', 'spider-theme'); ?>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </main>

<?php
get_sidebar();
get_footer();
