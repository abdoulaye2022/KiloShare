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


$input = file_get_contents('php://input');
$data = json_decode($input, true);

$secretKey = $_ENV['RECAPTCHA'];

$captcha = $data['recaptcha'];

if (!$captcha) {
  echo "Veuillez valider le reCAPTCHA.";
  exit;
}

// Envoyer une requête à l'API Google reCAPTCHA
$url = "https://www.google.com/recaptcha/api/siteverify";
$dataRecaptcah = [
  'secret' => $secretKey,
  'response' => $captcha,
  'remoteip' => $_SERVER['REMOTE_ADDR'], // Adresse IP de l'utilisateur
];

$options = [
  'http' => [
    'header' => "Content-type: application/x-www-form-urlencoded\r\n",
    'method' => 'POST',
    'content' => http_build_query($dataRecaptcah),
  ],
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);
$result = json_decode($response, true);

// Vérifier la réponse
if ($result['success']) {
    if(!isset($data['name'], $data['email'], $data['subject'], $data['message']) || empty($data['name']) || empty($data['subject']) || empty($data['email']) || empty($data['message'])) {
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


    if(!empty($data['email']) && !$helper->isValidEmail($data['email'])) {
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


    $name = $helper->validateString($data['name']);
    $subject = $helper->validateString($data['subject']);
    $email = $helper->validateString($data['email']);
    $message = $helper->validateString($data['message']);

    $to = [
        ['email' => 'contact@kilo-share.com', 'name' => 'Kilo-Share Team']
    ];

    $replyTo = [
        'email' => $email, 'name' => $name
    ];

    $body = '<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Nouveau message de contact</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    <div style="background-color: #0078D7; color: #ffffff; padding: 20px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">Nouveau message de contact</h1>
                    </div>
                    <div style="padding: 20px; color: #333333;">
                        <p style="line-height: 1.6; font-size: 16px;">Bonjour Équipe Kilo-Share,</p>
                        <p style="line-height: 1.6; font-size: 16px;">Vous avez reçu un nouveau message de contact via le formulaire de la plateforme :</p>
                        <p style="line-height: 1.6; font-size: 16px;"><strong>Nom :</strong> '.$name.'</p>
                        <p style="line-height: 1.6; font-size: 16px;"><strong>E-mail :</strong> '.$email.'</p>
                        <p style="line-height: 1.6; font-size: 16px;"><strong>Sujet :</strong> '.$subject.'</p>
                        <p style="line-height: 1.6; font-size: 16px;"><strong>Message :</strong></p>
                        <p style="line-height: 1.6; font-size: 16px;">
                            '.$message.'
                        </p>
                        <p style="line-height: 1.6; font-size: 16px;">Merci de répondre à cet utilisateur dans les plus brefs délais.</p>
                    </div>
                    <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #666666;">
                        <p>Kilo-Share © 2024 Créé par <a href="https://m2atech.com" target="_blank" style="color: #0078D7; text-decoration: none;">M2ATech</a>. Tous droits réservés.</p>
                    </div>
                </div>
            </body>
            </html>
            ';

    if ($mailSender->send_mail_contact($subject, $to, $body, $replyTo)) {

        $result = array(
            "success" => true,
            "status" => 200,
            "message" => "Request successful.",
            "data" => true
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