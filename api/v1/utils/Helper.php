<?php
/**
 * 
 */
class Helper
{
	
	public function isValidEmail($email) {
	    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
	}

	public function validateString ($string) {
		return htmlspecialchars(htmlentities(trim($string)));
	}

	public function greethings () {
		$heure = date("G");
		return ($heure < 12 ? "Morning" : "Evening");
	}

	public function isValidProfil ($integer) {
		if(in_array(intval($integer), [1, 2, 3]))
			return intval($integer);
	}
	
	public function isValidProduct ($integer) {
		if(in_array(intval($integer), [1, 2, 3]))
			return intval($integer);
	}

	public function isValidWarehouse($integer) {
        if (in_array(intval($integer), [1, 2, 3])) {
            return intval($integer);
        }
	}

	public function validateInteger ($integer) {
		return intval($integer);
	}

	public function validerDate($date, $format = 'Y-m-d') {
	    $dateTimeObj = DateTime::createFromFormat($format, $date);

	    if ($dateTimeObj && $dateTimeObj->format($format) == $date) {
	        return true;
	    } else {
	        return false;
	    }
	}

	public function validateArray($inputArray) {
	    if (!is_array($inputArray)) {
	        return false;
	    }

	    foreach ($inputArray as $value) {
	        if (!is_string($value) || empty($value)) {
	            return false;
	        }
	    }
	    
	    return true;
	}

	public function isValidPrice($price) {
	    $pattern = '/^\d+(\.\d{1,2})?$/';

	    return preg_match($pattern, $price);
	}

	public function formatPrice($price) {
	    return number_format($price, 2, '.', ',');
	}

	public function minuteAgo ($date) {
		// Current date and time
		$currentDateTime = new DateTime();

		// Date and time of the past moment
		$pastDateTime = new DateTime($date);

		// Calculate the difference
		$interval = $currentDateTime->diff($pastDateTime);

		// Extract minutes from the difference
		$minutesAgo = $interval->format('%i');

		return $minutesAgo;
	}

	public function validatePhoneNumber($phoneNumber) {
		// Supprimer les espaces, les tirets et les parenthèses
		$phoneNumber = preg_replace('/[\s\-\(\)]+/', '', $phoneNumber);
	
		// Expression régulière pour valider un numéro de téléphone
		// Cette regex permet les numéros avec ou sans code de pays
		$pattern = '/^\+?[0-9]{5,15}$/';
	
		// Vérifier si le numéro correspond au format
		if (preg_match($pattern, $phoneNumber)) {
			return true; // Le numéro est valide
		} else {
			return false; // Le numéro est invalide
		}
	}
}
?>