<?php
// if (!isset($_SESSION['login'])) {
//     header('Location: admin_login');
//     exit;
// }
global $method;
global $request_data;
require 'headers.php';
require 'Models/products_model.php';
require_once 'Controllers/checkout_controller.php';

class Orders
{
    public $orders, $order_info, $order_products, $cities_select, $warehouses_select;
    public function insert_order($data, $update = false, $order_id = null)
    {
        global $connect;
        $status = 'в роботі';
        $comment = trim($data['comment']);
        if (!$update) {
            $query = "INSERT INTO orders (first_name, last_name, middle_name, number, email, comment, status, city, city_name, warehouse, warehouse_name, payment_method) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        } else {
            $query = "UPDATE orders SET first_name = ?, last_name = ?, middle_name = ?, number = ?, email = ?, comment = ?, status = ?, city = ?, city_name = ?, warehouse = ?, warehouse_name = ?, payment_method = ?
            WHERE orders.id = '$order_id'";
        }

        try {
            $prepare_query = $connect->prepare($query);
            $prepare_query->bind_param(
                'ssssssssssss',
                $data['first_name'],
                $data['last_name'],
                $data['middle_name'],
                $data['number'],
                $data['email'],
                $comment,
                $status,
                $data['city'],
                $data['city_name'],
                $data['warehouse'],
                $data['warehouse_name'],
                $data['payment_method']
            );

            if (!$prepare_query->execute()) {
                throw new Exception($connect->error . 'ins_upd');
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $last_id = mysqli_insert_id($connect);

        return $last_id;
    }

    public function insert_order_products($last_id)
    {
        global $connect;

        $cart = $_SESSION['cart'];
        $sql = "INSERT INTO order_products (order_id, quantity, sku, size) VALUES ";

        foreach ($cart as $item) {
            $quantity = $item['quantity'];
            $sku = $item['sku'];
            $size = $item['size'];

            // Добавление значения в SQL запрос
            $sql .= "('$last_id', '$quantity', '$sku', '$size'), ";
        }

        $sql = rtrim($sql, ", ");

        try {
            $rows = $connect->query($sql);
            if (!$rows) {
                throw new Exception($connect->error);
            }

            return 'ok';
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public function updata_products_quantity($last_id)
    {
        global $connect;

        $query = "UPDATE product_options po 
        JOIN order_products op 
        ON po.sku = op.sku AND po.size = op.size 
        SET po.quantity = po.quantity - op.quantity 
        WHERE op.order_id = $last_id";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }

            // return ['status' => 'ok', 'last_id' => $last_id];
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public function get_orders_list($data)
    {
        global $connect;

        $query = "SELECT o.*, 
        (SELECT GROUP_CONCAT(CONCAT(p.name, ' ', '<strong>',p.sku,'</strong>', ' (', op.size, ', ', op.quantity, ')'), '</br>' SEPARATOR '') 
        FROM order_products AS op 
        LEFT JOIN products AS p 
        ON op.sku = p.sku 
        WHERE op.order_id = o.id) AS order_products 
        FROM orders AS o
        ORDER BY id DESC
        ";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }

            $this->orders = $rows->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public function get_order_info($id, $api = true)
    {
        global $connect;

        $query = "SELECT * from orders WHERE id = '$id'";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }

            $this->order_info = $rows->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public function get_order_products($id)
    {
        global $connect;

        $order_products_query = "SELECT * from order_products WHERE order_id = '$id'";

        try {
            $order_products_rows = $connect->query($order_products_query);
            if (!$order_products_rows) {
                throw new Exception($connect->error);
            }

            $fetched_order_products = $order_products_rows->fetch_all(MYSQLI_ASSOC);
            $this->order_products = Products_model::get_cart_variants($fetched_order_products);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public function delete_product_from_order($prod_id)
    {
        global $connect;

        $query = "DELETE from order_products where id = $prod_id";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public function update_order_quantity($prod_id, $value)
    {
        global $connect;

        $query = "UPDATE order_products SET quantity = '$value' where id = $prod_id";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public function insert_order_product($order_id, $sku, $size)
    {
        global $connect;

        $query = "INSERT INTO order_products (order_id, quantity, sku, size) 
        VALUES($order_id, 1, '$sku', '$size')";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public function update_status($status, $order_id)
    {
        global $connect;

        $query = "UPDATE orders SET status = '$status' where id = $order_id";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }

            return 'ok';
        } catch (Exception $e) {
            error_log($e->getMessage());
            set_HTTP_status('500', '', '', 0);
            exit();
        }
    }

    public function  update_price($price, $order_id)
    {
        global $connect;

        $query = "UPDATE orders SET price = '$price' where id = $order_id";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }

            return 'ok';
        } catch (Exception $e) {
            error_log($e->getMessage());
            set_HTTP_status('500', '', '', 0);
            exit();
        }
    }

    public function  update_weight($weight, $order_id)
    {
        global $connect;

        $query = "UPDATE orders SET weight = '$weight' where id = $order_id";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }

            return 'ok';
        } catch (Exception $e) {
            error_log($e->getMessage());
            set_HTTP_status('500', '', '', 0);
            exit();
        }
    }

    public function send_email_message($last_id)
    {
        $to = 'bradaspace@gmail.com';
        $subject = 'Нове замовлення';
        $message = "Нове замовлення № {$last_id}";

        mail($to, $subject, $message);
    }

    public function delete_order($id) 
    {
        global $connect;

        $query = "DELETE FROM orders as o where o.id = '$id'";
        
        $query_delete_order_prods = "DELETE FROM order_products as op where op.order_id = '$id'";

        try {
            if (!$connect->query($query)) {
                throw new Exception($connect->error);
            }

        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        try {
            if (!$connect->query($query_delete_order_prods)) {
                throw new Exception($connect->error);
            }

        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public function render($path)
    {
        include $path;
    }
}

$orders = new Orders();

if ($method == 'GET' && isset($request_data->parameters['order_info'])) {
    $orders->get_order_info($request_data->parameters['order_id']);
    $orders->render('View/order_success.php');
    return;
}

if ($method == 'POST' && isset($request_data['action']) && $request_data['action'] == 'create_order') {
    $last_id = $orders->insert_order($request_data);
    $result = $orders->insert_order_products($last_id);
    if ($result == 'ok') {
        unset($_SESSION['cart']);
        $orders->updata_products_quantity($last_id);
        $orders->send_email_message($last_id);
        set_HTTP_status(200, '', ['order_id' => $last_id], 1);
    }
}

if ($method == 'POST' && isset($request_data['action']) && $request_data['action'] == 'update_order') {
    $orders->insert_order($request_data, true, $request_data['order_id']);
}

if ($method == 'POST' && isset($request_data['add_order_prod'])) {
    $orders->insert_order_product(
        $request_data['order_id'],
        $request_data['sku'],
        $request_data['size']
    );

    $orders->updata_products_quantity($request_data['order_id']);
}

if ($method == 'GET' && isset($request_data->parameters['orders_list'])) {
    $orders->get_orders_list($request_data);
    $orders->render('View/orders.php');
}

if ($method == 'GET' && isset($request_data->parameters['delete_order_prod'])) {
    $orders->delete_product_from_order($request_data->parameters['prod_id']);
}

if ($method == 'GET' && isset($request_data->parameters['action_delete'])) {
    $orders->delete_order($request_data->parameters['id']);
    $orders->get_orders_list($request_data);
    $orders->render('View/orders.php');
}

if ($method == 'POST' && isset($request_data['update_status'])) {
    $result = $orders->update_status($request_data['status'], $request_data['order_id']);

    if ($result == 'ok') {
        set_HTTP_status(200, '', '', 1);
    }
}

if ($method == 'POST' && isset($request_data['update_price'])) {
    $result = $orders->update_price($request_data['price'], $request_data['order_id']);

    if ($result == 'ok') {
        set_HTTP_status(200, '', '', 1);
    }
}

if ($method == 'POST' && isset($request_data['update_weight'])) {
    $result = $orders->update_weight($request_data['weight'], $request_data['order_id']);

    if ($result == 'ok') {
        set_HTTP_status(200, '', '', 1);
    }
}

if ($method == 'GET' && isset($request_data->parameters['update_order_quantity'])) {
    $orders->update_order_quantity($request_data->parameters['prod_id'], $request_data->parameters['value']);
}

if ($method == 'GET' && isset($request_data->parameters['get_prods_list'])) {
    $prods = Products_model::get_all_available_products();
    set_HTTP_status(200, '', $prods, 1);
}

if ($method == 'GET' && isset($request_data->parameters['order_forms']) && isset($request_data->parameters['order_id'])) {
    $orders->get_order_info($request_data->parameters['order_id']);
    $orders->get_order_products($request_data->parameters['order_id']);

    set_HTTP_status(200, '', ['order_info' => $orders->order_info, 'order_products' => $orders->order_products]);
    return;
}

if ($method == 'GET' && isset($request_data->parameters['order_forms'])) {
    $checkout = new Checkout_controller();
    $orders->get_order_info($request_data->parameters['id']);
    // $city_ref = $orders->order_info[0]['city'];

    // Получаем список городов
    // $checkout->get_cities();
    // $checkout->create_cities_select($city_ref);

    // // Теперь получаем список складов после получения городов
    // $checkout->get_warehouses($city_ref, $orders->order_info[0]['warehouse']);

    // // Присваиваем результаты методов
    // $orders->warehouses_select = $checkout->warehouses_select;
    // $orders->cities_select = $checkout->cities_select;

    $orders->render('View/order_forms.php');
}

//update delivery
//update products
//update TTN