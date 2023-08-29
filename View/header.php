<head>
    <link rel="icon" type="image/x-icon" href="../Assets/favicon.ico">
    <link rel="stylesheet" href="../Assets/style.css">
    <link rel="stylesheet" href="../Assets/grids.css">
    <link rel="stylesheet" href="../Assets/cart.css">
</head>

<header>
    <div class="desc-menu flex-row flex-between">
        <div class="menu-switch">
            <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 50 50" width="50px">
                <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
            </svg>
            <?php include 'menu.php' ?>
        </div>

        <div class="header-logo">
            BESTO
        </div>

        <div class="header-cart">
            <div id="cart">
            </div>
        </div>
    </div>
</header>

<script src="../components/build/components.bundle.js"></script>
