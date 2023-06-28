<?php defined('ABSPATH') or die; ?>

<?php

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