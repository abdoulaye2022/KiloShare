<?php
class Auth {
    private $_cn;

    public function __construct($cn) {
        $this->_cn = $cn;
    }

    // Exemple de m�thode pour obtenir tous les utilisateurs
    public function login($email) {
        $stmt = $this->_cn->prepare("SELECT u.id, u.firstname, u.lastname, u.phone, u.email, u.status, u.password, u.profile_id, p.name as profile_name 
                                    FROM users u
                                    INNER JOIN profiles p ON p.id = u.profile_id WHERE u.email = :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt;
    }

    // Exemple de m�thode pour obtenir tous les utilisateurs
    public function signin($firstname, $lastname, $email, $password) {
        $stmt = $this->_cn->prepare("INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`, `profile_id`, `status`) VALUES (:firstname, :lastname, :email, :password, :profile_id, :status)");

        $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $profile_id = 2;
        $stmt->bindParam(':profile_id', $profile_id, PDO::PARAM_INT);
        $status = 1;
        $stmt->bindParam(':status', $status, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $this->_cn->lastInsertId();
        }
        return false;
    }
    
    public function emailExist ($email) {
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt;
    }

}