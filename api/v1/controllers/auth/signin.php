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

if(!isset($data['firstname']) || !isset($data['lastname']) || !isset($data['email']) || !isset($data['password'])) {
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

if(empty($data['firstname']) || empty($data['lastname']) || empty($data['email']) || empty($data['password'])) {
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

$emailCheck = $authModel->emailExist($data['email']);
if($emailCheck->rowCount() > 0) {
	$error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('email_exist')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$firstname = $helper->validateString($data['firstname']);
$lastname = $helper->validateString($data['lastname']);
$email = $helper->validateString($data['email']);
$password = password_hash($helper->validateString($data['password']), PASSWORD_DEFAULT);

$user_id = $authModel->signin($firstname, $lastname, $email, $password);
if($user_id == false) {
	$error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('server_internal_error')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$userFetch = $userModel->getOne($user_id);
if($userFetch == false) {
	$error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('server_internal_error')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$user = $userFetch->fetch(PDO::FETCH_ASSOC);

$userinfo = array(
	"id" => $user['id']
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
