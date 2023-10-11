import Products from "./products";
import React from "react";
import * as ReactDOM from 'react-dom/client';
import ProductPageImages from "./productPageImages";
import ProductPageTabs from "./productPageTabs";
import AdminMedia from "./adminMedia";
import Header from "./header";
import QA from "./qa";
import Home from "./home";
import SectionsAdmin from "./sections";
import Cart from "./cart";
import OrderForms from "./orderForms";
import RandomProds from "./randomProds";

var productsContainer = document.querySelector('#products');
var productPageImages = document.querySelector('#productPageImages');
var productInfoTabs = document.querySelector('#productInfoTabs');
var adminMedia = document.querySelector('#admin-media');
var header = document.querySelector('#header');
var qa = document.querySelector('#questions_and_answers');
var home = document.querySelector('#home');
var sections = document.querySelector('#sections');
var cart = document.querySelector('#cart');
var orderForms = document.querySelector('#order-forms');
var randomProds = document.querySelector('#randomProds');

if (randomProds) {
    var root = ReactDOM.createRoot(randomProds);
    root.render(React.createElement(RandomProds, null));
}

if (productsContainer) {
    var products = JSON.parse(productsContainer.dataset.products);
    var _root = ReactDOM.createRoot(productsContainer);
    _root.render(React.createElement(Products, { products: products }));
}

if (orderForms) {
    var _root2 = ReactDOM.createRoot(orderForms);
    _root2.render(React.createElement(OrderForms, null));
}

if (productPageImages) {
    var productId = productPageImages.dataset.id;
    var _root3 = ReactDOM.createRoot(productPageImages);
    _root3.render(React.createElement(ProductPageImages, { productId: productId }));
}

if (productInfoTabs) {
    var productInfo = JSON.parse(productInfoTabs.dataset.info);
    var _productId = productPageImages.dataset.id;
    var _root4 = ReactDOM.createRoot(productInfoTabs);
    _root4.render(React.createElement(ProductPageTabs, { info: productInfo, productId: _productId }));
}

if (adminMedia) {
    var productsData = JSON.parse(adminMedia.dataset.products);
    var _root5 = ReactDOM.createRoot(adminMedia);
    _root5.render(React.createElement(AdminMedia, { products: productsData }));
}

if (header) {
    var _root6 = ReactDOM.createRoot(header);
    _root6.render(React.createElement(Header, null));
}

if (qa) {
    var _root7 = ReactDOM.createRoot(qa);
    _root7.render(React.createElement(QA, null));
}

if (home) {
    var _root8 = ReactDOM.createRoot(home);
    _root8.render(React.createElement(Home, null));
}

if (sections) {
    var _root9 = ReactDOM.createRoot(sections);
    _root9.render(React.createElement(SectionsAdmin, null));
}

if (cart) {
    var _root10 = ReactDOM.createRoot(cart);
    _root10.render(React.createElement(Cart, { read: true }));
}