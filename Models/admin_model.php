<?php
require_once  "vendor/autoload.php";

use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Api\Admin\AdminApi;

class Admin_model
{
    public static function insert_product($data, $edit)
    {
        global $connect;
        $sku = $data['sku'];
        $weight = $data['weight'];
        $collection_id = (int)$data['collection'];

        if (!$edit) {
            $query = "INSERT INTO products (name, color, sku, producer, description, compound, measure, price, weight, collection) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        } else {
            $query = "UPDATE products SET name = ?, color = ?, sku = ?, producer = ?, description = ?, compound = ?, measure = ?, price = ?, weight = ?, collection = ?
            where products.sku = '$sku'";
        }

        try {
            $prepare_query = $connect->prepare($query);
            $prepare_query->bind_param('sssissssdi', $data['product_name'], $data['color'], $data['sku'], $data['producer'], $data['description'], $data['compound'], $data['measure'], $data['price'], $weight, $collection_id);
            if (!$prepare_query->execute()) {
                throw new Exception($connect->error . 'ins_upd');
            }
            $delete_variants = self::delete_variants($data['sku']);

            if ($delete_variants == 'ok') {
                self::insert_variants($data['insert_str']);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function delete_current_product($id)
    {
        global $connect;

        $query = "DELETE FROM products WHERE id = '$id'";
        try {
            $result = $connect->query($query);
            if (!$result) {
                throw new Exception($connect->error);
            }

            return 'ok';
        } catch (Exception $e) {
            error_log($e->getMessage());
            return 'error';
        }
    }

    public static function delete_variants($sku)
    {
        global $connect;

        $query = "DELETE FROM product_options WHERE sku = '$sku'";
        try {
            $result = $connect->query($query);
            if (!$result) {
                throw new Exception($connect->error);
            }

            return 'ok';
        } catch (Exception $e) {
            error_log($e->getMessage());
            return 'error';
        }
    }

    public static function delete_product($product_id, $sku)
    {
        global $connect;
        $public_ids = [];

        $query = "SELECT public_id FROM products_media where product_id = '$product_id'";
        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
            while ($row = $rows->fetch_row()) {
                $public_ids[] = $row[0];
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        self::delete_current_product($product_id);
        self::delete_variants($sku);

        if (count($public_ids)) {
            Configuration::instance('cloudinary://348514735543642:kdXVOAItlKEP20GxpQBJEkWy0Q0@dztn3fgbp?secure=false');
            $api = new AdminApi();
            $result = $api->deleteAssets($public_ids);
            //if result ok
        }

        $delete_query = "DELETE FROM products_media WHERE product_id = '$product_id'";
        try {
            $rows = $connect->query($delete_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function get_man_slider()
    {
        global $connect;

        $sql_query = "SELECT p.*, c.name AS collection, prodcr.name AS producer, pm.*
        FROM products p
        LEFT JOIN products_media as pm
        ON p.id = pm.product_id AND pm.media_type = 'main'
        LEFT JOIN collections as c
        ON p.collection = c.id
        LEFT JOIN producers as prodcr
        ON p.producer = prodcr.id
        JOIN man_slider as ms
        ON ms.product_id = p.sku";

        try {
            $rows = $connect->query($sql_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }

            $fetchedRows = $rows->fetch_all(MYSQLI_ASSOC);
            return $fetchedRows;
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function get_random_prods() {
        global $connect;

        $query = "SELECT p.*, c.name AS collection, prodcr.name AS producer, pm.*
        FROM products p
        LEFT JOIN products_media as pm
        ON p.id = pm.product_id AND pm.media_type = 'main'
        LEFT JOIN collections as c
        ON p.collection = c.id
        LEFT JOIN producers as prodcr
        ON p.producer = prodcr.id
        ORDER BY RAND()
        LIMIT 14";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }

            $fetchedRows = $rows->fetch_all(MYSQLI_ASSOC);
            return $fetchedRows;
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function insert_man_slider($prods_id)
    {
        global $connect;

        $query = "DELETE FROM man_slider";

        try {
            $result = $connect->query($query);
            if (!$result) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
            return 'error';
        }

        $values = [];
        $prods = explode(',', $prods_id);
        foreach ($prods as $selectedOption) {
            $values[] = "('$selectedOption')";
        }

        $sql = "INSERT INTO man_slider (product_id) VALUES " . implode(",", $values);

        try {
            $rows = $connect->query($sql);
            if (!$rows) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }


    //woman
    public static function get_woman_slider()
    {
        global $connect;

        $sql_query = "SELECT p.*, c.name AS collection, prodcr.name AS producer, pm.*
        FROM products p
        LEFT JOIN products_media as pm
        ON p.id = pm.product_id AND pm.media_type = 'main'
        LEFT JOIN collections as c
        ON p.collection = c.id
        LEFT JOIN producers as prodcr
        ON p.producer = prodcr.id
        JOIN woman_slider as ms
        ON ms.product_id = p.sku";

        try {
            $rows = $connect->query($sql_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }

            $fetchedRows = $rows->fetch_all(MYSQLI_ASSOC);
            return $fetchedRows;
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function insert_woman_slider($prods_id)
    {
        global $connect;

        $query = "DELETE FROM woman_slider";

        try {
            $result = $connect->query($query);
            if (!$result) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
            return 'error';
        }

        $values = [];
        $prods = explode(',', $prods_id);
        foreach ($prods as $selectedOption) {
            $values[] = "('$selectedOption')";
        }

        $sql = "INSERT INTO woman_slider (product_id) VALUES " . implode(",", $values);

        try {
            $rows = $connect->query($sql);
            if (!$rows) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function insert_variants($insert_string)
    {
        global $connect;
        $query = "INSERT INTO product_options (sku, size, quantity) VALUES $insert_string";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }
}
