<?php 
if (!isset($_SESSION['login'])) {
    header('Location: admin_login');
    exit;
}
require "Models/producers_model.php";
require 'headers.php';

global $method;
global $request_data;

Class Admin_producers {
    public $producers = [];
    public function __construct() {
        $producers = Admin_producers_model::get_producers();
        $this->producers = $producers;
    }
    public function add_producer ($producer) {
        Admin_producers_model::add_producer($producer);
    }

    public function render() {
        include 'View/admin_producers.php';
    }
}

$producer = new Admin_producers();

if ($method == 'POST' && isset($request_data['producer'])) {
    $producer->add_producer($request_data['producer']);
}

if ($method == 'GET' && isset($request_data->parameters['get_producers_list'])) {
    set_HTTP_status(200, 'producers_list', $producer->producers);
    return;
}

$producer->render();

?>