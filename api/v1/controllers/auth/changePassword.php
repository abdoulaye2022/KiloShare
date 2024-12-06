<?php
require_once("controllers/Controller.php");

if ($_SERVER['REQUEST_METHOD'] != 'PUT') {
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

include("utils/check_token.php");

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if(!isset($data['oldPassword']) || !isset($data['newPassword']) || empty($data['oldPassword']) || empty($data['newPassword'])) {
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

$oldPassword = $helper->validateString($data['oldPassword']);
$newPassword = password_hash($helper->validateString($data['newPassword']), PASSWORD_DEFAULT);

$userFetch = $userModel->getOne($auth_id);
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

if (!password_verify($oldPassword, $user['password'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_password')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$check = $authModel->changePassword($auth_id, $newPassword);
if(!$check) {
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

$result = array(
    "success" => true,
    "status" => 200,
    "message" => "Request successful.",
    "data" => $user,
);

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();
?>