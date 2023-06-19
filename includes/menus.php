<?php
function register_my_menus() {
  register_nav_menus(
    array(
      'header-menu' => __( 'Główna nawigacja' ),
      'footer-menu' => __( 'Nawigacja w stopce' )
    )
  );
}
add_action( 'init', 'register_my_menus' );
?>