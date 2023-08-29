<?php include 'View/header.php'; ?>

<head>
    <link rel="stylesheet" href="../Assets/checkout.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../node_modules/@selectize/selectize/dist/js/selectize.min.js"></script>
    <link rel="stylesheet" href="../node_modules/@selectize/selectize/dist/css/selectize.default.css" />
</head>

<div class="container">
    <form class="checkout-form">
        <div class="form-item">
            <div class="form-item_lable">Прізвище</div>
            <input class="form-input" required type="text" name="last_name" />
        </div>

        <div class="form-item">
            <div class="form-item_lable">Ім'я</div>
            <input class="form-input" required type="text" name="middle_name" />
        </div>

        <div class="form-item">
            <div class="form-item_lable">По батькові</div>
            <input class="form-input" required type="text" name="first_name" />
        </div>

        <div class="form-item">
            <div class="form-item_lable">Телефон</div>
            <input class="form-input" required type="number" name="number" />
        </div>

        <div class="form-item">
            <div class="form-item_lable">Ел. почта</div>
            <input class="form-input" required type="email" name="email" />
        </div>

        <div class="form-item cities-list">
            <div class="form-item_lable">Місто</div>
            <?php echo $this->cities_select; ?>
        </div>

        <div class="form-item">
            <div class="form-item_lable">Відділення НП</div>
            <div class="warehouse-list">
                <select>
                    <option value="">виберіть відділення</option>
                </select>
            </div>
        </div>

        <div class="form-item payment-type">
            <div class="form-item_lable">Оплата</div>
            <select name="payment_method" required>
                <option value="NonCash">Переказ на карту</option>
                <option value="Cash">Оплата при отриманні</option>
            </select>
        </div>

        <button class="checkout-form_submit main-button" type="submit">
            Оформити замовлення
        </button>
    </form>
</div>

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

    const formSubmitHundler = (e) => {
        e.preventDefault()
        const data = new FormData(checkoutForm);

        // for (var pair of data.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        const url = '/checkout'
        fetch(url, {
                method: "POST",
                body: data
            }).then(response => response.text()) // преобразуем ответ в JSON
            .then(data => console.log(data)) // выводим данные в консоль
            .catch(error => console.error(error));
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