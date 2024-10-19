<?php
class Profile
{
    private $_cn;

    public function __construct($db)
    {
        $this->_cn = $db;
    }

    public function getOne($id)
    {
        $stmt = $this->_cn->prepare("SELECT * FROM profiles WHERE id = :id AND is_deleted = 0");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getAll()
    {
        $stmt = $this->_cn->query("SELECT * FROM profiles WHERE is_deleted = 0");
        return $stmt;
    }

    public function create($name)
    {
        $stmt = $this->_cn->prepare("INSERT INTO profiles (name, created_at) VALUES (:name, NOW())");

        $stmt->bindParam(':name', $name, PDO::PARAM_STR);

        if ($stmt->execute()) {
            return $this->_cn->lastInsertId();
        }
        return false;
    }

    public function update($id, $name)
    {
        $stmt = $this->_cn->prepare("UPDATE profiles SET name = :name, updated_at = NOW() WHERE id = :id ");

        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id)
    {
        $stmt = $this->_cn->prepare("UPDATE profiles SET is_deleted = :is_deleted WHERE id = :id");
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