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

if(!isset($data['ad_id'], $data['to_user_id'], $data['message']) || empty($data['ad_id']) || empty($data['to_user_id']) || empty($data['message'])) {
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

if(!$helper->isValidInteger($data['to_user_id'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_to_user_id')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(!$helper->isValidInteger($data['ad_id'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_ad_id')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$ad_id = $helper->validateInteger($data['ad_id']);
$to_user_id = $helper->validateInteger($data['to_user_id']);
$message = $helper->validateString($data['message']);

$userFetch = $userModel->getOne($to_user_id);
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

$adFetch = $adModel->getOne($ad_id);
if($adFetch == false) {
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
$ad = $adFetch->fetch(PDO::FETCH_ASSOC);

$userFetch = $userModel->getOne($to_user_id);
$u = $userFetch->fetch(PDO::FETCH_ASSOC);

$to = [
    ['email' => $u['email'], 'name' => $u['firstname'] . " " . $u['lastname']]
];

if($u['user_language'] == "en") {
    $subject = "You Have a New Message Regarding Your Kilo-Share Ad";
    $body = '<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Inquiry About Your Ad</title>
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
                            <h1>New Inquiry About Your Ad</h1>
                        </div>
                        <div class="email-body">
                            <p>Hi '.$u['firstname'] . ' ' . $u['lastname'].',</p>
                            <p>A user on the <strong>Kilo-Share</strong> platform is interested in your ad:</p>
                            <p><strong>Ad Title:</strong> '.$ad['title'].'</p>
                            <p>Here’s the message they sent you:</p>
                            <p>
                                '.$message.'
                            </p>
                            <p>To reply or learn more, click the button below to access your inbox on our platform:</p>
                            <div class="email-button" style="text-align: center; margin: 20px 0;">
                                <a href="'.BASE_URL.'/ads/'.$ad['id'].'/'.$ad['slug'].'" style="background-color: #0078D7; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 16px;" target="_blank">View Ad</a>
                            </div>
                            <p>Thank you for using Kilo-Share for your shipment needs.</p>
                        </div>
                        <div class="email-footer">
                            <p>Kilo-Share © 2024 Created by <a href="https://m2atech.com" target="_blank">M2ATech</a>. All rights reserved.</p>
                        </div>
                    </div>
                </body>
            </html>
            ';
} else {
    $subject = "Vous avez un nouveau message concernant votre annonce sur Kilo-Share";
    $body = '<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Nouvelle demande concernant votre annonce</title>
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
                            <h1>Nouvelle demande concernant votre annonce</h1>
                        </div>
                        <div class="email-body">
                            <p>Bonjour '.$u['firstname'] . ' ' . $u['lastname'].',</p>
                            <p>Un utilisateur de la plateforme <strong>Kilo-Share</strong> est intéressé par votre annonce :</p>
                            <p><strong>Titre de l\'annonce :</strong> '.$ad['title'].'</p>
                            <p>Voici le message qu\'il vous a envoyé :</p>
                            <p>
                                '.$message.'
                            </p>
                            <p>Pour répondre ou en savoir plus, cliquez sur le bouton ci-dessous pour accéder à votre boîte de réception sur notre plateforme :</p>
                            <div class="email-button" style="text-align: center; margin: 20px 0;">
                                <a href="'.BASE_URL.'/ads/'.$ad['id'].'/'.$ad['slug'].'" style="background-color: #0078D7; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 16px;" target="_blank">Voir l\'annonce</a>
                            </div>
                            <p>Merci d\'utiliser Kilo-Share pour vos besoins d\'expédition.</p>
                        </div>
                        <div class="email-footer">
                            <p>Kilo-Share © 2024 Créé par <a href="https://m2atech.com" target="_blank">M2ATech</a>. Tous droits réservés.</p>
                        </div>
                    </div>
                </body>
            </html>
            ';

}

if ($mailSender->send_mail($subject, $to, $body)) {

    $message = $mailMessage->response($auth_id, $ad_id, $message, $to_user_id, $auth_id);

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
?>