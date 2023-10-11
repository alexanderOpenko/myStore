<?php require 'View/header.php'; ?>

<div class="flex-row container flex-column-table">
    <div>
        <?php
        include 'View/admin_menu.php';
        ?>
    </div>

    <div class="admin-products width100">
        <div class="products-list">
            <?php
            echo "<table>";
            echo "<tr>";
            echo "<th>#</th>";
            echo "<th>ДАТА</th>";
            echo "<th>КЛІЄНТ</th>";
            echo "<th>ТТН</th>";
            echo "<th>СТАТУС</th>";
            echo "<th>ЦІНА</th>";
            echo "<th>ТОВАРИ</th>";
            echo "<th>КОМЕНТАР</th>";
            echo "<th>Action</th>";
            echo "<th>Action</th>";
            echo "</tr>";

            // Цикл по результатам выборки
            foreach ($this->orders as $order) {
                $date = date_create($order["date"]);

                echo "<tr>";
                echo "<td>" . $order["id"] . "</td>";
                echo "<td>" . date_format($date, "Y/m/d") . "</td>";
                echo "<td>" . $order["first_name"] . " " . $order["last_name"] . "</td>";
                echo "<td>" . $order["document"] . "</td>";
                echo "<td>" . $order["status"] . "</td>";
                echo "<td>" . $order["price"] . "</td>";
                echo "<td>" . $order["order_products"] . "</td>";
                echo "<td>" . $order["comment"] . "</td>";
                echo "<td><div><a href='/order?order_forms=true&id=$order[id]'>Дивитись</a></div></td>";
                echo "<td><div><a href='/order?action_delete=true&id=$order[id]'>Видалити</div></td>";
                echo "</tr>";
            }

            echo "</table>";
            ?>
        </div>
    </div>
</div>