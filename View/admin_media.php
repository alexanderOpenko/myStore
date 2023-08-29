<?php
$header_items = ['sku', 'name'];
include 'View/header.php';
?>

<head>
    <link rel="stylesheet" href="../Assets/admin-products.css">
    <link rel="stylesheet" href="../Assets/grids.css">
</head>

<div class="flex-row container">
    <?php
    include 'View/admin_menu.php';
    ?>
    <div id="admin-media" class="width80" data-products='<?php echo json_encode($this->products, JSON_UNESCAPED_UNICODE); ?>'>
    </div>
</div>

<script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
<script src="../components/build/components.bundle.js"></script>