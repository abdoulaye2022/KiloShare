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

if(!isset($data['ad_id'], $params['page'], $params['limit']) || empty($data['ad_id']) || empty($params['limit'])) {
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

$ad_id = $helper->validateInteger($data['ad_id']);

$isMyAd = $adModel->isMyAd($auth_id, $ad_id);
if($isMyAd) {
    $message = $mailMessage->getUsersAdMessagePaginate($ad_id, $offset, $limit);
} else {
    $message = $mailMessage->getUserAdMessagePaginate($auth_id, $ad_id, $offset, $limit);
}
if($message == false) {
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

$result = array(
    "success" => true,
    "status" => 200,
    "message" => "Request successful.",
    "data" => $message->fetchAll(PDO::FETCH_ASSOC),
);

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();
?>