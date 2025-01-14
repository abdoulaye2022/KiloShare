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

if(!isset($params['id']) || !isset($_POST['title']) || !isset($_POST['description']) || !isset($_POST['space_available']) || !isset($_POST['price_kilo']) || !isset($_POST['departure_city']) ||
    !isset($_POST['departure_country']) || !isset($_POST['arrival_country']) || !isset($_POST['arrival_city']) || !isset($_POST['departure_date']) || !isset($_POST['arrival_date']) 
    || !isset($_POST['collection_date']) || !isset($_POST['user_id']) || !isset($_POST['category_id']) || empty($params['id']) || empty($_POST['title']) ||
    empty($_POST['description']) || empty($_POST['space_available']) || empty($_POST['price_kilo']) || empty($_POST['departure_country']) || empty($_POST['departure_city']) ||
    empty($_POST['arrival_country']) || empty($_POST['arrival_city']) || empty($_POST['departure_date']) || empty($_POST['arrival_date']) || empty($_POST['collection_date']) || 
    empty($_POST['user_id']) || empty($_POST['category_id'])) {
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

if(!$helper->isValidInteger($params['id'])) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_ad_number')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(!$helper->validateDateFormat($_POST['departure_date']) || !$helper->validateDateFormat($_POST['arrival_date']) || !$helper->validateDateFormat($_POST['collection_date'])) {
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

if(isset($_POST['title']) && !empty($_POST['title']) && !$helper->isStringValidLength($_POST['title'], 50)) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('title_too_long')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(!$helper->isStringValidLength($_POST['description'], 255)) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('description_too_long')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(!$helper->isValidInteger($_POST['user_id'])) {
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

if(!$helper->isValidInteger($_POST['category_id'])) {
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

if(!$helper->isValidDouble(strval($_POST['price_kilo']))) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_price')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(!$helper->isValidDouble(strval($_POST['space_available']))) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('invalid_space_available')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$dateDeparture = new DateTime($_POST['departure_date']);
$dateArrival = new DateTime($_POST['arrival_date']);
$dateCollections = new DateTime($_POST['collection_date']);

if($dateDeparture > $dateArrival || $dateDeparture > $dateCollections) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('date_departure_error')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if($dateArrival > $dateCollections) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('date_collection_error')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

if(strlen($_POST['title']) > 60) {
    $error = [
        "success" => false,
        "status" => 400,
        "message" => $errorHandler::getMessage('title_exceed_maximun')
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($error);
    exit();
}

$fileName = "";
if (isset($_FILES['photo'])) {
    // Récupère les informations du fichier
    $file = $_FILES['photo'];
    
    // Récupère le nom du fichier
    $fileName = uniqid() . "_" .  $file['name'];
    
    // Récupère le type du fichier (par exemple 'image/jpeg')
    $fileType = $file['type'];
    
    // Récupère la taille du fichier (en octets)
    $fileSize = $file['size'];
    
    // Récupère le chemin temporaire du fichier
    $tmpFilePath = $file['tmp_name'];
    
    // Définir un répertoire cible pour enregistrer le fichier
    $uploadDirectory = __DIR__ . '/../../public/uploads/images/';
    
    // Vérifie si le répertoire d'upload existe, sinon crée-le
    if (!is_dir($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true);
    }

    // Spécifie le chemin final pour enregistrer le fichier
    $destination = $uploadDirectory . basename($fileName);

    // Liste des types MIME autorisés
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    // Vérifie si le fichier a un type autorisé
    if (!in_array($fileType, $allowedTypes)) {
        $error = [
            "success" => false,
            "status" => 400,
            "message" => "Invalid file type. Only JPG, PNG, and GIF images are allowed."
        ];
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode($error);
        exit();
    }

    // Vérifie si la taille du fichier est inférieure à 3 Mo (3 Mo = 3 * 1024 * 1024 octets)
    if ($fileSize > 3 * 1024 * 1024) {
        $error = [
            "success" => false,
            "status" => 400,
            "message" => "File size exceeds 3MB."
        ];
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode($error);
        exit();
    }

    // Vérifie si le fichier a bien été téléchargé sans erreur
    if ($file['error'] === UPLOAD_ERR_OK) {
        // Déplace le fichier du répertoire temporaire vers le répertoire d'upload
        if (move_uploaded_file($tmpFilePath, $destination)) {
            // Le fichier a été déplacé avec succès
        } else {
            $error = [
                "success" => false,
                "status" => 400,
                "message" => $errorHandler::getMessage('error_saving_file')
            ];
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode($error);
            exit();
        }
    } else {
        $error = [
            "success" => false,
            "status" => 400,
            "message" => $errorHandler::getMessage('failed_file_upload') . ' ' . $file['error']
        ];
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode($error);
        exit();
    }
}

$id = $helper->validateInteger($params['id']);
$title = $helper->validateString($_POST['title']);
$description = $helper->validateString($_POST['description']);
$space_available = number_format($helper->validateString($_POST['space_available']), 2, '.', '');
$price_kilo = number_format($helper->validateString($_POST['price_kilo']), 2, '.', '');
$departure_country = $helper->validateString($_POST['departure_country']);
$arrival_country = $helper->validateString($_POST['arrival_country']);
$departure_city = $helper->validateString($_POST['departure_city']);
$arrival_city = $helper->validateString($_POST['arrival_city']);
$departure_date = $helper->validateString($_POST['departure_date']);
$arrival_date = $helper->validateString($_POST['arrival_date']);
$collection_date = $helper->validateString($_POST['collection_date']);
$category_id = $helper->validateInteger($_POST['category_id']);
$slug = $helper->createSlug($title);

$ad_id = $adModel->update($id, $title, $description, $space_available, $price_kilo, $departure_country, $arrival_country, $departure_city, $arrival_city, 
                $departure_date, $arrival_date, $collection_date, $category_id, $fileName, $auth_id, $slug);
if($ad_id == false) {
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