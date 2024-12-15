<?php
class Ad
{
    private $_cn;

    public function __construct($db)
    {
        $this->_cn = $db;
    }

    public function getOne($id)
    {
        $stmt = $this->_cn->prepare("SELECT a.id, a.title, a.description, a.space_available, a.price_kilo, a.departure_country,
                                    a.arrival_country, a.departure_city, a.arrival_city, a.departure_date, a.arrival_date, a.collection_date,
                                    a.user_id, CONCAT(u.firstname, ' ', u.lastname) AS author, u.phone, u.email, a.status_id, s.name AS status_name,
                                    a.category_id, c.name AS category_name, a.photo, a.slug, a.is_deleted, a.created_by, a.created_at, a.updated_by,
                                    a.updated_at
                                    FROM
                                        ads a
                                    INNER JOIN users u ON u.id = a.user_id 
                                    INNER JOIN status s ON s.id = a.status_id
                                    INNER JOIN categories c ON c.id = a.category_id WHERE a.id = :id AND a.is_deleted = 0");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getAll()
    {
        $stmt = $this->_cn->query("SELECT a.id, a.title, a.description, a.space_available, a.price_kilo, a.departure_country,
                                    a.arrival_country, a.departure_city, a.arrival_city, a.departure_date, a.arrival_date, a.collection_date,
                                    a.user_id, CONCAT(u.firstname, ' ', u.lastname) AS author, u.phone, u.email, a.status_id, s.name AS status_name,
                                    a.category_id, c.name AS category_name, a.photo, a.slug, a.is_deleted, a.created_by, a.created_at, a.updated_by,
                                    a.updated_at
                                    FROM
                                        ads a
                                    INNER JOIN users u ON u.id = a.user_id 
                                    INNER JOIN status s ON s.id = a.status_id
                                    INNER JOIN categories c ON c.id = a.category_id WHERE a.is_deleted = 0");
        return $stmt;
    }
    
    public function create($title, $description, $space_available, $price_kilo, $departure_country, $arrival_country, $departure_city, $arrival_city, 
                    $departure_date, $arrival_date, $collection_date, $user_id, $status_id, $category_id, $photo, $created_by, $slug)
    {
        $stmt = $this->_cn->prepare("INSERT INTO `ads`(`title`, `description`, `space_available`, `price_kilo`, `departure_country`, `arrival_country`,
                                     `departure_city`, `arrival_city`, `departure_date`, `arrival_date`, `collection_date`, 
                                     `user_id`, `status_id`, `category_id`, `photo`, `slug`, `created_by`, `created_at`) 
                                    VALUES (:title, :description, :space_available, :price_kilo, :departure_country, :arrival_country, :departure_city, :arrival_city, 
                                    :departure_date, :arrival_date, :collection_date, :user_id, :status_id, :category_id, :photo, :slug, :created_by, NOW())");

        $stmt->bindParam(':title', $title, PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, PDO::PARAM_STR);
        $stmt->bindParam(':space_available', $space_available);
        $stmt->bindParam(':price_kilo', $price_kilo);
        $stmt->bindParam(':departure_country', $departure_country, PDO::PARAM_STR);
        $stmt->bindParam(':arrival_country', $arrival_country, PDO::PARAM_STR);
        $stmt->bindParam(':departure_city', $departure_city, PDO::PARAM_STR);
        $stmt->bindParam(':arrival_city', $arrival_city, PDO::PARAM_STR);
        $stmt->bindParam(':departure_date', $departure_date, PDO::PARAM_STR);
        $stmt->bindParam(':arrival_date', $arrival_date, PDO::PARAM_STR);
        $stmt->bindParam(':collection_date', $collection_date, PDO::PARAM_STR);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':status_id', $status_id, PDO::PARAM_INT);
        $stmt->bindParam(':category_id', $category_id, PDO::PARAM_INT);
        $stmt->bindParam(':photo', $photo, PDO::PARAM_STR);
        $stmt->bindParam(':slug', $slug, PDO::PARAM_STR);
        $stmt->bindParam(':created_by', $created_by, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $this->_cn->lastInsertId();
        }
        return false;
    }

    public function update($id, $title, $description, $space_available, $price_kilo, $departure_city, 
                            $arrival_city, $departure_date, $arrival_date, $collection_date, $status_id, $category_id)
    {
        $stmt = $this->_cn->prepare("UPDATE ads SET title = :title, description = :description, space_available = :space_available, price_kilo = :price_kilo, 
                                     departure_city = :departure_city, arrival_city = :arrival_city, departure_date = :departure_date, 
                                    arrival_date = :arrival_date, collection_date = :collection_date, status_id = :status_id, category_id = :category_id, updated_at = NOW() WHERE id = :id");

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
        $stmt->bindParam(':category_id', $category_id, PDO::PARAM_INT);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id)
    {
        $stmt = $this->_cn->prepare("UPDATE ads SET is_deleted = :is_deleted WHERE id = :id");
        $is_deleted = 1;
        $stmt->bindParam(':is_deleted', $is_deleted, PDO::PARAM_INT);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function reject($id, $rejection_reason)
    {
        $stmt = $this->_cn->prepare("UPDATE ads SET status_id = 3, rejection_date = NOW(), rejection_reason = :rejection_reason WHERE id = :id");
        $stmt->bindParam(':rejection_reason', $rejection_reason, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    
    public function approve($id)
    {
        $stmt = $this->_cn->prepare("UPDATE ads SET status_id = 2, approval_date = NOW() WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}