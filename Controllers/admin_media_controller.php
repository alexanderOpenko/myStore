<?php
if (!isset($_SESSION['login'])) {
    header('Location: admin_login');
    exit;
}
require "Models/products_model.php";
require_once  "vendor/autoload.php";
global $method;
global $request_data;

use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;

class Admin_products
{
    public $products;
    public function __construct()
    {
        $products = new products_model();
        $this->products = $products->products;
        $this->render();
    }

    public static function updateProductImage($id, $public_id, $url)
    {
        $type = 'main';
        global $connect;

        $delete_query = "DELETE FROM products_media WHERE product_id = '$id' AND media_type = 'main'";
        try {
            $rows = $connect->query($delete_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $insert_query = "INSERT INTO products_media (image_path, public_id, media_type, product_id) VALUES (?, ?, ?, ?)";
        try {
            $prepare_query = $connect->prepare($insert_query);
            $prepare_query->bind_param('sssi', $url, $public_id, $type, $id);
            if (!$prepare_query->execute()) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function insert_media($insert_string) {
        global $connect;
        $query = "INSERT INTO products_media (public_id, image_path, media_type, product_id) VALUES $insert_string";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function delete_media ($id, $public_id = null) {
        global $connect;
        if ($public_id) {
        Configuration::instance('cloudinary://348514735543642:kdXVOAItlKEP20GxpQBJEkWy0Q0@dztn3fgbp?secure=false');
        $api = new UploadApi();
        $result = $api->destroy($public_id);
        }
//if result ok
        $delete_query = "DELETE FROM products_media WHERE id = '$id'";
        try {
            $rows = $connect->query($delete_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }  
    } 

    public function render()
    {
        include 'View/admin_media.php';
    }
}

if ($method == 'POST' && $request_data['update_image'] == 'true') {
    Admin_products::updateProductImage(
        $request_data['id'],
        $request_data['public_id'],
        $request_data['url']
    );
} else if ($method == 'POST' && $request_data['other_media'] == 'true') {
    Admin_products::insert_media($request_data['insertString']);
} else if ($method == 'GET' && isset($request_data->parameters['delete_media'])) {
    Admin_products::delete_media($request_data->parameters['path'], $request_data->parameters['id']);
} else {
    new Admin_products();
}
