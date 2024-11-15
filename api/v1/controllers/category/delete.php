<?php

require_once("controllers/Controller.php");

if ($_SERVER['REQUEST_METHOD'] != 'DELETE') {
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: DELETE');
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

$id = isset($params['id']) ? $params['id'] : null;

if (is_null($id) || empty($id)) {
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

if (!$helper->isValidInteger($id)) {
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

// Suppression de la catégorie
$deleted = $categoryModel->delete($id);
if (!$deleted) {
    $error = [
        "success" => false,
        "status" => 404,
        "message" => $errorHandler::getMessage('invalid_category_id')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$result = array(
    "success" => true,
    "status" => 200,
    "message" => "Request successful."
);

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();

?>