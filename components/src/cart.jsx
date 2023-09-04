import React, { useEffect, useState } from "react"
import Icons from "./icons"

const Cart = () => {
  const [cartToggleClass, setCartToggleClass] = useState('')
  const [cartData, setCartData] = useState({cart:[]})

  const getCart = async () => {
    const resp = await fetch('/cart')
    const json = await resp.json()

    setCartData(json.body)
  }

  useEffect(() => {
    getCart()
  }, [cartToggleClass])

  const cartQuantityHandler = async (action, sku, size) => {
    const data = new FormData()
    data.append('action', action)
    data.append('sku', sku)
    data.append('size', size)

    const resp = await fetch('/cart', {
      method: 'POST',
      body: data
    })
    const json = await resp.json()

    setCartData(json.body)
  }

  const toggleCartHandler = (className) => {
    document.querySelector('.mask').classList.toggle('mask-background')
    setCartToggleClass(className)
  }

return <div>
  <div>
    <div className="align-center justify-center standart-icon flex-row cart-count">
      {cartData.cart.length ? cartData.total_count : 0}
    </div>

    <div className="cart-icon standart-icon" onClick={() => toggleCartHandler('slide_in-right')}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
        <path d="M2 2h4v4h16v11H4V4H2V2zm4 13h14V8H6v7zm0 4h3v3H6v-3zm14 0h-3v3h3v-3z" fill="black" />
      </svg>
    </div>
  </div>

    <div className={"cart tray " + cartToggleClass}>
      <div className="close standart-icon mb-20" onClick={() => toggleCartHandler('slide_out-right')}>
        <Icons icon={'close'} />
      </div>
      <div className="cart-list">
        {cartData.cart.map((el) => {
          return <div key={el.id}>
            <div className="cart-item">
              <div className="cart-item_image">
                <img src={el.image_path} />
              </div>

              <div className="width100">
                <div className="flex-row flex-between">
                  <div className="cart-item_info">
                    <div className="mb-10 align-center">
                      <div className="mr-10">
                        {el.name + '/' + el.sku}
                      </div>
                    </div>

                    <div className="flex-row mb-10 align-center">
                      кількість:
                      <div className="mini-icon ml-5" onClick={() => cartQuantityHandler('Decrease', el.sku, el.size)}>
                        <Icons icon={'minus'} />
                      </div>
                      <div className="ml-5">
                        {el.cart_quantity}
                      </div>
                      <div className="mini-icon ml-5" onClick={() => cartQuantityHandler('Add', el.sku, el.size)}>
                        <Icons icon={'plus'} />
                      </div>
                    </div>

                    <div className="mb-10">
                      розмір: {el.size}
                    </div>

                    <div>
                      ціна: {el.price}
                    </div>
                  </div>

                  <div className="standart-icon">
                    <Icons icon={"thrash"} />
                  </div>
                </div>

                {(el.out || el.last) && <div className="warnings">
                  {
                    el.out && <div className="cart-out flex-row align-center flex-end">
                      <div className="standart-icon error-icon">
                        <Icons icon={'warning'} />
                      </div>

                      <div className="ml-5">
                        Немає в наявності.
                      </div>
                    </div>
                  }

                  {
                    el.last && <div className="cart-last flex-row align-center flex-end">
                      <div className="standart-icon warning-icon">
                        <Icons icon={'warning'} />
                      </div>

                      <div className="ml-5">
                        Останні одиниці товару.
                        В наявності {el.available_only + (el.available_only == 1 ? ' одиниця' : ' одиниці')}.
                      </div>
                    </div>
                  }
                </div>}
              </div>
            </div>
          </div>
        })}
      </div>

      {
        !cartData.cart.length && <div>
          Корзина пуста
        </div>
      }

      {!!cartData.cart.length && <div>
        <div className="mb-20">
          Загальна ціна: {cartData.total_price}
        </div>

        <button className="cart-submit primary-button width40">
          <a href="/checkout">
            Оформити
          </a>
        </button>
      </div>
      }
    </div>
  </div>
}

export default Cart