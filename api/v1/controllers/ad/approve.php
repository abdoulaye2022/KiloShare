<?php
require_once("controllers/Controller.php");

if ($_SERVER['REQUEST_METHOD'] != 'PUT') {
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: PUT');
    
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

if(!isset($params['id']) || empty($params['id'])) {
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

$id = $helper->validateInteger($params['id']);

$updated = $adModel->approve($id);
if($updated == false) {
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

$adFetch = $adModel->getOne($id);
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

$to = [
    ['email' => $ad['email'], 'name' => $ad['author']]
];

$userFetch = $userModel->getOne($ad['user_id']);
$u = $userFetch->fetch(PDO::FETCH_ASSOC);

if($u['user_language'] == "en") {
    $subject = "Your Ad Has Been Approved on Kiloshare";
    $body = '<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ad Approval Notification</title>
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
                        background-color: #4CAF50;
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
                        <h1>Your Ad Has Been Approved!</h1>
                    </div>
                    <div class="email-body">
                        <p>Hello,</p>
                        <p>We are pleased to inform you that your ad on Kiloshare has been approved and is now live on the platform.</p>
                        <p>Thank you for using Kiloshare, and we look forward to your continued participation.</p>
                        <p>Best regards,</p>
                        <p>The Kiloshare Team</p>
                    </div>
                    <div class="email-footer">
                        <p>Kilo-Share © ' . date('Y') . ' Created by <a href="https://m2atech.com" target="_blank">M2ATech</a>. All rights reserved.</p>
                    </div>
                </div>
            </body>
        </html>';
} else {
    $subject = "Votre annonce a été approuvée sur Kiloshare";
    $body = '<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Notification d\'approbation d\'annonce</title>
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
                        background-color: #4CAF50;
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
                        <h1>Votre annonce a été approuvée !</h1>
                    </div>
                    <div class="email-body">
                        <p>Bonjour,</p>
                        <p>Nous sommes heureux de vous informer que votre annonce sur Kiloshare a été approuvée et est désormais en ligne sur la plateforme.</p>
                        <p>Merci d\'utiliser Kiloshare, et nous espérons continuer à vous compter parmi nos utilisateurs.</p>
                        <p>Cordialement,</p>
                        <p>L\'équipe Kiloshare</p>
                    </div>
                    <div class="email-footer">
                        <p>Kilo-Share © ' . date('Y') . ' Créé par <a href="https://m2atech.com" target="_blank">M2ATech</a>. Tous droits réservés.</p>
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
        "data" => $ad,
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