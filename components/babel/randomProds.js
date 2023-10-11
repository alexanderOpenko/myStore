import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { useEffect, useState } from "react";
import SexHook from "./sexHook";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

var RandomProds = function RandomProds() {
    console.log('fffff');
    var sex = SexHook();

    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        sliderImages = _useState2[0],
        setSliderImages = _useState2[1];

    var getSlides = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var resp, data;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return fetch('/admin_sections?random_prods=true');

                        case 2:
                            resp = _context.sent;
                            _context.next = 5;
                            return resp.json();

                        case 5:
                            data = _context.sent;


                            setSliderImages(data.body);

                        case 7:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function getSlides() {
            return _ref.apply(this, arguments);
        };
    }();

    useEffect(function () {
        if (sex) {
            getSlides();
        }
    }, [sex]);

    return sliderImages && React.createElement(
        "div",
        { className: "mt-40" },
        React.createElement(
            "div",
            { className: "body24 bold-label mb-25" },
            "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u0457"
        ),
        React.createElement(
            Swiper,
            {
                spaceBetween: 15,
                slidesPerView: 1.4,
                modules: [Navigation, Scrollbar],
                speed: 700,
                navigation: true,
                scrollbar: { draggable: true },
                breakpoints: {
                    998: {
                        slidesPerView: 4
                    },
                    769: {
                        slidesPerView: 3
                    }
                }
            },
            sliderImages.map(function (el, i) {
                return React.createElement(
                    SwiperSlide,
                    { key: i, className: "relative" },
                    React.createElement(
                        "a",
                        { href: '/' + sex + '/products?p=' + el.sku },
                        React.createElement(
                            "div",
                            { className: "swiper-slider-slide-img mb-10" },
                            React.createElement("img", { src: el.image_path, className: "heigth100 cover absolute" })
                        ),
                        React.createElement(
                            "div",
                            null,
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
                                { className: "product_info-price" },
                                el.price,
                                " \u20B4"
                            )
                        )
                    )
                );
            })
        )
    );
};

export default RandomProds;