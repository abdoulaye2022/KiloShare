<?php
include_once '../config/cn.php';
include_once '../models/User.php';

class UserController {
    private $db;
    private $model;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->model = new User($this->db);
    }

    // M�thode pour obtenir tous les utilisateurs
    public function login() {
        
        $result = $this->model->read();
        $users = $result->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
    }
}
