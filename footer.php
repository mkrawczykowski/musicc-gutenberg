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
  <script>
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

      const getCookie = (name) => {
        return document.cookie.split('; ').reduce((r, v) => {
          const parts = v.split('=')
          return parts[0] === name ? decodeURIComponent(parts[1]) : r
        }, '')
      }

      // setCookie('cookiename', 'yes', 100000000000);
      console.log(getCookie('cookiename'));
      if (getCookie('cookiename') === ''){
        console.log('no cookie')
      }
      if (getCookie('cookiename') === 'yes'){
        console.log('cookie with yes')
      }

      // document.body.style.overflow = "hidden";
  </script>

</body>
</html>