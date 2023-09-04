var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState } from "react";
import ProductsFilter from "./productsFilter";
import { LazyLoadImage } from 'react-lazy-load-image-component';

var Products = function Products(_ref) {
  var products = _ref.products;

  var _useState = useState(products),
      _useState2 = _slicedToArray(_useState, 2),
      allproducts = _useState2[0],
      setAllproducts = _useState2[1];

  var handleProductsByFilters = function handleProductsByFilters(formData) {
    var colorFilterOptions = formData.getAll('filter_color');
    var sizeFilterOptions = formData.getAll('filter_size');
    var priceFilterOptions = formData.get('filter_price').split(',');

    filterByOptions(colorFilterOptions, sizeFilterOptions, priceFilterOptions);
  };

  var filterByOptions = function filterByOptions() {
    var colorFilterOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var sizeFilterOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var priceFilterOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    setAllproducts(function (prevallproducts) {
      var filteredArray = products.filter(function (el) {
        var fixedPrice = el.price.replace(',', '.').replace(' ', '');
        var price = Number(fixedPrice);
        var colorMatch = colorFilterOptions.length ? colorFilterOptions.includes(el.color) : true;
        var sizeMatch = sizeFilterOptions.length ? sizeFilterOptions.some(function (s) {
          return el.size.includes(s);
        }) : true;
        var priceMatch = priceFilterOptions.length ? price >= priceFilterOptions[0] && price <= priceFilterOptions[1] : true; // range - это массив из двух элементов: минимальная и максимальная цена

        return colorMatch && sizeMatch && priceMatch;
      });

      return filteredArray;
    });
  };

  return React.createElement(
    "div",
    { className: "products" },
    React.createElement(
      "div",
      { className: "container flex-row" },
      React.createElement(
        "div",
        { className: "products-list flex-row wrap-grid mr-30 width80" },
        allproducts.map(function (el, i) {
          return React.createElement(
            "div",
            { key: i, className: "product four-desc-grid flex-column" },
            React.createElement(
              "a",
              { href: "/products?p=" + el.sku, "class": "flex-column flex-between heigth100" },
              React.createElement(
                "div",
                { className: "product_image heigth100 mb-10" },
                React.createElement(LazyLoadImage, {
                  className: "heigth100 cover",
                  src: el.image_path
                })
              ),
              React.createElement(
                "div",
                { className: "product_info" },
                React.createElement(
                  "div",
                  { className: "product_info-name mb-10 bold-label" },
                  el.name
                ),
                React.createElement(
                  "div",
                  { className: "product_info-price" },
                  el.price,
                  " \u20B4"
                )
              )
            )
          );
        })
      ),
      React.createElement(
        "div",
        { className: "products_filters width20" },
        React.createElement(ProductsFilter, { collection: products[0].collection, handleFilters: handleProductsByFilters })
      )
    )
  );
};

export default Products;