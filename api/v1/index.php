<?php
// D�finition des routes avec des param�tres dans l'en-t�te
$routes = [
    // Auth
    '/api/v1/info' => 'controllers/InfoController.php',
    '/api/v1/login' => 'controllers/auth/login.php',
    '/api/v1/signin' => 'controllers/auth/signin.php',
    '/api/v1/isValidJwt' => 'controllers/auth/isValidJwt.php',
    '/api/v1/confirmEmail' => 'controllers/auth/confirmEmail.php',
    '/api/v1/changePassword' => 'controllers/auth/changePassword.php',
    '/api/v1/forgotPassword' => 'controllers/auth/forgotPassword.php',
    '/api/v1/resetPassword' => 'controllers/auth/resetPassword.php',
    '/api/v1/verifiedEmail' => 'controllers/auth/verifiedEmail.php',

    // User
    '/api/v1/users/getAll' => 'controllers/user/getAll.php',
    '/api/v1/users/create' => 'controllers/user/create.php',
    '/api/v1/users/update/{id}' => 'controllers/user/update.php',
    '/api/v1/users/delete/{id}' => 'controllers/user/delete.php',
    '/api/v1/users/suspend/{id}' => 'controllers/user/suspend.php',
    '/api/v1/users/unsuspend/{id}' => 'controllers/user/unsuspend.php',
    '/api/v1/users/updateUserProfil' => 'controllers/user/updateUserProfil.php',

    // Ads
    '/api/v1/ads/getAll' => 'controllers/ad/getAll.php',
    '/api/v1/ads/getOne/{id}/{slug}' => 'controllers/ad/getOne.php',
    '/api/v1/ads/create' => 'controllers/ad/create.php',
    '/api/v1/ads/update/{id}' => 'controllers/ad/update.php',
    '/api/v1/ads/delete/{id}' => 'controllers/ad/delete.php',
    '/api/v1/ads/approve/{id}' => 'controllers/ad/approve.php',
    '/api/v1/ads/reject/{id}' => 'controllers/ad/reject.php',
    '/api/v1/ads/userAds/{user_id}' => 'controllers/ad/userAds.php',
    '/api/v1/ads/adminAds' => 'controllers/ad/adminAds.php',
    '/api/v1/ads/messageAd' => 'controllers/ad/messageAd.php',
    '/api/v1/ads/closedAd/{id}' => 'controllers/ad/closedAd.php',

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

    // Category
    '/api/v1/categories/getAll' => 'controllers/category/getAll.php',

    // Preferences
    '/api/v1/preferences/getAll' => 'controllers/preferences/getAll.php',
    '/api/v1/preferences/defaultPreference' => 'controllers/preferences/defaultPreference.php',
    '/api/v1/preferences/update' => 'controllers/preferences/update.php'
];

$uri = $_SERVER['REQUEST_URI'];

foreach ($routes as $route => $controller) {
    if($_SERVER['HTTP_HOST'] == 'localhost')
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
?>