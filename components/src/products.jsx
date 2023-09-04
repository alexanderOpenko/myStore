import React, { useState } from "react";
import ProductsFilter from "./productsFilter";
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
      
        return colorMatch && sizeMatch && priceMatch
      })

      return filteredArray;
    });
  }

  return <div className="products">
    <div className="container flex-row">
      <div className="products-list flex-row wrap-grid mr-30 width80">
        {allproducts.map((el, i) => {
          return <div key={i} className="product four-desc-grid flex-column">
            <a href={"/products?p=" + el.sku} class="flex-column flex-between heigth100"> 
              <div className="product_image heigth100 mb-10">
               <LazyLoadImage 
                className={"heigth100 cover"}
                src={el.image_path}
               />
              </div>

              <div className="product_info">
                <div className="product_info-name mb-10 bold-label">
                  {el.name}
                </div>

                <div className="product_info-price">
                  {el.price} ₴
                </div>
              </div>
            </a>
          </div>
        })}
      </div>

      <div className="products_filters width20">
        <ProductsFilter collection={products[0].collection} handleFilters={handleProductsByFilters}/>
      </div>
    </div>
  </div>
}

export default Products;