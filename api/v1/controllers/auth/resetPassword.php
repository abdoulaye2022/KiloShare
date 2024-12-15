<?php
require_once("controllers/Controller.php");

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

if(!isset($data['token'], $data['password']) || empty($data['token']) || empty($data['password'])) {
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

$token = $helper->validateString($data['token']);

$userInfo = $authModel->resetPassword($token);
if(!$userInfo) {
	$error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('token_invalid_or_expired')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$password = $helper->validateString($data['password']);

$user = $authModel->changePasswordByEmail($userInfo['email'], $password);
$result = array(
    "success" => true,
    "status" => 200,
    "message" => "Password updated successfully.",
    "data" => true,
);

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();
?>