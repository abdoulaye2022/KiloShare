<?php
// D�finition des routes avec des param�tres dans l'en-t�te
$routes = [
    '/api/v1/info' => 'controllers/InfoController.php',
    '/api/v1/login' => 'controllers/auth/login.php',
    '/api/v1/signin' => 'controllers/auth/signin.php',
    '/api/v1/users/create' => 'controllers/user/createUser.php',
    '/api/v1/users/update' => 'controllers/user/updateUser.php',
    '/api/v1/users' => 'controllers/user/getAll.php',
    '/api/v1/users/delete' => 'controllers/user/deleteUser.php',
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

// Route non trouv�e, affichage d'une erreur 404
header("HTTP/1.0 404 Not Found");
echo "404 Not Found";
