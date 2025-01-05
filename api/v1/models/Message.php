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
        $stmt = $this->_cn->query("SELECT * FROM messages");
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

    public function getUserAdMessage($user_id, $ad_id)
    {
        $stmt = $this->_cn->prepare("SELECT messages.id, messages.user_id, messages.message, messages.sending_date, CONCAT(users.firstname, ' ', users.lastname) AS author 
                                FROM messages
                                INNER JOIN users ON messages.user_id = users.id
                                WHERE messages.ad_id = :ad_id AND messages.user_id = :user_id OR messages.to_user_id = :to_user_id
                                ORDER BY messages.created_at DESC
                                LIMIT 5");
        $stmt->bindParam(':ad_id', $ad_id, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':to_user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getUsersAdMessage($ad_id)
    {
        $stmt = $this->_cn->prepare("SELECT messages.id, messages.user_id, messages.message, messages.sending_date, CONCAT(users.firstname, ' ', users.lastname) AS author 
                                FROM messages
                                INNER JOIN users ON messages.user_id = users.id
                                WHERE messages.ad_id = :ad_id
                                ORDER BY messages.created_at DESC
                                LIMIT 5");
        $stmt->bindParam(':ad_id', $ad_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getUserAdMessagePaginate($user_id, $ad_id, $offsetAds, $limitAds) {
        try {

            $stmt = $this->_cn->prepare("SELECT messages.id, messages.user_id, messages.message, messages.sending_date, CONCAT(users.firstname, ' ', users.lastname) AS author 
                                FROM messages
                                INNER JOIN users ON messages.user_id = users.id
                                WHERE ad_id = :ad_id AND user_id = :user_id OR to_user_id = :to_user_id
                                LIMIT :limitAds OFFSET :offsetAds");
            $stmt->bindParam(':ad_id', $ad_id, PDO::PARAM_INT);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->bindParam(':to_user_id', $user_id, PDO::PARAM_INT);
            $stmt->bindParam(':offsetAds', $offsetAds, PDO::PARAM_INT);
            $stmt->bindParam(':limitAds', $limitAds, PDO::PARAM_INT);

            $stmt->execute();

            return $stmt;
        } catch (PDOException $e) {
            error_log("Erreur lors de l'exécution de la requête : " . $e->getMessage());
            return [];
        }
    }

    public function getUsersAdMessagePaginate($ad_id, $offsetAds, $limitAds) {
        try {

            $stmt = $this->_cn->prepare("SELECT messages.id, messages.user_id, messages.message, messages.sending_date, CONCAT(users.firstname, ' ', users.lastname) AS author 
                                FROM messages
                                INNER JOIN users ON messages.user_id = users.id
                                WHERE ad_id = :ad_id 
                                LIMIT :limitAds OFFSET :offsetAds");
            $stmt->bindParam(':ad_id', $ad_id, PDO::PARAM_INT);
            $stmt->bindParam(':offsetAds', $offsetAds, PDO::PARAM_INT);
            $stmt->bindParam(':limitAds', $limitAds, PDO::PARAM_INT);

            $stmt->execute();

            return $stmt;
        } catch (PDOException $e) {
            error_log("Erreur lors de l'exécution de la requête : " . $e->getMessage());
            return [];
        }
    }

    public function response($auth_id, $ad_id, $message, $to_user_id, $created_by)
    {
        $stmt = $this->_cn->prepare("INSERT INTO messages (`user_id`, `ad_id`, `message`, `sending_date`, `to_user_id`, `created_by`, `created_at`) 
                                    VALUES (:user_id, :ad_id, :message, NOW(), :to_user_id, :created_by,  NOW())");

        $stmt->bindParam(':user_id', $auth_id, PDO::PARAM_INT);
        $stmt->bindParam(':ad_id', $ad_id, PDO::PARAM_INT);
        $stmt->bindParam(':message', $message, PDO::PARAM_STR);
        $stmt->bindParam(':to_user_id', $to_user_id, PDO::PARAM_INT);
        $stmt->bindParam(':created_by', $created_by, PDO::PARAM_STR);

        if ($stmt->execute()) {
            return $this->_cn->lastInsertId();
        }
        return false;
    }
}