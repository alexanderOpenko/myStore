<?php 
global $method;
global $request_data;
require 'Models/products_model.php';
require 'headers.php';

global $response_messages;
$response_messages = [
    "empty" => "empty cart",
    "cart_products" => "cart"
];

class Cart_controller {
    public $cart_products;
    public $message = [];
    public $total_price = 0;
    public $total_count = 0;
    public function decrease_quantity($sku, $size) {
        global $response_messages;
        $variant = $sku . '/' . $size;

        if ($_SESSION['cart'][$variant]['quantity'] - 1 == 0) {
            unset($_SESSION['cart'][$variant]);
            $this->message[] = $response_messages['empty'];
            return;
        }

        $_SESSION['cart'][$variant]['quantity']--;
    }

    public function add_to_cart($sku, $size) {
        $product = Products_model::get_variant($sku, $size);
        $variant = $sku . '/' . $size;

        if(isset($_SESSION['cart'][$variant])) { 
            if (intval($product['quantity']) <= $_SESSION['cart'][$variant]['quantity']) {
                $this->message[] = "$variant out of stock";
                return;
            }
            
            if (intval($product['quantity']) == $_SESSION['cart'][$variant]['quantity']  + 1) {
                $this->message[] = "$variant last counts of items";
            }

            $_SESSION['cart'][$variant]['quantity']++; 
            $this->message[] = "$variant added to cart";        
        } else { 
            if ($product['quantity'] > 0) {
                $_SESSION['cart'][$variant] = [
                    'quantity' => 1,      
                    'sku' => $product['sku'],
                    'size' => $product['size']
                ];

                if (intval($product['quantity']) == $_SESSION['cart'][$variant]['quantity']) {
                    $this->message[] = "last counts of item";
                }     

                $this->message[] = "$variant added to cart";
            } else {
                $this->message[] = "$variant out of stock";
            }
        }
    }
  
    public function get_cart_items() {
        global $response_messages;
        if (empty($_SESSION['cart'])) {
            set_HTTP_status(400, $this->message, ["cart" => [], 0]);
            die();
        }

        $cart_items = Products_model::get_cart_variants();
        $this->cart_products = $cart_items;
        $this->set_quantity_to_items();

        set_HTTP_status(200, $this->message, 
    ["cart" => $this->cart_products, "total_price" => $this->total_price, "total_count" => $this->total_count]);
    }

    public function set_quantity_to_items() {
        foreach($this->cart_products as &$product) {
            $variant = $product['sku'] . '/' . $product['size'];

            if(array_key_exists($variant, $_SESSION['cart'])) {
                $product['cart_quantity'] = $_SESSION['cart'][$variant]['quantity']; 
                $this->total_price += $product['price'] * $product['cart_quantity'];
                $this->total_count += $product['cart_quantity'];

                if ($product['quantity'] <= 0) {
                    $product['out'] = true;
                    continue;
                }
    
                if ($product['cart_quantity'] >= $product['quantity']) {
                    $product['last'] = true;
                    $product['available_only'] = $product['quantity'];
                }
            }
        }
    }
}

$cart = new Cart_controller();

if ($method == "POST" && $request_data['action'] == "Add") {
    $cart->add_to_cart($request_data['sku'], $request_data['size']);
    $cart->get_cart_items();
} 

if ($method == "POST" && $request_data['action'] == "Decrease") {
    $cart->decrease_quantity($request_data['sku'], $request_data['size']);
    $cart->get_cart_items();
} 

if ($method == "GET") {
    $cart->get_cart_items();
}

?>