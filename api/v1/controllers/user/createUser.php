    <?php
    require_once("controllers/Controller.php");
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    if ($_SERVER['REQUEST_METHOD'] != 'POST') {
        header('HTTP/1.1 405 Method Not Allowed');
        header('Allow: GET, POST');
        echo json_encode(["success" => false, "status" => 405, "message" => "405 Method Not Allowed"]);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);
    $authHeader = apache_request_headers()['Authorization'] ?? '';
    list(, $jwt) = explode(' ', $authHeader);

    try {
        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        if ($decoded->exp < time()) {
            echo json_encode(["success" => false, "status" => 401, "message" => "The token has expired."]);
            exit();
        }
        $decoded = (array) $decoded;

        $id = intval($decoded['id']);
        if ($id !== 12345) { // Remplacez par votre logique pour vérifier les droits d'administration
            echo json_encode(["success" => false, "status" => 403, "message" => "Forbidden"]);
            exit();
        }
        //---Validation a faire
        // Creer un  parametre actif=1, 
        $firstname = $data['firstname'] ?? '';
        $lastname = $data['lastname'] ?? '';
        $phone = $data['phone'] ?? '';
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';
        if (empty($firstname) || !$helper->validateString($firstname)) {
            echo json_encode(["success" => false, "message" => "Invalid firstname"]);
            exit();
        }

        if (empty($lastname) || !$helper->validateString($lastname)) {
            echo json_encode(["success" => false, "message" => "Invalid lastname"]);
            exit();
        }

        if (empty($phone) || !$helper->validateString($phone)) {
            echo json_encode(["success" => false, "message" => "Invalid phone number"]);
            exit();
        }

        if (empty($email) || !$helper->isValidEmail($email)) {
            echo json_encode(["success" => false, "message" => "Invalid email address"]);
            exit();
        }

        if (empty($password)) {
            echo json_encode(["success" => false, "message" => "Password cannot be empty"]);
            exit();
        }

        // User creation with 'active' status
        $userId = $userModel->create($firstname, $lastname, $phone, $email, $password);

        if ($userId) {
            // Success message with the new text
            echo "nouvel utilisateur ajouté";
            echo json_encode(["success" => true, "message" => "User created successfully.", "user_id" => $userId]);
        } else {
            echo json_encode(["success" => false, "message" => "User creation failed."]);
        }
        exit();
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["message" => "Erreur lors du décodage du token : " . $e->getMessage()]); 
        echo json_encode(["message" => "Le token est invalide."]);
        exit;
    }
    ?>