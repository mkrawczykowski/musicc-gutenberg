<?php defined('ABSPATH') or die; ?>

<?php

//Remove Gutenberg Block Library CSS from loading on the frontend
function remove_wp_block_library_css(){
  wp_dequeue_style( 'wp-block-library' );
  wp_dequeue_style( 'wp-block-library-theme' );
  wp_dequeue_style( 'wc-blocks-style' ); // Remove WooCommerce block CSS
} 
add_action( 'wp_enqueue_scripts', 'remove_wp_block_library_css', 100 );

function acf_init_blocks() {
  if( function_exists('acf_register_block') ) {
    require_once get_template_directory() . '/includes/acf-blocks/list-of-tracks/register-list-of-tracks.php';
    require_once get_template_directory() . '/includes/acf-blocks/filtering-tracks/register-filtering-tracks.php';
    require_once get_template_directory() . '/includes/acf-blocks/hero-section/register-hero-section.php';
  }
}
add_action('acf/init', 'acf_init_blocks');