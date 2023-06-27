<?php
  $track_title = $args['track_title'];
  $track_description = $args['track_description'];
  $track_length = $args['track_length'];
  $track_url = $args['track_url'];
  $attributes = $args['attributes'];
?>

<div class="track">
	<h3 class="track-name"><?php echo $track_title; ?></h3>
	<p class="track-description"><?php echo $track_description; ?></p>
	
  <div class="track-box">
		<div class="track-box__player">
			<button class="track-box__button track-box__button--pause"></button>
			<h3 class="track-box__player-name"><?php echo $track_title; ?></h3>
			<div class="track-box__track">
				<span class="track-box__pointer"></span>
			</div>
			<span class="track-box__time"><?php echo $track_length; ?></span>
		</div>
		
    <ul class="track-box__icons">
			<li class="track-box__icon track-box__icon--download"><a href="#" target="_blank" rel="nofollow" class="track-box__link"></a></li>
			<li class="track-box__icon track-box__icon--share"><a href="#" target="_blank" rel="nofollow" class="track-box__link"></a></li>
		</ul>
	</div>
	<?php
	if ($attributes) : ?>
		<ul class="track-terms">
			<?php
				foreach($attributes as $attribute){
  				foreach ($attribute['options'] as $attribute){
    				$attribute_name = get_term($attribute)->name;
    				echo '<li class="track__term">'.$attribute_name.'</li>';
  				}
				}
			?>
		</ul>
	<?php endif; ?>
</div>