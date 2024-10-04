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
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function getAll()
    {
        $stmt = $this->_cn->prepare("SELECT * FROM users WHERE active = :active");
        $active = 1;
        $stmt->bindParam(':active', $active, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function create($firstname, $lastname, $phone, $email, $password)
{
    // Préparer la requête en incluant le champ 'active'
    $stmt = $this->_cn->prepare("INSERT INTO users (firstname, lastname, phone, email, password, active) VALUES (:firstname, :lastname, :phone, :email, :password, :active)");

    // Lier les paramètres
    $stmt->bindParam(':firstname', $firstname);
    $stmt->bindParam(':lastname', $lastname);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':email', $email);

    // Hacher le mot de passe
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $stmt->bindParam(':password', $hashedPassword);

    // Un user est actif dès sa création
    $active = 1;
    $stmt->bindParam(':active', $active, PDO::PARAM_INT);

    // Exécuter la requête
    if ($stmt->execute()) {
        return $this->_cn->lastInsertId();
    }
    return false;
}



    public function update($id, $newData)
    {
        $query = "UPDATE users SET ";
        $fields = [];
        foreach ($newData as $key => $value) {
            $fields[] = "$key = :$key";
        }
        $query .= implode(", ", $fields);
        $query .= " WHERE id = :id";

        $stmt = $this->_cn->prepare($query);

        foreach ($newData as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }
        $stmt->bindValue(":id", $id);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function delete($id)
    {
        $stmt = $this->_cn->prepare("DELETE FROM users WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}