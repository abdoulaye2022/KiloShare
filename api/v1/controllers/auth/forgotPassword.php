<?php
require_once("controllers/Controller.php");

use \Mailjet\Resources;
use \Mailjet\Client;

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

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if(!isset($data['email']) || empty($data['email'])) {
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

if(!$helper->isValidEmail($data['email'])) {
	$error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_email')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$email = $helper->validateString($data['email']);

$authFetch = $authModel->doesEmailExist($email);
if(!$authFetch) {
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

if ($authFetch->rowCount() === 0) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('email_not_found')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
$user = $authFetch->fetch(PDO::FETCH_ASSOC);

$token = bin2hex(random_bytes(32));

$userToken = $authModel->RequestResetPassword($email, $token);
if(!$userToken) {
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

$subject = "Reset Your Password";
$to = [
    ['email' => $email, 'name' => $user['firstname'] . " " . $user['lastname']]
];

$body = '<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Your Password</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .email-header {
                        background-color: #0078D7;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                    }
                    .email-header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .email-body {
                        padding: 20px;
                        color: #333333;
                    }
                    .email-body p {
                        line-height: 1.6;
                        font-size: 16px;
                    }
                    .email-button {
                        display: block;
                        text-align: center;
                        margin: 20px 0;
                    }
                    .email-button a {
                        background-color: #0078D7;
                        color: #ffffff;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 4px;
                        font-size: 16px;
                    }
                    .email-button a:hover {
                        background-color: #0056a3;
                    }
                    .email-footer {
                        background-color: #f4f4f4;
                        padding: 10px;
                        text-align: center;
                        font-size: 12px;
                        color: #666666;
                    }
                    .email-footer a {
                        color: #0078D7;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-header">
                        <h1>Reset Your Password</h1>
                    </div>
                    <div class="email-body">
                        <p>Hello,</p>
                        <p>You have requested to reset your password for your Kilo-Share account. Please click the button below to set a new password.</p>
                        <div class="email-button">
                            <a href="'.BASE_URL.'/reset-password/'.$token.'" target="_blank">Reset My Password</a>
                        </div>
                        <p>If you did not request this, you can safely ignore this email. Your password will remain unchanged.</p>
                    </div>
                    <div class="email-footer">
                        <p>Kilo-Share © ' . date('Y') . ' Created by <a href="https://m2atech.com" target="_blank">M2ATech</a>. All rights reserved.</p>
                    </div>
                </div>
            </body>
        </html>';

if ($mailSender->send_mail($subject, $to, $body)) {
    $result = array(
        "success" => true,
        "status" => 200,
        "message" => "Request successful.",
        "data" => true,
    );
    
    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($result);
    exit();
} else {
    $error = [
        "success" => false,
        "status" => 500,
        "message" => $errorHandler::getMessage('email_error')
    ];
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}
?>