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

const productsContainer = document.querySelector('#products')
const productPageImages = document.querySelector('#productPageImages')
const productInfoTabs = document.querySelector('#productInfoTabs')
const adminMedia = document.querySelector('#admin-media')
const header = document.querySelector('#header')
const qa = document.querySelector('#questions_and_answers')
const home = document.querySelector('#home')
const sections = document.querySelector('#sections')
const cart = document.querySelector('#cart')
const orderForms = document.querySelector('#order-forms')
const randomProds = document.querySelector('#randomProds')

if (randomProds) {
    const root = ReactDOM.createRoot(randomProds)
    root.render(<RandomProds />)
}

if (productsContainer) {
    const products = JSON.parse(productsContainer.dataset.products)
    const root = ReactDOM.createRoot(productsContainer)
    root.render(<Products products={products} />)
}

if (orderForms) {
    const root = ReactDOM.createRoot(orderForms)
    root.render(<OrderForms />)
}

if (productPageImages) {
    const productId = productPageImages.dataset.id
    const root = ReactDOM.createRoot(productPageImages)
    root.render(<ProductPageImages productId={productId} />)
}

if (productInfoTabs) {
    const productInfo = JSON.parse(productInfoTabs.dataset.info)
    const productId = productPageImages.dataset.id
    const root = ReactDOM.createRoot(productInfoTabs)
    root.render(<ProductPageTabs info={productInfo} productId={productId} />)
}

if (adminMedia) {
    const productsData = JSON.parse(adminMedia.dataset.products)
    const root = ReactDOM.createRoot(adminMedia)
    root.render(<AdminMedia products={productsData} />)
}

if (header) {
    const root = ReactDOM.createRoot(header)
    root.render(<Header />)
}

if (qa) {
    const root = ReactDOM.createRoot(qa)
    root.render(<QA />)
}

if (home) {
    const root = ReactDOM.createRoot(home)
    root.render(<Home />)
}

if (sections) {
    const root = ReactDOM.createRoot(sections)
    root.render(<SectionsAdmin />)
}

if (cart) {
    const root = ReactDOM.createRoot(cart)
    root.render(<Cart read={true} />)
}