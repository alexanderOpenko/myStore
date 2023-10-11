<?php require 'View/header.php'; ?>

<head>
    <link rel="stylesheet" href="../Assets/checkout.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../node_modules/@selectize/selectize/dist/js/selectize.min.js"></script>
    <link rel="stylesheet" href="../node_modules/@selectize/selectize/dist/css/selectize.default.css" />
</head>

<div class="checkout-container container">
    <div class="bold-label text-center mb-48 body30 checkout-header">
        Форма оформлення замовлення
    </div>
    <form class="checkout-form">
        <div class="flex-row flex-column-table checkout-form-body">
            <div class="mr-30 width50 checkout-form-contacts">
                <div class="checkout-form-contacts">
                    <div class="bold-label text-center mb-15 body30">
                        Контакти
                    </div>
                    <div class="form-item">
                        <div class="form-item_lable body1">Прізвище</div>
                        <input class="form-input" required minlength="3" type="text" name="last_name" />
                    </div>

                    <div class="checkout-pairs flex-row flex-column-mobile">
                        <div class="form-item mr-20 width50">
                            <div class="form-item_lable body1">Ім'я</div>
                            <input class="form-input" minlength="3" required type="text" name="first_name" />
                        </div>

                        <div class="form-item width50">
                            <div class="form-item_lable body1">По батькові</div>
                            <input class="form-input" minlength="3" type="text" name="middle_name" />
                        </div>
                    </div>

                    <div class="checkout-pairs flex-row flex-column-mobile">
                        <div class="form-item mr-20 width50">
                            <div class="form-item_lable body1">Телефон</div>
                            <input class="form-input" required minlength="10" type="tel" name="number" />
                        </div>

                        <div class="form-item width50">
                            <div class="form-item_lable body1">Ел. почта</div>
                            <input class="form-input" type="email" name="email" />
                        </div>
                    </div>

                    <div class="form-item">
                        <div class="form-item_lable body1">Коментар</div>
                        <textarea class="form-input" type="email" name="comment">
                        </textarea>
                    </div>
                </div>

                <div>
                    <div class="bold-label text-center mb-15 body30">
                        Доставка та оплата
                    </div>
                    <div class="checkout-pairs flex-row flex-column-mobile">
                        <div class="form-item cities-list mr-20 width50">
                            <div class="form-item_lable">Місто</div>
                            <?php echo $this->cities_select; ?> 
                            <!-- city -->
                        </div>

                        <div class="form-item width50">
                            <div class="form-item_lable">Відділення НП</div>
                            <div class="warehouse-list">
                                <!-- warehouse -->
                                <select>
                                    <option value="">виберіть відділення</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-item payment-type">
                        <div class="form-item_lable">Оплата</div>
                        <select name="payment_method" required>
                            <option value="NonCash">Переказ на карту</option>
                            <option value="Cash">Оплата при отриманні</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="checkout-form-products width50">
                <div class="bold-label text-center mb-25 body30">
                    Товари в замовленні
                </div>

                <div id='cart'>
                </div>
            </div>
        </div>

        <button class="checkout-form_submit main-button" type="submit">
            Оформити замовлення
        </button>
    </form>
</div>

<?php require 'View/footer.php'; ?>

<script>
    const citiesSelect = $('.cities-list select')
    const warehouse = $('.warehouse-list')
    const warehouseSelect = warehouse.find('select')
    const checkoutForm = document.querySelector('.checkout-form')
    const paymentSelect = $('.payment-type select')
    const warehousesInitedSelect = initSelect(warehouseSelect)
    const paymentsInitedSelect = initSelect(paymentSelect)

    warehousesInitedSelect[0].selectize.disable()
    paymentsInitedSelect[0].selectize.disable()

    checkoutForm.addEventListener('submit', (e) => {
        formSubmitHundler(e)
    })

    const formSubmitHundler = async (e) => {
        e.preventDefault()
        const data = new FormData(checkoutForm);
        const cityName = citiesSelect.find("option:selected").text();
        const warehouseName = warehouse.find("select option:selected").text();

        data.append('city_name', cityName)
        data.append('warehouse_name', warehouseName)
        data.append('action', 'create_order')

        const url = '/order'
    
        try {
            const resp = await fetch(url, {
                method: "POST",
                body: data
            })

            const json = await resp.json()
            if (json.code) {
                const order_id = await json.body.order_id
                const redirectUrl = `/order?order_info=true&order_id=${order_id}`
                window.location.href = redirectUrl
            } else {
                alert("Помилка при оформленні. Спробуйте будь ласка пізніше")
            }
            
        } catch(err) {
            alert("Помилка при оформленні. Спробуйте будь ласка пізніше")
        }
    }

    const citiesSelectOnChange = async (value) => {
        if (!value) {
            //hide warehouses
            return
        }

        const url = `/checkout?city_id=${value}`

        try {
            const response = await fetch(url, {
                method: 'GET'
            })
            const citiesSelect = await response.text()
            warehouse.html(citiesSelect)
            initSelect(warehouse.find('select'))
            paymentsInitedSelect[0].selectize.enable()
            // const warehouses = await response.json()
        } catch (error) {
            console.log(error);
        }
    }

    const citiesInitedSelect = initSelect(citiesSelect, citiesSelectOnChange)

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
</script>