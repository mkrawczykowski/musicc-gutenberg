<?php

acf_register_block(array(
  'name'              => 'cards-with-icons',
  'title'             => __('Cards with icons'),
  'description'       => __('A block with industry cards witf files to download'),
  'render_callback'   => 'cards_with_icons__callback',
  'category'          => 'custom',
  'icon'              => 'admin-comments',
  'keywords'          => array( 'icons', 'cards', 'download', 'pdf' ),
));

function cards_with_icons__callback( $block ) {
  $slug = str_replace('acf/', '', $block['name']);
    
  if( file_exists( get_theme_file_path("/template-parts/blocks/{$slug}/{$slug}.php") ) ) {
    include( get_theme_file_path("/template-parts/blocks/{$slug}/{$slug}.php") );
  }
}