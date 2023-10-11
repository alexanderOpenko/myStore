<?php
include 'View/header.php';
$order = $this->order_info[0];
?>

<div class="container text-center">
    <div class="order-success-banner body24">
        Замовлення оформлено та передано в обробку
    </div>

    <div class="order-id body24">
        <div>Ваше замовлення</div>
        <div>№ <?php echo $order['id'] ?></div>
    </div>

    <div class="bold-label body18">
        Очікуйте зворотній зв'язок про підтвердження замовлення
    </div>
</div>

<?php
require 'View/footer.php';
?>