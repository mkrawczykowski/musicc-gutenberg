<?php

function disable_classic_theme_styles() {
    wp_deregister_style('classic-theme-styles');
    wp_dequeue_style('classic-theme-styles');
}
add_filter('wp_enqueue_scripts', 'disable_classic_theme_styles', 100);


function my_scripts(){
  wp_enqueue_style('main-style', get_stylesheet_directory_uri() . '/dist/style.min.css');
  wp_enqueue_script('main-scripts', get_stylesheet_directory_uri() . '/dist/scripts.min.js');
}
add_action('wp_enqueue_scripts', 'my_scripts');