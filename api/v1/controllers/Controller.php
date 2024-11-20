<?php
session_start();

require_once ('vendor/autoload.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Gérer les requêtes préliminaires (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
  }

// localhost
// 10.0.2.2
$dotenv = Dotenv\Dotenv::createImmutable($_SERVER['HTTP_HOST'] == 'localhost' ? $_SERVER['DOCUMENT_ROOT'] . '/KiloShare/api/v1/' : $_SERVER['DOCUMENT_ROOT'] . "/api/v1/");
$dotenv->load();

$key = $_ENV['JWT_SECRET'];
error_log("La clé secrète est : " . $key);

$payload = [
    'iss' => $_SERVER['SERVER_NAME'], // �metteur du jeton
    'aud' => 'kiloshare', // Audience du jeton
    'iat' => time(), // Heure � laquelle le jeton a �t� �mis
    'nbf' => time(), // Heure avant laquelle le jeton ne doit pas �tre accept�
    'exp' => time() + 3600, // Expiration du jeton dans 1 heure
    'id' => 12345, // Identifiant utilisateur ou toute autre donn�e n�cessaire
    'rand' => uniqid(), // Ajout d'un identifiant unique pour rendre le jeton unique chaque fois
];

require_once "config/DB.php";
require_once "utils/Helper.php";
require_once "utils/ErrorHandler.php";
require_once "utils/constants.php";

require_once "models/Auth.php";
require_once "models/User.php";
require_once "models/Ad.php";
require_once "models/Profile.php";
require_once "models/Status.php";
require_once "models/DocumentType.php";
require_once "models/Category.php";


$db = new DB($_ENV['DB_HOST'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME']);
$cn = $db->getConnection();


$success = null;
$error = null;

$helper = new Helper();
$errorHandler = new ErrorHandler($error_message);
$authModel = new Auth($cn);
$userModel = new User($cn);
$adModel = new Ad($cn);
$profileModel = new Profile($cn);
$statusModel = new Status($cn);
$documentTypeModel = new DocumentType($cn);
$categoryModel = new Category($cn);
?>