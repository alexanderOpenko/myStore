<?php 
if (!isset($_SESSION['login'])) {
    header('Location: admin_login');
    exit;
}
require "Models/collections_model.php";

global $method;
global $request_data;

Class Admin_collections {
    public $collections = [];
    public function __construct() {
        $collections = Admin_collections_model::get_collections();
        $this->collections = $collections;
    }
    public function add_collection ($collection) {
        Admin_collections_model::add_collection($collection);
    }

    public function render() {
        include 'View/admin_collections.php';
    }
}

$collection = new Admin_collections();

if ($method == 'POST' && isset($request_data['collection'])) {
    $collection->add_collection($request_data['collection']);
}

$collection->render();

?>