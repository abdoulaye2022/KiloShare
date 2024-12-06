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

$isConfirm = $userModel->isAlreadyConfirmEmail($auth_id);
if($isConfirm->rowCount() == 1) {
	$result = array(
        "success" => true,
        "status" => 200,
        "message" => "Email already confirmed successfully.",
        "data" => false
    );
    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($result);
    exit();
} else {
    $users = $userModel->confirmEmail($auth_id);
    if($users) {
        $result = array(
            "success" => true,
            "status" => 200,
            "message" => "Email confirmed successfully.",
            "data" => true
        );
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($result);
        exit();
    }
}
?>