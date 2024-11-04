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
        $stmt = $this->_cn->prepare("SELECT u.id, u.firstname, u.lastname, u.phone, u.email, u.status, u.profile_id, p.name as profile_name 
                                    FROM users u
                                    INNER JOIN profiles p ON p.id = u.profile_id 
                                    WHERE u.id = :id AND u.is_deleted = 0");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getAll()
    {
        $stmt = $this->_cn->prepare("SELECT u.id, u.firstname, u.lastname, u.phone, u.email, u.status, u.profile_id, p.name as profile_name
                                    FROM users u 
                                    INNER JOIN profiles p ON p.id = u.profile_id 
                                    WHERE u.is_deleted = 0");
        $stmt->execute();
        return $stmt;
    }

    public function create($firstname, $lastname, $phone, $email, $password, $profile_id)
    {
        $stmt = $this->_cn->prepare("INSERT INTO users (firstname, lastname, phone, email, password, profile_id, status, created_at) VALUES (:firstname, :lastname, :phone, :email, :password, :profile_id, :status, NOW())");

        $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $stmt->bindParam(':phone', $phone, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);

        $stmt->bindParam(':profile_id', $profile_id, PDO::PARAM_INT);

        $status = 1;
        $stmt->bindParam(':status', $status, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $this->_cn->lastInsertId();
        }
        return false;
    }

    public function update($id, $firstname, $lastname, $email, $profile_id)
    {
        $stmt = $this->_cn->prepare("UPDATE users SET firstname = :firstname, lastname = :lastname, email = :email, profile_id = :profile_id, updated_at = NOW() WHERE id = :id ");

        $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':profile_id', $profile_id, PDO::PARAM_INT);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id)
    {
        $stmt = $this->_cn->prepare("UPDATE users SET is_deleted = :is_deleted WHERE id = :id");
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