<?php
require 'vendor/autoload.php';
use LisDev\Delivery\NovaPoshtaApi2;
// use DateTime;
global $method;
global $request_data;

class Checkout_controller {
    public $np, $cities, $cities_select, $warehouses_select, $paymentsMethods;
    public function __construct() {
        $this->np = new NovaPoshtaApi2(
            '912c7a4cbbbbabff2b62f0bcbf033ef1',
            'ru', // Мова повертаємих даних: ru (default) | ua | en
            FALSE, // При помилці в запросі виключати Exception: FALSE (default) | TRUE
            'file_get_content' // Використовуємий механізм запросу: curl (defalut) | file_get_content
        );
    }

    public function get_cities() {
        $this->cities = $this->np->getCities();
    }

    public function create_cities_select() {
    //    print_r( $this->cities['data'][0]);
        $this->cities_select = '<select required name="city"><option value="">введіть назву міста чи села</option>  ';
        $last_key = end($this->cities['data']);

        foreach($this->cities['data'] as $data) {
            $place_type = $data['SettlementTypeDescription'] == 'село' ? 'с' : 'м';
            $place = $data['Description'];

            $this->cities_select .= "<option name={$place} value={$data['Ref']}>{$place_type}.{$place}</option>";

            if ($data == $last_key) {
                error_log($place);
                $this->cities_select .= "</select>";
            }
        }
    }

    public function get_warehouses($city_id) {
     $wh = $this->np->getWarehouses($city_id);
     $last_key = end($wh['data']);
     $this->warehouses_select = '<select required name="warehouse"><option value="">виберіть відділення</option>  ';

        foreach ($wh['data'] as $warehouse) {
            $this->warehouses_select .= '<option value="'.$warehouse['Ref'].'">'.$warehouse['Description'].'</option>';

            if ($warehouse == $last_key) {
                $this->warehouses_select .= "</select>";
            }
        }

       echo $this->warehouses_select;
    }

    public function get_payment_forms() {
        $this->paymentsMethods = $this->np->getPaymentForms();
    }

    public function generate_internet_document() {
        $senderInfo = $this->np->getCounterparties('Sender', 1, '', '');
        print_r($senderInfo);
        return;

        $sender = $senderInfo['data'][0];
        $senderWarehouses = $this->np->getWarehouses($sender['City']);
        $date = new DateTime (); 
        $dateTime = $date->modify ('+1 day');

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
        'CitySender' => '06f87978-4079-11de-b509-001d92f78698',
        // Відділення відправника по ID (у цьому випадку - перше у списку)
        'SenderAddress' => '16922872-e1c2-11e3-8c4a-0050568002cf',
        // Відділення за адресою
        'Warehouse' => 'Черкаська',
        ];

        $recipient = [
            'FirstName' => 'Сидор',
            'MiddleName' => 'Сидорович',
            'LastName' => 'Сиродов',
            'Phone' => '0509998877',
            'City' => 'Киев',
            'Region' => 'Киевская',
            'Warehouse' => 'Отделение №3: ул. Калачевская, 13 (Старая Дарница)',
        ];

        $parms = [
            'DateTime' => $dateTime,
            // Тип доставки, додатково - getServiceTypes()
        //'ServiceType' => 'WarehouseWarehouse',
        // Тип оплати, додатково - getPaymentForms()
        'PaymentMethod' => 'Cash',
        // Хто сплачує доставку
        'PayerType' => 'Recipient',
        // Вартість вантажу в грн
        'Cost' => '500',
        // Кількість місць
        'SeatsAmount' => '1',
        // Опис вантажу
        'Description' => 'Кастрюля',
        // Тип доставки, додатково - getCargoTypes
        'CargoType' => 'Cargo',
        // Вага вантажу
        'Weight' => '10',
        // Об'єм вантажу в м^3
        'VolumeGeneral' => '0.5',
        // Зворотня доставка
        'BackwardDeliveryData' => array(
            array(
                // Хто оплачує зворотню доставку
                'PayerType' => 'Recipient',
                // Тип доставки
                'CargoType' => 'Money',
                // Значення зворотньої доставки
                'RedeliveryString' => 4552,
            )
        )
        ];

        $result = $this->np->newInternetDocument(
            $sender,
            $recipient,
            $parms
        );

        print_r($result);
    }

    public function render () {
        include 'View/checkout.php';
    }
}

$checkout = new Checkout_controller;

if ($method == 'GET' && !count($request_data->parameters)) {
    $checkout->get_cities();
    $checkout->create_cities_select();
    //$checkout->get_payment_forms();
    $checkout->render();
}

if ($method == 'GET' && isset($request_data->parameters['city_id'])) {
    $checkout->get_warehouses($request_data->parameters['city_id']);
}

if ($method == 'POST' && isset($request_data['first_name'])) {
    error_log('here');
    $checkout->generate_internet_document();
}

?>