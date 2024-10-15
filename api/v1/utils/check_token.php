<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
    // Vérifie aussi via apache_request_headers si disponible
    if (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (!isset($headers['Authorization'])) {
            $error = [
                "success" => false,
                "status" => 401,
                "message" => $errorHandler::getMessage('authorization_header_missing')
            ];
            http_response_code(401);
            header('Content-Type: application/json');
            echo json_encode($error);
            exit;
        }
    } else {
        $error = [
            "success" => false,
            "status" => 401,
            "message" => $errorHandler::getMessage('authorization_header_missing')
        ];
        http_response_code(401);
        header('Content-Type: application/json');
        echo json_encode($error);
        exit;
    }
}

// Extraire le JWT de l'en-t�te Authorization
$authHeader = apache_request_headers()['Authorization'];
list(, $jwt) = explode(' ', $authHeader);

try {
    // V�rifier la signature du JWT
    $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
    
    // V�rifier la validit� du JWT
    if ($decoded->exp < time()) {
        $error = [
            "success" => false,
            "status" => 401,
            "message" => $errorHandler::getMessage('token_expired')
        ];
        http_response_code(401);
        header('Content-Type: application/json');
        echo json_encode($error);
        exit();
    }

  $decoded = (array)$decoded;

  $id = intval($decoded[0]->id);

} catch (Exception $e) {
    $error = [
        "success" => false,
        "status" => 401,
        "message" => $errorHandler::getMessage('token_invalid')
    ];
    http_response_code(401);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}
?>