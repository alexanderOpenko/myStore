import React, { useEffect, useState } from "react"
import Icons from "./icons"
import classNames from "classnames"

const Cart = ({setCartLength, cartToggleClass = 'slide_in' , toggleCartHandler = null, read = false}) => {
  const [cartData, setCartData] = useState({cart:[]})
  const [preloader, setPreloader] = useState(false)

  const setSubmitPreloader = () => {
    setPreloader(true)
  }

  const getCart = async () => {
    const resp = await fetch('/cart')
    const json = await resp.json()

    setCartData(json.body)
    setCartLength(json.body.total_count)
  }

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

  useEffect(() => {
    getCart()
  }, [cartToggleClass])

  const cartClass = classNames(
    'cart',
    cartToggleClass,  
    {'tray': !read}
  )

return <div>
    <div className={cartClass}>
      {toggleCartHandler && <div className="close standart-icon mb-20" onClick={() => toggleCartHandler('slide_out-right')}>
        <Icons icon={'close'} />
      </div>}
      
      <div className="cart-list">
        {cartData.cart.map((el) => {
          return <div key={el.id}>
            <div className="cart-item">
              <div className="cart-item_image">
                <img src={el.image_path} className="cover"/>
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

                  <div className="standart-icon" onClick={() => cartQuantityHandler('Delete', el.sku, el.size)}>
                    <Icons icon={"thrash"} />
                  </div>
                </div>

                {(el.out || el.last) && <div className="warnings ml-10">
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
                        Останні одиниці товару {el.size}
                        {/* В наявності {el.available_only + (el.available_only == 1 ? ' одиниця' : ' одиниці')}. */}
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

      {!read && <a href="/checkout">
        <button className="cart-submit primary-button width40" onClick={setSubmitPreloader}>
            {!preloader && <div>Оформити</div>}

            {preloader && <div className="cart-preloader"><img src='../../Assets/preloader.gif'/></div>}
        </button>
        </a>
      }
      </div>
      }
    </div>
  </div>
}

export default Cart