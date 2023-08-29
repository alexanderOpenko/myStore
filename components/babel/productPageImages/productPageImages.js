import React from "react";
import PopUp from "../popUp";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';

import './style.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

var RenderImages = function RenderImages(_ref) {
    var image = _ref.image;

    console.log(image, 'image');
    return [1, 2, 3, 4].map(function (el, i) {
        return React.createElement(
            "div",
            { key: i, className: "two-desc-grid" },
            React.createElement("img", { src: image })
        );
    });
};

var ProductPageImages = function ProductPageImages(_ref2) {
    var product = _ref2.product;

    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { className: "wrap-grid flex-row" },
            React.createElement(RenderImages, { image: product[0]['main_image'] })
        ),
        React.createElement(
            PopUp,
            null,
            React.createElement(
                "div",
                { className: "slider-product-page" },
                React.createElement(ProductPageImagesSlider, { image: product[0]['main_image'] })
            )
        )
    );
};

var ProductPageImagesSlider = function ProductPageImagesSlider(_ref3) {
    var image = _ref3.image;

    return React.createElement(
        Swiper,
        {
            spaceBetween: 50,
            slidesPerView: 1,
            modules: [Navigation, Scrollbar],
            navigation: true,
            scrollbar: { draggable: true },
            onSlideChange: function onSlideChange() {
                return console.log('slide change');
            },
            onSwiper: function onSwiper(swiper) {
                return console.log(swiper);
            }
        },
        [1, 2, 3, 4].map(function (el, i) {
            return React.createElement(
                SwiperSlide,
                { key: i },
                React.createElement("img", { src: image })
            );
        })
    );
};

export default ProductPageImages;