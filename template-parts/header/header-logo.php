<?php defined('ABSPATH') or die; ?>

<a class="logo" href="<?php echo site_url(); ?>">
  <img src="<?php echo get_stylesheet_directory_uri(); ?>/public/logo.svg" alt="LOGO" width="92" height="39">
</a>

<picture>
  <source type="image/webp"
    srcset="
      https://images.ctfassets.net/.../paris.jpg?w=100&fm=webp 100w,
      https://images.ctfassets.net/.../paris.jpg?w=200&fm=webp 200w,
      ..."
    sizes="
      (max-width: 768px) calc(100vw - 3em),
      (max-width: 1376px) calc(50vw - 8em),
      550px">
  <img
    srcset="
      https://images.ctfassets.net/.../paris.jpg?w=100&fm=jpg&fl=progressive 100w,
      https://images.ctfassets.net/.../paris.jpg?w=200&fm=jpg&fl=progressive 200w,
      ..."
    sizes="
      (max-width: 768px) calc(100vw - 3em),
      (max-width: 1376px) calc(50vw - 8em),
      550px"
    src="https://images.ctfassets.net/.../paris.jpg"
    alt="Buildings of Paris"
    loading="lazy"
    decoding="async"
    width="1243"
    height="1500">
</picture>