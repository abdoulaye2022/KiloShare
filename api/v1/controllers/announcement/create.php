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

include("utils/check_token.php");

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if(!isset($data['description']) || !isset($data['space_available']) || !isset($data['price_kilo']) || !isset($data['price_per_kilo']) ||
    !isset($data['departure_city']) || !isset($data['arrival_city']) || !isset($data['departure_date']) || !isset($data['arrival_date']) ||
    !isset($data['collection_date']) || !isset($data['user_id']) || !isset($data['status_id']) ||
    empty($data['description']) || empty($data['space_available']) || empty($data['price_kilo']) || empty($data['departure_city']) || 
    empty($data['arrival_city']) || empty($data['departure_date']) || empty($data['arrival_date']) || empty($data['collection_date']) || 
    empty($data['user_id']) || empty($data['status_id'])) {
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

if(!$helper->validateDateFormat($data['departure_date']) || !$helper->validateDateFormat($data['arrival_date']) || !$helper->validateDateFormat($data['collection_date'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_date')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(isset($data['title']) && !empty($data['title']) && !$helper->isStringValidLength($data['title'], 50)) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('title_too_long')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(!$helper->isStringValidLength($data['description'], 255)) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('description_too_long')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(!$helper->isValidInteger($data['user_id'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_user_id')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(!$helper->isValidInteger($data['status_id'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_status_code')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(!$helper->isValidDouble(strval($data['price_kilo']))) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_price')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(!$helper->isValidDouble(strval($data['space_available']))) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_space_available')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$dateDeparture = new DateTime($data['departure_date']);
$dateArrival = new DateTime($data['arrival_date']);
$dateCollections = new DateTime($data['collection_date']);

if($dateDeparture > $dateArrival || $dateDeparture > $dateCollections) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('date_departure_error')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if($dateArrival > $dateCollections) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('date_collection_error')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$title = $helper->validateString($data['title']);
$description = $helper->validateString($data['description']);
$space_available = number_format($helper->validateString($data['space_available']), 2, '.', '');
$price_kilo = number_format($helper->validateString($data['price_kilo']), 2, '.', '');
$price_per_kilo = $helper->validateString($data['price_per_kilo']);
$departure_city = $helper->validateString($data['departure_city']);
$arrival_city = $helper->validateString($data['arrival_city']);
$departure_date = $helper->validateString($data['departure_date']);
$arrival_date = $helper->validateString($data['arrival_date']);
$collection_date = $helper->validateString($data['collection_date']);
$user_id = $helper->validateString($data['user_id']);
$status_id = $helper->validateString($data['status_id']);

$announcement_id = $announcementModel->create($title, $description, $space_available, $price_kilo, $price_per_kilo, $departure_city, 
                            $arrival_city, $departure_date, $arrival_date, $collection_date, $user_id, $status_id);
if($announcement_id == false) {
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

$announcementFetch = $announcementModel->getOne($announcement_id);
if($announcementFetch == false) {
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

$announcement = $announcementFetch->fetch(PDO::FETCH_ASSOC);

$result = array(
    "success" => true,
    "status" => 200,
    "message" => "Request successful.",
    "data" => $announcement,
);

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();