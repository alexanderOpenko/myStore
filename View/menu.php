<div class="tray">
    <nav class="menu">
        <ul class="large-font">
            <li class="menu-item">
                <a href="/admin_products">
                    АДМІН
                </a>
            </li>
             <li class="menu-item">
                <a href="/products?collection=all">
                    ВСІ ТОВАРИ
                </a>
            </li>
            <li class="menu-item">
                <a href="/products?collection=футболки">
                    Футболки
                </a>
            </li>
            <li class="menu-item">
                <a href="/products?collection=поло">
                    Футболки поло
                </a>
            </li>
            <li class="menu-item">
                <a href="/products?collection=свитшоты">
                    Світшоти
                </a>
            </li>
            <li class="menu-item">
                <a href="/products?collection=куртки">
                    Куртки
                </a>
            </li>
            <li class="menu-item">
                <a href="/products?collection=кепки">
                    Кепки
                </a>
            </li>
            <li class="menu-item"> 
                <a href="/products?collection=костюмы">
                    Літні Костюми/Спортивні Костюми
                </a>
            </li>
            <li class="menu-item">
            <a href="/products?collection=джинсы">
                Штани
            </a>
            </li>
            <li class="menu-item">
            <a href="/products?collection=шорти">
                Шорти
                </a>
            </li>
            <li class="menu-item">
                Спідня Білизна
            </li>
            <li class="menu-item">
            <a href="/products?collection=обувь">
                Взуття
            </a>
            </li>
            <li class="menu-item">
                <a href="/products?collection=сумка">
                    Сумки та аксесуари
                </a>
            </li>
        </ul>
    </nav>
</div>

<script>
    const dropdownMenu = document.querySelector('.menu-switch .tray')
    const menuSwitch = document.querySelector('.menu-switch')
    const body = document.querySelector('body')

    menuSwitch.addEventListener('mouseover', function() {
        dropdownMenu.classList.add('slide_in')
        dropdownMenu.classList.remove('slide_out')
        body.classList.add('mask-background')
    })

    menuSwitch.addEventListener('mouseout', function() {
        dropdownMenu.classList.add('slide_out')
        dropdownMenu.classList.remove('slide_in', 'mask-background')
        body.classList.remove('mask-background')
    })
</script>