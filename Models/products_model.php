<?php class Products_model
{
    public $products;

    public function __construct()
    {
        global $connect;

        $sql_query = "SELECT p.*, pcrs.name AS producer 
        FROM products as p 
        LEFT JOIN producers AS pcrs
        ON pcrs.id = p.producer
        ORDER BY id DESC";

        try {
            $rows = $connect->query($sql_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
            $this->products = $rows->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function get_product_media($id)
    {
        global $connect;

        $sql_query = "SELECT * FROM products_media WHERE product_id = $id";

        try {
            $rows = $connect->query($sql_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
            return $rows->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function get_cart_variants()
    {
        global $connect;

        $sql_query = "SELECT p.name, p.price, po.quantity, po.*, pm.image_path FROM products AS p 
        LEFT JOIN product_options AS po 
        ON p.sku = po.sku 
        LEFT JOIN products_media AS pm
        ON p.id = pm.product_id AND pm.media_type = 'main'
        WHERE (";

        foreach ($_SESSION['cart'] as $item) {
            $sql_query .= "(po.sku = '" . $item['sku'] . "' and po.size = '" . $item['size'] . "') OR ";
          }

          $sql_query = substr($sql_query, 0, -4) . ")";

        try {
            $rows = $connect->query($sql_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
            return $rows->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function get_variant($sku, $size)
    {
        global $connect;

        $sql_query = "SELECT p.name, po.quantity, po.size, po.sku, pm.image_path FROM products as p 
        LEFT JOIN product_options as po 
        ON p.sku = po.sku 
        LEFT JOIN products_media as pm
        ON p.id = pm.product_id AND pm.media_type = 'main'
        WHERE po.sku = '$sku' and po.size ='$size'";

        try {
            $rows = $connect->query($sql_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
            return $rows->fetch_assoc();
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function getProduct($sku)
    {
        global $connect;

        $sql_query = "SELECT p.*, p.id AS product_id, po.*, pm.*, pcrs.name AS producer
        FROM products AS p 
        LEFT JOIN product_options AS po 
        ON p.sku = po.sku 
        LEFT JOIN products_media AS pm
        ON p.id = pm.product_id
        LEFT JOIN producers AS pcrs
        ON pcrs.id = p.producer
        WHERE p.sku = '$sku'";

        try {
            $rows = $connect->query($sql_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
            return $rows->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function getProductInfo($sku)
    {
        global $connect;

        $sql_query = "SELECT p.*, po.size, po.quantity FROM products as p 
        LEFT JOIN product_options as po 
        ON p.sku = po.sku 
        WHERE p.sku = '$sku'";

        try {
            $rows = $connect->query($sql_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
            return $rows->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function sort_options_middleware($data)
    {
        // Создаем новый массив для хранения результата
        $newArr = [];

        // Проходим по каждому элементу исходного массива
        foreach ($data as $item) {
            // Проверяем, есть ли уже элемент с таким же id и sku в новом массиве
            $found = false;
            foreach ($newArr as &$newItem) {
                if ($item['id'] == $newItem['id'] && $item['sku'] == $newItem['sku']) {
                    // Если есть, то добавляем размер к существующему элементу
                    $found = true;
                    if (is_array($newItem['size'])) {
                        // Если размер уже является массивом, то просто добавляем новый размер
                        $newItem['size'][] = $item['size'];
                    }
                    // break;
                }
            }
            if (!$found) {
                // Если нет, то добавляем элемент в новый массив как есть
                $item['size'] = [$item['size']];
                $newArr[] = $item;
            }
        }
        return $newArr;
    }

    public static function get_collection($collection_id)
    {
        global $connect;
        if ($collection_id != 'all') {
            $condition = "WHERE collection = '$collection_id'";
        } else {
            $condition = '';
        };

        $sql_query = "SELECT p.*, c.name AS collection, po.color, po.size, pm.*
        FROM products p
        LEFT JOIN product_options po
        ON p.sku = po.sku
        LEFT JOIN products_media as pm
        ON p.id = pm.product_id AND pm.media_type = 'main'
        LEFT JOIN collections as c
        ON p.collection = c.id" . " " . $condition . " ORDER BY p.id DESC";

        try {
            $rows = $connect->query($sql_query);
            if (!$rows) {
                throw new Exception($connect->error);
            }

            $fetchedRows = $rows->fetch_all(MYSQLI_ASSOC);
            $result = self::sort_options_middleware($fetchedRows);
            return $result;
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }
}
