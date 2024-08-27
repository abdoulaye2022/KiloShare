<?php
class User {
    private $_cn;

    public function __construct($db) {
        $this->_cn = $db;
    }

    public function getOne($id) {
        $stmt = $this->_cn->prepare("SELECT * FROM trips WHERE user_id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getAll() {
        $stmt = $this->_cn->prepare("SELECT * FROM trips WHERE active = :active");
        $active = 1;
        $stmt->bindParam(':active', $active, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function create($user_id, $departure_date, $arrival_date, $origin_country ) {
        $stmt = $this->_cn->prepare("INSERT INTO `trips`(`user_id`, `departure_date`, `arrival_date`, `origin_country`, `origin_province`, `origin_city`, `destination_country`, `destination_province`, `destination_city`, `space_available`, `price_kilo`, `price_per_kilo`, `description`, `active`) VALUES(:user_id, :departure_date, :arrival_date, :origin_country,  )")
    }

    public function update() {

    }

    public function delete() {

    }
}