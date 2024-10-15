<?php
class User
{
    private $_cn;

    public function __construct($db)
    {
        $this->_cn = $db;
    }

    public function getOne($id)
    {
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getAll()
    {
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE active = :active");
        $active = 1;
        $stmt->bindParam(':active', $active, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function create($firstname, $lastname, $phone, $email, $password)
    {
        // Préparer la requête en incluant le champ 'active'
        $stmt = $this->_cn->prepare("INSERT INTO users (firstname, lastname, phone, email, password, active, createdat) VALUES (:firstname, :lastname, :phone, :email, :password, :active, NOW())");

        // Lier les paramètres
        $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $stmt->bindParam(':phone', $phone, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);

        // Hacher le mot de passe
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);

        // Un user est actif dès sa création
        $active = 1;
        $stmt->bindParam(':active', $active, PDO::PARAM_INT);

        // Exécuter la requête
        if ($stmt->execute()) {
            return $this->_cn->lastInsertId();
        }
        return false;
    }

    public function update($id, $firstname, $lastname, $email)
    {
        // Préparer la requête en incluant le champ 'active'
        $stmt = $this->_cn->prepare("UPDATE users SET firstname = :firstname, lastname = :lastname, email = :email, updatedat = NOW() WHERE id = :id ");

        // Lier les paramètres
        $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        // Exécuter la requête
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id)
    {
        $stmt = $this->_cn->prepare("DELETE FROM users WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}