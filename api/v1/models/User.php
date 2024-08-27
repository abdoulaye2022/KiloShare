<?php
class User {
    private $_cn;

    public function __construct($db) {
        $this->_cn = $db;
    }

    public function getOne($id) {
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getAll() {
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE active = :active");
        $active = 1;
        $stmt->bindParam(':active', $active, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        
    }

    public function update() {

    }

    public function delete() {

    }
}