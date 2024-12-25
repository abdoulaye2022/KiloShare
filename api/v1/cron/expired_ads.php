<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once (__DIR__ . '/../vendor/autoload.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/../../../../");
$dotenv->load();

require_once __DIR__ . "/../config/DB.php";

$db = new DB($_ENV['DB_HOST'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME']);
$cn = $db->getConnection();

date_default_timezone_set('America/Moncton');

if ($argc > 1) {
    $key = $argv[1];
    parse_str($key, $params);
    $keyValue = $params['key'];
} else {
    echo "No key parameter provided.\n";
    exit;
}

if ($keyValue !== '922d8f39a4c6f7b21d04e3a6f1c9he8405f06bd8e7d30ab92ef7c1d64a89f02e3c') {
    die('Accès interdit');
}

$affectedRows = 0;

try {
    $today = date('Y-m-d');

    $updateQuery = "
        UPDATE ads
        SET status_id = 5
        WHERE departure_date < :today
          AND status_id != 5
    ";
    $stmt = $cn->prepare($updateQuery);
    $stmt->bindParam(':today', $today, PDO::PARAM_STR);
    $stmt->execute();

    $affectedRows = $stmt->rowCount();

} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
    exit();
}

$file = fopen('cron_log.txt', 'a');
fwrite($file, "Cron exécuté le : " . date('Y-m-d H:i:s') . PHP_EOL);
fclose($file);

echo "Nombre d'annonces expirées : " . $affectedRows;
?>
