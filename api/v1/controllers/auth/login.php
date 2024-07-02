<?php
require_once("../../Controller.php");

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if(isset($data['email'], $data['password'])) {
	if(!empty($data['email']) && !empty($data['password'])) {
		if($helper->isValidEmail($data['email'])) {
			$email = $helper->validateString($data['email']);
			$password = $helper->validateString($data['password']);

			$user = $auth->login($email);

			var_dump($user->rowCount()); die;

			if($user->rowCount() == 1) {
				if(password_verify($password, $user['password'])) {

					// if(!$auth->userAccountIsBlock($email)) {
					// 	if($user['role_id'] == 1 || $user['role_id'] == 2 || $user['role_id'] == 3) {
					// 		$login_date = date("Y-m-d H:i:s");
					// 		$logout_date = date("Y-m-d H:i:s");
					// 		$onsite_time = "00:00:00";
					// 		$_SESSION['login_date'] = $login_date;

					// 		$_SESSION['connection_id'] = $connectionHistory->login($user['id'], $login_date, $logout_date, $onsite_time);
					// 		$car = $cart->getCart($user['id']);
					// 		if($car->rowCount()) {
					// 			$fecth = $car->fetch(PDO::FETCH_ASSOC);
					// 			$_SESSION['cart_id'] = $fecth['id'];
					// 		}
							
					// 		header("location: dashboard.php");
					// 		exit();
					// 	} else {
					// 		$error = "An error occurred. Please try again.";
					// 	}
					// } else {
					// 	$error = "Your account has been blocked. Please contact the administrator for assistance.";
					// }
				} else {
					$error = "Invalid credentials. Please check your email address and password.";
				}
			} else {
					$error = "Invalid credentials. Please check your email address and password.";
			}
		} else {
			$error = "E-mail is invalid.";
		}
	} else {
		$error = "All fields are required.";
	}
}

?>