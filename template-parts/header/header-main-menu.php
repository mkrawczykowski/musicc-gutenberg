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

  /**
   * Generates ul list widget in mega menu
   * @param string $widget_slug Prefix of ACF fields in this widget's group
   * @param string $taxonomy_slug Slug of this particular taxonomy
   * @param array $mega_menu Array of fields taken from get_sub_field('mega_menu', 'options'); in mega_menu_1
   */

  function generate_list_menu_widget($widget_slug, $taxonomy_slug, $mega_menu){
    $generated_widget_name = $widget_slug . '_widget_name';
    $generated_how_many_items = $widget_slug . '_how_many_items_before_show_all_link';
    $generated_show_all_label = $widget_slug . '_show_all_label';
    $generated_show_all_link = $widget_slug . '_show_all_link';

    $widget_name = $mega_menu[$generated_widget_name];
    $how_many_items = $mega_menu[$generated_how_many_items];
    $generated_show_all_label = $mega_menu[$generated_show_all_label];
    $generated_show_all_link = $mega_menu[$generated_show_all_link];

    $terms = get_terms($taxonomy_slug);?>
    <div class="main-menu__widget">
      <h3 class="main-menu__widget-name"><?php echo $widget_name; ?></h3>
      <ul class="main-menu__widget-list">
        <?php
        $countTerms = count($terms);
        $iterating_length = $how_many_items >= $countTerms ? $countTerms : $how_many_items;
         
        for ($i = 0; $i < $iterating_length ; $i++) : ?>
          <li class="main-menu__widget-list-item">
            <a href="<?php the_permalink($terms[$i]->term_id); ?>" class="main-menu__widget-list-link">
              <?php echo $terms[$i]->name; ?>
            </a>
          </li>
        <?php endfor; ?>
      </ul>
      <?php
        if ($generated_show_all_link && $generated_show_all_label): ?>
          <a class="main-menu__widget-link" href="<?php echo $generated_show_all_link; ?>">
            <?php echo $generated_show_all_label; ?>
          </a>
      <?php endif; ?>
    </div>
  <?php
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
          generate_menu_link(get_the_permalink($external_link_link->ID), esc_html($external_link_custom_label), '');
        break;
        case 'mega_menu_1';
          $mega_menu = get_sub_field('mega_menu', 'options');
          $mega_menu_label = get_sub_field('mega_menu_label', 'options');

          generate_list_menu_widget('moods', 'mood', $mega_menu);
          generate_list_menu_widget('instruments', 'instrument', $mega_menu);
        break;
      }
    endwhile;

endif;
?>

  
    <!-- <li class="main-menu__menu-item"><a href="" class="main-menu__menu-link">Link</a></li> -->
    
  </ul>
</div>