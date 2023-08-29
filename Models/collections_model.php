<?php 
Class Admin_collections_model {
   public $collections = [];
    public static function get_collections() {
        global $connect;

        $query = "SELECT * FROM collections ORDER BY id DESC";

        try {
            $rows = $connect->query($query);
            if (!$rows) {
                throw new Exception($connect->error);
            }
            return $rows->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }

    public static function add_collection($collection) {
        global $connect;

        $query = "INSERT INTO collections (name) VALUES(?)";
       
        try {
            $prepare_query = $connect->prepare($query);
            $prepare_query->bind_param('s', $collection);
            if (!$prepare_query->execute()) {
                throw new Exception($connect->error);
            }

        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }
}

?>