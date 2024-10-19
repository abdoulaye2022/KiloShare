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
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE id = :id AND is_deleted = 0");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getAll()
    {
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE active = :active AND is_deleted = 0");
        $active = 1;
        $stmt->bindParam(':active', $active, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function create($firstname, $lastname, $phone, $email, $password)
    {
        $stmt = $this->_cn->prepare("INSERT INTO users (firstname, lastname, phone, email, password, active, createdat) VALUES (:firstname, :lastname, :phone, :email, :password, :active, NOW())");

        $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $stmt->bindParam(':phone', $phone, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);

        $active = 1;
        $stmt->bindParam(':active', $active, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $this->_cn->lastInsertId();
        }
        return false;
    }

    public function update($id, $firstname, $lastname, $email)
    {
        $stmt = $this->_cn->prepare("UPDATE users SET firstname = :firstname, lastname = :lastname, email = :email, updatedat = NOW() WHERE id = :id ");

        $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id)
    {
        $stmt = $this->_cn->prepare("UPDATED users SET is_deleted = :is_deleted WHERE id = :id");
        $is_deleted = 1;
        $stmt->bindParam(':is_deleted', $is_deleted, PDO::PARAM_INT);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}