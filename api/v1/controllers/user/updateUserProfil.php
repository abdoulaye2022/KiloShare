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

if(!isset($data['firstname']) || !isset($data['lastname']) || empty($data['firstname']) || empty($data['lastname'])) {
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

if(isset($data['phone']) && !empty($data['email']) && !$helper->validatePhoneNumber($data['phone'])) {
	$error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_phone')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$firstname = $helper->validateString($data['firstname']);
$lastname = $helper->validateString($data['lastname']);
$phone = $helper->validateString($data['phone']);

$user_id = $userModel->updateUserProfil($auth_id, $firstname, $lastname, $phone);
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