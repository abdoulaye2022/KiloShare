<?php
class Auth {
    private $_cn;

    public function __construct($cn) {
        $this->_cn = $cn;
    }

    // Exemple de méthode pour obtenir tous les utilisateurs
    public function login($email) {
        $stmt = $this->_cn->prepare("SELECT id, firstname, lastname, phone, email FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt;
    }

    // Exemple de méthode pour obtenir tous les utilisateurs
    public function signin($firstname, $lastname, $phone, $email, $password) {
        $stmt = $this->_cn->prepare("INSERT INTO `users` (`firstname`, `lastname`, `phone`, `email`, `password`, `active`) VALUES (:firstname, :lastname, :phone, :email, :password, :active)");

        $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $stmt->bindParam(':phone', $phone, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $active = 1;
        $stmt->bindParam(':active', $active, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt;
    }

    public function emailExist ($email) {
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt;
    }

}