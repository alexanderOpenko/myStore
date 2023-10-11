<?php
require_once 'Controllers/admin_orders_controller.php';
require 'vendor/autoload.php';
require_once 'headers.php';

use LisDev\Delivery\NovaPoshtaApi2;
// use DateTime;
global $method;
global $request_data;

class Checkout_controller
{
    public $np, $cities, $cities_select, $warehouses_select, $paymentsMethods;
    public function __construct()
    {
        $this->np = new NovaPoshtaApi2(
            '',
            'ru', // Мова повертаємих даних: ru (default) | ua | en
            FALSE, // При помилці в запросі виключати Exception: FALSE (default) | TRUE
            'file_get_content' // Використовуємий механізм запросу: curl (defalut) | file_get_content
        );
    }

    public function get_cities()
    {
        $this->cities = $this->np->getCities();
    }

    public function create_cities_select($selectedRef = null)
    {
        //    print_r( $this->cities['data'][0]);
        $this->cities_select = '<select required name="city"><option value="">введіть назву міста чи села</option>  ';
        $last_key = end($this->cities['data']);

        foreach ($this->cities['data'] as $data) {
            $place_type = $data['SettlementTypeDescription'] == 'село' ? 'с' : 'м';
            $place = $data['Description'];

            $selected = '';

            if ($selectedRef) {
                $selected = $selectedRef === $data['Ref'] ? 'selected' : '';
            }

            $this->cities_select .= "<option name={$place} {$selected} value={$data['Ref']}>{$place_type}.{$place}</option>";

            if ($data == $last_key) {
                error_log($place);
                $this->cities_select .= "</select>";
            }
        }
    }

    public function get_warehouses($city_id, $warehouseRef = false, $api = false)
    {
        $wh = $this->np->getWarehouses($city_id);
        $last_key = end($wh['data']);
        $this->warehouses_select = '<select required name="warehouse"><option value="">виберіть відділення</option>  ';

        foreach ($wh['data'] as $warehouse) {
            $selected = '';
            if ($warehouseRef) {
                $selected = $warehouseRef === $warehouse['Ref'] ? 'selected' : '';
            }

            $this->warehouses_select .= "<option value={$warehouse['Ref']} {$selected}>{$warehouse['Description']}</option>";

            if ($warehouse == $last_key) {
                $this->warehouses_select .= "</select>";
            }
        }

        if ($api) {
            echo $this->warehouses_select;
        }
    }

    public function get_payment_forms()
    {
        $this->paymentsMethods = $this->np->getPaymentForms();
    }

    // array(
    //     [id] => 7
    //     [first_name] => василь
    //     [last_name] => васильський
    //     [middle_name] => васьович
    //     [number] => 123455678
    //     [email] => ff@gmail.com
    //     [comment] =>                         ffgf
    //     [status] => не підтверджено
    //     [city] => fc5f1e3c-928e-11e9-898c-005056b24375
    //     [city_name] => с.Абазівка (Полтавський р-н, Полтавська обл)
    //     [warehouse] => e6627e75-de7e-11e9-b48a-005056b24375
    //     [warehouse_name] => Пункт приймання-видачі (до 30 кг): вул. Білоуська, 2в
    //     [payment_method] => NonCash
    //     [document] => 
    //     [date] => 2023-09-19 22:16:28
    // )


