<?php
class Preference
{
    private $_cn;

    public function __construct($db)
    {
        $this->_cn = $db;
    }

    public function getOne($id)
    {
        $stmt = $this->_cn->prepare("SELECT `id`, `user_id`, `email`, `phone`, `fullname`, `newsletter` FROM preferences WHERE user_id = :user_id AND is_deleted = 0");
        $stmt->bindParam(':user_id', $id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            return $stmt;
        }
        return false;
    }

    public function getAll()
    {
        $stmt = $this->_cn->query("SELECT `id`, `user_id`, `email`, `phone`, `fullname`, `newsletter` FROM preferences WHERE is_deleted = 0");
        return $stmt;
    }

    public function create($user_id, $email, $phone, $fullname, $newsletter, $created_at)
    {
        $stmt = $this->_cn->prepare("INSERT INTO preferences (`user_id`, `email`, `phone`, `fullname`, `newsletter`, created_at, created_at) VALUES (:user_id, :email, :phone, :fullname, :newsletter, :create_by,  NOW())");

        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':email', $email, PDO::PARAM_INT);
        $stmt->bindParam(':phone', $phone, PDO::PARAM_INT);
        $stmt->bindParam(':fullname', $fullname, PDO::PARAM_INT);
        $stmt->bindParam(':newsletter', $newsletter, PDO::PARAM_INT);
        $stmt->bindParam(':created_by', $created_by, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $this->_cn->lastInsertId();
        }
        return false;
    }

    public function isPreferenceExist($id)
    {
        $stmt = $this->_cn->prepare("SELECT * FROM preferences WHERE user_id = :id AND is_deleted = 0");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->execute()) {
            return $stmt->rowCount();
        }
        return 0;
    }

    public function defaultPreference($user_id, $created_by)
    {
        $stmt = $this->_cn->prepare("INSERT INTO preferences (`user_id`, `email`, `phone`, `fullname`, `newsletter`, created_by, created_at) VALUES (:user_id, 0, 0, 0, 0, :created_by,  NOW())");

        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':created_by', $created_by, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $this->_cn->lastInsertId();
        }
        return false;
    }

    public function update($user_id, $key, $value)
    {
        $stmt = $this->_cn->prepare("UPDATE preferences SET ".$key." = :".$key.", updated_by = :updated_by, updated_at = NOW() WHERE user_id = :user_id ");

        $stmt->bindParam(':'.$key, $value, PDO::PARAM_INT);
        $stmt->bindParam(':updated_by', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id)
    {
        $stmt = $this->_cn->prepare("UPDATE preferences SET is_deleted = :is_deleted WHERE id = :id");
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