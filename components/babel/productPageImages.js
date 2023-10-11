import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { useEffect, useState } from "react";
import PopUp from "./popUp";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

var ProductPageImages = function ProductPageImages(_ref) {
    var productId = _ref.productId;

    var _useState = useState('inactive'),
        _useState2 = _slicedToArray(_useState, 2),
        activePopUp = _useState2[0],
        setActivePopUp = _useState2[1];

    var _useState3 = useState([]),
        _useState4 = _slicedToArray(_useState3, 2),
        productMedia = _useState4[0],
        setProductMedia = _useState4[1];

    var _useState5 = useState(-1),
        _useState6 = _slicedToArray(_useState5, 2),
        activeSlider = _useState6[0],
        setActiveSlider = _useState6[1];

    var _useState7 = useState(770),
        _useState8 = _slicedToArray(_useState7, 2),
        windowWidth = _useState8[0],
        setWindowWidth = _useState8[1];

    var getProductMedia = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var resp, json, parsedBody;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return fetch("/products?get_media=true&id=" + productId);

                        case 2:
                            resp = _context.sent;
                            _context.next = 5;
                            return resp.json();

                        case 5:
                            json = _context.sent;
                            parsedBody = JSON.parse(json.body);


                            parsedBody.sort(function (a, b) {
                                if (a.media_type === 'main') return -1;
                                if (b.media_type === 'main') return 1;
                                return 0;
                            });
                            setProductMedia(parsedBody);

                        case 9:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function getProductMedia() {
            return _ref2.apply(this, arguments);
        };
    }();

    useEffect(function () {
        getProductMedia();
        var windowWidthValue = window.innerWidth;
        setWindowWidth(windowWidthValue);
    }, []);

    var imageViewCloseHandler = function imageViewCloseHandler(action) {
        var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        setActivePopUp(action);
        window.scrollTo(0, 0);
        document.body.classList.toggle('body-lock');
        if (i >= 0) {
            setActiveSlider(i);
        }
    };

    return React.createElement(
        "div",
        null,
        windowWidth >= 770 && React.createElement(
            "div",
            { className: "wrap-grid flex-row justify-center main-product-images" },
            productMedia.map(function (el, i) {
                var gridClass = i <= 1 ? "two-desc-grid" : "three-desc-grid";

                if (el.media_type != 'video') {
                    return React.createElement(
                        "div",
                        {
                            key: i,
                            className: "product-page-image cursor-zoom " + gridClass,
                            onClick: function onClick() {
                                return imageViewCloseHandler('active', i);
                            } },
                        React.createElement("img", { src: el.image_path })
                    );
                }
            }),
            " "
        ),
        activeSlider >= 0 && React.createElement(
            PopUp,
            { active: activePopUp, setActive: imageViewCloseHandler },
            React.createElement(
                "div",
                { className: "slider-product-page align-center flex-row" },
                React.createElement(ProductPageImagesSlider, { images: productMedia, activeSlider: activeSlider })
            )
        ),
        windowWidth <= 769 && React.createElement(
            "div",
            { className: "slider-product-page mobile-slider-page align-center flex-row" },
            React.createElement(ProductPageImagesSlider, { images: productMedia, activeSlider: activeSlider })
        )
    );
};

var ProductPageImagesSlider = function ProductPageImagesSlider(_ref3) {
    var images = _ref3.images,
        activeSlider = _ref3.activeSlider,
        s = _ref3.s;

    var _useState9 = useState(null),
        _useState10 = _slicedToArray(_useState9, 2),
        swiper = _useState10[0],
        setSwiper = _useState10[1];

    useEffect(function () {
        if (swiper) {
            swiper.slideTo(activeSlider);
        }
    }, [activeSlider]);

    return React.createElement(
        Swiper,
        {
            onSwiper: setSwiper,
            spaceBetween: 50,
            slidesPerView: 1,
            modules: [Navigation, Scrollbar],
            speed: 700,
            navigation: true,
            scrollbar: { draggable: true }
        },
        images.map(function (el, i) {
            if (el.media_type != 'video') {
                return React.createElement(
                    SwiperSlide,
                    { key: i },
                    React.createElement(
                        "div",
                        { className: "product-page-slide-image" },
                        React.createElement("img", { src: el.image_path })
                    )
                );
            }
        })
    );
};

export default ProductPageImages;