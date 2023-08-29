<?php
require 'Models/products_model.php';
require 'headers.php';

global $method;
global $request_data;
class Products_controller {
    public $products, $product;
    public function __construct() {
       
    }

    public function get_product_media($id) {
        $products = Products_model::get_product_media($id);
        return json_encode($products);
    }

    public function get_products() {
        $this->products = new Products_model();
        $this->products = $this->products->products;
    }

    public function get_collection($like_str) {
        $collection = Products_model::get_collection($like_str);
        $this->products = $collection;
    }

    public function getProduct($sku) {
        $this->product = Products_model::getProduct($sku);
    }

    public function render($path) {
        include $path;
    }
}

$products = new Products_controller();

if ($method == 'GET' && isset($request_data->parameters['p'])) {
    $products->getProduct($request_data->parameters['p']);
    $products->render('View/product_page.php');
}

if ($method == 'GET' && !count($request_data->parameters)) {
    $products->get_products();
    $products->render('View/products.php');
}

if ($method == 'GET' && isset($request_data->parameters['collection'])) {
    $products->get_collection($request_data->parameters['collection']);
    $products->render('View/products.php');
}

if ($method == 'GET' && isset($request_data->parameters['get_media'])) {
   $product_media = $products->get_product_media($request_data->parameters['id']);
   set_HTTP_status(200, 'success', $product_media);
}