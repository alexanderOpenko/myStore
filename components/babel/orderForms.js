import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { useEffect, useState } from "react";
import Icons from "./icons";

var orderStatuses = ['В роботі', 'Готовий до відправлення', 'Відправлений', 'Доставлений', 'Отримано', 'Відправлений назад', 'Повернення', 'Обмін'];

var OrderForms = function OrderForms() {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        allProductsList = _useState2[0],
        setAllProductsList = _useState2[1];

    var _useState3 = useState([]),
        _useState4 = _slicedToArray(_useState3, 2),
        products = _useState4[0],
        setProducts = _useState4[1];

    var _useState5 = useState('вибери товар'),
        _useState6 = _slicedToArray(_useState5, 2),
        chosenOrderProduct = _useState6[0],
        setChosenOrderProduct = _useState6[1];

    var _useState7 = useState(''),
        _useState8 = _slicedToArray(_useState7, 2),
        document = _useState8[0],
        setDocument = _useState8[1];

    var _useState9 = useState(''),
        _useState10 = _slicedToArray(_useState9, 2),
        doc_ref = _useState10[0],
        setDocumentRef = _useState10[1];

    var _useState11 = useState(0),
        _useState12 = _slicedToArray(_useState11, 2),
        orderId = _useState12[0],
        setOrderId = _useState12[1];

    var _useState13 = useState(''),
        _useState14 = _slicedToArray(_useState13, 2),
        statusValue = _useState14[0],
        setStatusValue = _useState14[1];

    var _useState15 = useState(0),
        _useState16 = _slicedToArray(_useState15, 2),
        orderPrice = _useState16[0],
        setOrderPrice = _useState16[1];

    var _useState17 = useState(0),
        _useState18 = _slicedToArray(_useState17, 2),
        orderWeight = _useState18[0],
        setOrderWeight = _useState18[1];

    var dataRequest = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var searchParams, id, resp, respJSON;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            searchParams = new URLSearchParams(window.location.search);
                            id = searchParams.get('id');
                            _context.next = 4;
                            return fetch("/order?order_forms=true&order_id=" + id);

                        case 4:
                            resp = _context.sent;
                            _context.next = 7;
                            return resp.json();

                        case 7:
                            respJSON = _context.sent;


                            if (respJSON.body.order_products) {
                                setProducts(respJSON.body.order_products);
                            } else {
                                setProducts([]);
                            }

                            setDocument(respJSON.body.order_info[0].document);
                            setDocumentRef(respJSON.body.order_info[0].doc_ref);
                            setOrderId(respJSON.body.order_info[0].id);
                            setOrderPrice(respJSON.body.order_info[0].price);
                            setOrderWeight(respJSON.body.order_info[0].weight);
                            setStatusValue(respJSON.body.order_info[0].status);

                        case 15:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function dataRequest() {
            return _ref.apply(this, arguments);
        };
    }();
    console.log(products, 'products');

    var priceOfOrderHandler = function priceOfOrderHandler(value) {
        setOrderPrice(value);
    };

    var weightOfOrderHandler = function weightOfOrderHandler(value) {
        setOrderWeight(value);
    };

    var loadProductsHandler = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            getAllProductsList();

                        case 1:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function loadProductsHandler() {
            return _ref2.apply(this, arguments);
        };
    }();

    var getAllProductsList = function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
            var resp, json;
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return fetch("/order?get_prods_list=true");

                        case 3:
                            resp = _context3.sent;
                            _context3.next = 6;
                            return resp.json();

                        case 6:
                            json = _context3.sent;

                            setAllProductsList(json.body);
                            _context3.next = 13;
                            break;

                        case 10:
                            _context3.prev = 10;
                            _context3.t0 = _context3["catch"](0);

                            alert('Помилка');

                        case 13:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[0, 10]]);
        }));

        return function getAllProductsList() {
            return _ref3.apply(this, arguments);
        };
    }();

    var insert_order_product = function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
            var data, splitProd, resp;
            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            if (chosenOrderProduct == 'вибери товар') {
                                alert('вибери товар!');
                            }

                            data = new FormData();
                            splitProd = chosenOrderProduct.split(',');


                            data.append('add_order_prod', 'true');
                            data.append('order_id', orderId);
                            data.append('sku', splitProd[0]);
                            data.append('size', splitProd[1]);

                            _context4.prev = 7;
                            _context4.next = 10;
                            return fetch('/order', {
                                method: 'POST',
                                body: data
                            });

                        case 10:
                            resp = _context4.sent;


                            dataRequest();
                            _context4.next = 17;
                            break;

                        case 14:
                            _context4.prev = 14;
                            _context4.t0 = _context4["catch"](7);

                            alert('Помилка при додаванні товару');

                        case 17:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[7, 14]]);
        }));

        return function insert_order_product() {
            return _ref4.apply(this, arguments);
        };
    }();

    var effectCallback = function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
            return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return dataRequest();

                        case 2:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, _this);
        }));

        return function effectCallback() {
            return _ref5.apply(this, arguments);
        };
    }();

    useEffect(function () {
        effectCallback();
    }, []);

    var update_order_status = function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
            var data, resp, body;
            return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            data = new FormData();


                            data.append('update_status', 'true');
                            data.append('status', statusValue);
                            data.append('order_id', orderId);

                            _context6.prev = 4;
                            _context6.next = 7;
                            return fetch('/order', {
                                method: "POST",
                                body: data
                            });

                        case 7:
                            resp = _context6.sent;
                            _context6.next = 10;
                            return resp.json();

                        case 10:
                            body = _context6.sent;

                            if (body.code) {
                                alert('Статус оновленно');
                            } else {
                                alert(body.message);
                            }
                            _context6.next = 17;
                            break;

                        case 14:
                            _context6.prev = 14;
                            _context6.t0 = _context6["catch"](4);

                            Alert('Помилка при оновленні статусу');

                        case 17:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, _this, [[4, 14]]);
        }));

        return function update_order_status() {
            return _ref6.apply(this, arguments);
        };
    }();

    var update_order_weight = function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
            var data, resp, body;
            return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            data = new FormData();


                            data.append('update_weight', 'true');
                            data.append('weight', orderWeight);
                            data.append('order_id', orderId);

                            _context7.prev = 4;
                            _context7.next = 7;
                            return fetch('/order', {
                                method: "POST",
                                body: data
                            });

                        case 7:
                            resp = _context7.sent;
                            _context7.next = 10;
                            return resp.json();

                        case 10:
                            body = _context7.sent;

                            if (body.code) {
                                alert('Вагу оновленно');
                            } else {
                                alert(body.message);
                            }
                            _context7.next = 17;
                            break;

                        case 14:
                            _context7.prev = 14;
                            _context7.t0 = _context7["catch"](4);

                            Alert('Помилка при оновленні ціни');

                        case 17:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, _this, [[4, 14]]);
        }));

        return function update_order_weight() {
            return _ref7.apply(this, arguments);
        };
    }();

    var update_order_price = function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
            var data, resp, body;
            return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            data = new FormData();


                            data.append('update_price', 'true');
                            data.append('price', orderPrice);
                            data.append('order_id', orderId);

                            _context8.prev = 4;
                            _context8.next = 7;
                            return fetch('/order', {
                                method: "POST",
                                body: data
                            });

                        case 7:
                            resp = _context8.sent;
                            _context8.next = 10;
                            return resp.json();

                        case 10:
                            body = _context8.sent;

                            if (body.code) {
                                alert('Ціну оновленно');
                            } else {
                                alert(body.message);
                            }
                            _context8.next = 17;
                            break;

                        case 14:
                            _context8.prev = 14;
                            _context8.t0 = _context8["catch"](4);

                            Alert('Помилка при оновленні ціни');

                        case 17:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, _this, [[4, 14]]);
        }));

        return function update_order_price() {
            return _ref8.apply(this, arguments);
        };
    }();

    var documentSubmit = function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9() {
            var data, resp, body;
            return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            data = new FormData();

                            data.append('create_document', 'true');
                            data.append('order_id', orderId);

                            _context9.next = 5;
                            return fetch('/checkout', {
                                method: "POST",
                                body: data
                            });

                        case 5:
                            resp = _context9.sent;
                            _context9.prev = 6;
                            _context9.next = 9;
                            return resp.json();

                        case 9:
                            body = _context9.sent;

                            if (body.code) {
                                alert('ТТН створено');
                            } else {
                                alert(body.message);
                            }
                            _context9.next = 16;
                            break;

                        case 13:
                            _context9.prev = 13;
                            _context9.t0 = _context9["catch"](6);

                            alert('Помилка в створенні ТТН. Перевір контактні дані');

                        case 16:

                            window.location.reload();

                        case 17:
                        case "end":
                            return _context9.stop();
                    }
                }
            }, _callee9, _this, [[6, 13]]);
        }));

        return function documentSubmit() {
            return _ref9.apply(this, arguments);
        };
    }();

    var documentDelete = function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10() {
            var data, resp, body;
            return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            data = new FormData();

                            data.append('delete_document', 'true');
                            data.append('doc_ref', doc_ref);

                            _context10.next = 5;
                            return fetch('/checkout', {
                                method: "POST",
                                body: data
                            });

                        case 5:
                            resp = _context10.sent;
                            _context10.prev = 6;
                            _context10.next = 9;
                            return resp.json();

                        case 9:
                            body = _context10.sent;

                            if (body.code) {
                                alert('ТТН видалено');
                            } else {
                                alert(body.message);
                            }
                            _context10.next = 16;
                            break;

                        case 13:
                            _context10.prev = 13;
                            _context10.t0 = _context10["catch"](6);

                            alert('Помилка при видаленні ТТН');

                        case 16:

                            window.location.reload();

                        case 17:
                        case "end":
                            return _context10.stop();
                    }
                }
            }, _callee10, _this, [[6, 13]]);
        }));

        return function documentDelete() {
            return _ref10.apply(this, arguments);
        };
    }();

    var quantityOfOrderHandler = function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(index, value, prod_id) {
            var newProducts;
            return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            newProducts = [].concat(_toConsumableArray(products));

                            newProducts[index]['order_quantity'] = value;
                            setProducts(newProducts);

                            _context11.prev = 3;
                            _context11.next = 6;
                            return fetch("/order?update_order_quantity=true&prod_id=" + prod_id + "&value=" + value);

                        case 6:
                            _context11.next = 11;
                            break;

                        case 8:
                            _context11.prev = 8;
                            _context11.t0 = _context11["catch"](3);

                            alert('Помилка при оновленні кількості');

                        case 11:
                        case "end":
                            return _context11.stop();
                    }
                }
            }, _callee11, _this, [[3, 8]]);
        }));

        return function quantityOfOrderHandler(_x, _x2, _x3) {
            return _ref11.apply(this, arguments);
        };
    }();

    var deleteOrderProd = function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(prod_id) {
            var resp;
            return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            _context12.prev = 0;
                            _context12.next = 3;
                            return fetch("/order?delete_order_prod=true&prod_id=" + prod_id);

                        case 3:
                            resp = _context12.sent;

                            dataRequest();
                            _context12.next = 10;
                            break;

                        case 7:
                            _context12.prev = 7;
                            _context12.t0 = _context12["catch"](0);

                            alert('Помилка при видалені товару із замовлення');

                        case 10:
                        case "end":
                            return _context12.stop();
                    }
                }
            }, _callee12, _this, [[0, 7]]);
        }));

        return function deleteOrderProd(_x4) {
            return _ref12.apply(this, arguments);
        };
    }();

    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { className: "shadow-block mb-15" },
            React.createElement(
                "div",
                { className: "bold-label text-center body18 mb-15" },
                "\u0421\u0442\u0430\u0442\u0443\u0441"
            ),
            React.createElement(
                "div",
                { className: "flex-row align-center" },
                React.createElement(
                    "select",
                    {
                        className: "mr-20",
                        value: statusValue,
                        onChange: function onChange(e) {
                            return setStatusValue(e.target.value);
                        }
                    },
                    orderStatuses.map(function (el, i) {
                        return React.createElement(
                            "option",
                            { value: el },
                            el
                        );
                    })
                ),
                React.createElement(
                    "button",
                    { onClick: update_order_status, className: "body1 blue", type: "button" },
                    "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438"
                )
            )
        ),
        React.createElement(
            "div",
            { className: !document ? "shadow-block mb-15" : "shadow-block disable-form mb-15" },
            React.createElement(
                "div",
                { className: "bold-label text-center body18" },
                "\u0426\u0456\u043D\u0430"
            ),
            React.createElement(
                "div",
                { className: "flex-row align-center" },
                React.createElement("input", {
                    onChange: function onChange(e) {
                        return priceOfOrderHandler(e.target.value);
                    },
                    "class": "form-input mr-20",
                    readOnly: document ? true : false,
                    type: "number",
                    value: orderPrice }),
                React.createElement(
                    "button",
                    { onClick: update_order_price, className: "body1 blue", type: "button" },
                    "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438"
                )
            )
        ),
        React.createElement(
            "div",
            { className: !document ? "shadow-block mb-15" : "shadow-block disable-form mb-15" },
            React.createElement(
                "div",
                { className: "bold-label text-center body18" },
                "\u0412\u0430\u0433\u0430"
            ),
            React.createElement(
                "div",
                { className: "flex-row align-center" },
                React.createElement("input", {
                    onChange: function onChange(e) {
                        return weightOfOrderHandler(e.target.value);
                    },
                    "class": "form-input mr-20",
                    readOnly: document ? true : false,
                    type: "number",
                    value: orderWeight }),
                React.createElement(
                    "button",
                    { onClick: update_order_weight, className: "body1 blue", type: "button" },
                    "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438"
                )
            )
        ),
        React.createElement(
            "div",
            { className: "order-document shadow-block mb-15" },
            React.createElement(
                "div",
                { className: "bold-label text-center body18 mb-15" },
                "\u041D\u0430\u043A\u043B\u0430\u0434\u043D\u0430"
            ),
            document && React.createElement(
                "div",
                { className: "flex-row align-center" },
                React.createElement(
                    "div",
                    { className: "document-number mr-30" },
                    document
                ),
                React.createElement(
                    "button",
                    { className: "flex-row align-center body1 blue", onClick: function onClick() {
                            return documentDelete();
                        } },
                    React.createElement(
                        "div",
                        null,
                        "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438 \u0422\u0422\u041D"
                    ),
                    " ",
                    React.createElement(
                        "div",
                        { className: "ml-10 standart-icon" },
                        React.createElement(Icons, { icon: "close" })
                    )
                )
            ),
            !document && React.createElement(
                "button",
                { onClick: documentSubmit, className: "body1 blue" },
                "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u0422\u0422\u041D"
            )
        ),
        React.createElement(
            "div",
            { className: "order-products cart-list shadow-block mb-15" },
            React.createElement(
                "div",
                { className: "bold-label text-center body18 mb-20" },
                "\u0422\u043E\u0432\u0430\u0440\u0438 \u0432 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u0456"
            ),
            products.length ? products.map(function (el, index) {
                return React.createElement(
                    "div",
                    { key: el.id, className: "flex-row mb-20" },
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "div",
                            { className: "cart-item_image" },
                            React.createElement("img", { src: el.image_path, className: "cover" })
                        )
                    ),
                    React.createElement(
                        "div",
                        null,
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
                                    React.createElement(
                                        "div",
                                        { "class": "form-item" },
                                        React.createElement(
                                            "div",
                                            { "class": "form-item_lable body1" },
                                            "\u043A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u0432 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u0456"
                                        ),
                                        React.createElement("input", {
                                            onChange: function onChange(e) {
                                                return quantityOfOrderHandler(index, e.target.value, el.prod_id);
                                            },
                                            "class": "form-input",
                                            min: 1,
                                            max: el.quantity,
                                            readOnly: document ? true : false,
                                            required: true,
                                            type: "number",
                                            name: "quantity",
                                            value: el.order_quantity })
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
                            !document && React.createElement(
                                "div",
                                {
                                    className: "standart-icon",
                                    onClick: function onClick() {
                                        return deleteOrderProd(el.prod_id);
                                    }
                                },
                                React.createElement(Icons, { icon: "thrash" })
                            )
                        )
                    )
                );
            }) : "Замовлення порожнє"
        ),
        React.createElement(
            "div",
            { className: !document ? "shadow-block mb-15" : "shadow-block disable-form mb-15" },
            React.createElement(
                "div",
                { className: "bold-label text-center body18 mb-20" },
                "\u0414\u043E\u0434\u0430\u0442\u0438 \u0432 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F"
            ),
            !allProductsList.length && React.createElement(
                "button",
                { className: "body1 blue", type: "button", onClick: loadProductsHandler },
                "\u0414\u0438\u0432\u0438\u0442\u0438\u0441\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0442\u043E\u0432\u0430\u0440\u0456\u0432"
            ),
            !!allProductsList.length && React.createElement(
                "div",
                null,
                React.createElement(
                    "select",
                    { className: "mb-15",
                        value: chosenOrderProduct,
                        onChange: function onChange(e) {
                            return setChosenOrderProduct(e.target.value);
                        }
                    },
                    React.createElement(
                        "option",
                        { disabled: "disabled" },
                        "\u0432\u0438\u0431\u0435\u0440\u0438 \u0442\u043E\u0432\u0430\u0440"
                    ),
                    allProductsList.map(function (el) {
                        var value = el.sku + ',' + el.size;

                        return React.createElement(
                            "option",
                            { key: el.id },
                            value
                        );
                    })
                ),
                React.createElement(
                    "button",
                    { onClick: insert_order_product, className: "body1 blue", type: "button" },
                    "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438"
                )
            )
        )
    );
};

export default OrderForms;