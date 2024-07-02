<?php
class User {
    private $conn;

    public $UserID;
    public $FirstName;
    public $LastName;
    public $Phone;
    public $Email;
    public $Password;
    public $CreatedAt;
    public $UpdatedAt;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Exemple de méthode pour obtenir tous les utilisateurs
    public function login($email) {
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE Email = :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt;
    }
}