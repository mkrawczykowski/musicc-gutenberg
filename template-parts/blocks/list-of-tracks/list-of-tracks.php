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
      $loop = new WP_Query( $args ); 
              
      while ( $loop->have_posts() ) : $loop->the_post(); 
        print the_title(); 
        the_excerpt();
      endwhile;

      wp_reset_postdata();  
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
              $args = array(
                'post_type' => 'product',
                'post_status' => 'publish',
                'posts_per_page' => $number_of_tracks_final,
                'orderby' => 'date', 
                'order' => 'ASC',
              );

              display_tracks($args);
            }

            if ($type === 'featured'){
              $args = array(  
                'post_type' => 'product',
                'post_status' => 'publish',
                'posts_per_page' => $number_of_tracks_final,
                'orderby' => 'date', 
                'order' => 'ASC',
                'meta_key' => 'featured',
                'meta_value' => true
              );

              display_tracks($args);
            }
            
          ?>

      </div>
    </div>
  </div>
</section>