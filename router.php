<?php 
class Router {
    public $routes = array();

    function add_router ($url, $path) {
        $this->routes[$url] = $path;
    }

    function route ($url) {
        $path = $this->routes[$url];

        if ($path) {
            require $path;
        } else {
            echo '404';
        }
    }
}
?>