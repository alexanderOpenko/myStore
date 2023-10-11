<?php
include 'View/header.php';
// echo json_encode($this->order_info, JSON_UNESCAPED_UNICODE);
?>

<head>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../node_modules/@selectize/selectize/dist/js/selectize.min.js"></script>
    <link rel="stylesheet" href="../node_modules/@selectize/selectize/dist/css/selectize.default.css" />
</head>

<div class="order-page container flex-row flex-column-table">
    <div>
        <?php
        include 'View/admin_menu.php';
        ?>
    </div>

    <div id="order-forms" class="mr-30">
    </div>

    <div class="shadow-block admin-delivery" data-doc='<?php echo json_encode($this->order_info[0]['document'], JSON_UNESCAPED_UNICODE); ?>' data-id='<?php echo json_encode($this->order_info[0]['id'], JSON_UNESCAPED_UNICODE); ?>'>
        <div class="bold-label text-center mb-15 body30">
            Доставка
        </div>

        <form class="order-delivery">
            <div class="form-item">
                <div class="form-item_lable body1">Прізвище</div>
                <input class="form-input" required minlength="3" type="text" name="last_name" value="<?php echo $this->order_info[0]['last_name'] ?>" />
            </div>

            <div class="checkout-pairs flex-row flex-column-mobile">
                <div class="form-item mr-20 width50">
                    <div class="form-item_lable body1">Ім'я</div>
                    <input class="form-input" minlength="3" required type="text" name="first_name" value="<?php echo $this->order_info[0]['first_name'] ?>" />
                </div>

                <div class="form-item width50">
                    <div class="form-item_lable body1">По батькові</div>
                    <input class="form-input" minlength="3" type="text" name="middle_name" value="<?php echo $this->order_info[0]['middle_name'] ?>" />
                </div>
            </div>

            <div class="checkout-pairs flex-row flex-column-mobile">
                <div class="form-item mr-20 width50">
                    <div class="form-item_lable body1">Телефон</div>
                    <input class="form-input" required minlength="10" type="tel" name="number" value="<?php echo $this->order_info[0]['number'] ?>" />
                </div>

                <div class="form-item width50">
                    <div class="form-item_lable body1">Ел. почта</div>
                    <input class="form-input" type="email" name="email" value="<?php echo $this->order_info[0]['email'] ?>" />
                </div>
            </div>

            <div class="form-item">
                <div class="form-item_lable body1">Коментар</div>
                <textarea class="form-input" type="email" name="comment">
                <?php echo $this->order_info[0]['comment'] ?>
                </textarea>
            </div>

            <div>
                <div class="bold-label text-center mb-15 body30">
                    Доставка та оплата
                </div>

                <div class="form-item cities-list">
                    <div class="form-item_lable">Місто</div>
                    <input type="hidden" name="city" value="<?php echo $this->order_info[0]['city'] ?>" />
                    <input class="form-input city-name" readonly type="text" name="city_name" value="<?php echo $this->order_info[0]['city_name'] ?>" />
                </div>

                <div class="form-item">
                    <div class="form-item_lable">Відділення НП</div>
                    <div class="warehouse-list">
                        <input type="hidden" name="city" value="<?php echo $this->order_info[0]['warehouse'] ?>" />
                        <input class="form-input warehouse-name" readonly type="text" name="warehouse_name" value='<?php echo $this->order_info[0]['warehouse_name'] ?>' />
                    </div>
                </div>

                <!-- <div class="checkout-pairs flex-row flex-column-mobile">
                <div class="form-item cities-list mr-20 width50">
                    <div class="form-item_lable">Місто</div>
                    <?php
                    // echo $this->cities_select; 
                    ?>
                    
                </div>

                <div class="form-item width50">
                    <div class="form-item_lable">Відділення НП</div>
                    <div class="warehouse-list">
                        
                        <?php
                        // echo $this->warehouses_select;
                        ?>
                    </div>
                </div>
            </div> -->

                <div class="form-item payment-type">
                    <div class="form-item_lable">Оплата</div>
                    <select name="payment_method" required>
                        <option value="NonCash" <?php echo $this->order_info[0]['payment_method'] === "NonCash" ? 'selected' : '' ?>>
                            Переказ на карту
                        </option>
                        <option value="Cash" <?php echo $this->order_info[0]['payment_method'] === "Cash" ? 'selected' : '' ?>>
                            Оплата при отриманні
                        </option>
                    </select>
                </div>
            </div>

            <button class="main-button" type="submit">
                Зберегти
            </button>

        </form>
    </div>
</div>

<script>
    const adminDelivery = document.querySelector('.admin-delivery')
    const orderId = JSON.parse(adminDelivery.dataset.id);
    const doc = JSON.parse(adminDelivery.dataset.doc);
    // const citiesSelect = $('.cities-list select')
    // const warehouse = $('.warehouse-list')
    // const warehouseSelect = warehouse.find('select')
    const deliveryForm = document.querySelector('.order-delivery')
    const paymentSelect = $('.payment-type select')
    // const warehousesInitedSelect = initSelect(warehouseSelect)
    const paymentsInitedSelect = initSelect(paymentSelect)
    // warehousesInitedSelect[0].selectize.disable()
    // paymentsInitedSelect[0].selectize.disable()

    deliveryForm.addEventListener('submit', (e) => {
        formSubmitHundler(e)
    })

    const formSubmitHundler = (e) => {
        e.preventDefault()
        const data = new FormData(deliveryForm);
        // const cityName = citiesSelect.find("option:selected").text();
        // const warehouseName = warehouse.find("select option:selected").text();
        const cityName = deliveryForm.querySelector(".city-name").value
        const warehouseName = deliveryForm.querySelector(".warehouse-name").value

        data.append('city_name', cityName)
        data.append('warehouse_name', warehouseName)
        data.append('action', 'update_order')
        data.append('order_id', orderId)

        const url = '/order'
        fetch(url, {
                method: "POST",
                body: data
            }).then(response => response.text())
            .then(data => {
                alert('Дані оновлено')
            })
            .catch(error => console.log(error, 'errrrororo'))
    }

    // const citiesSelectOnChange = async (value) => {
    //     if (!value) {
    //         //hide warehouses
    //         return
    //     }

    //     const url = `/checkout?city_id=${value}`

    //     try {
    //         const response = await fetch(url, {
    //             method: 'GET'
    //         })
    //         const citiesSelect = await response.text()
    //         warehouse.html(citiesSelect)
    //         initSelect(warehouse.find('select'))
    //         // paymentsInitedSelect[0].selectize.enable()
    //         // const warehouses = await response.json()
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const citiesInitedSelect = initSelect(citiesSelect,citiesSelectOnChange)

    function initSelect(select, onChange = false) {
        return select.selectize({
            score: (search) => {
                const noSpaceQuery = search.replace(/ +/g, ' ')
                const subStrings = noSpaceQuery.split(' ')

                return (item) => {
                    let isRelated = true
                    for (let sub of subStrings) {
                        if (!item.text.toLowerCase().includes(sub.toLowerCase())) {
                            isRelated = 0
                            break
                        }
                    }
                    return isRelated
                }
            },
            onChange: onChange
        })
    }

    if (doc) {
        deliveryForm.classList.add('disable-form')
        // warehousesInitedSelect[0].selectize.disable()
        paymentsInitedSelect[0].selectize.disable()
        // citiesInitedSelect[0].selectize.disable()
    }
</script>