<?php 
if (!isset($_SESSION['login'])) {
    header('Location: admin_login');
    exit;
}
global $method;
global $connect;
global $request_data;
require 'Models/admin_model.php';
require 'headers.php';

Class Sections_controller {
    public $man_slider, $woman_slider, $offers;

    public function update_man_slider ($prods_id) {
        Admin_model::insert_man_slider($prods_id);
    }

    public function get_man_slider () {
        $prods = Admin_model::get_man_slider();
        set_HTTP_status(200, 'man slider', $prods);
    }

    public function get_random_prods () {
        $prods = Admin_model::get_random_prods();
        set_HTTP_status(200, 'man slider', $prods);
    }

    public function update_woman_slider ($prods_id) {
        Admin_model::insert_woman_slider($prods_id);
    }

    public function get_woman_slider () {
        $prods = Admin_model::get_woman_slider();
        set_HTTP_status(200, 'man slider', $prods);
    }

    public function products_slider_list() {
        global $connect;
        $sql_query = "SELECT p.id, p.sku FROM products as p";

        try {
            $rows = $connect->query($sql_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
            $list = $rows->fetch_all(MYSQLI_ASSOC);

            set_HTTP_status(200, 'man slider list', $list);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public function render() {
        include 'View/admin_sections.php';
    }

    public function get_selected_slides() {
        global $connect;
        $man_query = "SELECT product_id FROM man_slider";
        $woman_query = "SELECT product_id FROM woman_slider";

        try {
            $man_rows = $connect->query($man_query);
            $woman_rows = $connect->query($woman_query);

            $man_selected_slides = $man_rows->fetch_all(MYSQLI_NUM);
            $woman_selected_slides = $woman_rows->fetch_all(MYSQLI_NUM);

            set_HTTP_status(200, 'selected slides', ['man' => $man_selected_slides, 'woman' => $woman_selected_slides]);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }
}

$sections = new Sections_controller();
//man slider
if ($method == "POST" && $request_data['action'] == "update_man_slider") {
    $sections->update_man_slider($request_data['prods_id']);
} 

if ($method == "GET" && isset($request_data->parameters['man_slider'])) {
    $sections->get_man_slider();
    return;
}

//woman slider
if ($method == "POST" && $request_data['action'] == "update_woman_slider") {
    $sections->update_woman_slider($request_data['prods_id']);
} 

if ($method == "GET" && isset($request_data->parameters['woman_slider'])) {
    $sections->get_woman_slider();
    return;
}

//
if ($method == "GET" && isset($request_data->parameters['slider_list'])) {
    $sections->products_slider_list();
    return;
}

if ($method == "GET" && isset($request_data->parameters['get_selected_slides'])) {
    $sections->get_selected_slides();
    return;
}

if ($method == "GET" && isset($request_data->parameters['random_prods'])) {
    $sections->get_random_prods();
    return;
}

if ($method == "GET") {
    $sections->render();
}



