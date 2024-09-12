<?php
require_once '../../config/database.php';
require_once '../../models/User.php';
require_once '../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Charger les variables d'environnement
$dotenv = Dotenv\Dotenv::createImmutable($_SERVER['HTTP_HOST'] == 'localhost' ? $_SERVER['DOCUMENT_ROOT'] . '/KiloShare/api/v1/' : $_SERVER['DOCUMENT_ROOT'] . "/api/v1/");
$dotenv->load();

$database = new DB($_ENV['DB_HOST'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME']);
$db = $database->getConnection();

$userModel = new User($db);

// Vérifier la méthode de la requête
if ($_SERVER['REQUEST_METHOD'] != 'DELETE') {
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: DELETE');
    echo json_encode(["message" => "405 Method Not Allowed"]);
    exit;
}

// Extraire le JWT de l'en-tête Authorization
$authHeader = apache_request_headers()['Authorization'];
list(, $jwt) = explode(' ', $authHeader);

try {
    // Vérifier la signature du JWT
    $decoded = JWT::decode($jwt, new Key($_ENV['JWT_SECRET'], 'HS256'));

    // Récupérer les données de la requête
    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data['id'];

    // Appeler la méthode delete de User
    if ($userModel->delete($id)) {
        echo json_encode(["message" => "Utilisateur supprimé avec succès."]);
    } else {
        echo json_encode(["message" => "Échec de la suppression de l'utilisateur."]);
    }
} catch (Exception $e) {
    // Le JWT est invalide
    http_response_code(401);
    echo json_encode(["message" => "Le token est invalide"]);
    exit;
}
?>
