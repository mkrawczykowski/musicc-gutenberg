<?php defined('ABSPATH') or die; ?>

<?php
  /** Generates main menu link (list item)
   * @param string $uri URI of menu item
   * @param string $label Label of menu item
   * @param string $target Targem of link. Can be 'blank' or empty string
   * 
  */

  function generate_menu_link($uri, $label, $target){
    $target_html = $target ? 'target="' . $target .'" ' : NULL;

    echo '<li ' . $target_html .' class="main-menu__menu-item"><a href="' . $uri .'" class="main-menu__menu-link">' . $label .'</a></li>';
  }
?>

<div class="main-menu">
<?php
if( have_rows('main_menu_repeater', 'options') ): ?>
  <ul class="main-menu__menu">
    <?php
    while( have_rows('main_menu_repeater', 'options') ) : the_row();
      $menu_item_type = get_sub_field('menu_item_type', 'options');

      switch ($menu_item_type){
        case 'internal_link';
          $internal_link = get_sub_field('internal_link', 'options');
          $internal_link_custom_label = get_sub_field('internal_link_custom_label', 'options');
          $final_title = $internal_link_custom_label ? $internal_link_custom_label : $internal_link->post_title;
          generate_menu_link(get_the_permalink($internal_link->ID), $final_title, '');
        break;
        case 'external_link';
          $external_link = get_sub_field('external_link', 'options');
          $external_link_custom_label = get_sub_field('external_link_custom_label', 'options');
          generate_menu_link(get_the_permalink($internalexternal_link_link->ID), esc_html($external_link_custom_label), '');
        break;
        case 'mega_menu_1';
          $mega_menu = get_sub_field('mega_menu', 'options');
          $mega_menu_label = get_sub_field('mega_menu_label', 'options');
        break;
      }
    endwhile;

endif;
?>

  
    <!-- <li class="main-menu__menu-item"><a href="" class="main-menu__menu-link">Link</a></li> -->
    
  </ul>
</div>