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


if(!isset($params['id']) || !isset($params['slug']) || empty($params['id']) || empty($params['slug'])) {
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
        "message" => $errorHandler::getMessage('invalid_ad_number')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$id = $helper->validateInteger($params['id']);
$slug = $helper->validateString($params['slug']);

// include("utils/check_token.php");

$ads = $adModel->getOneAd($id, $slug);
if($ads == false) {
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

if($ads->rowCount() === 1) {
    $ad = $ads->fetch(PDO::FETCH_ASSOC);

    if(!$ad['p_fullname']) {
        $ad['author'] = "*************";
    }
    if(!$ad['p_email']) {
        $ad['email'] = "*************";
    }
    if(!$ad['p_phone']) {
        $ad['phone'] = "*************";
    }

    $result = array(
        "success" => true,
        "status" => 200,
        "message" => "Request successful.",
        "data" => $ad,
    );
} else {
    $result = array(
        "success" => true,
        "status" => 200,
        "message" => "Request successful.",
        "data" => [],
    );
}

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();
?>