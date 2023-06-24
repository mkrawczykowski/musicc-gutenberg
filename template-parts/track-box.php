<?php
  $track_title = $args['track_title'];
  $track_description = $args['track_description'];
?>

<div class="track">
	<h3 class="track-name">Please, don't stop the music</h3>
	<p class="track-description"><?php echo $track_description; ?></p>
	
  <div class="track-box">
		<div class="track-box__player">
			<button class="track-box__button track-box__button--pause"></button>
			<h3 class="track-box__player-name"><?php echo $track_title; ?></h3>
			<div class="track-box__track">
				<span class="track-box__pointer"></span>
			</div>
			<span class="track-box__time">05:50</span>
		</div>
		
    <ul class="track-box__icons">
			<li class="track-box__icon track-box__icon--download"></li>
			<li class="track-box__icon track-box__icon--share"></li>
		</ul>
	</div>
	
  <ul class="track-terms">
	  <li class="track__term"><a href="">happy</a></li>
	  <li class="track__term"><a href="">mysterious</a></li>
	  <li class="track__term"><a href="">happy</a></li>
	  <li class="track__term"><a href="">warm</a></li>
	  <li class="track__term"><a href="">happy</a></li>
	  <li class="track__term"><a href="">mysterious</a></li>
	  <li class="track__term"><a href="">happy</a></li>
	  <li class="track__term"><a href="">piano</a></li>
	  <li class="track__term"><a href="">warm</a></li>
	  <li class="track__term"><a href="">mysterious</a></li>
	  <li class="track__term"><a href="">piano</a></li>
	  <li class="track__term"><a href="">happy</a></li>
	</ul>
</div>