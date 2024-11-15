<?php

require_once("controllers/Controller.php");
require_once("models/Category.php");

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

// Vérifications des champs requis
if (!isset($data['name']) || empty($data['name'])) {
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

if (isset($data['description']) && !empty($data['description']) && !$helper->isStringValidLength($data['description'], 255)) {
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

$name = $helper->validateString($data['name']);
$description = isset($data['description']) ? $helper->validateString($data['description']) : '';

// Création de la catégorie

$category_id = $categoryModel->create($name, $description, $auth_id);

if ($category_id == false) {
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

$categoryFetch = $categoryModel->getOne($category_id);
if ($categoryFetch === false) {
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

$category = $categoryFetch->fetch(PDO::FETCH_ASSOC);

$result = array(
    "success" => true,
    "status" => 200,
    "message" => "Request successful.",
    "data" => $category,
);

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();
?>
