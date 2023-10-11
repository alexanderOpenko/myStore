<?php
require 'vasya_store.php';
global $products;
global $connect;

$products = new SimpleXMLElement($xmlstr);
$connect = new mysqli('localhost', 'root', 'root', 'vasya_store');

if ($connect->connect_errno) {
  error_log("Failed to connect to MySQL: " . $connect->connect_error);
  exit();
}

// echo $products->offers->offer[0]->description;
function insertProducts()
{
  global $connect;
  global $products;

  foreach ($products->offers->offer as $product) {
    $name = $product->name;
    $description = $product->description;
    $price = $product->price;
    $collection = $product->categoryId;
    $sku = $product->vendorCode;

    $query = "INSERT INTO products (name, description, price, collection, sku) 
                VALUES(?, ?, ?, ?, ?)";

    $prepare_query = $connect->prepare($query);
    $prepare_query->bind_param('sssis', $name, $description, $price, $collection, $sku);
    if (!$prepare_query->execute()) {
      throw new Exception($connect->error . 'ins_upd');
    }
  }
}

function insertOptions()
{
  global $connect;
  global $products;

  foreach ($products->offers->offer as $product) {
    $size = $product->param;
    $quantity = $product->quantity_in_stock;
    $sku = $product->vendorCode;

    $query = "INSERT INTO product_options (size, quantity, sku) VALUES('$size', '$quantity', '$sku')";

    try {
      $rows = $connect->query($query);
      if (!$rows) {
        throw new Exception($connect->error);
      }
    } catch (Exception $e) {
      error_log($e->getMessage());
    }
  }
}

function insertProductsMedia()
{
  global $connect;
  global $products;
  $images_arr = [];

  foreach ($products->offers->offer as $product) {
    $i = 0;
    foreach ($product->picture as $picture) {
      $image = $picture;
      $sku = $product->vendorCode;
      $media_type = $i == 0 ? 'main' : 'additional';

      if (!in_array($image, $images_arr)) {
        $query = "INSERT INTO products_media (image_path, media_type, sku) VALUES('$image', '$media_type', '$sku')";

        try {
          $rows = $connect->query($query);
          if (!$rows) {
            throw new Exception($connect->error);
          }
        } catch (Exception $e) {
          error_log($e->getMessage());
        }
      }

      $i++;
      $images_arr[] = htmlentities((string)$image);
    }
  }
}

function insertCollections()
{
  global $connect;
  global $products;

  foreach ($products->categories->category as $category) {
    $id = $category['id'];
    $name = $category;

    $query = "INSERT INTO collections (id, name) VALUES('$id', '$name')";

    try {
      $rows = $connect->query($query);
      if (!$rows) {
        throw new Exception($connect->error);
      }
    } catch (Exception $e) {
      error_log($e->getMessage());
    }
  }
}

// insertProductsMedia();
//удалить дублікати в продуктах
//DELETE t1 FROM vasya_store.products t1 LEFT JOIN vasya_store.products t2 ON t1.sku = t2.sku AND t1.id < t2.id WHERE t2.id IS NOT NULL;

//обновить products_media
// UPDATE vasya_store.products_media as pm
// JOIN vasya_store.products as p
// ON p.sku = pm.sku
// SET pm.product_id = p.id;

// удалить дублікати 
// CREATE TEMPORARY TABLE tmp_tab AS SELECT DISTINCT * FROM your_table;

// DELETE FROM your_table;

// INSERT INTO your_table SELECT * FROM tmp_tab;

// DROP TABLE tmp_tab; 
