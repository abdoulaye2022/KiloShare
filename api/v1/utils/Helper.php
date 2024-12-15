<?php
/**
 * 
 */
class Helper
{
	
	public function isValidEmail($email) {
	    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
	}

	public function validateString($string) {
		// Nettoyer la chaîne en enlevant les espaces superflus
		$string = trim($string);
		// Convertir les entités HTML en caractères normaux
		$string = html_entity_decode($string);
		// Échapper les caractères spéciaux pour une utilisation sécurisée en HTML
		return $string;
	}

	public function validateInteger($string) {
		return intval($string);
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

	public function isValidInteger($value) {
		return filter_var($value, FILTER_VALIDATE_INT) !== false;
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

	public function isValidDouble($price) {
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
		$phoneNumber = preg_replace('/[\s\-\(\)]+/', '', $phoneNumber);
	
		$pattern = '/^\+?[0-9]{5,15}$/';
	
		if (preg_match($pattern, $phoneNumber)) {
			return true;
		} else {
			return false;
		}
	}

	public function validateDateFormat($date) {
		// Vérifier le format avec une expression régulière : YYYY-MM-DD
		$pattern = '/^\d{4}-\d{2}-\d{2}$/';
		
		if (preg_match($pattern, $date)) {
			// Décomposer la date pour vérifier si c'est une date valide
			list($year, $month, $day) = explode('-', $date);
			
			// Vérifier si c'est une date valide (sans considérer 0000 comme une année valide)
			if (checkdate((int)$month, (int)$day, (int)$year) || $date === '0000-00-00') {
				return true; // Format et validité OK
			} else {
				return false; // Date invalide
			}
		}
		
		return false; // Format incorrect
	}

	public function isStringValidLength($string, $max) {
		// Vérifie si la chaîne est de 50 caractères ou moins
		return strlen($string) <= $max;
	}

	// public function isValidPrice($price) {
	// 	// Vérifie si le prix est un nombre et a exactement deux décimales
	// 	return preg_match('/^\d+(\.\d{2}|,\d{2})$/', $price) === 1;
	// }

	public function createSlug($title) {
		// Convertir en minuscules
		$slug = strtolower($title);
	
		// Supprimer les accents
		$slug = iconv('UTF-8', 'ASCII//TRANSLIT', $slug);
	
		// Remplacer les caractères spéciaux et espaces par des tirets
		$slug = preg_replace('/[^a-z0-9\s\-]/', '', $slug);
		$slug = preg_replace('/\s+/', '-', $slug);
	
		// Supprimer les tirets multiples et ceux en début/fin de chaîne
		$slug = preg_replace('/-+/', '-', $slug);
		$slug = trim($slug, '-');

		$slug = preg_replace('/\b(pour|mon|de|le|la|et|les|des)\b/', '', $slug);
		$slug = substr($slug, 0, 60);
		$slug = str_replace('---', '-', $slug);
		$slug = str_replace('--', '-', $slug);
	
		return $slug;
	}
	
}
?>