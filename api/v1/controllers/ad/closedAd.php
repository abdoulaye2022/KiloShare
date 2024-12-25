<?php
require_once("controllers/Controller.php");

if ($_SERVER['REQUEST_METHOD'] != 'PUT') {
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: PUT');
    
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

if(!isset($params['id']) || empty($params['id'])) {
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

$id = $helper->validateInteger($params['id']);

$closed = $adModel->closed($id);
if($closed == false) {
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

$adFetch = $adModel->getOne($id);
if($adFetch == false) {
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

$ad = $adFetch->fetch(PDO::FETCH_ASSOC);

$result = array(
    "success" => true,
    "status" => 200,
    "message" => "Request successful.",
    "data" => $ad,
);

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();

?>