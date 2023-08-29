<?php
require "Models/admin_model.php";
require "Models/products_model.php";
require "Models/collections_model.php";
require "Models/producers_model.php";

global $method;
global $request_data;
class Admin_Form
{
    public $edit = false;
    public $product = [];
    public $size_quantity_pairs = [];
    public $collections = [];
    public $producers = [];

    public function __construct() {
        $collections = Admin_collections_model::get_collections();
        $this->collections = $collections;

        $producers = Admin_producers_model::get_producers();
        $this->producers = $producers;
    }

    public function insert_product()
    {
        global $request_data;
        Admin_model::insert_product($request_data, $this->edit);
    }

    public function edit_product($sku)
    {
        $this->edit = true;
        $product = Products_model::getProductInfo($sku);
        $this->product = $product;
    }

    public function size_quantity_middleware()
    {
        $size_quantity_pairs = [];

        foreach ($this->product as $item) {
            if (!$item['size'] && !$item['quantity']) {
                continue;
            }
            $row = [];
            $row["option"] = $item['size'];
            $row["quantity"] = $item['quantity'];
            $size_quantity_pairs[] = $row;
        }

        $this->size_quantity_pairs = $size_quantity_pairs;
    }

    public function render()
    {
        include 'View/product_form.php';
    }
}

$admin_form = new Admin_Form();

if ($method == 'POST' && $request_data['action'] == '0') {
    $admin_form->insert_product();
} else if ($method == 'POST' && $request_data['action'] == '1') {
    $admin_form->edit = true;
    $admin_form->insert_product();
} else if ($method == 'GET' && isset($request_data->parameters['action_edit'])) {
    $admin_form->edit_product($request_data->parameters['sku']);
    $admin_form->size_quantity_middleware();
    $admin_form->render();
} else {
    $admin_form->render();
}
?>

<!-- products list -->
<!-- add product form -->
<!-- edit product form -->