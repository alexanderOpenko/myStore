<?php require 'View/header.php';?>

<div class="flex-row container flex-column-table">
    <div>
    <?php
        include 'View/admin_menu.php';
        ?>
    </div>

    <div class="admin-products width100">
        <a href="/admin_product_form" class="admin-products_button">
            <button class="admin-button" type="button">
                Add product
            </button>
        </a>

        <div class="products-list">
            <?php
            echo "<table>";
            echo "<tr>";
            echo "<th>Name</th>";
            echo "<th>SKU</th>";
            echo "<th>Price</th>";
            echo "<th>Brand</th>";
            echo "<th>Action</th>";
            echo "<th>Action</th>";
            echo "</tr>";

            // Цикл по результатам выборки
            foreach ($this->products as $product) {
                echo "<tr>";
                echo "<td>" . $product["name"] . "</td>";
                echo "<td>" . $product["sku"] . "</td>";
                echo "<td>" . $product["price"] . "</td>";
                echo "<td>" . $product["producer"] . "</td>";
                echo "<td><div><a href='/admin_product_form?action_edit=true&sku=$product[sku]'> Edit </a></div></td>";
                echo "<td><div><a href='/admin_products?action_delete=true&product_id=$product[id]&sku=$product[sku]'> Delete </div></td>";
                echo "</tr>";
            }

            echo "</table>";
            ?>
        </div>
    </div>
</div>