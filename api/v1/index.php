<?php
// D�finition des routes avec des param�tres dans l'en-t�te
$routes = [
    // Auth
    '/api/v1/info' => 'controllers/InfoController.php',
    '/api/v1/login' => 'controllers/auth/login.php',
    '/api/v1/signin' => 'controllers/auth/signin.php',

    // User
    '/api/v1/users/getAll' => 'controllers/user/getAll.php',
    '/api/v1/users/create' => 'controllers/user/create.php',
    '/api/v1/users/update/{id}' => 'controllers/user/update.php',
    '/api/v1/users/delete/{id}' => 'controllers/user/delete.php',

    // Announcements
    '/api/v1/announcements/getAll' => 'controllers/announcement/getAll.php',
    '/api/v1/announcements/create' => 'controllers/announcement/create.php',
    '/api/v1/announcements/update/{id}' => 'controllers/announcement/update.php',
    '/api/v1/announcements/delete/{id}' => 'controllers/announcement/delete.php',

    // Profiles
    '/api/v1/profiles/getAll' => 'controllers/profile/getAll.php',
    '/api/v1/profiles/create' => 'controllers/profile/create.php',
    '/api/v1/profiles/update/{id}' => 'controllers/profile/update.php',
    '/api/v1/profiles/delete/{id}' => 'controllers/profile/delete.php',
    
    // Status
    '/api/v1/status/getAll' => 'controllers/status/getAll.php',
    '/api/v1/status/create' => 'controllers/status/create.php',
    '/api/v1/status/update/{id}' => 'controllers/status/update.php',
    '/api/v1/status/delete/{id}' => 'controllers/status/delete.php',

    // Document_types
    '/api/v1/document_types/getAll' => 'controllers/document_type/getAll.php',
    '/api/v1/document_types/create' => 'controllers/document_type/create.php',
    '/api/v1/document_types/update/{id}' => 'controllers/document_type/update.php',
    '/api/v1/document_types/delete/{id}' => 'controllers/document_type/delete.php',

];

// Recuperation de l'URI de la requete
$uri = $_SERVER['REQUEST_URI'];

// Recherche de la route correspondante
foreach ($routes as $route => $controller) {
    // Remplacement des parametres dans l'URI par des expressions regulieres
    $route = "/KiloShare".$route;
    $pattern = str_replace('/', '\/', $route);
    $pattern = preg_replace('/\{([^\}]+)\}/', '(?P<$1>[^\/]+)', $pattern);
    $pattern = '/^' . $pattern . '$/';

    // Recherche de la correspondance entre l'URI de la requete et le modele de route
    if (preg_match($pattern, $uri, $matches)) {
        $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
        $controller = str_replace('{', '', $controller);
        $controller = str_replace('}', '', $controller);
        $controller = str_replace(array_keys($params), array_values($params), $controller);
        require_once($controller);
        exit;
    }
}

$error = [
    "success" => false,
    "status" => 404,
    "message" => 'The requested page was not found. Please check the URL and try again.'
];
http_response_code(404);
header('Content-Type: application/json');
echo json_encode($error);
exit();
