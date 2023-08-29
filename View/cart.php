<head>
    <link rel="stylesheet" href="../Assets/cart.css">
</head>

<?php include 'View/header.php' ?>

<?php if (isset($_SESSION['cart'])) : ?>
    <div class="container">
        <div class="cart">
            <div class="cart-list">
                <?php foreach ($_SESSION['cart'] as $cart_item => $value) : ?>
                    <div class="cart-item">
                        <div class="cart-item_image">
                            <img src="<?php echo $value['image']; ?>" />
                        </div>

                        <div class="cart-item_info">
                            <div>
                                <?php echo $value['name'] . '/' . $value['sku']; ?>
                            </div>
                            <div>
                                кількість: <?php echo $value['quantity']; ?>
                            </div>
                            <div>
                                розмір: <?php echo $value['size']; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach ?>
            </div>

            <button class="cart-submit">
                 <a href="/checkout">
                    Оформити замовлення
                 </a>
            </button>
        </div>
    </div>
<?php else : ?>
    <div>
        Корзина пуста
    </div>

<?php endif ?>