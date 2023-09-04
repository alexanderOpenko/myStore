<?php 
session_start();
require('router.php');
require_once('connect.php');
require 'Assets/icons.php';


define("BASE_DIR", dirname(__FILE__));

global $method;
global $request_data;

function getData($method) {
    $data = new stdClass();
    $data->parameters = [];

    if ($method == 'POST') {
        return $_POST;
    } else if ($method == 'GET') {
        foreach ($_GET as $key => $value) {
            if ($key != 'url') {
                $data->parameters[$key] = $value;
            }
        }
    } 

    return $data;
}

$router = new Router();
$router->add_router('/',  BASE_DIR . '/Controllers/' . 'home_controller.php');
$router->add_router('products',  BASE_DIR . '/Controllers/' . 'products_controller.php');
$router->add_router('cart',  BASE_DIR . '/Controllers/' . 'cart_controller.php');
$router->add_router('admin',  BASE_DIR . '/Controllers/' . 'admin_home_controller.php');
$router->add_router('admin_products',  BASE_DIR . '/Controllers/' . 'admin_products_controller.php');
$router->add_router('admin_collections',  BASE_DIR . '/Controllers/' . 'admin_collections_controller.php');
$router->add_router('admin_producers',  BASE_DIR . '/Controllers/' . 'admin_producers_controller.php');
$router->add_router('admin_product_form',  BASE_DIR . '/Controllers/' . 'admin_product_form_controller.php');
$router->add_router('admin_media',  BASE_DIR . '/Controllers/' . 'admin_media_controller.php');
$router->add_router('checkout',  BASE_DIR . '/Controllers/' . 'checkout_controller.php');

$url = isset($_GET['url']) ? $_GET['url'] : '/';

$method = $_SERVER['REQUEST_METHOD'];
$request_data = getData($method);

$router->route($url);

?>