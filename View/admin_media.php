<?php
$header_items = ['sku', 'name'];
require 'View/header.php';

?>

<head>
    <link rel="stylesheet" href="../Assets/admin-products.css">
    <link rel="stylesheet" href="../Assets/grids.css">
</head>

<div class="flex-row container flex-column-table">
    <div>
    <?php
        include 'View/admin_menu.php';
        ?>
    </div>

    <div id="admin-media" class="width80" data-products='<?php echo json_encode($this->products, JSON_UNESCAPED_UNICODE); ?>'>
    </div>
</div>

<script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>