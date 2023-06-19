<?php

//Remove Gutenberg Block Library CSS from loading on the frontend
function smartwp_remove_wp_block_library_css(){
 wp_dequeue_style( 'wp-block-library' );
 wp_dequeue_style( 'wp-block-library-theme' );
 wp_dequeue_style( 'wc-blocks-style' ); // Remove WooCommerce block CSS
} 
add_action( 'wp_enqueue_scripts', 'smartwp_remove_wp_block_library_css', 100 );


function acf_init_blocks() {
  if( function_exists('acf_register_block') ) {
    require_once get_template_directory() . '/includes/acf-blocks/register-left-text-right-image.php';        
    require_once get_template_directory() . '/includes/acf-blocks/register-logos-slider.php';        
    require_once get_template_directory() . '/includes/acf-blocks/register-two-headings-text.php';        
    require_once get_template_directory() . '/includes/acf-blocks/register-cards-with-icons.php';        
    require_once get_template_directory() . '/includes/acf-blocks/register-video-file.php';        
    require_once get_template_directory() . '/includes/acf-blocks/register-reviews-slider.php';        
    require_once get_template_directory() . '/includes/acf-blocks/register-contact-info-contact-form.php';        
  }
}
add_action('acf/init', 'acf_init_blocks');