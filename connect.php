<?php global $connect;
$connect = new mysqli('localhost', 'root', 'root', 'vasya_store');

if ($connect->connect_errno) {
    error_log("Failed to connect to MySQL: " . $connect->connect_error);
    exit();
  }
  ?>