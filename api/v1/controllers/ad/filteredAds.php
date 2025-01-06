<?php
require_once("controllers/Controller.php");

// Vérification de la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
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

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if(isset($data['departure_date']) && !empty($data['departure_date']) && !$helper->validateDateFormat($data['departure_date']) || 
    isset($data['arrival_date']) && !empty($data['arrival_date']) && !$helper->validateDateFormat($data['arrival_date'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_date')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(isset($data['category_id']) && !empty($data['category_id']) && !$helper->isValidInteger($data['category_id']) || 
    isset($data['status_id']) && !empty($data['status_id']) && !$helper->isValidInteger($data['status_id'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_category_id')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$departure_date = !empty($data['departure_date']) ? $helper->validateString($data['departure_date']) : null;
$arrival_date = !empty($data['arrival_date']) ? $helper->validateString($data['arrival_date']) : null;
$category_id = !empty($data['category_id']) ? $helper->validateString($data['category_id']) : null;
$status_id = !empty($data['status_id']) ? $helper->validateString($data['status_id']) : null;
$departure_country = !empty($data['departure_country']) ? $helper->validateString($data['departure_country']) : null;
$arrival_country = !empty($data['arrival_country']) ? $helper->validateString($data['arrival_country']) : null;

$ads = $adModel->filteredAds($departure_date, $arrival_date, $departure_country, $arrival_country, $category_id, 2);

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