import Products from "./products";
import React from "react";
import * as ReactDOM from 'react-dom/client';
import ProductPageImages from "./productPageImages";
import AdminMedia from "./adminMedia";
import Cart from "./cart";

const productsContainer = document.querySelector('#products')
const productPageImages = document.querySelector('#productPageImages')
const adminMedia = document.querySelector('#admin-media')
const cart = document.querySelector('#cart')

if (productsContainer) {
const products = JSON.parse(productsContainer.dataset.products)
const root = ReactDOM.createRoot(productsContainer)
root.render(<Products products={products}/>)
}

if (productPageImages) {
    const productId = document.querySelector('#productPageImages').dataset.id
    const root = ReactDOM.createRoot(productPageImages)
    root.render(<ProductPageImages productId={productId}/>)
}

if (adminMedia) {
    const productsData = JSON.parse(adminMedia.dataset.products)
    const root = ReactDOM.createRoot(adminMedia)
    root.render(<AdminMedia products={productsData}/>)
}

if (cart) {
    const root = ReactDOM.createRoot(cart)
    root.render(<Cart/>)
}