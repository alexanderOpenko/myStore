import React, { useState } from "react";
import ProductsFilter from "./productsFilter";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SexHook from "./sexHook";
import Icons from "./icons";

const Products = ({ products }) => {
  const sex = SexHook()
  const [filterToggleClass, setfilterToggleClass] = useState('')
  const [allproducts, setAllproducts] = useState(products)
  const handleProductsByFilters = (formData) => {
    const colorFilterOptions = formData.getAll('filter_color')
    const sizeFilterOptions = formData.getAll('filter_size')
    const priceFilterOptions = formData.get('filter_price').split(',')
    const brandsFilterOptions = formData.getAll('filter_brand')

    filterByOptions(colorFilterOptions, sizeFilterOptions, priceFilterOptions, brandsFilterOptions)
  }

  const filterByOptions = (colorFilterOptions = [], sizeFilterOptions = [], priceFilterOptions = [], brandsFilterOptions = []) => {
    setAllproducts((prevallproducts) => {
      const filteredArray = products.filter((el) => {
        const fixedPrice = el.price.replace(',', '.').replace(' ', '')
        const price = Number(fixedPrice)
        const colorMatch = colorFilterOptions.length ? colorFilterOptions.includes(el.color) : true
        const brandMatch = brandsFilterOptions.length ? brandsFilterOptions.includes(el.producer) : true
        const sizeMatch = sizeFilterOptions.length ? sizeFilterOptions.some(s => el.size.includes(s)) : true
        const priceMatch = priceFilterOptions.length ? price >= priceFilterOptions[0] && price <= priceFilterOptions[1] : true // range - это массив из двух элементов: минимальная и максимальная цена

        return colorMatch && sizeMatch && priceMatch && brandMatch
      })

      return filteredArray;
    });
  }

  const toggleFilterHandler = (className) => {
    document.querySelector('.mask').classList.toggle('mask-background')
    setfilterToggleClass(className)
  }

  const params = new URLSearchParams(window.location.search);
  const collection = params.get('collection');

  return <div className="products">
    <div className="container">
      <div className="filter-btn-wrapper width100">
        <button className="filter-btn flex-row align-center" onClick={() => toggleFilterHandler('slide_in')}>
          <div className="bold-label body1"> Фільтри </div>
          <div className="ml-15 standart-icon"> {<Icons icon={'filter'} />} </div>
        </button>
      </div>

      <div className={"mb-30 products_filters tray " + filterToggleClass}>
        <ProductsFilter
          collection={products[0].collection}
          handleFilters={handleProductsByFilters}
          products={products}
          toggleFilterHandler={toggleFilterHandler}
        />

        <button className="filter-btn flex-row align-center" onClick={() => toggleFilterHandler('slide_out')}>
          <div className="bold-label body1"> До результатів </div>
          <div className="ml-15 standart-icon"> {<Icons icon={'slider_arrow'} />} </div>
        </button>
      </div>

      <div className="products-list">
        <h1 className="collection-heading text-center image-text-heading">
          {
            collection == 'all' ? "Всі товари" : collection
          }
        </h1>
        {allproducts.length ? <div className="flex-row wrap-grid">
          {allproducts.map((el, i) => {
            return <div key={i} className="product four-desc-grid three-table-grid two-mobile-grid flex-column">
              <a href={"/" + sex + "/products?p=" + el.sku} class="flex-column flex-between">
                <div className="product_image relative mb-10">
                  <LazyLoadImage
                    className={"heigth100 cover absolute"}
                    src={el.image_path}
                  />
                </div>

                <div className="product_info hover">
                  <div className="hover-hide">
                    <div className="body1 primary-label">
                      {el.collection}
                    </div>

                    <div className="bold-label body1">
                      {el.producer}
                    </div>

                    <div className="body1 mb-10 prodcut-name">
                      {el.name}
                    </div>

                    <div className="body1 mobile-sizes-list mb-10">
                    {!!el.size.length && sortSizesHook({size: el.size}).join(', ')}
                    </div>

                    <div className="product_info-price">
                      {el.price} ₴
                    </div>
                  </div>

                  <div className="hover-show hidden desctop-sizes-list">
                    <div className="bold-label body1">
                      Доступні розміри
                    </div>

                    <div className="body1">
                      {!!el.size.length && sortSizesHook({size: el.size}).join(', ')}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          })}
        </div> : <div className="pt-150">Колекція порожня</div>}
      </div>
    </div>
  </div>
}

export const sortSizesHook = ({size}) => {
  // Создаем копию входного объекта
  const productsCopy = [...size];
  const customOrder = ["xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"];

  let sortedObj = productsCopy.sort((a, b) => customOrder.indexOf(a.toLowerCase()) - customOrder.indexOf(b.toLowerCase()));

  if (!isNaN(productsCopy[0])) {
    return [...sortedObj].reverse();
  }

  return sortedObj;
}

export default Products;