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
    <div class="row <?php echo $layout === 'arrow' ? 'row--arrow' : NULL; ?>">
      <?php
        echo $layout === 'arrow' ? '<div class="col">&nbsp;</div>' : NULL;
      ?>
      <div class="col">
        <?php

        function build_terms_filter_widget($taxonomy_slug){
          $instrument_terms = get_terms(array(
            'taxonomy' => $taxonomy_slug,
            'hide_empty' => false,
          ));

          $taxonomy_label = get_taxonomy($taxonomy_slug)->label;

          if (($instrument_terms) && (!is_wp_error($instrument_terms))) : ?>
          
            <h3>by <?php echo $taxonomy_label; ?></h3>
            <ul class="filtering-tracks__terms-widget">
              <?php
                foreach ($instrument_terms as $instrument_term){
                  // print_r($instrument_term);
                  echo '<li class="filtering-tracks__terms-widget" data-filter-taxonomy="' . $taxonomy_slug . '" data-filter-term="' . $instrument_term->term_id . '">' . $instrument_term->name . '</li>';
                }  
              ?>
            </ul>
          <?php endif;
        }

        build_terms_filter_widget('instrument');
        build_terms_filter_widget('mood');
        build_terms_filter_widget('track-type');
      ?>

      <script>
        document.addEventListener('DOMContentLoaded', ()=>{
          console.log('inline');

          async function logJSONData(){
            await fetch('https://musicc-gutenberg.test/wp-json/wp/v2/track?mood=4,57')
            .then(response => {
              console.log(typeof response);
              if (response.status === 200){
                console.log('ok');
                return response.json();
              } else {
                console.log('nok');
              }
            })
            .then(data => {
              data.forEach((dataItem => console.log(dataItem)));
            })
          };

          logJSONData();
        });
        
      </script>
        
      </div>
      <div class="col">

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