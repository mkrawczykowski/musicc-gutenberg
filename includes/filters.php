<?php

  add_action('admin_head', 'styling_acf_sections');

  function styling_acf_sections() {
    echo '<style>
      .acf-flexible-content .layout .acf-fc-layout-handle {
        line-height: 2em;
        background-color: #dcdcdc;
        font-size: 18px;
      } 
    </style>';
  }
?>