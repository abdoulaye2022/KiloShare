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
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// verification de la reception des donnees
if (!isset($data['email']) || !isset($data['password'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('required_fields')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

// Verification si les donnees ne sont pas vide
if (empty($data['email']) || empty($data['password'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('required_fields')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(!$helper->isValidEmail($data['email'])) {
	$error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_email')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$email = $helper->validateString($data['email']);
$password = $helper->validateString($data['password']);

$users = $authModel->login($email);

if ($users && $users->rowCount() == 0) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_credentials') 
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$user = $users->fetch(PDO::FETCH_ASSOC);

if($user['status'] == 0) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('suspended_account')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if (!password_verify($password, $user['password'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_credentials')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$userinfo = array(
    "id" => $user['id'],
    "profile_id" => $user['profile_id']
);

$payload [] = $userinfo;

$jwt = JWT::encode($payload, $key, 'HS256');

unset($user['password']);

$result = array(
    "success" => true,
    "status" => 200,
    "message" => "Request successful.",
    "data" => $user,
    "access_token" => $jwt
);

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();
?>
