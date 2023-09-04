<?php
$product_name = $this->product ? $this->product[0]['name'] : '';
$product_collection = $this->product ? $this->product[0]['collection'] : '';
$product_producer = $this->product ? $this->product[0]['producer'] : '';
$sku = $this->product ? $this->product[0]['sku'] : '';
$brand = $this->product ? $this->product[0]['producer'] : '';
$color = $this->product ? $this->product[0]['color'] : '';
$description = $this->product ? $this->product[0]['description'] : '';
$color = $this->product ? $this->product[0]['color'] : '';
$price = $this->product ? $this->product[0]['price'] : '';
$weight = $this->product ? $this->product[0]['weight'] : '';
$size_quantity = $this->size_quantity_pairs;

include 'View/header.php';
?>

<div class="container flex-row">
    <?php
    include 'View/admin_menu.php';
    ?>

    <div class="admin-product-form">
        <form class="product-form">
            <input type="hidden" name="action" value="<?php echo $this->edit ? 1 : 0 ?>" />

            <div class="flex-row wrap-grid">
                <div class="form-item flex-row flex-between two-desc-grid">
                    <div class="form-item_lable">Назва товару</div>
                    <input class="form-input" required minlength=3 value="<?php echo $product_name ?>" type="text" name="product_name">
                </div>

                <div class="form-item flex-row flex-between two-desc-grid">
                    <div class="form-item_lable">Артикул</div>
                    <input 
                        class="form-input product-sku<?php echo $this->edit ? ' readonly-input' : ''?>" 
                        required 
                        value="<?php echo $sku ?>" 
                        type="text" 
                        name="sku"
                        <?php echo $this->edit ? 'readonly' : ''?>
                    >
                </div>
                
                <div class="form-item flex-row flex-between two-desc-grid">
                    <div class="form-item_lable">Колекція</div>
                    <select class="form-input" name="collection">
                        <option disabled selected value="0">
                            виберіть колекцію
                        </option>

                        <?php foreach ($this->collections as $collection) : ?>
                            <option 
                            value=<?php echo $collection['id'] ?>
                            <?php echo $product_collection == $collection['id'] ? 'selected' : ''?>
                            >
                                <?php echo $collection['name'] ?>
                            </option>
                        <?php endforeach ?>
                    </select>
                </div>

                <div class="form-item flex-row flex-between two-desc-grid">
                    <div class="form-item_lable">Бренд</div>
                    <select class="form-input" name="producer">
                        <option disabled selected value="0">
                            виберіть бренд
                        </option>

                        <?php foreach ($this->producers as $producer) : ?>
                            <option 
                            value=<?php echo $producer['id'] ?>
                            <?php echo $product_producer == $producer['id'] ? 'selected' : ''?>
                            >
                                <?php echo $producer['name'] ?>
                            </option>
                        <?php endforeach ?>
                    </select>
                </div>

                <div class="form-item flex-row flex-between two-desc-grid">
                    <div class="form-item_lable">Опис</div>
                    <input class="form-input" value="<?php echo $description ?>" type="text" name="description">
                </div>

                <div class="form-item flex-row flex-between two-desc-grid">
                    <div class="form-item_lable">Колір</div>
                    <input class="form-input product-color" required value="<?php echo $color ?>" type="text" name="color">
                </div>

                <div class="form-item flex-row flex-between two-desc-grid">
                    <div class="form-item_lable">Ціна</div>
                    <input class="form-input" required value="<?php echo $price ?>" type="number" name="price">
                </div>

                <div class="form-item flex-row flex-between two-desc-grid">
                    <div class="form-item_lable">Вага</div>
                    <input class="form-input" required value="<?php echo $weight ?>" type="number" min="0" step="0.1" name="weight">
                </div>
            </div>

            <div class="size-quantity-pairs">
                <div class="sq-list">
                    <?php foreach ($size_quantity as $item) : ?>
                        <div class="sq_pair flex-row align-center wrap-grid">
                            <div class="flex-row align-center flex-between two-desc-grid">
                                <div class="form-item_lable">Розмір</div>
                                <input required class="form-input sq_pair-size" value="<?php echo $item['option'] ?>" type="text">
                            </div>

                            <div class="flex-row align-center two-desc-grid">
                                <div class="mr-20">Кількість на складі</div>
                                <div class="flex-row">
                                    <input class="form-input sq_pair-quantity mr-20" required value="<?php echo $item['quantity'] ?>" type="number">
                                    <div class="delete-sq-pair">
                                        <?php echo icon('close') ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach ?>
                </div>

                <button class="add_sq mb-30" type="button">
                    Add size/quantity
                </button>
            </div>

            <button>
                Save
            </button>
        </form>
    </div>
</div>

<script>
    const form = document.querySelector('.product-form')
    const addSQ = document.querySelector('.add_sq')
    const sqList = document.querySelector('.sq-list')

    function initDeleteSizeQuantityEvents() {
        const buttons = document.querySelectorAll(".delete-sq-pair");
        buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const parent = button.closest(".sq_pair");

            if (parent) {
            parent.remove();
            }
        });
        });
    }

    initDeleteSizeQuantityEvents()

    async function submitHandler(e) {
        e.preventDefault()
        const formData = new FormData(form)
        const allSQpairs = document.querySelectorAll('.sq_pair')
        const skuValue = document.querySelector('.product-sku').value
        const colorValue = document.querySelector('.product-color').value

        const rows = [...allSQpairs].map((el) => {
            const sizeValue = el.querySelector('.sq_pair-size').value
            const quantityValue = el.querySelector('.sq_pair-quantity').value

            const valuesArr = [skuValue, colorValue, sizeValue, quantityValue].map(el => {
                if (typeof el != Number) {
                    return "'" + el + "'"
                } else {
                    return el
                }
            })
            const values = valuesArr.join(', ')
            const result = '(' + values + ')'
            return result
        })

        const insertString = rows.join(', ')

        const url = '/admin_product_form'
        formData.append('insert_str', insertString)

        await fetch(url, {
            method: "POST",
            body: formData
        })

        alert("інформацію оновлено")
    }

    addSQ.addEventListener('click', () => addSQHTML())
    form.addEventListener('submit', (e) => submitHandler(e))

    function addSQHTML() {
        const html = '<div class="sq_pair flex-row align-center wrap-grid"><div class="flex-row align-center flex-between two-desc-grid"><div class="form-item_lable">Розмір</div><input required class="form-input sq_pair-size" type="text"></div><div class="flex-row align-center two-desc-grid"><div class="mr-20">Кількість на складі</div><div class="flex-row"><input class="form-input sq_pair-quantity mr-20" required type="number"><div class="delete-sq-pair"><?php echo icon("close") ?></div></div></div></div>'
        sqList.insertAdjacentHTML('beforeend', html)
        initDeleteSizeQuantityEvents()
    }
</script>