<?php
require_once("controllers/Controller.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


if($_SERVER['REQUEST_METHOD'] != 'GET') {
    // M�thode HTTP non prise en charge
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: GET, POST');

    $error = [
		"success" => false,
		"status" => 405,
		"message" => "405 Method Not Allowed"
	];

    echo json_encode($error);
    exit;
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
		"message" => "The token has expired."
	];

    echo json_encode($error);
    exit();
  }

  $decoded = (array)$decoded;

  $id = intval($decoded[0]->id);

  $users = $userModel->getAll();

  echo json_encode($users->fetchAll(PDO::FETCH_ASSOC));
  exit();

} catch (Exception $e) {
  // Le JWT est invalide
  http_response_code(401);
  echo json_encode(array("message" => "Le token est invalide"));
  exit;
}

?>