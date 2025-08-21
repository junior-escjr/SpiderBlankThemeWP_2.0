<?php
/**
 * The template for displaying comments
 */

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area">
    <?php if (have_comments()) : ?>
        <h3 class="comments-title">
            <?php
            $comments_number = get_comments_number();
            if (1 === $comments_number) {
                printf(_x('Um comentário', 'comments title', 'spider-theme'));
            } else {
                printf(
                    _nx(
                        '%1$s comentário',
                        '%1$s comentários',
                        $comments_number,
                        'comments title',
                        'spider-theme'
                    ),
                    number_format_i18n($comments_number)
                );
            }
            ?>
        </h3>

        <ol class="comment-list">
            <?php
            wp_list_comments(array(
                'avatar_size' => 100,
                'style'       => 'ol',
                'short_ping'  => true,
                'reply_text'  => __('Responder', 'spider-theme'),
            ));
            ?>
        </ol>

        <?php the_comments_pagination(array(
            'prev_text' => __('Comentários anteriores', 'spider-theme'),
            'next_text' => __('Comentários seguintes', 'spider-theme'),
        )); ?>

    <?php endif; ?>

    <?php
    if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')) :
    ?>
        <p class="no-comments"><?php _e('Comentários estão fechados.', 'spider-theme'); ?></p>
    <?php endif; ?>

    <?php
    comment_form(array(
        'title_reply_before' => '<h3 id="reply-title" class="comment-reply-title">',
        'title_reply_after'  => '</h3>',
        'title_reply'        => __('Deixe um comentário', 'spider-theme'),
        'title_reply_to'     => __('Responder %s', 'spider-theme'),
        'cancel_reply_link'  => __('Cancelar resposta', 'spider-theme'),
        'label_submit'       => __('Enviar comentário', 'spider-theme'),
        'fields' => array(
            'author' => '<p class="comment-form-author"><label for="author">' . __('Nome', 'spider-theme') . '</label> ' .
                        '<input id="author" name="author" type="text" value="' . esc_attr($commenter['comment_author']) . '" size="30" /></p>',
            'email'  => '<p class="comment-form-email"><label for="email">' . __('Email', 'spider-theme') . '</label> ' .
                        '<input id="email" name="email" type="text" value="' . esc_attr($commenter['comment_author_email']) . '" size="30" /></p>',
        ),
        'comment_field' => '<p class="comment-form-comment"><label for="comment">' . __('Comentário', 'spider-theme') . '</label> ' .
                          '<textarea id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea></p>',
    ));
    ?>
</div>
