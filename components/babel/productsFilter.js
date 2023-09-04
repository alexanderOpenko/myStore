var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { useState, useRef, useEffect } from "react";
import Icons from "./icons";
import { Range } from 'react-range';

var PriceFilter = function PriceFilter(_ref) {
  var handleFiltersFields = _ref.handleFiltersFields;

  console.log('price');
  var STEP = 50;
  var MIN = 0;
  var MAX = 2000;

  var _useState = useState([0, MAX]),
      _useState2 = _slicedToArray(_useState, 2),
      rangeValues = _useState2[0],
      setRangValues = _useState2[1];

  useEffect(function () {
    return handleFiltersFields();
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

var colorOptions = ['Black', 'White', 'Silver'];

var ColorFilter = function ColorFilter(_ref4) {
  var handleFiltersFields = _ref4.handleFiltersFields;

  return React.createElement(
    "div",
    { className: "filter-color flex-row" },
    colorOptions.map(function (el, i) {
      return React.createElement(
        "label",
        { key: i, className: "filter-item" },
        React.createElement("input", { className: "hidden-checkbox-input",
          name: "filter_color",
          value: el,
          type: "checkbox",
          onChange: handleFiltersFields
        }),
        React.createElement("span", { className: "checkbox-mask checkbox-mask-" + el })
      );
    })
  );
};

var SizesFilter = function SizesFilter(_ref5) {
  var handleFiltersFields = _ref5.handleFiltersFields,
      data = _ref5.data;

  return React.createElement(
    "div",
    null,
    data.map(function (el, i) {
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

var ProductsFilter = function ProductsFilter(_ref6) {
  var handleFilters = _ref6.handleFilters,
      collection = _ref6.collection;

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      activeItems = _useState4[0],
      setActiveItem = _useState4[1];

  var iconPlus = React.createElement(Icons, { icon: 'plus' });
  var iconMinus = React.createElement(Icons, { icon: 'minus' });
  var filterFormRef = useRef(null);

  var standartSizeOptions = ["S", "M", "L", "XL", "XXL", "XXXL"];

  var shoesSizeOptions = [41, 42, 43];

  var jeansSizeOptions = [32, 34, 36];

  var sizeOptions = [];

  if (collection == 'T-shirts' || collection == 'T-shirts') {
    sizeOptions = standartSizeOptions;
  } else if (collection == 'Jeans') {
    sizeOptions = jeansSizeOptions;
  } else if (collection == 'Shoes') {
    sizeOptions = shoesSizeOptions;
  }

  var filterComponents = [{ title: 'Ціна', name: PriceFilter, data: '' }, { title: 'Колір', name: ColorFilter, data: '' }, { title: 'Розмір', name: SizesFilter, data: sizeOptions }];

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

  return React.createElement(
    "div",
    { className: "filters" },
    React.createElement(
      "h1",
      null,
      "\u0424\u0456\u043B\u044C\u0442\u0440\u0438"
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
              { className: "filters-title flex-row flex-between", onClick: function onClick() {
                  return accordeonHandler(i);
                } },
              el.title,
              React.createElement(
                "span",
                null,
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