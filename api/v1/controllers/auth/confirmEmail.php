<?php
require_once("controllers/Controller.php");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
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

$user = $userModel->isAlreadyConfirmEmail($auth_id);
if ($user->rowCount() == 1) {
    $result = [
        "success" => true,
        "status" => 200,
        "message" => "Email already confirmed successfully.",
        "data" => false
    ];
    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($result);
    exit();
}

$users = $userModel->confirmEmail($auth_id);
if ($users) {
    $user2 = $userModel->isAlreadyConfirmEmail($auth_id);
    $u = $user2->fetch(PDO::FETCH_ASSOC);
    if($u && is_array($u)) {
        unset($u['password']);
    }

    $result = [
        "success" => true,
        "status" => 200,
        "message" => "Email confirmed successfully. 2",
        "data" => $u
    ];
    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($result);
    exit();
} else {
    $error = [
        "success" => false,
        "status" => 500,
        "message" => "An error occurred while confirming the email."
    ];
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}
?>
