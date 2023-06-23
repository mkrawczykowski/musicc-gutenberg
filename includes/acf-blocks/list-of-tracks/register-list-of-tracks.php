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

function register_list_of_tracks() {
    if ( ! function_exists( 'register_block_type' ) ) {
      return;
    }

    register_block_type(
	    __DIR__ . '/',
	    array(
		    'icon' => 'admin-home',
	    )
    );
}

add_action( 'init', 'register_list_of_tracks' );