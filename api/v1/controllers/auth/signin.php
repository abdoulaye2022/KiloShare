<?php
require_once("controllers/Controller.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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

if(!isset($data['firstname']) || !isset($data['lastname']) || !isset($data['email']) || !isset($data['password'])) {
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

if(empty($data['firstname']) || empty($data['lastname']) || empty($data['email']) || empty($data['password'])) {
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

$emailCheck = $authModel->emailExist($data['email']);
if($emailCheck->rowCount() > 0) {
	$error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('email_exist')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$firstname = $helper->validateString($data['firstname']);
$lastname = $helper->validateString($data['lastname']);
$email = $helper->validateString($data['email']);
$password = password_hash($helper->validateString($data['password']), PASSWORD_DEFAULT);

$payload_email = $payload;
$payload_email['exp'] = time() + (60 * 60 * 24);

$user_id = $authModel->signin($firstname, $lastname, $email, $password);
if($user_id == false) {
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

$userFetch = $userModel->getOne($user_id);
if($userFetch == false) {
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

$user = $userFetch->fetch(PDO::FETCH_ASSOC);

$userinfo = array(
	"id" => $user['id']
);

$payload [] = $userinfo;
$payload_email [] = [
    "action" => "email_confirmation"
];
$payload_email [] = $userinfo;

$jwt = JWT::encode($payload, $key, 'HS256');
$jwt_email = JWT::encode($payload, $key, 'HS256');

unset($user['password']);

$mail = new PHPMailer(true);

try {
    // Configuration du serveur SMTP
    $mail->isSMTP();
    $mail->Host = $_ENV['MAIL_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username =  $_ENV['MAIL_USERNAME'];
    $mail->Password = $_ENV['MAIL_PASSWORD']; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $_ENV['MAIL_PORT'];

    $mail->setFrom('contact@m2acode.com', 'Kilo-Share');

    // Ajouter le destinataire
    $mail->addAddress($email, $firstname . ' ' . $lastname);

    // Contenu du message
    $mail->isHTML(true); // Utiliser le format HTML
    $mail->Subject = 'Welcome to Kiloshare! Confirm your email to get started';
    $mail->Body    = '<!DOCTYPE html>
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
                                        <a href="http://localhost:3000/confirm-email/'.$jwt_email.'" target="_blank">Confirm My Email</a>
                                    </div>
                                    <p>If you did not create an account, you can ignore this email.</p>
                                </div>
                                <div class="email-footer">
                                    <p>© 2024 Kilo-Share. Created by <a href="https://m2atech.com" target="_blank">M2ATech</a>. All rights reserved.</p>
                                </div>
                            </div>
                            </div>
                        </body>
                    </html>';
    // $mail->AltBody = 'Ceci est la version texte si le client mail ne supporte pas le HTML.';

    // Envoyer le courriel
    $mail->send();
} catch (Exception $e) {
    // echo "Erreur lors de l'envoi du courriel : {$mail->ErrorInfo}"; die;
}

$result = array(
    "success" => true,
    "status" => 200,
    "message" => "Request successful.",
    "data" => $user,
    "access_token" => $jwt
);

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result);
exit();
?>
