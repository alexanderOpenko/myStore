<?php include 'View/header.php'; ?>

<head>
    <link rel="stylesheet" href="../Assets/grids.css">
    <link rel="stylesheet" href="../Assets/products.css">
</head>

<div id="products" data-products='<?php echo json_encode($this->products, JSON_UNESCAPED_UNICODE ); ?>'>
</div>

<script src="../components/build/components.bundle.js"></script>
