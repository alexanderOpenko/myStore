import React, { useEffect, useState } from "react"
import Icons from "./icons"

const Cart = () => {
  const [cartToggleClass, setCartToggleClass] = useState('')
  const [cart, setCart] = useState([])

  const getCart = async () => {
    const resp = await fetch('/cart')
    const json = await resp.json()

    setCart(json.body)
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

    setCart(json.body)
  }

  const toggleCartHandler = (className) => {
    setCartToggleClass(className)
  }
console.log(cart, 'cart');
return <div>
    <div className="cart-icon" onClick={() => toggleCartHandler('slide_in-right')}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
        <path d="M2 2h4v4h16v11H4V4H2V2zm4 13h14V8H6v7zm0 4h3v3H6v-3zm14 0h-3v3h3v-3z" fill="black" />
      </svg>
    </div>

    <div className={"cart tray " + cartToggleClass}>
      <div className="close" onClick={() => toggleCartHandler('slide_out-right')}>
        close
      </div>
      <div class="cart-list">
        {cart.map((el, i) => {
          return <div class="cart-item">
            <div class="cart-item_image">
              <img src={el.image_path} />
            </div>

            <div class="cart-item_info">
              <div class="mb-10">
                {el.name + '/' + el.sku}
              </div>

              <div className="flex-row mb-10">
                кількість:
                <div className="q-icon ml-5" onClick={() => cartQuantityHandler('Decrease', el.sku, el.size)}>
                  <Icons icon={'minus'} />
                </div>
                <div className="ml-5">
                  {el.cart_quantity}
                </div>
                <div className="q-icon ml-5" onClick={() => cartQuantityHandler('Add', el.sku, el.size)}>
                  <Icons icon={'plus'} />
                </div>
              </div>

              <div>
                розмір: {el.size}
              </div>
            </div>
          </div>
        })}
      </div>

      {
        !cart.length && <div>
           Корзина пуста
        </div>
      }

      {!!cart.length && <button class="cart-submit">
        <a href="/checkout">
          Оформити замовлення
        </a>
      </button>}
    </div>
  </div>
}

export default Cart