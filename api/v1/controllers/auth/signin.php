<?php
require_once("controllers/Controller.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


if($_SERVER['REQUEST_METHOD'] != 'POST') {
    // Méthode HTTP non prise en charge
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

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if(isset($data['firstname'], $data['lastname'], $data['phone'], $data['email'], $data['password'])) {
	if(!empty($data['firstname']) && !empty($data['lastname']) && !empty($data['email']) && !empty($data['password'])) {
		if($helper->isValidEmail($data['email'])) {
			$firstname = $helper->validateString($data['firstname']);
			$lastname = $helper->validateString($data['lastname']);
			$phone = $helper->validateString($data['phone']);
			$email = $helper->validateString($data['email']);
			$password = password_hash($helper->validateString($data['password']), PASSWORD_DEFAULT);

			// Check E-mail exist
			$emailCheck = $authModel->emailExist($email);
			if($emailCheck->rowCount() == 0) {
				$users = $authModel->signin($firstname, $lastname, $phone, $email, $password);

				$user_id = $cn->lastInsertId();

				if($users == true) {
					$userFetch = $userModel->getOne($user_id);
					$user = $userFetch->fetch(PDO::FETCH_ASSOC);

					$payload = array(
				        "id" => $user['id']
				    );

					$jwt = JWT::encode($payload, $key, 'HS256');

					    // resultat
					    $result = array(
					        "success" => true,
					        "status" => 200,
					        "message" => "Authentication successful",
					        "access_token" => $jwt
					    );

					    echo json_encode($result);
					    exit();
				} else {
					$error = [
						"success" => false,
						"status" => 409,
						"message" => "Invalid credentials. Please check your email address and password."
					];
				}
			} else {
				$error = [
					"success" => false,
					"status" => 409,
					"message" => "The email already exists."
				];
			}
		} else {
			$error = [
				"success" => false,
				"status" => 409,
				"message" => "E-mail is invalid."
			];
		}
	} else {
		$error = [
			"success" => false,
			"status" => 409,
			"message" => "All fields are required."
		];
	}
}

echo json_encode($error);

?>