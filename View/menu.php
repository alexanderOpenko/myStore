<?php require_once 'Assets/icons.php' ?>

<nav class="menu">
    <ul class="flex-row">
        <li class="menu-item interactive-menu-item">
            <div class="flex-row align-center pointer">
                <div> Одяг </div>
                <div class="mini-icon ml-5"><?php echo icon('arrow_down') ?></div>
            </div>

            <div class="mask-background">
            </div>

            <ul class="menu-item_submenu p30">
                <li class="mb-10">
                    <a href="/products?collection=94">
                        Футболки
                    </a>
                </li>

                <li class="mb-10">
                    <a href="/products?collection=95">
                        Світшоти
                    </a>
                </li>

                <li class="mb-10">
                    <a href="/products?collection=96">
                        Штани
                    </a>
                </li>
            </ul>
        </li>

        <li class="menu-item interactive-menu-item">
            <div class="flex-row align-center pointer">
                <div> Взуття </div>
                <div class="mini-icon ml-5"><?php echo icon('arrow_down') ?></div>
            </div>

            <div class="mask-background">
            </div>

            <ul class="menu-item_submenu p30">
                <li>
                    <a href="/products?collection=97">
                        Взуття
                    </a>
                </li>
            </ul>
        </li>

        <li class="menu-item">
            <a href="/products?collection=all">
                Всі товари
            </a>
        </li>

        <li class="menu-item">
            <a href="/admin_products">
                АДМІН
            </a>
        </li>
    </ul>
</nav>