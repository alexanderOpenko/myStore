import React, { useState } from "react";
import ProductsFilter from "./productsFilter";

const Products = ({ products }) => {
  const [allproducts, setAllproducts] = useState(products)

  const handleProductsByFilters = (formData) => {
    const colorFilterOptions = formData.getAll('filter_color')   
    const sizeFilterOptions = formData.getAll('filter_size')
    const priceFilterOptions = formData.get('filter_price').split(',')

    filterByOptions(colorFilterOptions, sizeFilterOptions, priceFilterOptions)
  }

  const filterByOptions = (colorFilterOptions = null, sizeFilterOptions = null, priceFilterOptions = null,) => {
    setAllproducts((prevallproducts) => {
      const filteredArray = products.filter((el) => {
        const fixedPrice = el.price.replace(',', '.').replace(' ', '')
        const price = Number(fixedPrice)
        const colorMatch = colorFilterOptions.length ? colorFilterOptions.includes(el.color) : true
        const sizeMatch = sizeFilterOptions.length ? sizeFilterOptions.some(s => el.size.includes(s)) : true  
        const priceMatch = priceFilterOptions.length ? price >= priceFilterOptions[0] && price <= priceFilterOptions[1] : true // range - это массив из двух элементов: минимальная и максимальная цена
      
        // возвращаем только те товары, которые удовлетворяют всем трем условиям
        return colorMatch && sizeMatch && priceMatch
      })

      return filteredArray;
    });
  }

  return <div className="products">
    <div className="container flex-row">
      <div className="products_filters mr-30">
        <ProductsFilter handleFilters={handleProductsByFilters}/>
      </div>

      <div className="products-list flex-row wrap-grid">
        {allproducts.map((el, i) => {
          return <div key={i} className="product four-desc-grid">
            <a href={"/products?p=" + el.sku}>
              <div className="product_image">
                <img src={el.image_path} />
              </div>

              <div className="product_info">
                <div className="product_info-name">
                  {el.name}
                </div>

                <div className="product_info-price">
                  {el.price}
                </div>
              </div>
            </a>
          </div>
        })}
      </div>
    </div>
  </div>
}

export default Products;