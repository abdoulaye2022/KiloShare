<?php
class Auth {
    private $_cn;

    public function __construct($cn) {
        $this->_cn = $cn;
    }

    // Exemple de m�thode pour obtenir tous les utilisateurs
    public function login($email) {
        $stmt = $this->_cn->prepare("SELECT u.id, u.firstname, u.lastname, u.phone, u.email, u.status, u.password, u.profile_id, p.name as profile_name,
                                    u.isVerified 
                                    FROM users u
                                    INNER JOIN profiles p ON p.id = u.profile_id WHERE u.email = :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt;
    }

    // Exemple de m�thode pour obtenir tous les utilisateurs
    public function signin($firstname, $lastname, $email, $password) {
        $stmt = $this->_cn->prepare("INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`, `profile_id`, `status`) VALUES (:firstname, :lastname, :email, :password, :profile_id, :status)");

        $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $profile_id = 2;
        $stmt->bindParam(':profile_id', $profile_id, PDO::PARAM_INT);
        $status = 1;
        $stmt->bindParam(':status', $status, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $this->_cn->lastInsertId();
        }
        return false;
    }
    
    public function doesEmailExist($email) {
        try {
            $stmt = $this->_cn->prepare("SELECT id, firstname, lastname FROM users WHERE email = :email LIMIT 1");
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->execute();
    
            return $stmt;
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return false;
        }
    }    

    public function changePassword ($id, $newPassword) {
        $stmt = $this->_cn->prepare("UPDATE users SET password = :password WHERE id = :id ");

        $stmt->bindParam(':password', $newPassword, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function changePasswordByEmail ($email, $newPassword) {
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        $stmt = $this->_cn->prepare("UPDATE users SET password = :password, updated_at = NOW() WHERE email = :email");

        $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function RequestResetPassword ($email, $token) {
        $stmt = $this->_cn->prepare("INSERT INTO password_resets (email, token, expiry) VALUES (:email, :token, NOW() + INTERVAL 1 HOUR)");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':token', $token, PDO::PARAM_STR);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function resetPassword($token) {
        $stmt = $this->_cn->prepare("SELECT email FROM password_resets WHERE token = :token AND expiry > NOW()");
        $stmt->bindParam(':token', $token, PDO::PARAM_STR);
    
        if ($stmt->execute()) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        return false;
    }
    

}