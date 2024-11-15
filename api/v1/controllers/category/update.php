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

if(!isset($params['id']) || !isset($data['name']) || !isset($data['description']) ||
empty($params['id']) || empty($data['name']) || empty($data['description'])) {
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

if(!$helper->isValidInteger($params['id'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_category_id')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$name = $helper->validateString($data['name']);
$description = $helper->validateString($data['description']);
$updated_by = $helper->validateInteger($params['id']); // assuming the user updating is identified by 'id'

$updateResult = $categoryModel->update($params['id'], $name, $description, $auth_id);
if ($updateResult === null) {
    $error = [
        "success" => false,
        "status" => 404, // Utilise 404 pour une ressource non trouvée
        "message" => $errorHandler::getMessage('invalid_category_id') // Message spécifique
    ];
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
} elseif ($updateResult === false) {
    $error = [
        "success" => false,
        "status" => 500,
        "message" => $errorHandler::getMessage('server_internal_error')
    ];
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$categoryFetch = $categoryModel->getOne($params['id']);
if($categoryFetch == false) {
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
    "message" => "Category updated successfully.",
    "data" => $category,
);

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();
?>
