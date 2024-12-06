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

$payload = [
    'iss' => $_SERVER['SERVER_NAME'],
    'aud' => 'kiloshare',
    'iat' => time(),
    'nbf' => time(),
    'exp' => time() + 3600,
    'id' => 12345,
    'rand' => uniqid(),
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