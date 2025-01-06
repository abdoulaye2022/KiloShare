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
                                    a.updated_at, p.email AS p_email, p.newsletter AS p_newsletter, p.fullname AS p_fullname, p.phone AS p_phone
                                    FROM
                                        ads a
                                    INNER JOIN users u ON u.id = a.user_id 
                                    INNER JOIN status s ON s.id = a.status_id
                                    LEFT JOIN preferences p ON p.user_id = u.id
                                    INNER JOIN categories c ON c.id = a.category_id WHERE a.id = :id AND a.is_deleted = 0");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getOneAd($id, $slug)
    {
        $stmt = $this->_cn->prepare("SELECT a.id, a.title, a.description, a.space_available, a.price_kilo, a.departure_country,
                                    a.arrival_country, a.departure_city, a.arrival_city, a.departure_date, a.arrival_date, a.collection_date,
                                    a.user_id, CONCAT(u.firstname, ' ', u.lastname) AS author, u.phone, u.email, a.status_id, s.name AS status_name,
                                    a.category_id, c.name AS category_name, a.photo, a.slug, a.is_deleted, a.created_by, a.created_at, a.updated_by,
                                    a.updated_at, p.email AS p_email, p.newsletter AS p_newsletter, p.fullname AS p_fullname, p.phone AS p_phone
                                    FROM
                                        ads a
                                    INNER JOIN users u ON u.id = a.user_id 
                                    INNER JOIN status s ON s.id = a.status_id
                                    LEFT JOIN preferences p ON p.user_id = u.id
                                    INNER JOIN categories c ON c.id = a.category_id WHERE a.slug = :slug AND a.id = :id AND a.status_id = 2 AND a.is_deleted = 0");
        $stmt->bindParam(':slug', $slug, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        if($stmt->execute()) {
            return $stmt;
        }
        return false;
    }

    public function getAll()
    {
        try {
            // Préparation de la requête SQL
            $stmt = $this->_cn->query("
                SELECT 
                    a.id, a.title, a.description, a.space_available, a.price_kilo, a.departure_country,
                    a.arrival_country, a.departure_city, a.arrival_city, a.departure_date, a.arrival_date, a.collection_date,
                    a.user_id, CONCAT(u.firstname, ' ', u.lastname) AS author, u.phone, u.email, a.status_id, s.name AS status_name,
                    a.category_id, c.name AS category_name, a.photo, a.slug, a.is_deleted, a.created_by, a.created_at, a.updated_by,
                    a.updated_at, p.email AS p_email, p.newsletter AS p_newsletter, p.fullname AS p_fullname, p.phone AS p_phone
                FROM 
                    ads a
                INNER JOIN 
                    users u ON u.id = a.user_id 
                INNER JOIN 
                    status s ON s.id = a.status_id
                LEFT JOIN 
                    preferences p ON p.user_id = u.id
                INNER JOIN 
                    categories c ON c.id = a.category_id 
                WHERE 
                    a.is_deleted = 0 AND a.status_id = 2
                ORDER BY 
                    a.updated_at DESC
                LIMIT 10
            ");

            // Exécution de la requête
            $stmt->execute();

            // Retour des résultats sous forme de tableau associatif
            return $stmt;
        } catch (PDOException $e) {
            // Gestion des erreurs PDO
            error_log("Erreur lors de l'exécution de la requête : " . $e->getMessage());
            return []; // Retourne un tableau vide en cas d'erreur
        }
    }

    public function getAllPaginate($offsetAds, $limitAds)
    {
        try {
            // Préparation de la requête SQL
            $stmt = $this->_cn->prepare("
                SELECT 
                    a.id, a.title, a.description, a.space_available, a.price_kilo, a.departure_country,
                    a.arrival_country, a.departure_city, a.arrival_city, a.departure_date, a.arrival_date, a.collection_date,
                    a.user_id, CONCAT(u.firstname, ' ', u.lastname) AS author, u.phone, u.email, a.status_id, s.name AS status_name,
                    a.category_id, c.name AS category_name, a.photo, a.slug, a.is_deleted, a.created_by, a.created_at, a.updated_by,
                    a.updated_at, p.email AS p_email, p.newsletter AS p_newsletter, p.fullname AS p_fullname, p.phone AS p_phone
                FROM 
                    ads a
                INNER JOIN 
                    users u ON u.id = a.user_id 
                INNER JOIN 
                    status s ON s.id = a.status_id
                LEFT JOIN 
                    preferences p ON p.user_id = u.id
                INNER JOIN 
                    categories c ON c.id = a.category_id 
                WHERE 
                    a.is_deleted = 0 AND a.status_id = 2
                ORDER BY 
                    a.updated_at DESC
                LIMIT :limitAds OFFSET :offsetAds
            ");

            // Liaison des paramètres avec les bonnes valeurs et types
            $stmt->bindParam(':offsetAds', $offsetAds, PDO::PARAM_INT);
            $stmt->bindParam(':limitAds', $limitAds, PDO::PARAM_INT);

            // Exécution de la requête
            $stmt->execute();

            // Retour des résultats sous forme de tableau associatif
            return $stmt;
        } catch (PDOException $e) {
            // Gestion des erreurs PDO
            error_log("Erreur lors de l'exécution de la requête : " . $e->getMessage());
            return []; // Retourne un tableau vide en cas d'erreur
        }
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

    public function update($id, $title, $description, $space_available, $price_kilo, $departure_country, $arrival_country, $departure_city, $arrival_city, 
                            $departure_date, $arrival_date, $collection_date, $category_id, $fileName, $updated_by, $slug)
    {
        if($fileName) {
            $stmt = $this->_cn->prepare("UPDATE ads SET title = :title, description = :description, space_available = :space_available, price_kilo = :price_kilo, departure_country = :departure_country,
                                    arrival_country = :arrival_country, departure_city = :departure_city, arrival_city = :arrival_city, departure_date = :departure_date, 
                                    arrival_date = :arrival_date, collection_date = :collection_date, status_id = :status_id, category_id = :category_id, photo = :photo, slug = :slug, updated_at = NOW(), updated_by = :updated_by WHERE id = :id");

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
            $status_id = 1;
            $stmt->bindParam(':status_id', $status_id, PDO::PARAM_INT);
            $stmt->bindParam(':category_id', $category_id, PDO::PARAM_INT);
            $stmt->bindParam(':photo', $fileName, PDO::PARAM_STR);
            $stmt->bindParam(':slug', $slug, PDO::PARAM_STR);
            $stmt->bindParam(':updated_by', $updated_by, PDO::PARAM_INT);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $this->_cn->prepare("UPDATE ads SET title = :title, description = :description, space_available = :space_available, price_kilo = :price_kilo, departure_country = :departure_country,
                                    arrival_country = :arrival_country, departure_city = :departure_city, arrival_city = :arrival_city, departure_date = :departure_date, 
                                    arrival_date = :arrival_date, collection_date = :collection_date, status_id = :status_id, category_id = :category_id, slug = :slug, updated_at = NOW(), updated_by = :updated_by WHERE id = :id");

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
            $status_id = 1;
            $stmt->bindParam(':status_id', $status_id, PDO::PARAM_INT);
            $stmt->bindParam(':category_id', $category_id, PDO::PARAM_INT);
            $stmt->bindParam(':slug', $slug, PDO::PARAM_STR);
            $stmt->bindParam(':updated_by', $updated_by, PDO::PARAM_INT);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        }

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

    public function getUserAds($user_id)
    {
        $stmt = $this->_cn->prepare("SELECT a.id, a.title, a.description, a.space_available, a.price_kilo, a.departure_country,
                                    a.arrival_country, a.departure_city, a.arrival_city, a.departure_date, a.arrival_date, a.collection_date,
                                    a.user_id, CONCAT(u.firstname, ' ', u.lastname) AS author, u.phone, u.email, a.status_id, s.name AS status_name,
                                    a.category_id, c.name AS category_name, a.photo, a.slug, a.is_deleted, a.created_by, a.created_at, a.updated_by,
                                    a.updated_at, p.email AS p_email, p.newsletter AS p_newsletter, p.fullname AS p_fullname, p.phone AS p_phone
                                    FROM
                                        ads a
                                    INNER JOIN users u ON u.id = a.user_id 
                                    INNER JOIN status s ON s.id = a.status_id
                                    INNER JOIN categories c ON c.id = a.category_id
                                    LEFT JOIN preferences p ON p.user_id = u.id
                                    WHERE a.user_id = :user_id AND a.is_deleted = 0");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getAdminAds()
    {
        $stmt = $this->_cn->query("SELECT a.id, a.title, a.description, a.space_available, a.price_kilo, a.departure_country,
                                    a.arrival_country, a.departure_city, a.arrival_city, a.departure_date, a.arrival_date, a.collection_date,
                                    a.user_id, CONCAT(u.firstname, ' ', u.lastname) AS author, u.phone, u.email, a.status_id, s.name AS status_name,
                                    a.category_id, c.name AS category_name, a.photo, a.slug, a.is_deleted, a.created_by, a.created_at, a.updated_by,
                                    a.updated_at, p.email AS p_email, p.newsletter AS p_newsletter, p.fullname AS p_fullname, p.phone AS p_phone
                                    FROM ads a
                                    INNER JOIN users u ON u.id = a.user_id 
                                    INNER JOIN status s ON s.id = a.status_id
                                    INNER JOIN categories c ON c.id = a.category_id
                                    LEFT JOIN preferences p ON p.user_id = u.id
                                    WHERE a.is_deleted = 0");
        return $stmt;
    }

    public function closed ($id) {
        $stmt = $this->_cn->prepare("UPDATE ads SET status_id = 5, closed_date = NOW() WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function isMyAd ($user_id, $ad_id) {
        $stmt = $this->_cn->prepare("SELECT * FROM ads WHERE user_id = :user_id AND id = :ad_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':ad_id', $ad_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $stmt->rowCount();
        } else {
            return false;
        }
    }

    public function filteredAds($departure_date = null, $arrival_date = null, $departure_country = null, $arrival_country = null, $category_id = null, $status_id = null) {
        $sql = "SELECT 
                    a.id, a.title, a.description, a.space_available, a.price_kilo, a.departure_country,
                    a.arrival_country, a.departure_city, a.arrival_city, a.departure_date, a.arrival_date, a.collection_date,
                    a.user_id, CONCAT(u.firstname, ' ', u.lastname) AS author, u.phone, u.email, a.status_id, s.name AS status_name,
                    a.category_id, c.name AS category_name, a.photo, a.slug, a.is_deleted, a.created_by, a.created_at, a.updated_by,
                    a.updated_at, p.email AS p_email, p.newsletter AS p_newsletter, p.fullname AS p_fullname, p.phone AS p_phone
                FROM 
                    ads a
                INNER JOIN 
                    users u ON u.id = a.user_id 
                INNER JOIN 
                    status s ON s.id = a.status_id
                LEFT JOIN 
                    preferences p ON p.user_id = u.id
                INNER JOIN 
                    categories c ON c.id = a.category_id 
                WHERE 1=1";

        $params = [];

        if ($departure_date) {
            $sql .= " AND a.departure_date >= :departure_date";
            $params[':departure_date'] = $departure_date;
        }
        if ($arrival_date) {
            $sql .= " AND a.arrival_date <= :arrival_date";
            $params[':arrival_date'] = $arrival_date;
        }
        if ($departure_country) {
            $sql .= " AND a.departure_country = :departure_country";
            $params[':departure_country'] = $departure_country;
        }
        if ($arrival_country) {
            $sql .= " AND a.arrival_country = :arrival_country";
            $params[':arrival_country'] = $arrival_country;
        }
        if ($category_id) {
            $sql .= " AND a.category_id = :category_id";
            $params[':category_id'] = $category_id;
        }
        if ($status_id) {
            $sql .= " AND a.status_id = :status_id";
            $params[':status_id'] = $status_id;
        }

        $stmt = $this->_cn->prepare($sql);
        $stmt->execute($params);

        if ($stmt->execute()) {
            return $stmt;
        } else {
            return [];
        }
    }

    public function filteredMyAds($user_id, $departure_date = null, $arrival_date = null, $departure_country = null, $arrival_country = null, $category_id = null, $status_id = null) {
        $sql = "SELECT 
                    a.id, a.title, a.description, a.space_available, a.price_kilo, a.departure_country,
                    a.arrival_country, a.departure_city, a.arrival_city, a.departure_date, a.arrival_date, a.collection_date,
                    a.user_id, CONCAT(u.firstname, ' ', u.lastname) AS author, u.phone, u.email, a.status_id, s.name AS status_name,
                    a.category_id, c.name AS category_name, a.photo, a.slug, a.is_deleted, a.created_by, a.created_at, a.updated_by,
                    a.updated_at, p.email AS p_email, p.newsletter AS p_newsletter, p.fullname AS p_fullname, p.phone AS p_phone
                FROM 
                    ads a
                INNER JOIN 
                    users u ON u.id = a.user_id 
                INNER JOIN 
                    status s ON s.id = a.status_id
                LEFT JOIN 
                    preferences p ON p.user_id = u.id
                INNER JOIN 
                    categories c ON c.id = a.category_id 
                WHERE 1=1";

        $params = [];

        $sql .= " AND a.user_id = :user_id";
            $params[':user_id'] = $user_id;

        if ($departure_date) {
            $sql .= " AND a.departure_date >= :departure_date";
            $params[':departure_date'] = $departure_date;
        }
        if ($arrival_date) {
            $sql .= " AND a.arrival_date <= :arrival_date";
            $params[':arrival_date'] = $arrival_date;
        }
        if ($departure_country) {
            $sql .= " AND a.departure_country = :departure_country";
            $params[':departure_country'] = $departure_country;
        }
        if ($arrival_country) {
            $sql .= " AND a.arrival_country = :arrival_country";
            $params[':arrival_country'] = $arrival_country;
        }
        if ($category_id) {
            $sql .= " AND a.category_id = :category_id";
            $params[':category_id'] = $category_id;
        }
        if ($status_id) {
            $sql .= " AND a.status_id = :status_id";
            $params[':status_id'] = $status_id;
        }

        $stmt = $this->_cn->prepare($sql);
        $stmt->execute($params);

        if ($stmt->execute()) {
            return $stmt;
        } else {
            return [];
        }
    }
}