<?php
if (!isset($_SESSION['login'])) {
    header('Location: admin_login');
    exit;
}
require "Models/admin_model.php";
require "Models/products_model.php";

global $method;
global $request_data;
class Admin_products
{
    public $products = '';

    public function __construct() 
    {
        $products = new Products_model();
        $this->products = $products->products;
    }
 
    public static function delete_product($product_id, $sku) {
        Admin_model::delete_product($product_id, $sku);
    }

    public function render()
    {
        include 'View/admin_products.php';
    }
}

if ($method == 'GET' && isset($request_data->parameters['action_delete'])) {
    Admin_products::delete_product($request_data->parameters['product_id'], $request_data->parameters['sku']);
}

$admin_products = new Admin_products();
$admin_products->render();

?>

<!-- products list -->
<!-- add product form -->
<!-- edit product form -->