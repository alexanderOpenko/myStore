var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { useState } from "react";
import ProductsFilter from "./productsFilter";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SexHook from "./sexHook";
import Icons from "./icons";

var Products = function Products(_ref) {
  var products = _ref.products;

  var sex = SexHook();

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      filterToggleClass = _useState2[0],
      setfilterToggleClass = _useState2[1];

  var _useState3 = useState(products),
      _useState4 = _slicedToArray(_useState3, 2),
      allproducts = _useState4[0],
      setAllproducts = _useState4[1];

  var handleProductsByFilters = function handleProductsByFilters(formData) {
    var colorFilterOptions = formData.getAll('filter_color');
    var sizeFilterOptions = formData.getAll('filter_size');
    var priceFilterOptions = formData.get('filter_price').split(',');
    var brandsFilterOptions = formData.getAll('filter_brand');

    filterByOptions(colorFilterOptions, sizeFilterOptions, priceFilterOptions, brandsFilterOptions);
  };

  var filterByOptions = function filterByOptions() {
    var colorFilterOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var sizeFilterOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var priceFilterOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var brandsFilterOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    setAllproducts(function (prevallproducts) {
      var filteredArray = products.filter(function (el) {
        var fixedPrice = el.price.replace(',', '.').replace(' ', '');
        var price = Number(fixedPrice);
        var colorMatch = colorFilterOptions.length ? colorFilterOptions.includes(el.color) : true;
        var brandMatch = brandsFilterOptions.length ? brandsFilterOptions.includes(el.producer) : true;
        var sizeMatch = sizeFilterOptions.length ? sizeFilterOptions.some(function (s) {
          return el.size.includes(s);
        }) : true;
        var priceMatch = priceFilterOptions.length ? price >= priceFilterOptions[0] && price <= priceFilterOptions[1] : true; // range - это массив из двух элементов: минимальная и максимальная цена

        return colorMatch && sizeMatch && priceMatch && brandMatch;
      });

      return filteredArray;
    });
  };

  var toggleFilterHandler = function toggleFilterHandler(className) {
    document.querySelector('.mask').classList.toggle('mask-background');
    setfilterToggleClass(className);
  };

  var params = new URLSearchParams(window.location.search);
  var collection = params.get('collection');

  return React.createElement(
    "div",
    { className: "products" },
    React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "filter-btn-wrapper width100" },
        React.createElement(
          "button",
          { className: "filter-btn flex-row align-center", onClick: function onClick() {
              return toggleFilterHandler('slide_in');
            } },
          React.createElement(
            "div",
            { className: "bold-label body1" },
            " \u0424\u0456\u043B\u044C\u0442\u0440\u0438 "
          ),
          React.createElement(
            "div",
            { className: "ml-15 standart-icon" },
            " ",
            React.createElement(Icons, { icon: 'filter' }),
            " "
          )
        )
      ),
      React.createElement(
        "div",
        { className: "mb-30 products_filters tray " + filterToggleClass },
        React.createElement(ProductsFilter, {
          collection: products[0].collection,
          handleFilters: handleProductsByFilters,
          products: products,
          toggleFilterHandler: toggleFilterHandler
        }),
        React.createElement(
          "button",
          { className: "filter-btn flex-row align-center", onClick: function onClick() {
              return toggleFilterHandler('slide_out');
            } },
          React.createElement(
            "div",
            { className: "bold-label body1" },
            " \u0414\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0456\u0432 "
          ),
          React.createElement(
            "div",
            { className: "ml-15 standart-icon" },
            " ",
            React.createElement(Icons, { icon: 'slider_arrow' }),
            " "
          )
        )
      ),
      React.createElement(
        "div",
        { className: "products-list" },
        React.createElement(
          "h1",
          { className: "collection-heading text-center image-text-heading" },
          collection == 'all' ? "Всі товари" : collection
        ),
        allproducts.length ? React.createElement(
          "div",
          { className: "flex-row wrap-grid" },
          allproducts.map(function (el, i) {
            return React.createElement(
              "div",
              { key: i, className: "product four-desc-grid three-table-grid two-mobile-grid flex-column" },
              React.createElement(
                "a",
                { href: "/" + sex + "/products?p=" + el.sku, "class": "flex-column flex-between" },
                React.createElement(
                  "div",
                  { className: "product_image relative mb-10" },
                  React.createElement(LazyLoadImage, {
                    className: "heigth100 cover absolute",
                    src: el.image_path
                  })
                ),
                React.createElement(
                  "div",
                  { className: "product_info hover" },
                  React.createElement(
                    "div",
                    { className: "hover-hide" },
                    React.createElement(
                      "div",
                      { className: "body1 primary-label" },
                      el.collection
                    ),
                    React.createElement(
                      "div",
                      { className: "bold-label body1" },
                      el.producer
                    ),
                    React.createElement(
                      "div",
                      { className: "body1 mb-10 prodcut-name" },
                      el.name
                    ),
                    React.createElement(
                      "div",
                      { className: "body1 mobile-sizes-list mb-10" },
                      !!el.size.length && sortSizesHook({ size: el.size }).join(', ')
                    ),
                    React.createElement(
                      "div",
                      { className: "product_info-price" },
                      el.price,
                      " \u20B4"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "hover-show hidden desctop-sizes-list" },
                    React.createElement(
                      "div",
                      { className: "bold-label body1" },
                      "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u0456 \u0440\u043E\u0437\u043C\u0456\u0440\u0438"
                    ),
                    React.createElement(
                      "div",
                      { className: "body1" },
                      !!el.size.length && sortSizesHook({ size: el.size }).join(', ')
                    )
                  )
                )
              )
            );
          })
        ) : React.createElement(
          "div",
          { className: "pt-150" },
          "\u041A\u043E\u043B\u0435\u043A\u0446\u0456\u044F \u043F\u043E\u0440\u043E\u0436\u043D\u044F"
        )
      )
    )
  );
};

export var sortSizesHook = function sortSizesHook(_ref2) {
  var size = _ref2.size;

  // Создаем копию входного объекта
  var productsCopy = [].concat(_toConsumableArray(size));
  var customOrder = ["xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"];

  var sortedObj = productsCopy.sort(function (a, b) {
    return customOrder.indexOf(a.toLowerCase()) - customOrder.indexOf(b.toLowerCase());
  });

  if (!isNaN(productsCopy[0])) {
    return [].concat(_toConsumableArray(sortedObj)).reverse();
  }

  return sortedObj;
};

export default Products;