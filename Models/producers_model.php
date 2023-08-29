<?php 
Class Admin_producers_model {
   public $producers = [];
    public static function get_producers() {
        global $connect;

        $query = "SELECT * FROM producers ORDER BY id DESC";

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

    public static function add_producer($producer) {
        global $connect;

        $query = "INSERT INTO producers (name) VALUES(?)";
       
        try {
            $prepare_query = $connect->prepare($query);
            $prepare_query->bind_param('s', $producer);
            if (!$prepare_query->execute()) {
                throw new Exception($connect->error);
            }

        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }
}

?>