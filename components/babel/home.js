import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import SexHook from "./sexHook";
import React, { useEffect, useState } from "react";
import ImageWithText from "./imageWithText";
import classNames from "classnames";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

var Home = function Home() {
    var man_image = '../../Assets/man_home.jpeg';
    var woman_image = '../../Assets/woman_home.jpeg';
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
                            return fetch("/admin_sections?" + sex + "_slider=true");

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

    var imageTextClasses = classNames('flex-row-reverse');

    return sex && React.createElement(
        "div",
        { className: "mt-40 homepage" },
        React.createElement(
            "a",
            { href: sex == 'man' ? "/man/products?collection=Чоловічий одяг" : sex == 'woman' ? "/man/products?collection=Жіночий одяг" : '' },
            React.createElement(
                ImageWithText,
                { image: sex == 'man' ? man_image : woman_image, className: imageTextClasses },
                React.createElement(
                    "h1",
                    { className: "mb-48 uppercase image-text-heading" },
                    sex == 'man' ? 'Великий вибір брендового одягу' : 'Жіночий брендовий одяг'
                ),
                React.createElement(
                    "p",
                    { className: "body24 mb-48 image-text-text" },
                    "\u0412\u0435\u0440\u0445\u043D\u0456\u0439 \u043E\u0434\u044F\u0433, \u0432\u043F\u0456\u0437\u043D\u0430\u0432\u0430\u043D\u0430 \u043A\u043B\u0430\u0441\u0438\u043A\u0430 \u0442\u0430 \u044F\u0441\u043A\u0440\u0430\u0432\u0456 \u043F\u0440\u0438\u043D\u0442\u0438 - \u0437\u0443\u0441\u0442\u0440\u0456\u0447\u0430\u0439\u0442\u0435 \u043D\u043E\u0432\u0438\u043D\u043A\u0438 \u0432\u0456\u0434 \u0432\u0430\u0448\u0438\u0445 \u0443\u043B\u044E\u0431\u043B\u0435\u043D\u0438\u0445 \u0431\u0440\u0435\u043D\u0434\u0456\u0432"
                ),
                React.createElement(
                    "button",
                    { "class": "bold-label" },
                    "\u0414\u0438\u0432\u0438\u0442\u0438\u0441\u044C \u0432\u0441\u0456"
                )
            )
        ),
        sliderImages && React.createElement(
            "div",
            { className: "mt-40" },
            React.createElement(
                "div",
                { className: "body24 bold-label mb-25" },
                "\u041D\u043E\u0432\u0438\u043D\u043A\u0438 \u0437 \u043A\u043E\u043B\u0435\u043A\u0446\u0456\u0439 \u043A\u0440\u0430\u0449\u0438\u0445 \u0431\u0440\u0435\u043D\u0434\u0456\u0432"
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
                        { key: i },
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
        )
    );
};

export default Home;