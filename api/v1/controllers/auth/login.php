<?php
require_once("controllers/Controller.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: POST');
    
    $error = [
        "success" => false,
        "status" => 405,
        "message" => "405 Method Not Allowed"
    ];
    
    echo json_encode($error);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (isset($data['email'], $data['password'])) {
    if (!empty($data['email']) && !empty($data['password'])) {
        if ($helper->isValidEmail($data['email'])) {
            $email = $helper->validateString($data['email']);
            $password = $helper->validateString($data['password']);

            $users = $authModel->login($email);

            if ($users && $users->rowCount() == 1) {
                $user = $users->fetch(PDO::FETCH_ASSOC);

                if (password_verify($password, $user['password'])) {
                    $userinfo = array(
                        "id" => $user['id']
                    );

                    $payload [] = $userinfo;

                    $jwt = JWT::encode($payload, $key, 'HS256');

                    $result = array(
                        "success" => true,
                        "status" => 200,
                        "message" => "Authentication successful",
                        "user" => $user,
                        "access_token" => $jwt
                    );

                    echo json_encode($result);
                    exit();
                } else {
                    $error = [
                        "success" => false,
                        "status" => 409,
                        "message" => "Invalid credentials. Please check your email address and password."
                    ];
                }
            } else {
                $error = [
                    "success" => false,
                    "status" => 409,
                    "message" => "Invalid credentials. Please check your email address and password."
                ];
            }
        } else {
            $error = [
                "success" => false,
                "status" => 409,
                "message" => "E-mail is invalid."
            ];
        }
    } else {
        $error = [
            "success" => false,
            "status" => 409,
            "message" => "All fields are required."
        ];
    }
} else {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => "Email and password are required."
    ];
}

echo json_encode($error);
?>
