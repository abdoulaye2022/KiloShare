<?php
require_once("controllers/Controller.php");

// Vérification de la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
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

// Vérification des paramètres requis
if (!isset($params['page'], $params['limit']) || empty($params['limit'])) {
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

// Validation des paramètres
if (!$helper->isValidInteger($params['page']) || !$helper->isValidInteger($params['limit'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_user_id')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

// Récupération et validation des paramètres
$page = $helper->validateInteger($params['page']);
$limit = $helper->validateInteger($params['limit']);

// Calcul de l'offset
$offset = ($page > 1) ? ($page - 1) * $limit : 0;

// Récupération des annonces
$ads = $adModel->getAllPaginate($offset, $limit);

// Traitement des annonces
$tabs = [];
foreach ($ads->fetchAll(PDO::FETCH_ASSOC) as $value) {
    // Masquage des informations sensibles si nécessaire
    if (!$value['p_fullname']) {
        $value['author'] = "*************";
    }
    if (!$value['p_email']) {
        $value['email'] = "*************";
    }
    if (!$value['p_phone']) {
        $value['phone'] = "*************";
    }
    // Ajout de l'annonce traitée au tableau
    $tabs[] = $value;
}

// Construction de la réponse
$result = [
    "success" => true,
    "status" => 200,
    "message" => "Request successful.",
    "data" => $tabs,
];

// Envoi de la réponse
http_response_code(200);
header('Content-Type: application/json');
echo json_encode($result, JSON_PRETTY_PRINT); // JSON_PRETTY_PRINT pour un affichage lisible
exit();
?>