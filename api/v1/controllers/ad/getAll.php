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

$ads = $adModel->getAll();

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