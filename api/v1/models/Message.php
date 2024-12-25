<?php
class Message
{
    private $_cn;

    public function __construct($db)
    {
        $this->_cn = $db;
    }

    public function getOne($id)
    {
        $stmt = $this->_cn->prepare("SELECT * FROM messages WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getAll()
    {
        $stmt = $this->_cn->query("SELECT * FROM messages WHERE");
        return $stmt;
    }

    public function create($user_id, $ad_id, $message, $created_by)
    {
        $stmt = $this->_cn->prepare("INSERT INTO messages (`user_id`, `ad_id`, `message`, `sending_date`, `created_by`, `created_at`) 
                                    VALUES (:user_id, :ad_id, :message, NOW(), :created_by,  NOW())");

        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':ad_id', $ad_id, PDO::PARAM_INT);
        $stmt->bindParam(':message', $message, PDO::PARAM_STR);
        $stmt->bindParam(':created_by', $created_by, PDO::PARAM_STR);

        if ($stmt->execute()) {
            return $this->_cn->lastInsertId();
        }
        return false;
    }

    public function update($id, $name)
    {
        $stmt = $this->_cn->prepare("UPDATE messages SET name = :name, updated_at = NOW() WHERE id = :id ");

        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id)
    {
        $stmt = $this->_cn->prepare("UPDATE status SET is_deleted = :is_deleted WHERE id = :id");
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