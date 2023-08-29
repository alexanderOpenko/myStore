<?php 

class Admin_home {
    public function render() {
        include 'View/admin_home.php';
    }
}

$admin = new Admin_home();
$admin->render();
?>
