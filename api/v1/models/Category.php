<?php

class Category
{
    private $_cn;

    public function __construct($db)
    {
        $this->_cn = $db;
    }

    // Créer une nouvelle catégorie
    public function create($name, $description, $created_by)
    {
        $stmt = $this->_cn->prepare("INSERT INTO `categories` (`name`, `description`, `created_by`) 
                                    VALUES (:name, :description, :created_by)");

        // Lier les paramètres
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, PDO::PARAM_STR);
        $stmt->bindParam(':created_by', $created_by, PDO::PARAM_INT);
        
        // Exécuter la requête
        if ($stmt->execute()) {
            return $this->_cn->lastInsertId(); // Retourne l'ID de la catégorie insérée
        }
        return false; // Si l'exécution échoue
    }

    // Récupérer toutes les catégories
    public function getAll()
    {
        $stmt = $this->_cn->prepare("SELECT * FROM `categories`");
        $stmt->execute();
        return $stmt;
    }

    // Mettre à jour une catégorie
    public function update($id, $name, $description, $updated_by)
    {
        $stmt = $this->_cn->prepare("UPDATE `categories` 
                                    SET `name` = :name, `description` = :description, `updated_by` = :updated_by, 
                                    `updated_date` = CURRENT_TIMESTAMP WHERE `id` = :id");

        // Lier les paramètres
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, PDO::PARAM_STR);
        $stmt->bindParam(':updated_by', $updated_by, PDO::PARAM_INT);
        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                return true; // La mise à jour a réussi
            } else {
                return null; // ID non trouvé, aucune ligne n'a été mise à jour
            }
        }
        return false;
    }

    public function delete($id)
    {
        $stmt = $this->_cn->prepare("DELETE FROM `categories` WHERE `id` = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();

        // Vérifie si une ligne a été supprimée
        if ($stmt->rowCount() > 0) {
            return true; // Suppression réussie
        }
    
        return false;
    }

    public function getOne($category_id) {
        $query = "SELECT * FROM categories WHERE id = :id LIMIT 1";
        $stmt = $this->_cn->prepare($query);
        $stmt->bindParam(':id', $category_id);
        $stmt->execute();
        return $stmt;  
    }

}
?>
