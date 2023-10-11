<?php require 'View/header.php';?>

<head>
    <link rel="stylesheet" href="../Assets/products.css">
</head>

<div id="products" data-products='<?php echo json_encode($this->products, JSON_UNESCAPED_UNICODE ); ?>'>
</div>

<?php require 'View/footer.php'; ?>