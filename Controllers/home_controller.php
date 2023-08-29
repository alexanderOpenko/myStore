<?php
class Home_controller {
    public function __construct() {
        $this->render();
    }

    public function render () {
        include 'View/home.php';
    }
}

new Home_controller;
?>