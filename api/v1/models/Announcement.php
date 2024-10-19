<?php
class Announcement
{
    private $_cn;

    public function __construct($db)
    {
        $this->_cn = $db;
    }

    public function getOne($id)
    {
        $stmt = $this->_cn->prepare("SELECT * FROM announcements WHERE id = :id AND is_deleted = 0");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getAll()
    {
        $stmt = $this->_cn->query("SELECT * FROM announcements WHERE is_deleted = 0");
        return $stmt;
    }

    public function create($title, $description, $space_available, $price_kilo, $price_per_kilo, $departure_city, 
                        $arrival_city, $departure_date, $arrival_date, $collection_date, $user_id, $status_id)
    {
        $stmt = $this->_cn->prepare("INSERT INTO `announcements`(`title`, `description`, `space_available`, `price_kilo`, 
                                    `price_per_kilo`, `departure_city`, `arrival_city`, `departure_date`, `arrival_date`, 
                                    `collection_date`, `user_id`, `status_id`, `created_at`) 
                                    VALUES (:title, :description, :space_available, :price_kilo, 
                                    :price_per_kilo, :departure_city, :arrival_city, :departure_date, :arrival_date, 
                                    :collection_date, :user_id, :status_id, NOW())");

        $stmt->bindParam(':title', $title, PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, PDO::PARAM_STR);
        $stmt->bindParam(':space_available', $space_available);
        $stmt->bindParam(':price_kilo', $price_kilo);
        $stmt->bindParam(':price_per_kilo', $price_per_kilo);
        $stmt->bindParam(':departure_city', $departure_city, PDO::PARAM_STR);
        $stmt->bindParam(':arrival_city', $arrival_city, PDO::PARAM_STR);
        $stmt->bindParam(':departure_date', $departure_date, PDO::PARAM_STR);
        $stmt->bindParam(':arrival_date', $arrival_date, PDO::PARAM_STR);
        $stmt->bindParam(':collection_date', $collection_date, PDO::PARAM_STR);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':status_id', $status_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $this->_cn->lastInsertId();
        }
        return false;
    }

    public function update($id, $title, $description, $space_available, $price_kilo, $price_per_kilo, $departure_city, 
                            $arrival_city, $departure_date, $arrival_date, $collection_date, $status_id)
    {
        $stmt = $this->_cn->prepare("UPDATE announcements SET title = :title, description = :description, space_available = :space_available, price_kilo = :price_kilo, 
                                    price_per_kilo = :price_per_kilo, departure_city = :departure_city, arrival_city = :arrival_city, departure_date = :departure_date, 
                                    arrival_date = :arrival_date, collection_date = :collection_date, status_id = :status_id, updated_at = NOW() WHERE id = :id");

        $stmt->bindParam(':title', $title, PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, PDO::PARAM_STR);
        $stmt->bindParam(':space_available', $space_available);
        $stmt->bindParam(':price_kilo', $price_kilo);
        $stmt->bindParam(':price_per_kilo', $price_per_kilo);
        $stmt->bindParam(':departure_city', $departure_city, PDO::PARAM_STR);
        $stmt->bindParam(':arrival_city', $arrival_city, PDO::PARAM_STR);
        $stmt->bindParam(':departure_date', $departure_date, PDO::PARAM_STR);
        $stmt->bindParam(':arrival_date', $arrival_date, PDO::PARAM_STR);
        $stmt->bindParam(':collection_date', $collection_date, PDO::PARAM_STR);
        $stmt->bindParam(':status_id', $status_id, PDO::PARAM_INT);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id)
    {
        $stmt = $this->_cn->prepare("UPDATE announcements SET is_deleted = :is_deleted WHERE id = :id");
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