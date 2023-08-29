import _regeneratorRuntime from "babel-runtime/regenerator";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { useEffect, useState } from "react";
import Icons from "./icons";

var createMainUploadWidget = function createMainUploadWidget(func, id) {
    var mainImageUploadWidget = window.cloudinary.createUploadWidget({
        cloudName: 'dztn3fgbp',
        maxFiles: 1,
        uploadPreset: 'ml_default'
    }, function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(error, result) {
            var data, url;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(!error && result && result.event === "success")) {
                                _context.next = 17;
                                break;
                            }

                            console.log('Done! Here is the image info: ', result.info);
                            data = new FormData();

                            data.append('public_id', result.info.public_id);
                            data.append('id', id);
                            data.append('url', result.info.secure_url);
                            data.append('update_image', true);

                            url = '/admin_media';
                            _context.prev = 8;
                            _context.next = 11;
                            return fetch(url, {
                                method: "POST",
                                body: data
                            });

                        case 11:
                            _context.next = 16;
                            break;

                        case 13:
                            _context.prev = 13;
                            _context.t0 = _context["catch"](8);

                            console.log(_context.t0);

                        case 16:

                            func(id);

                        case 17:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[8, 13]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
    return mainImageUploadWidget;
};

var createOtherMediaUploadWidget = function createOtherMediaUploadWidget(func, id) {
    var otheMediaUploadWidget = window.cloudinary.createUploadWidget({
        cloudName: 'dztn3fgbp',
        maxFiles: 10,
        uploadPreset: 'ml_default'
    }, function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(error, result) {
            var data, rows, insertString, url;
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (!(!error && result && result.event === "queues-end")) {
                                _context2.next = 18;
                                break;
                            }

                            console.log('Done! Here is the image info: ', result.info);
                            data = new FormData();
                            rows = result.info.files.map(function (row) {
                                var public_id = row.uploadInfo.public_id;
                                var image_path = row.uploadInfo.secure_url;
                                var media_type = row.uploadInfo.resource_type;

                                var valuesArr = [public_id, image_path, media_type, id].map(function (el) {
                                    if ((typeof el === "undefined" ? "undefined" : _typeof(el)) != Number) {
                                        return "'" + el + "'";
                                    } else {
                                        return el;
                                    }
                                });
                                var values = valuesArr.join(', ');
                                var result = '(' + values + ')';
                                return result;
                            });
                            insertString = rows.join(', ');

                            console.log(insertString, 'insertString');

                            data.append('insertString', insertString);
                            data.append('other_media', true);

                            url = '/admin_media';
                            _context2.prev = 9;
                            _context2.next = 12;
                            return fetch(url, {
                                method: "POST",
                                body: data
                            });

                        case 12:
                            _context2.next = 17;
                            break;

                        case 14:
                            _context2.prev = 14;
                            _context2.t0 = _context2["catch"](9);

                            console.log(_context2.t0);

                        case 17:

                            func(id);

                        case 18:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[9, 14]]);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }());

    return otheMediaUploadWidget;
};

