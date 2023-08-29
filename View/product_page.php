<head>
    <link rel="stylesheet" href="../Assets/product-page.css">
    <link rel="stylesheet" href="../Assets/grids.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../node_modules/@selectize/selectize/dist/js/selectize.min.js"></script>
    <link rel="stylesheet" href="../node_modules/@selectize/selectize/dist/css/selectize.default.css" />
</head>

<?php include 'View/header.php'; ?>

<div class="product-page container">
    <!-- split in two class -->
    <div class="message">

    </div>

    <div class="product flex-row flex-between" data-products='<?php echo json_encode($this->product, JSON_UNESCAPED_UNICODE) ?>'>
        <div class="product-images">
            <div id="productPageImages" data-id='<?php echo $this->product[0]['product_id']?>'>
            </div>
        </div>

        <div class="product-base-info flex-column flex-around">
            <div>
                <div class="info-label primary-label body1">
                    <?php echo $this->product[0]['name'] ?>
                </div>

                <h2 class="info-label">
                    <?php echo $this->product[0]['producer'] ?>
                </h2>

                <div class="info-label body1">
                    <?php echo $this->product[0]['description'] ?>
                </div>
            </div>

            <div class="info-label large1">
                 <?php echo $this->product[0]['price'] ?> ₴
            </div>

            <div class="product-form">
                <form>
                    <input class="form-sku" type="hidden" name="sku" value="<?php echo $this->product[0]['sku'] ?>" />

                    <div class="size-options mb-15">
                        <select name="size" required class="form-size">
                        </select>
                    </div>

                    <button type="submit">
                        Add to cart
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
</div>

<script src="../components/build/components.bundle.js"></script>

<script>  
    const formBtn = document.querySelector('.product-form button')
    const productsData = document.querySelector('.product').dataset.products
    const productsObj = JSON.parse(productsData)
    console.log(productsObj, 'productsObj');
    const sizesHolder = $('.size-options select')
    formBtn.addEventListener('click', (e) => formHandler(e))

    productsObj.forEach(el => {
        sizesHolder.append(`<option value=${el.size}>${el.size}</option>`)
    });

    $('.size-options select').selectize()

    async function formHandler(e) {
        e.preventDefault()
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
        if (resp.message) {
            document.querySelector('.message').innerHTML = resp.message
        }
    }
</script>