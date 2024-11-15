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

include("utils/check_token.php");
$categories=$categoryModel->getAll();
$result = array(
    "success" => true,
    "status" => 200,
    "message" => "Request successful.",
    "data" => $categories->fetchAll(PDO::FETCH_ASSOC),
);


http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();
?>
