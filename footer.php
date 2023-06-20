<?php defined('ABSPATH') or die; ?>    
    
<footer class="footer">
  <div class="container">
    <hr>
    <div class="row">
      <div class="col col--padding">
        <?php
          the_field('footer_text', 'options');
        ?>
      </div>
    </div>
  </div>   
</footer>

  <?php wp_footer(); ?>

</body>
</html>