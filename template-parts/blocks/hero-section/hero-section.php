<?php defined('ABSPATH') or die; ?>

<?php
  $heading = get_field('heading');
  $paragraph = get_field('paragraph');
?>

<section class="hero-section">
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
      <div class="col">
        
      </div>
    </div>
  </div>
</div>