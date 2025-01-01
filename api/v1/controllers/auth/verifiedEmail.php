<?php
require_once("controllers/Controller.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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

if (!isset($data['email']) || empty($data['email'])) {
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

$users = $authModel->login($email);
if ($users && $users->rowCount() == 0) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_credentials') 
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$user = $users->fetch(PDO::FETCH_ASSOC);

if($user['status'] == 0) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('suspended_account')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$userinfo = array(
    "id" => $user['id'],
    "profile_id" => $user['profile_id']
);

$payload [] = $userinfo;

$jwt_email = JWT::encode($payload, $key, 'HS256');

$to = [
    ['email' => $user['email'], 'name' => $user['firstname'] . " " . $user['lastname']]
];

if($user['user_language'] == "en") {
    $subject = "Welcome to Kiloshare! Confirm your email to get started.";
    $body = '<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirm Your Email Address</title>
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
                        <h1>Confirm Your Email Address</h1>
                    </div>
                    <div class="email-body">
                        <p>Hello,</p>
                        <p>Thank you for signing up on our Kilo-Share platform. Before getting started, please confirm your email address by clicking the button below.</p>
                        <div class="email-button">
                            <a href="'.BASE_URL.'/confirm-email/'.$jwt_email.'" target="_blank">Confirm My Email</a>
                        </div>
                        <p>If you did not create an account, you can ignore this email.</p>
                    </div>
                    <div class="email-footer">
                        <p>Kilo-Share © ' . date('Y') . ' Created by <a href="https://m2atech.com" target="_blank">M2ATech</a>. All rights reserved.</p>
                    </div>
                </div>
                </div>
            </body>
        </html>';
} else {
    $subject = "Bienvenue sur Kiloshare ! Confirmez votre adresse e-mail pour commencer.";
    $body = '<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmez votre adresse e-mail</title>
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
                        <h1>Confirmez votre adresse e-mail</h1>
                    </div>
                    <div class="email-body">
                        <p>Bonjour,</p>
                        <p>Merci de vous être inscrit sur notre plateforme Kilo-Share. Avant de commencer, veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous.</p>
                        <div class="email-button">
                            <a href="'.BASE_URL.'/confirm-email/'.$jwt_email.'" target="_blank">Confirmer mon e-mail</a>
                        </div>
                        <p>Si vous n\'avez pas créé de compte, vous pouvez ignorer cet e-mail.</p>
                    </div>
                    <div class="email-footer">
                        <p>Kilo-Share © ' . date('Y') . ' Créé par <a href="https://m2atech.com" target="_blank">M2ATech</a>. Tous droits réservés.</p>
                    </div>
                </div>
                </div>
            </body>
        </html>';
}

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