    public function generate_internet_document($order_id)
    {
        $order = new Orders();
        $order->get_order_info($order_id, false);
        $order->get_order_products($order_id);

        $info = $order->order_info[0];
        $products = $order->order_products;
        // print_r($order->order_info);
        // print_r($order->order_products);
        //recipient info
        $first_name = $info['first_name'];
        $middle_name = $info['middle_name'];
        $last_name = $info['last_name'];
        $phone = $info['number'];
        $warehouse = $info['warehouse_name'];
        $price = $info['price'];
        $product_description = 'Одяг';
        $total_quantity = 0;
        // $total_price = 0;
        $total_weight = $info['weight'];
        $pay_method = $info['payment_method'];

        foreach ($products as $item) {
            // $product_description .= $item['sku'] . ' (' . $item['size'] . ', ' . $item['order_quantity'] . '), ';
            $total_quantity += $item['order_quantity'];
            // $total_price += $item['price'];
            // $total_weight += $item['weight'];
        }
        // $product_description = rtrim($product_description, ', ');

        $senderInfo = $this->np->getCounterparties('Sender', 1, '', '');
        $sender = $senderInfo['data'][0];

        $senderWarehouses = $this->np->getWarehouses($sender['City']);
        $date = new DateTime();
        $dateTime = $date->modify('+1 day');

        $result = $this->np
            ->model('Address')
            ->method('getCities')
            ->params(array(
                'Ref' => $info['city'],
            ))
            ->execute();

        $city = $result['data'][0]['Description'];
        $region = $result['data'][0]['AreaDescription'];

        $sender = [
            // Дані користувача
            'FirstName' => $sender['FirstName'],
            'MiddleName' => $sender['MiddleName'],
            'LastName' => $sender['LastName'],
            // Замість FirstName, MiddleName, LastName можна ввести зареєстровані ПІБ відправника чи найменування фірми для юридичних особ
            // (можна отримати за допомогою методу getCounterparties('Sender', 1, '', ''))
            // 'Description' => $sender['Description'],
            // Необов'язкове поле, у випадку відсутності будуть використовуватися з даних контакта
            // 'Phone' => '0631112233',
            // Місто відправлення
            // 'City' => 'Белгород-Днестровский',
            // Область відправлення
            // 'Region' => 'Одесская',
            'CitySender' => 'db5c88de-391c-11dd-90d9-001a92567626',
            // Отделение отправления по ID (в данном случае - в первом попавшемся)
            'SenderAddress' => '6d5731b5-94db-11e5-a023-005056887b8d',
            // Отделение отправления по адресу
            'Warehouse' => 'Відділення №12 (до 30 кг): вул. Пирогова, 31',
        ];

        $recipient = [
            'FirstName' => $first_name,
            'LastName' => $last_name,
            'Phone' => $phone,
            'City' => $city,
            'Region' => $region,
            'Warehouse' => $warehouse,
        ];

        if ($middle_name) {
            $recipient['MiddleName'] = $middle_name;
        }

        $parms = [
            'DateTime' => $dateTime,
            // Тип доставки, додатково - getServiceTypes()
            //'ServiceType' => 'WarehouseWarehouse',
            // Тип оплати, додатково - getPaymentForms()
            // 'PaymentMethod' => 'Cash',
            // Хто сплачує доставку
            'PayerType' => 'Recipient',
            // Вартість вантажу в грн
            'Cost' => $price,
            // Кількість місць
            'SeatsAmount' => $total_quantity,
            // Опис вантажу
            'Description' => $product_description,
            // Тип доставки, додатково - getCargoTypes
            'CargoType' => 'Cargo',
            // Вага вантажу
            'Weight' => $total_weight,
            // Об'єм вантажу в м^3
            // 'VolumeGeneral' => '0.5',
            // Зворотня доставка
        ];

        if ($pay_method == 'Cash') {
            $parms['BackwardDeliveryData'] = [
                [
                    // Хто оплачує зворотню доставку
                    'PayerType' => 'Recipient',
                    // Тип доставки
                    'CargoType' => 'Money',
                    // Значення зворотньої доставки
                    'RedeliveryString' => $price,
                ]
            ];
        }

        $result = $this->np->newInternetDocument(
            $sender,
            $recipient,
            $parms
        );

        // print_r($result);
        return $result;
    }

    public function delete_document($doc_ref) {
        $result = $this->np
            ->model('InternetDocument')
            ->method('delete')
            ->params(array(
                'DocumentRefs' => $doc_ref,
            ))
            ->execute();

        return $result;
    }

    public function delete_document_db($doc_ref) {
        global $connect;

        $query = "UPDATE orders SET document = NULL, doc_ref = NULL WHERE doc_ref = '$doc_ref'";
        
        try {
            if (!$connect->query($query)) {
                throw new Exception($connect->error);
            }

            return 'ok';
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public function insert_document($order_id, $document, $document_ref)
    {
        global $connect;
        $query = "UPDATE orders SET document = '$document', doc_ref='$document_ref' WHERE id = '$order_id'";

        try {
            if (!$connect->query($query)) {
                throw new Exception($connect->error);
            }

            return 'ok';
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public function render()
    {
        include 'View/checkout.php';
    }
}

if ($method == 'GET' && !count($request_data->parameters)) {
    $checkout = new Checkout_controller;

    $checkout->get_cities();
    $checkout->create_cities_select();
    //$checkout->get_payment_forms();
    $checkout->render();
    return;
}

if ($method == 'GET' && isset($request_data->parameters['city_id'])) {
    $checkout = new Checkout_controller;

    $checkout->get_warehouses($request_data->parameters['city_id'], false, true);
    return;
}

if ($method == 'POST' && isset($request_data['delete_document'])) {
    $checkout = new Checkout_controller;

    $result = $checkout->delete_document($request_data['doc_ref']);

    if ($result['success']) {
        $delete_doc = $checkout->delete_document_db($request_data['doc_ref']);
        if ($delete_doc === 'ok') {
            set_HTTP_status('200', '', '', 1);
        }
    } else {
        set_HTTP_status(
            '400',
            'Помилка при видаленні ТТН',
            0
        );
    }
}

if ($method == 'POST' && isset($request_data['create_document'])) {
    $checkout = new Checkout_controller;

    $result = $checkout->generate_internet_document($request_data['order_id']);

    if ($result['success']) {
        $document = $result['data'][0]['IntDocNumber'];
        $document_ref = $result['data'][0]['Ref'];

        $insertDoc = $checkout->insert_document($request_data['order_id'], $document, $document_ref);
        if ($insertDoc === 'ok') {
            set_HTTP_status('200', 'Документ створено', 1);
        }
    } else {
        $message = implode(', ', $result['errors']);
        set_HTTP_status(
            '400',
            $message,
            0
        );
    }
}
