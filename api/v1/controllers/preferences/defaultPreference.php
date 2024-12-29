<?php
require_once("controllers/Controller.php");

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
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

$checkPreference = $preferenceModel->isPreferenceExist($auth_id);

$preference_id = $auth_id;
if($checkPreference === 0) {
    $preference_id = $preferenceModel->defaultPreference($auth_id, $auth_id);
    if($preference_id == false) {
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
}

$preferenceFetch = $preferenceModel->getOne($preference_id);
if($preferenceFetch === false) {
    $preference_id = $preferenceModel->defaultPreference($auth_id, $auth_id);
    if($preference_id == false) {
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
}

$result = array(
    "success" => true,
    "status" => 200,
    "message" => "Request successful.",
    "data" => $preferenceFetch->fetch(PDO::FETCH_ASSOC)
);

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();
?>