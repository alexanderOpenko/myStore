import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { useEffect, useState } from "react";

var BrandsList = function BrandsList() {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        brandsList = _useState2[0],
        setBrandsList = _useState2[1];

    var getBrandsList = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var resp, json;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return fetch('/admin_producers?get_producers_list=true');

                        case 2:
                            resp = _context.sent;
                            _context.next = 5;
                            return resp.json();

                        case 5:
                            json = _context.sent;
                            return _context.abrupt('return', json.body);

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function getBrandsList() {
            return _ref.apply(this, arguments);
        };
    }();

    useEffect(function () {
        var fetchData = function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                var brandsList, transformedBrandsList;
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return getBrandsList();

                            case 2:
                                brandsList = _context2.sent;
                                transformedBrandsList = brandsList.map(function (el) {
                                    return {
                                        title: el.name,
                                        link: '/products?brand=' + el.name
                                    };
                                });


                                setBrandsList(transformedBrandsList.sort(function (a, b) {
                                    return a.title.localeCompare(b.title);
                                }));

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            return function fetchData() {
                return _ref2.apply(this, arguments);
            };
        }();

        fetchData();
    }, []);

    var manMenuJSON = [{
        title: 'Одяг',
        link: '',
        submenu: [{
            title: 'Футболки',
            link: "/man/products?collection=Футболки"
        }, {
            title: 'Поло',
            link: "/man/products?collection=Поло"
        }, {
            title: 'Кофти',
            link: "/man/products?collection=Кофти"
        }, {
            title: 'Світшоти',
            link: "/man/products?collection=Світшоти"
        }, {
            title: 'Худі',
            link: "/man/products?collection=Худі"
        }, {
            title: 'Куртки',
            link: "/man/products?collection=Куртки"
        }, {
            title: 'Жилетки',
            link: "/man/products?collection=Жилетки"
        }, {
            title: 'Вітровка',
            link: "/man/products?collection=Вітровки"
        }, {
            title: 'Костюми',
            link: "/man/products?collection=Костюми"
        }, {
            title: 'Штани',
            link: "/man/products?collection=Штани"
        }, {
            title: 'Шорти',
            link: "/man/products?collection=Шорти"
        }, {
            title: 'Спідня Білизна',
            link: "/man/products?collection=Спідня Білизна"
        }]
    }, {
        title: 'Кросівки',
        link: "/man/products?collection=Кросівки"
    }, {
        title: 'Аксесуари',
        submenu: [{
            title: 'Шапки',
            link: '/man/products?collection=Шапки'
        }, {
            title: 'Кепки',
            link: '/man/products?collection=Кепки'
        }, {
            title: 'Гаманці',
            link: "/man/products?collection=Гаманці"
        }, {
            title: 'Сумки',
            link: '/man/products?collection=Сумки'
        }]
    }, {
        title: 'Бренди',
        submenu: brandsList
    }, {
        title: 'Всі товари',
        link: "/man/products?collection=Чоловічий одяг"
    }];

    var womanMenuJSON = [{
        title: 'Одяг',
        link: '',
        submenu: [{
            title: 'Футболки',
            link: "/woman/products?collection=Жіночі футболки"
        }, {
            title: 'Світшоти',
            link: "/woman/products?collection=Жіночі світшоти"
        }, {
            title: 'Худі',
            link: "/woman/products?collection=Жіночі худі"
        }, {
            title: 'Шапки',
            link: "/woman/products?collection=Жіночі Шапки"
        }]
    }, {
        title: 'Всі товари',
        link: "/woman/products?collection=Жіночий одяг"
    }];

    return {
        manMenuJSON: manMenuJSON,
        womanMenuJSON: womanMenuJSON,
        brandsList: brandsList
    };
};

export default BrandsList;