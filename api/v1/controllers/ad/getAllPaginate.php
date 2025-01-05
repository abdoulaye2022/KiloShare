<?php
require_once("controllers/Controller.php");

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: GET');
    
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

if (!isset($params['page'], $params['limit']) || empty($params['limit'])) {
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

if (!$helper->isValidInteger($params['page']) || !$helper->isValidInteger($params['limit'])) {
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

$page = $helper->validateInteger($params['page']);
$limit = $helper->validateInteger($params['limit']);

$offset = ($page - 1) * $limit;

$ads = $adModel->getAllPaginate($offset, $limit);

$tabs = [];
foreach ($ads->fetchAll(PDO::FETCH_ASSOC) as $value) {
    if (!$value['p_fullname']) {
        $value['author'] = "*************";
    }
    if (!$value['p_email']) {
        $value['email'] = "*************";
    }
    if (!$value['p_phone']) {
        $value['phone'] = "*************";
    }
    $tabs[] = $value;
}

$result = [
    "success" => true,
    "status" => 200,
    "message" => "Request successful.",
    "data" => $tabs,
];

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result, JSON_PRETTY_PRINT);
exit();
?>