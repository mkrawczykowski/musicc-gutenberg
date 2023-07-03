<?php defined('ABSPATH') or die; ?>

<?php
  $heading = get_field('heading');
  $paragraph = get_field('paragraph');
  $number_of_tracks = get_field('number_of_tracks');
  $layout = get_field('layout');
?>

<section class="filtering-tracks">
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
    <div class="row row--with-sidebar">
      <div class="col">
        <?php

        function build_terms_filter_widget($taxonomy_slug){
          $instrument_terms = get_terms(array(
            'taxonomy' => $taxonomy_slug,
            'hide_empty' => false,
          ));

          $taxonomy_label = get_taxonomy($taxonomy_slug)->label;

          if (($instrument_terms) && (!is_wp_error($instrument_terms))) : ?>
            <div class="filtering-tracks__terms-widget">
              <h3>by <?php echo $taxonomy_label; ?></h3>
                <ul class="filtering-tracks__terms-list">
                  <?php
                    foreach ($instrument_terms as $instrument_term){
                      echo '<li class="filtering-tracks__term" data-filter-taxonomy="' . $taxonomy_slug . '" data-filter-term-id="' . $instrument_term->term_id . '">' . $instrument_term->name . '</li>';
                    }  
                  ?>
                </ul>  
            </div>
          <?php endif;
        }

        build_terms_filter_widget('instrument');
        build_terms_filter_widget('mood');
        build_terms_filter_widget('track-type');
      ?>
        
      </div>
      <div class="col filtering-tracks__tracks">
        <div class="filtering-tracks__loading-list" id="js-loading-list"></div>
        <div class="filtering-tracks__tracks-col" id="js-col-tracks"></div>
          <?php
            
            // $number_of_tracks_final = $number_of_tracks ? $number_of_tracks : 3;

            // if ($type === 'latest'){
            //   $type_for_loop = '';
            //   $value_for_loop = '';
            // }

            // if ($type === 'featured'){
            //   $type_for_loop = $type;
            //   $value_for_loop = true;
            // }

            // $args = array(
            //   'post_type' => 'track',
            //   'post_status' => 'publish',
            //   'posts_per_page' => $number_of_tracks_final,
            //   'orderby' => 'date', 
            //   'order' => 'DESC',
            //   'meta_key' => $type_for_loop,
            //   'meta_value' => $value_for_loop,
            // );

            // display_tracks($args);
          ?>

      </div>
    </div>
  </div>
</section>