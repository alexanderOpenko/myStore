<?php
global $method;
global $request_data;

class Admin_login_controller {
    public function render($path) {
        include $path;
    }

    public function login_checkout($pass) {
        if ($pass === '') {
            error_log('log');
            $_SESSION['login'] = 1;
            header('Location: admin');
            exit;
        } else {
            $_SESSION['warning'] = 'НЕ ВІРНО';
            header('Location: admin_login');
            exit;
        }
    }

    public function logout() {
        unset($_SESSION['login']);
        header('Location: admin_login');
    }
}

if ($method == "GET" && isset($request_data->parameters['password'])) {
    $admin = new Admin_login_controller();
    $admin->login_checkout($request_data->parameters['password']);
    return;
}

if ($method == "GET" && isset($request_data->parameters['logout'])) {
    $admin = new Admin_login_controller();
    $admin->logout();
    return;
}

$admin = new Admin_login_controller();
$admin->render('View/admin_login.php');
?>