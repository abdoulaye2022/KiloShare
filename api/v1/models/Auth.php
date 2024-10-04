<?php
class Auth {
    private $_cn;

    public function __construct($cn) {
        $this->_cn = $cn;
    }

    // Exemple de m�thode pour obtenir tous les utilisateurs
    public function login($email) {
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt;
    }

    // Exemple de m�thode pour obtenir tous les utilisateurs
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

    public function updateUser($id, $newData) {
        if ($this->_cn == null) {
            echo "Erreur de connexion à la base de données.";
            return false;
        }

        // Si le mot de passe est présent dans les nouvelles données, hachez-le
        if (isset($newData['password'])) {
            $newData['password'] = password_hash($newData['password'], PASSWORD_BCRYPT);
        }

        // Préparez la requête SQL pour la mise à jour
        $query = "UPDATE users SET ";
        $fields = [];
        foreach ($newData as $key => $value) {
            $fields[] = "$key = :$key";
        }
        $query .= implode(", ", $fields);
        $query .= " WHERE id = :id";

        // Préparez la déclaration
        $stmt = $this->conn->prepare($query);

        // Liez les valeurs
        foreach ($newData as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }
        $stmt->bindValue(":id", $id);

        // Exécutez la requête
        try {
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $exception) {
            echo "Erreur de mise à jour: " . $exception->getMessage();
            return false;
        }
    }
    
    public function emailExist ($email) {
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt;
    }

}