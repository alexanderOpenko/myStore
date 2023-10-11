import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { useEffect, useState } from "react";

var SectionsAdmin = function SectionsAdmin() {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        manSelectValue = _useState2[0],
        setManSelectValue = _useState2[1];

    var _useState3 = useState([]),
        _useState4 = _slicedToArray(_useState3, 2),
        womanSelectValue = _useState4[0],
        setWomanSelectValue = _useState4[1];

    var _useState5 = useState([]),
        _useState6 = _slicedToArray(_useState5, 2),
        productsList = _useState6[0],
        setProductsList = _useState6[1];

    var _useState7 = useState([]),
        _useState8 = _slicedToArray(_useState7, 2),
        selectedMan = _useState8[0],
        setSelectedMan = _useState8[1];

    var _useState9 = useState([]),
        _useState10 = _slicedToArray(_useState9, 2),
        selectedWoman = _useState10[0],
        setSelectedWoman = _useState10[1];

    var requestProdsList = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var resp, json, respSlides, jsonSlides;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return fetch('/admin_sections?slider_list=true');

                        case 2:
                            resp = _context.sent;
                            _context.next = 5;
                            return resp.json();

                        case 5:
                            json = _context.sent;

                            setProductsList(json.body);

                            _context.next = 9;
                            return fetch('/admin_sections?get_selected_slides=true');

                        case 9:
                            respSlides = _context.sent;
                            _context.next = 12;
                            return respSlides.json();

                        case 12:
                            jsonSlides = _context.sent;

                            setManSelectValue(jsonSlides.body.man.join().split(','));
                            setWomanSelectValue(jsonSlides.body.woman.join().split(','));

                        case 15:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function requestProdsList() {
            return _ref.apply(this, arguments);
        };
    }();

    useEffect(function () {
        requestProdsList();
    }, []);

    // man
    var manHandleChange = function manHandleChange(event) {
        var selectedOptions = Array.from(event.target.selectedOptions).map(function (option) {
            return option.value;
        });
        setManSelectValue(selectedOptions);
    };

    var manHandleSubmit = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(e) {
            var data, resp, d;
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            e.preventDefault();
                            data = new FormData();

                            data.append('action', 'update_man_slider');
                            data.append('prods_id', manSelectValue);

                            _context2.next = 6;
                            return fetch('/admin_sections', {
                                method: "POST",
                                body: data
                            });

                        case 6:
                            resp = _context2.sent;
                            _context2.next = 9;
                            return resp.json();

                        case 9:
                            d = _context2.sent;

                        case 10:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function manHandleSubmit(_x) {
            return _ref2.apply(this, arguments);
        };
    }();

    //woman
    var womanHandleChange = function womanHandleChange(event) {
        var selectedOptions = Array.from(event.target.selectedOptions).map(function (option) {
            return option.value;
        });
        setWomanSelectValue(selectedOptions);
    };

    var womanHandleSubmit = function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(e) {
            var data, resp, d;
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            e.preventDefault();
                            data = new FormData();

                            data.append('action', 'update_woman_slider');
                            data.append('prods_id', womanSelectValue);

                            _context3.next = 6;
                            return fetch('/admin_sections', {
                                method: "POST",
                                body: data
                            });

                        case 6:
                            resp = _context3.sent;
                            _context3.next = 9;
                            return resp.json();

                        case 9:
                            d = _context3.sent;

                        case 10:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }));

        return function womanHandleSubmit(_x2) {
            return _ref3.apply(this, arguments);
        };
    }();

    return React.createElement(
        'div',
        { className: 'admin-slides' },
        React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'body24 mb-10 bold-label' },
                '\u0421\u043B\u0430\u0439\u0434\u0435\u0440 \u0447\u043E\u043B\u043E\u0432\u0456\u0447\u0438\u0445 \u0442\u043E\u0432\u0430\u0440\u0456\u0432 \u043D\u0430 \u0433\u043E\u043B\u043E\u0432\u043D\u0456\u0439'
            ),
            React.createElement(
                'div',
                { className: 'bold-label mb-10 uppercase' },
                '\u0412\u0438\u0431\u0440\u0430\u043D\u0456 \u0442\u043E\u0432\u0430\u0440\u0438: ',
                manSelectValue.join(', ')
            ),
            React.createElement(
                'div',
                { className: 'man-slider-section' },
                React.createElement(
                    'form',
                    { onSubmit: manHandleSubmit },
                    React.createElement(
                        'select',
                        { multiple: true, value: manSelectValue, onChange: manHandleChange, name: 'prods_id', className: 'mb-10' },
                        productsList.map(function (option) {
                            return React.createElement(
                                'option',
                                {
                                    key: option.id,
                                    value: option.sku
                                },
                                option.sku
                            );
                        })
                    ),
                    React.createElement(
                        'button',
                        { type: 'submit' },
                        '\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438'
                    )
                )
            )
        ),
        React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'body24 mb-10 bold-label' },
                '\u0421\u043B\u0430\u0439\u0434\u0435\u0440 \u0436\u0456\u043D\u043E\u0447\u0438\u0445 \u0442\u043E\u0432\u0430\u0440\u0456\u0432 \u043D\u0430 \u0433\u043E\u043B\u043E\u0432\u043D\u0456\u0439'
            ),
            React.createElement(
                'div',
                { className: 'bold-label mb-10 uppercase' },
                '\u0412\u0438\u0431\u0440\u0430\u043D\u0456 \u0442\u043E\u0432\u0430\u0440\u0438: ',
                womanSelectValue.join(', ')
            ),
            React.createElement(
                'div',
                { className: 'man-slider-section' },
                React.createElement(
                    'form',
                    { onSubmit: womanHandleSubmit },
                    React.createElement(
                        'select',
                        { multiple: true, value: womanSelectValue, onChange: womanHandleChange, name: 'prods_id', className: 'mb-10' },
                        productsList.map(function (option) {
                            return React.createElement(
                                'option',
                                {
                                    key: option.id,
                                    value: option.sku
                                },
                                option.sku
                            );
                        })
                    ),
                    React.createElement(
                        'button',
                        { type: 'submit' },
                        '\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438'
                    )
                )
            )
        )
    );
};

export default SectionsAdmin;