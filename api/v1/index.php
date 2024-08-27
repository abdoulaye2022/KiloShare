<?php
// Définition des routes avec des paramètres dans l'en-tête
$routes = [
    '/api/v1/info' => 'controllers/InfoController.php',
    '/api/v1/login' => 'controllers/auth/login.php',
    '/api/v1/signin' => 'controllers/auth/signin.php',

    '/api/v1/users/getAll' => 'controllers/user/getAll.php',
    '/api/v1/users/create' => 'controllers/user/create.php',
    '/api/v1/users/update' => 'controllers/user/update.php',
    '/api/v1/users/delete' => 'controllers/user/delete.php',
];

// Récupération de l'URI de la requête
$uri = $_SERVER['REQUEST_URI'];

// Recherche de la route correspondante
foreach ($routes as $route => $controller) {
    // Remplacement des paramètres dans l'URI par des expressions régulières
    $route = "/KiloShare".$route;
    $pattern = str_replace('/', '\/', $route);
    $pattern = preg_replace('/\{([^\}]+)\}/', '(?P<$1>[^\/]+)', $pattern);
    $pattern = '/^' . $pattern . '$/';

    // Recherche de la correspondance entre l'URI de la requête et le modèle de route
    if (preg_match($pattern, $uri, $matches)) {
        $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
        $controller = str_replace('{', '', $controller);
        $controller = str_replace('}', '', $controller);
        $controller = str_replace(array_keys($params), array_values($params), $controller);
        require_once($controller);
        exit;
    }
}

// Route non trouvée, affichage d'une erreur 404
header("HTTP/1.0 404 Not Found");
echo "404 Not Found";
