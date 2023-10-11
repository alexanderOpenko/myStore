<?php 
if (!isset($_SESSION['login'])) {
    header('Location: admin_login');
    exit;
}

class Admin_home {
    public function render() {
        include 'View/admin_home.php';
    }
}

$admin = new Admin_home();
$admin->render();
?>
