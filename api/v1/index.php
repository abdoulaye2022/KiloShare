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
];

// R�cup�ration de l'URI de la requ�te
$uri = $_SERVER['REQUEST_URI'];

// Recherche de la route correspondante
foreach ($routes as $route => $controller) {
    // Remplacement des param�tres dans l'URI par des expressions r�guli�res
    $route = "/KiloShare".$route;
    $pattern = str_replace('/', '\/', $route);
    $pattern = preg_replace('/\{([^\}]+)\}/', '(?P<$1>[^\/]+)', $pattern);
    $pattern = '/^' . $pattern . '$/';

    // Recherche de la correspondance entre l'URI de la requ�te et le mod�le de route
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
