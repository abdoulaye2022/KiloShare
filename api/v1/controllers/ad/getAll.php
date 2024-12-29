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

// include("utils/check_token.php");

$ads = $adModel->getAll();

$tabs = [];

foreach($ads->fetchAll(PDO::FETCH_ASSOC) as $value) {
    if(!$value['p_fullname']) {
        $value['author'] = "*************";
    }
    if(!$value['p_email']) {
        $value['email'] = "*************";
    }
    if(!$value['p_phone']) {
        $value['phone'] = "*************";
    }
    $tabs[] = $value;
}

$result = array(
    "success" => true,
    "status" => 200,
    "message" => "Request successful.",
    "data" => $tabs,
);

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();

?>