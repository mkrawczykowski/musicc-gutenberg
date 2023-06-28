<?php defined('ABSPATH') or die; ?>

<a class="logo" href="<?php echo site_url(); ?>">
  <picture>
    <source type="image/webp"
      srcset="
        <?php echo get_stylesheet_directory_uri(); ?>/public/images/logo-desktop@1x.png 1x,
        <?php echo get_stylesheet_directory_uri(); ?>/public/images/logo-desktop@2x.png 2x,
        <?php echo get_stylesheet_directory_uri(); ?>/public/images/logo-mobile@1x.png 1x,
        <?php echo get_stylesheet_directory_uri(); ?>/public/images/logo-mobile@2x.png 2x,
      "
      sizes="
        (max-width: 1400px) 163px,
        317px
      ">
    <img
      srcset="
        <?php echo get_stylesheet_directory_uri(); ?>/public/images/logo-desktop@1x.png 1x,
        <?php echo get_stylesheet_directory_uri(); ?>/public/images/logo-desktop@2x.png 2x,
        <?php echo get_stylesheet_directory_uri(); ?>/public/images/logo-mobile@1x.png 1x,
        <?php echo get_stylesheet_directory_uri(); ?>/public/images/logo-mobile@2x.png 2x,
        "
      sizes="
        (max-width: 1400px) 163px,
        317px
      "
      src="<?php echo get_stylesheet_directory_uri(); ?>/public/images/logo@1x.png"
      alt="logo"
      loading="eager"
      decoding="async"
      width="163"
      height="20">
  </picture>  
</a>

