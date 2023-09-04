import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { useEffect, useState } from "react";
import Icons from "./icons";

var Cart = function Cart() {
  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      cartToggleClass = _useState2[0],
      setCartToggleClass = _useState2[1];

  var _useState3 = useState({ cart: [] }),
      _useState4 = _slicedToArray(_useState3, 2),
      cartData = _useState4[0],
      setCartData = _useState4[1];

  var getCart = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var resp, json;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch('/cart');

            case 2:
              resp = _context.sent;
              _context.next = 5;
              return resp.json();

            case 5:
              json = _context.sent;


              setCartData(json.body);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function getCart() {
      return _ref.apply(this, arguments);
    };
  }();

  useEffect(function () {
    getCart();
  }, [cartToggleClass]);

  var cartQuantityHandler = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(action, sku, size) {
      var data, resp, json;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = new FormData();

              data.append('action', action);
              data.append('sku', sku);
              data.append('size', size);

              _context2.next = 6;
              return fetch('/cart', {
                method: 'POST',
                body: data
              });

            case 6:
              resp = _context2.sent;
              _context2.next = 9;
              return resp.json();

            case 9:
              json = _context2.sent;


              setCartData(json.body);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function cartQuantityHandler(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  var toggleCartHandler = function toggleCartHandler(className) {
    document.querySelector('.mask').classList.toggle('mask-background');
    setCartToggleClass(className);
  };

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "align-center justify-center standart-icon flex-row cart-count" },
        cartData.cart.length ? cartData.total_count : 0
      ),
      React.createElement(
        "div",
        { className: "cart-icon standart-icon", onClick: function onClick() {
            return toggleCartHandler('slide_in-right');
          } },
        React.createElement(
          "svg",
          { xmlns: "http://www.w3.org/2000/svg", width: "24px", height: "24px", viewBox: "0 0 24 24", fill: "none" },
          React.createElement("path", { d: "M2 2h4v4h16v11H4V4H2V2zm4 13h14V8H6v7zm0 4h3v3H6v-3zm14 0h-3v3h3v-3z", fill: "black" })
        )
      )
    ),
    React.createElement(
      "div",
      { className: "cart tray " + cartToggleClass },
      React.createElement(
        "div",
        { className: "close standart-icon mb-20", onClick: function onClick() {
            return toggleCartHandler('slide_out-right');
          } },
        React.createElement(Icons, { icon: 'close' })
      ),
      React.createElement(
        "div",
        { className: "cart-list" },
        cartData.cart.map(function (el) {
          return React.createElement(
            "div",
            { key: el.id },
            React.createElement(
              "div",
              { className: "cart-item" },
              React.createElement(
                "div",
                { className: "cart-item_image" },
                React.createElement("img", { src: el.image_path })
              ),
              React.createElement(
                "div",
                { className: "width100" },
                React.createElement(
                  "div",
                  { className: "flex-row flex-between" },
                  React.createElement(
                    "div",
                    { className: "cart-item_info" },
                    React.createElement(
                      "div",
                      { className: "mb-10 align-center" },
                      React.createElement(
                        "div",
                        { className: "mr-10" },
                        el.name + '/' + el.sku
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "flex-row mb-10 align-center" },
                      "\u043A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C:",
                      React.createElement(
                        "div",
                        { className: "mini-icon ml-5", onClick: function onClick() {
                            return cartQuantityHandler('Decrease', el.sku, el.size);
                          } },
                        React.createElement(Icons, { icon: 'minus' })
                      ),
                      React.createElement(
                        "div",
                        { className: "ml-5" },
                        el.cart_quantity
                      ),
                      React.createElement(
                        "div",
                        { className: "mini-icon ml-5", onClick: function onClick() {
                            return cartQuantityHandler('Add', el.sku, el.size);
                          } },
                        React.createElement(Icons, { icon: 'plus' })
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "mb-10" },
                      "\u0440\u043E\u0437\u043C\u0456\u0440: ",
                      el.size
                    ),
                    React.createElement(
                      "div",
                      null,
                      "\u0446\u0456\u043D\u0430: ",
                      el.price
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "standart-icon" },
                    React.createElement(Icons, { icon: "thrash" })
                  )
                ),
                (el.out || el.last) && React.createElement(
                  "div",
                  { className: "warnings" },
                  el.out && React.createElement(
                    "div",
                    { className: "cart-out flex-row align-center flex-end" },
                    React.createElement(
                      "div",
                      { className: "standart-icon error-icon" },
                      React.createElement(Icons, { icon: 'warning' })
                    ),
                    React.createElement(
                      "div",
                      { className: "ml-5" },
                      "\u041D\u0435\u043C\u0430\u0454 \u0432 \u043D\u0430\u044F\u0432\u043D\u043E\u0441\u0442\u0456."
                    )
                  ),
                  el.last && React.createElement(
                    "div",
                    { className: "cart-last flex-row align-center flex-end" },
                    React.createElement(
                      "div",
                      { className: "standart-icon warning-icon" },
                      React.createElement(Icons, { icon: 'warning' })
                    ),
                    React.createElement(
                      "div",
                      { className: "ml-5" },
                      "\u041E\u0441\u0442\u0430\u043D\u043D\u0456 \u043E\u0434\u0438\u043D\u0438\u0446\u0456 \u0442\u043E\u0432\u0430\u0440\u0443. \u0412 \u043D\u0430\u044F\u0432\u043D\u043E\u0441\u0442\u0456 ",
                      el.available_only + (el.available_only == 1 ? ' одиниця' : ' одиниці'),
                      "."
                    )
                  )
                )
              )
            )
          );
        })
      ),
      !cartData.cart.length && React.createElement(
        "div",
        null,
        "\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430"
      ),
      !!cartData.cart.length && React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "mb-20" },
          "\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0430 \u0446\u0456\u043D\u0430: ",
          cartData.total_price
        ),
        React.createElement(
          "button",
          { className: "cart-submit primary-button width40" },
          React.createElement(
            "a",
            { href: "/checkout" },
            "\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u0438"
          )
        )
      )
    )
  );
};

export default Cart;