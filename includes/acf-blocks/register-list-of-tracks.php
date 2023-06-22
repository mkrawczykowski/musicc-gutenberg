<?php defined('ABSPATH') or die; ?>

<?php

// acf_register_block(array(
//   'name'              => 'list-of-tracks',
//   'title'             => __('List of tracks'),
//   'description'       => __('A block newest or featured tracks'),
//   'render_callback'   => 'list_of_tracks__callback',
//   'category'          => 'custom',
//   'icon'              => 'admin-comments',
//   'keywords'          => array( 'list', 'tracks', 'featured', 'newest' ),
// ));

// function list_of_tracks__callback( $block ) {
//   $slug = str_replace('acf/', '', $block['name']);
    
//   if( file_exists( get_theme_file_path("/template-parts/blocks/{$slug}/{$slug}.php") ) ) {
//     include( get_theme_file_path("/template-parts/blocks/{$slug}/{$slug}.php") );
//   }
// }

function mcqa_register_block_related_quiz() {
    if ( ! function_exists( 'register_block_type' ) ) {
      return;
    }

    register_block_type( 'acf/list-of-tracks', array(
      // 'editor_script' => 'mcqac-related-quiz-block-script',
      // 'editor_style'  => 'mcqac-related-quiz-block-editor-style',
      'style'         => 'mcqac-related-quiz-block-frontend-style',
    ));
}

add_action( 'init', 'mcqa_register_block_related_quiz' );