import Products from "./products";
import React from "react";
import * as ReactDOM from 'react-dom/client';
import ProductPageImages from "./productPageImages";
import AdminMedia from "./adminMedia";
import Cart from "./cart";

var productsContainer = document.querySelector('#products');
var productPageImages = document.querySelector('#productPageImages');
var adminMedia = document.querySelector('#admin-media');
var cart = document.querySelector('#cart');

if (productsContainer) {
    var products = JSON.parse(productsContainer.dataset.products);
    var root = ReactDOM.createRoot(productsContainer);
    root.render(React.createElement(Products, { products: products }));
}

if (productPageImages) {
    var productId = document.querySelector('#productPageImages').dataset.id;
    var _root = ReactDOM.createRoot(productPageImages);
    _root.render(React.createElement(ProductPageImages, { productId: productId }));
}

if (adminMedia) {
    var productsData = JSON.parse(adminMedia.dataset.products);
    var _root2 = ReactDOM.createRoot(adminMedia);
    _root2.render(React.createElement(AdminMedia, { products: productsData }));
}

if (cart) {
    var _root3 = ReactDOM.createRoot(cart);
    _root3.render(React.createElement(Cart, null));
}