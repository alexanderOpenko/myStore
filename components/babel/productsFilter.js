var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { useState, useRef, useEffect } from "react";
import Icons from "./icons";
import { Range } from 'react-range';
import { sortSizesHook } from "./products";
// import BrandsList from "./menu";

var PriceFilter = function PriceFilter(_ref) {
  var handleFiltersFields = _ref.handleFiltersFields,
      data = _ref.data;

  var STEP = 40;
  var MIN = data[0];
  var MAX = data[1];

  var _useState = useState([MIN, MAX]),
      _useState2 = _slicedToArray(_useState, 2),
      rangeValues = _useState2[0],
      setRangValues = _useState2[1];

  if (data[0] == data[1]) {
    return React.createElement(
      "div",
      null,
      React.createElement("input", { name: "filter_price", className: "hidden-checkbox-input", readOnly: true, value: rangeValues }),
      "\u0404\u0434\u0438\u043D\u0430 \u0446\u0456\u043D\u0430: ",
      data[1]
    );
  }

  useEffect(function () {
    handleFiltersFields();
  }, [rangeValues]);

  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
      }
    },
    React.createElement("input", { name: "filter_price", className: "hidden-checkbox-input", readOnly: true, value: rangeValues }),
    React.createElement(Range, {
      values: rangeValues,
      step: STEP,
      min: MIN,
      max: MAX,
      onChange: function onChange(values) {
        setRangValues(values);
      },
      renderTrack: function renderTrack(_ref2) {
        var props = _ref2.props,
            children = _ref2.children;
        return React.createElement(
          "div",
          Object.assign({}, props, {
            style: {
              height: "6px",
              width: "100%",
              backgroundColor: "#2d2d2d"
            }
          }),
          children
        );
      },
      renderThumb: function renderThumb(_ref3) {
        var props = _ref3.props,
            isDragged = _ref3.isDragged;
        return React.createElement(
          "div",
          Object.assign({}, props, {
            style: Object.assign({}, props.style, {
              height: "20px",
              width: "20px",
              borderRadius: "4px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA"
            })
          }),
          React.createElement("div", {
            style: {
              height: "12px",
              width: "4px",
              backgroundColor: isDragged ? "#2d2d2d" : "#CCC"
            }
          })
        );
      }
    }),
    React.createElement(
      "div",
      { style: { width: "100%", marginTop: "14px" }, className: "flex-row flex-between" },
      React.createElement(
        "div",
        null,
        rangeValues[0]
      ),
      React.createElement(
        "div",
        null,
        rangeValues[1]
      )
    )
  );
};

var ColorFilter = function ColorFilter(_ref4) {
  var handleFiltersFields = _ref4.handleFiltersFields,
      data = _ref4.data;

  return React.createElement(
    "div",
    { className: "filter-color flex-row wrap-grid" },
    data.map(function (el, i) {
      return React.createElement(
        "label",
        { key: i, className: "filter-item" },
        React.createElement("input", { className: "hidden-checkbox-input",
          name: "filter_color",
          value: el,
          type: "checkbox",
          onChange: handleFiltersFields
        }),
        React.createElement("span", { className: "checkbox-mask", style: { backgroundColor: el } })
      );
    })
  );
};

var SizesFilter = function SizesFilter(_ref5) {
  var handleFiltersFields = _ref5.handleFiltersFields,
      data = _ref5.data;

  var sortedSizes = sortSizesHook({ size: data });

  return React.createElement(
    "div",
    null,
    sortedSizes.map(function (el, i) {
      return React.createElement(
        "label",
        { key: i, className: "filter-item" },
        React.createElement("input", {
          className: "hidden-checkbox-input size-input",
          name: "filter_size",
          value: el,
          type: "checkbox",
          onChange: handleFiltersFields
        }),
        React.createElement(
          "div",
          { className: "custom-input" },
          React.createElement(
            "span",
            { className: "custom-input_value" },
            el
          )
        )
      );
    })
  );
};

var brandFilter = function brandFilter(_ref6) {
  var handleFiltersFields = _ref6.handleFiltersFields,
      data = _ref6.data;

  console.log(data, 'databrands');
  return React.createElement(
    "div",
    null,
    data.sort(function (a, b) {
      return a.localeCompare(b);
    }).map(function (el, i) {
      return React.createElement(
        "label",
        { key: i, className: "filter-item" },
        React.createElement("input", {
          className: "hidden-checkbox-input size-input",
          name: "filter_brand",
          value: el,
          type: "checkbox",
          onChange: handleFiltersFields
        }),
        React.createElement(
          "div",
          { className: "custom-input" },
          React.createElement(
            "span",
            { className: "custom-input_value" },
            el
          )
        )
      );
    })
  );
};

