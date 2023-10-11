<head>
    <link rel="stylesheet" href="../Assets/grids.css">
    <link rel="stylesheet" href="../Assets/product-page.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../node_modules/@selectize/selectize/dist/js/selectize.min.js"></script>
    <link rel="stylesheet" href="../node_modules/@selectize/selectize/dist/css/selectize.default.css" />
</head>

<?php
require 'View/header.php';

$product = $this->product[0];
?>

<div class="product-page container">
    <!-- split in two class -->
    <div class="product flex-row width100 justify-center flex-column-mobile" data-products='<?php echo json_encode($this->product, JSON_UNESCAPED_UNICODE) ?>'>
        <div class="product-images">
            <div id="productPageImages" data-id='<?php echo $this->product[0]['product_id'] ?>'>
            </div>
        </div>

        <div class="product-base-info flex-column">
            <div class="mb-30">
                <div class="info-label primary-label body1">
                    <?php echo $product['collection'] ?>
                </div>

                <h2 class="info-label bold-label">
                    <?php echo $product['producer'] ?>
                </h2>

                <div class="info-label body1 mb-20">
                    <?php echo $product['name'] ?>
                </div>

                <div class="product-color-label" style="background-color:<?php echo $product['color'] ?>">
                </div>
            </div>

            <div class="info-label large1 mb-30">
                <?php echo $product['price'] ?> ₴
            </div>

            <div class="product-form">
                <form>
                    <input class="form-sku" type="hidden" name="sku" value="<?php echo $this->product[0]['sku'] ?>" />

                    <div class="size-options mb-15">
                        <select name="size" required class="form-size" data-search-enabled="false">
                        </select>
                    </div>

                    <button type="submit" class="primary-button width100">
                        Add to cart
                    </button>

                    <div class="message hidden">
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div id="productInfoTabs" data-info='<?php echo json_encode($product, JSON_UNESCAPED_UNICODE) ?>'>
    </div>

    <div id="randomProds">
    </div>
</div>
</div>

<script>
    const formBtn = document.querySelector('.product-form button')
    const productsData = document.querySelector('.product').dataset.products
    const productsObj = JSON.parse(productsData)
    const sizesHolder = $('.size-options select')
    formBtn.addEventListener('click', (e) => formHandler(e))

    const customOrder = ["xxs", "xs", "s", "m", "l", "xl", "xxl"];
    let sortedObj = productsObj.sort((a, b) =>  customOrder.indexOf(a.size.toLowerCase()) - customOrder.indexOf(b.size.toLowerCase()))

    if (!isNaN(productsObj[0].size)) {
        sortedObj = sortedObj.reverse()
    }

    sortedObj.forEach(el => {
        let disabled = ''

        if (el.quantity <= 0) {
            disabled = 'disabled'
        }

        sizesHolder.append(`
        <option 
            value=${el.size}
            ${disabled}
        >
        ${el.size}
            </option>
        `)
    });

    $('.size-options select').selectize({
        onInitialize: function() {
            this.$control_input.attr('readonly', true);
        }
    })

    async function formHandler(e) {
        e.preventDefault()
        const cart = document.querySelector('.cart-count')
        const sku = document.querySelector('.form-sku').value
        const size = document.querySelector('.form-size option[selected="selected"]').value

        const data = new FormData()

        data.append('action', 'Add')
        data.append('sku', sku)
        data.append('size', size)

        const cartPesp = await fetch('/cart', {
            method: 'POST',
            body: data
        })

        const resp = await cartPesp.json();
        cart.innerHTML = resp.body.total_count

        if (resp.message) {
            const messageHolder = document.querySelector('.message')
            const respMessage = resp.message[0]
            const variant = respMessage.split(' | ')[0]
            let message = ''

            if (respMessage.includes('last counts of items')) {
                message = `Додано в корзину останню одиницю товару ${variant}`
            }

            if (respMessage.includes('added to cart') && !respMessage.includes('last counts of items')) {
                message = `${variant} додано в корзину`
            }

            if (respMessage.includes('out of stock')) {
                message = `В корзину додано всі доступні варіанти ${variant}`
            }

            messageHolder.classList.remove('hidden')
            messageHolder.innerHTML = message
            setTimeout(() => {
                messageHolder.classList.add('hidden')
            }, 4500)
        }
    }
</script>

<?php require 'View/footer.php'; ?>