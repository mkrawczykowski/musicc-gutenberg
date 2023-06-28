<?php defined('ABSPATH') or die; ?>

<?php
  $heading = get_field('heading');
  $paragraph = get_field('paragraph');
  $type = get_field('type');
  $number_of_tracks = get_field('number_of_tracks');
  $layout = get_field('layout');

  /**
  *  @param array $args WP_Query parameters array, see https://developer.wordpress.org/reference/classes/wp_query/parse_query/
  */

  if (!function_exists('display_tracks')){
  function display_tracks($args){
        
    $posts = get_posts($args);

    if( $posts ):
      global $post;
      foreach( $posts as $post ): 
        setup_postdata( $post );
        // global $product;
        // $product_attributes = $product->get_attributes();
        $terms = get_terms(array('taxonomy' => ['instrument', 'mood']));
        // print("<pre>".print_r($terms,true)."</pre>");

          get_template_part( 'template-parts/track-box', '', array(
            'track_title'       => get_the_title(),
            'track_description' => get_the_excerpt(),
            'track_length'      => get_field('track_length', $post->ID),
            'track_url'         => get_field('track_url', $post->ID),
            'terms'             => $terms
          ));
      endforeach; 
      wp_reset_postdata();
    endif;
  }  
}
?>
<section class="list-of-tracks">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="heading-text">
          <?php
            echo $heading ? '<h2 class="heading-text__heading">' . $heading . '</h2>' : NULL;
          ?>
          <?php
            echo $paragraph ? '<p class="heading-text__text">' . $paragraph . '</p>' : NULL;
          ?>
				</div>
      </div>
    </div>
    <div class="row <?php echo $layout === 'arrow' ? 'row--arrow' : NULL; ?>">
      <?php
        echo $layout === 'arrow' ? '<div class="col">&nbsp;</div>' : NULL;
      ?>
      <div class="col">

          <?php
            
            $number_of_tracks_final = $number_of_tracks ? $number_of_tracks : 3;

            if ($type === 'latest'){
              $type_for_loop = '';
              $value_for_loop = '';
            }

            if ($type === 'featured'){
              $type_for_loop = $type;
              $value_for_loop = true;
            }

            $args = array(
              'post_type' => 'track',
              'post_status' => 'publish',
              'posts_per_page' => $number_of_tracks_final,
              'orderby' => 'date', 
              'order' => 'DESC',
              'meta_key' => $type_for_loop,
              'meta_value' => $value_for_loop,
            );

            display_tracks($args);
          ?>

      </div>
    </div>
  </div>
</section>