var ProductsFilter = function ProductsFilter(_ref7) {
  var handleFilters = _ref7.handleFilters,
      collection = _ref7.collection,
      products = _ref7.products,
      toggleFilterHandler = _ref7.toggleFilterHandler;

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      activeItems = _useState4[0],
      setActiveItem = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      brandsList = _useState6[0],
      setBrandsList = _useState6[1];

  var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      maxMinPrices = _useState8[0],
      setMaxMinPridces = _useState8[1];

  var _useState9 = useState([]),
      _useState10 = _slicedToArray(_useState9, 2),
      colorList = _useState10[0],
      setColorList = _useState10[1];

  var _useState11 = useState([]),
      _useState12 = _slicedToArray(_useState11, 2),
      sizesList = _useState12[0],
      setSizesList = _useState12[1];

  var iconPlus = React.createElement(Icons, { icon: 'plus' });
  var iconMinus = React.createElement(Icons, { icon: 'minus' });
  var filterFormRef = useRef(null);

  useEffect(function () {
    var listOfBrands = [];
    var listOfColors = [];
    var listOfSizes = [];
    var prices = [];

    products.forEach(function (el) {
      if (!listOfBrands.includes(el.producer)) {
        if (el.producer) {
          listOfBrands.push(el.producer);
        }
      }

      if (el.color && !listOfColors.includes(el.color)) {
        listOfColors.push(el.color);
      }

      if (el) {
        el.size.forEach(function (e) {
          if (!listOfSizes.includes(e)) {
            listOfSizes.push(e);
          }
        });
      }

      prices.push(el.price);
    });
    var max = Math.max.apply(Math, prices);
    var min = Math.min.apply(Math, prices);

    setMaxMinPridces([min, max]);

    setBrandsList(listOfBrands);
    setSizesList(listOfSizes);
    setColorList(listOfColors);
  }, []);

  var filterComponents = [{ title: 'Ціна', name: PriceFilter, data: maxMinPrices }, { title: 'Колір', name: ColorFilter, data: colorList }, { title: 'Розмір', name: SizesFilter, data: sizesList }, { title: 'Бренд', name: brandFilter, data: brandsList }];

  var accordeonHandler = function accordeonHandler(i) {
    setActiveItem(function (prevActiveItems) {
      var arrayOfIndecies = [].concat(_toConsumableArray(prevActiveItems));
      if (arrayOfIndecies.includes(i)) {
        arrayOfIndecies.splice(arrayOfIndecies.indexOf(i), 1);
      } else {
        arrayOfIndecies.push(i);
      }

      return arrayOfIndecies;
    });
  };

  var handleFiltersFields = function handleFiltersFields() {
    var formData = new FormData(filterFormRef.current);
    handleFilters(formData);
  };

  return !!maxMinPrices.length && React.createElement(
    "div",
    { className: "filters" },
    React.createElement(
      "div",
      { className: "flex-row align-center flex-between" },
      React.createElement(
        "h1",
        null,
        "\u0424\u0456\u043B\u044C\u0442\u0440\u0438"
      ),
      React.createElement(
        "div",
        { className: "standart-icon", onClick: function onClick() {
            return toggleFilterHandler('slide_out');
          } },
        React.createElement(Icons, { icon: 'close' })
      )
    ),
    React.createElement(
      "div",
      { className: "filters_list" },
      React.createElement(
        "form",
        { ref: filterFormRef, className: "filter-products-form" },
        filterComponents.map(function (el, i) {
          var Component = el.name;

          return React.createElement(
            "div",
            { key: i, className: "filters_list-item accordion" },
            React.createElement(
              "div",
              { className: "filters-title flex-row flex-between pointer", onClick: function onClick() {
                  return accordeonHandler(i);
                } },
              React.createElement(
                "div",
                null,
                el.title
              ),
              React.createElement(
                "span",
                { className: "standart-icon" },
                activeItems.includes(i) ? iconMinus : iconPlus
              )
            ),
            React.createElement(
              "div",
              { className: activeItems.includes(i) ? "accordion_content accordion--active" : "accordion_content" },
              React.createElement(Component, { handleFiltersFields: handleFiltersFields, data: el.data })
            )
          );
        })
      )
    )
  );
};

export default ProductsFilter;