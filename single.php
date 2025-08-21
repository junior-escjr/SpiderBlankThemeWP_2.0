<?php
/**
 * The template for displaying all single posts
 */

get_header();
?>

    <main id="main" class="site-main">
        <div class="container">
            <?php if (have_posts()) : ?>
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('site-content max-w-4xl mx-auto'); ?>>
                        <header class="entry-header mb-8">
                            <?php the_title('<h1 class="entry-title mb-4">', '</h1>'); ?>

                            <div class="entry-meta flex flex-wrap gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                                <span class="posted-on">
                                    <i class="far fa-calendar-alt mr-1"></i><?php echo get_the_date(); ?>
                                </span>
                                <span class="byline">
                                    <i class="far fa-user mr-1"></i><?php echo get_the_author(); ?>
                                </span>
                                <?php if (get_the_category_list(', ')) : ?>
                                <span class="cat-links">
                                    <i class="far fa-folder-open mr-1"></i><?php echo get_the_category_list(', '); ?>
                                </span>
                            <?php endif; ?>
                                <span class="reading-time">
                                    <i class="far fa-clock mr-1"></i><?php echo ceil(str_word_count(get_the_content()) / 200); ?> min de leitura
                                </span>
                        </div>
                    </header>

                    <?php if (has_post_thumbnail()) : ?>
                        <div class="post-thumbnail mb-8">
                            <?php the_post_thumbnail('large', array('class' => 'w-full h-auto rounded-lg shadow-lg')); ?>
                        </div>
                    <?php endif; ?>

                    <div class="entry-content prose prose-lg max-w-none mb-8">
                        <?php
                        the_content(sprintf(
                            wp_kses(
                                __('Continue lendo<span class="screen-reader-text"> "%s"</span>', 'spider-theme'),
                                array(
                                    'span' => array(
                                        'class' => array(),
                                    ),
                                )
                            ),
                            get_the_title()
                        ));

                        wp_link_pages(array(
                            'before' => '<div class="page-links flex justify-center space-x-2 mt-8">' . esc_html__('Páginas:', 'spider-theme'),
                            'after'  => '</div>',
                            'link_before' => '<span class="px-3 py-2 bg-gray-200 rounded">',
                            'link_after' => '</span>',
                        ));
                        ?>
                    </div>

                    <footer class="entry-footer pt-6 border-t border-gray-200">
                        <?php if (get_the_tag_list()) : ?>
                            <div class="tag-links mb-6">
                                <h3 class="text-sm font-semibold text-gray-700 mb-2"><?php _e('Tags:', 'spider-theme'); ?></h3>
                                <div class="flex flex-wrap gap-2">
                                    <?php
                                    $tags = get_the_tags();
                                    if ($tags) {
                                        foreach ($tags as $tag) {
                                            echo '<span class="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">' . $tag->name . '</span>';
                                        }
                                    }
                                    ?>
                                </div>
                            </div>
                        <?php endif; ?>
                    </footer>
                </article>

                <?php
                // Previous/next post navigation.
                the_post_navigation(array(
                    'next_text' => '<span class="meta-nav" aria-hidden="true">' . __('Próximo', 'spider-theme') . '</span> ' .
                        '<span class="screen-reader-text">' . __('Próximo post:', 'spider-theme') . '</span> ' .
                        '<span class="post-title">%title</span>',
                    'prev_text' => '<span class="meta-nav" aria-hidden="true">' . __('Anterior', 'spider-theme') . '</span> ' .
                        '<span class="screen-reader-text">' . __('Post anterior:', 'spider-theme') . '</span> ' .
                        '<span class="post-title">%title</span>',
                ));
                ?>

                <?php
                // If comments are open or we have at least one comment, load up the comment template.
                if (comments_open() || get_comments_number()) :
                    comments_template();
                endif;
                ?>

            <?php endwhile; ?>
        <?php endif; ?>
    </div>
</main>

<?php
get_sidebar();
get_footer();