var AdminMedia = function AdminMedia(_ref3) {
    var products = _ref3.products;

    var _useState = useState({ sku: '', id: -1 }),
        _useState2 = _slicedToArray(_useState, 2),
        selectedProduct = _useState2[0],
        setSelectedProduct = _useState2[1];

    var _useState3 = useState([]),
        _useState4 = _slicedToArray(_useState3, 2),
        productMedia = _useState4[0],
        setProductMedia = _useState4[1];

    var headerItems = ['sku', 'name'];

    useEffect(function () {
        setSelectedProduct(products[0]);
        getProductMedia(products[0].id);
    }, []);

    var getProductMedia = function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(id) {
            var resp, json, parsedBody;
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return fetch("/products?get_media=true&id=" + id);

                        case 2:
                            resp = _context3.sent;
                            _context3.next = 5;
                            return resp.json();

                        case 5:
                            json = _context3.sent;
                            parsedBody = JSON.parse(json.body);

                            setProductMedia(parsedBody);

                        case 8:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }));

        return function getProductMedia(_x5) {
            return _ref4.apply(this, arguments);
        };
    }();

    var deleteImageHandler = function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(pid) {
            var resp;
            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return fetch("/admin_media?delete_media=true&id=" + pid);

                        case 2:
                            resp = _context4.sent;

                            console.log(selectedProduct.id, 'selectedProduct.id');
                            getProductMedia(selectedProduct.id);

                        case 5:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this);
        }));

        return function deleteImageHandler(_x6) {
            return _ref5.apply(this, arguments);
        };
    }();

    var productChangeHandler = function productChangeHandler(prod) {
        setSelectedProduct(prod);
        getProductMedia(prod.id);
    };

    var mainImage = productMedia.length ? productMedia.find(function (el) {
        return el.media_type == 'main';
    }) : '';
    var additionalImages = productMedia.length ? productMedia.filter(function (el) {
        return el.media_type == 'image';
    }) : '';
    var videos = productMedia.length ? productMedia.filter(function (el) {
        return el.media_type == 'video';
    }) : '';

    var mainImageUploadWidget = createMainUploadWidget(getProductMedia, selectedProduct.id);
    var otheMediaUploadWidget = createOtherMediaUploadWidget(getProductMedia, selectedProduct.id);

    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { className: "products-count" },
            products.length,
            " \u043F\u043E\u0437\u0438\u0446\u0456\u0457"
        ),
        React.createElement(
            "div",
            { className: "product-images-section" },
            React.createElement(
                "div",
                { className: "products-list" },
                React.createElement(
                    "div",
                    { className: "products-list_header product-row" },
                    headerItems.map(function (el) {
                        return React.createElement(
                            "div",
                            { className: "product-row_item" },
                            el.title
                        );
                    })
                ),
                products.map(function (el) {
                    return React.createElement(
                        "div",
                        { className: el.sku === selectedProduct.sku ? "product-row--active product-row" : "product-row",
                            onClick: function onClick() {
                                return productChangeHandler(el);
                            }
                        },
                        React.createElement(
                            "div",
                            { className: "product-row_item" },
                            el.sku
                        ),
                        React.createElement(
                            "div",
                            { className: "product-row_item" },
                            el.name
                        )
                    );
                })
            ),
            React.createElement(
                "div",
                { className: "product-media" },
                React.createElement(
                    "div",
                    { className: "main-image" },
                    React.createElement(
                        "h2",
                        null,
                        "Main Image"
                    ),
                    mainImage && React.createElement(
                        "div",
                        null,
                        mainImage.image_path.includes("dropcommunity") ? React.createElement(
                            "div",
                            { className: "warning" },
                            "BAD IMAGE URL: ",
                            mainImage.image_path
                        ) : '',
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                { className: "delete_media", onClick: function onClick() {
                                        deleteImageHandler(mainImage.public_id);
                                    } },
                                React.createElement(Icons, { icon: 'close' })
                            ),
                            React.createElement("img", { src: mainImage.image_path })
                        )
                    ),
                    React.createElement(
                        "button",
                        { className: "cloudinary-button", onClick: function onClick() {
                                return mainImageUploadWidget.open();
                            } },
                        "Upload file"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "other-media" },
                    React.createElement(
                        "h2",
                        null,
                        "Other Media"
                    ),
                    additionalImages != '' && React.createElement(
                        "div",
                        { className: "other-media_items" },
                        React.createElement(
                            "h2",
                            null,
                            "Images"
                        ),
                        React.createElement(
                            "div",
                            { className: "other-media_list flex-row wrap-grid" },
                            additionalImages.map(function (el) {
                                return React.createElement(
                                    "div",
                                    { className: "four-desc-grid" },
                                    React.createElement(
                                        "div",
                                        { className: "delete_media", onClick: function onClick() {
                                                deleteImageHandler(el.public_id);
                                            } },
                                        React.createElement(Icons, { icon: 'close' })
                                    ),
                                    React.createElement("img", { src: el.image_path })
                                );
                            })
                        )
                    ),
                    videos != '' && React.createElement(
                        "div",
                        { className: "other-media_items" },
                        React.createElement(
                            "h2",
                            null,
                            "Videos"
                        ),
                        React.createElement(
                            "div",
                            { className: "other-media_list flex-row wrap-grid" },
                            videos.map(function (el) {
                                return React.createElement(
                                    "div",
                                    { className: "four-desc-grid" },
                                    React.createElement(
                                        "div",
                                        { className: "delete_media", onClick: function onClick() {
                                                deleteImageHandler(el.public_id);
                                            } },
                                        React.createElement(Icons, { icon: 'close' })
                                    ),
                                    React.createElement("img", { src: "http://res.cloudinary.com/dztn3fgbp/video/upload/" + el.public_id + '.jpg' })
                                );
                            })
                        )
                    ),
                    React.createElement(
                        "button",
                        { className: "cloudinary-button", onClick: function onClick() {
                                return otheMediaUploadWidget.open();
                            } },
                        "Upload files"
                    )
                )
            )
        )
    );
};

export default AdminMedia;