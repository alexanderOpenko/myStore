import React, { useEffect, useState } from "react"
import Icons from "./icons"

const orderStatuses = [
    'В роботі',
    'Готовий до відправлення',
    'Відправлений',
    'Доставлений',
    'Отримано',
    'Відправлений назад',
    'Повернення',
    'Обмін'
]

const OrderForms = () => {
    const [allProductsList, setAllProductsList] = useState([])
    const [products, setProducts] = useState([])
    const [chosenOrderProduct, setChosenOrderProduct] = useState('вибери товар')
    const [document, setDocument] = useState('')
    const [doc_ref, setDocumentRef] = useState('')
    const [orderId, setOrderId] = useState(0)
    const [statusValue, setStatusValue] = useState('')
    const [orderPrice, setOrderPrice] = useState(0)
    const [orderWeight, setOrderWeight] = useState(0)

    const dataRequest = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');

        const resp = await fetch(`/order?order_forms=true&order_id=${id}`)
        const respJSON = await resp.json()

        if (respJSON.body.order_products) {
            setProducts(respJSON.body.order_products)
        } else {
            setProducts([])
        }

        setDocument(respJSON.body.order_info[0].document)
        setDocumentRef(respJSON.body.order_info[0].doc_ref)
        setOrderId(respJSON.body.order_info[0].id)
        setOrderPrice(respJSON.body.order_info[0].price)
        setOrderWeight(respJSON.body.order_info[0].weight)
        setStatusValue(respJSON.body.order_info[0].status)
    }
    console.log(products, 'products');

    const priceOfOrderHandler = (value) => {
        setOrderPrice(value)
    }

    const weightOfOrderHandler = (value) => {
        setOrderWeight(value)
    }

    const loadProductsHandler = async () => {
        getAllProductsList()
    }

    const getAllProductsList = async () => {
        try {
            const resp = await fetch(`/order?get_prods_list=true`)
            const json = await resp.json()
            setAllProductsList(json.body)
        } catch (err) {
            alert('Помилка')
        }
    }

    const insert_order_product = async () => {
        if (chosenOrderProduct == 'вибери товар') {
            alert('вибери товар!')
        }

        const data = new FormData
        const splitProd = chosenOrderProduct.split(',')

        data.append('add_order_prod', 'true')
        data.append('order_id', orderId)
        data.append('sku', splitProd[0])
        data.append('size', splitProd[1])

        try {
            const resp = await fetch('/order', {
                method: 'POST',
                body: data
            })

            dataRequest()
        } catch (err) {
            alert('Помилка при додаванні товару')
        }
    }

    const effectCallback = async () => {
        await dataRequest()
        // getAllProductsList()
    }

    useEffect(() => {
        effectCallback()
    }, [])

    const update_order_status = async () => {
        const data = new FormData()

        data.append('update_status', 'true')
        data.append('status', statusValue)
        data.append('order_id', orderId)

        try {
            const resp = await fetch('/order', {
                method: "POST",
                body: data
            })

            const body = await resp.json()
            if (body.code) {
                alert('Статус оновленно')
            } else {
                alert(body.message)
            }
        } catch (err) {
            Alert('Помилка при оновленні статусу')
        }
    }

    const update_order_weight = async () => {
        const data = new FormData()

        data.append('update_weight', 'true')
        data.append('weight', orderWeight)
        data.append('order_id', orderId)

        try {
            const resp = await fetch('/order', {
                method: "POST",
                body: data
            })

            const body = await resp.json()
            if (body.code) {
                alert('Вагу оновленно')
            } else {
                alert(body.message)
            }
        } catch (err) {
            Alert('Помилка при оновленні ціни')
        }
    }

    const update_order_price = async () => {
        const data = new FormData()

        data.append('update_price', 'true')
        data.append('price', orderPrice)
        data.append('order_id', orderId)

        try {
            const resp = await fetch('/order', {
                method: "POST",
                body: data
            })

            const body = await resp.json()
            if (body.code) {
                alert('Ціну оновленно')
            } else {
                alert(body.message)
            }
        } catch (err) {
            Alert('Помилка при оновленні ціни')
        }
    }

    const documentSubmit = async () => {
        const data = new FormData()
        data.append('create_document', 'true')
        data.append('order_id', orderId)

        const resp = await fetch('/checkout', {
            method: "POST",
            body: data
        })

        try {
            const body = await resp.json()
            if (body.code) {
                alert('ТТН створено')
            } else {
                alert(body.message)
            }
        } catch (errs) {
            alert('Помилка в створенні ТТН. Перевір контактні дані')
        }

        window.location.reload()
    }

    const documentDelete = async () => {
        const data = new FormData()
        data.append('delete_document', 'true')
        data.append('doc_ref', doc_ref)

        const resp = await fetch('/checkout', {
            method: "POST",
            body: data
        })

        try {
            const body = await resp.json()
            if (body.code) {
                alert('ТТН видалено')
            } else {
                alert(body.message)
            }
        } catch (errs) {
            alert('Помилка при видаленні ТТН')
        }

        window.location.reload()
    }

    const quantityOfOrderHandler = async (index, value, prod_id) => {
        const newProducts = [...products];
        newProducts[index]['order_quantity'] = value;
        setProducts(newProducts);

        try {
            await fetch(`/order?update_order_quantity=true&prod_id=${prod_id}&value=${value}`)
        } catch (err) {
            alert('Помилка при оновленні кількості')
        }
    }

    const deleteOrderProd = async (prod_id) => {
        try {
            const resp = await fetch(`/order?delete_order_prod=true&prod_id=${prod_id}`)
            dataRequest()
        } catch (err) {
            alert('Помилка при видалені товару із замовлення')
        }
    }

    return <div>
        <div className="shadow-block mb-15">
            <div className="bold-label text-center body18 mb-15">
                Статус
            </div>

            <div className="flex-row align-center">
                <select
                    className="mr-20"
                    value={statusValue}
                    onChange={(e) => setStatusValue(e.target.value)}
                >
                    {orderStatuses.map((el, i) => {
                        return <option value={el}>
                            {el}
                        </option>
                    })}
                </select>

                <button onClick={update_order_status} className="body1 blue" type="button">
                    Зберегти
                </button>
            </div>
        </div>

        <div className={!document ? "shadow-block mb-15" : "shadow-block disable-form mb-15"}>
            <div className="bold-label text-center body18">
                Ціна
            </div>

            <div className="flex-row align-center">
                <input
                    onChange={(e) => priceOfOrderHandler(e.target.value)}
                    class="form-input mr-20"
                    readOnly={document ? true : false}
                    type="number"
                    value={orderPrice} />

                <button onClick={update_order_price} className="body1 blue" type="button">
                    Зберегти
                </button>
            </div>
        </div>

        <div className={!document ? "shadow-block mb-15" : "shadow-block disable-form mb-15"}>
            <div className="bold-label text-center body18">
                Вага
            </div>

            <div className="flex-row align-center">
                <input
                    onChange={(e) => weightOfOrderHandler(e.target.value)}
                    class="form-input mr-20"
                    readOnly={document ? true : false}
                    type="number"
                    value={orderWeight} />

                <button onClick={update_order_weight} className="body1 blue" type="button">
                    Зберегти
                </button>
            </div>
        </div>

        <div className="order-document shadow-block mb-15">
            <div className="bold-label text-center body18 mb-15">
                Накладна
            </div>
            {document && <div className="flex-row align-center">
                <div className="document-number mr-30">
                    {document}
                </div>
                <button className="flex-row align-center body1 blue" onClick={() => documentDelete()}>
                    <div>Відмінити ТТН</div> <div className="ml-10 standart-icon"><Icons icon={"close"} /></div>
                </button>
            </div>
            }

            {!document && <button onClick={documentSubmit} className="body1 blue">
                Створити ТТН
            </button>}
        </div>

        <div className="order-products cart-list shadow-block mb-15">
            <div className="bold-label text-center body18 mb-20">
                Товари в замовленні
            </div>
            {products.length ? products.map((el, index) => {
                return <div key={el.id} className="flex-row mb-20">
                    <div>
                        <div className="cart-item_image">
                            <img src={el.image_path} className="cover" />
                        </div>
                    </div>

                    <div>
                        <div className="flex-row flex-between">
                            <div className="cart-item_info">
                                <div className="mb-10 align-center">
                                    <div className="mr-10">
                                        {el.name + '/' + el.sku}
                                    </div>
                                </div>

                                <div className="flex-row mb-10 align-center">
                                    <div class="form-item">
                                        <div class="form-item_lable body1">кількість в замовленні</div>
                                        <input
                                            onChange={(e) => quantityOfOrderHandler(index, e.target.value, el.prod_id)}
                                            class="form-input"
                                            min={1}
                                            max={el.quantity}
                                            readOnly={document ? true : false}
                                            required
                                            type="number"
                                            name="quantity"
                                            value={el.order_quantity} />
                                    </div>
                                </div>

                                <div className="mb-10">
                                    розмір: {el.size}
                                </div>

                                <div>
                                    ціна: {el.price}
                                </div>
                            </div>

                            {!document && <div
                                className="standart-icon"
                                onClick={() => deleteOrderProd(el.prod_id)}
                            >
                                <Icons icon={"thrash"} />
                            </div>}
                        </div>
                    </div>
                </div>
            }) : "Замовлення порожнє"}
        </div>

        <div className={!document ? "shadow-block mb-15" : "shadow-block disable-form mb-15"}>
            <div className="bold-label text-center body18 mb-20">
                Додати в замовлення
            </div>

            {!allProductsList.length && <button className="body1 blue" type="button" onClick={loadProductsHandler}>
                Дивитись список товарів
            </button>}

            {!!allProductsList.length && <div>
                <select className="mb-15"
                    value={chosenOrderProduct}
                    onChange={(e) => setChosenOrderProduct(e.target.value)}
                >
                    <option disabled="disabled">
                        вибери товар
                    </option>
                    {allProductsList.map((el) => {
                        const value = el.sku + ',' + el.size

                        return <option key={el.id}>
                            {value}
                        </option>
                    })}
                </select>

                <button onClick={insert_order_product} className="body1 blue" type="button">
                    Зберегти
                </button>
            </div>}
        </div>
    </div>
}

export default OrderForms