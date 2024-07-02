<?php
require_once "../config/DB.php";
require_once "../utils/Helper.php";

require_once "models/User.php";

$db = new DB($_ENV['DB_HOST'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME']);
$cn = $db->getConnection();

$helper = new Helper();
$user = new User($cn);

?>