<?php
// Combinez les m�tadonn�es et les endpoints pour la r�ponse finale
$apiInfo = array(
    "metadata" => array(
            "author" => "Abdoulaye Mohamed Ahmed",
            "version" => "1.0",
            "last_updated" => "2024-06-23"
        ),
    "endpoints" => array(
            "endpoint" => "/users",
            "method" => "GET",
            "description" => "Retourne une liste de tous les utilisateurs."
        )
);

header('Content-Type: application/json');
header('HTTP/1.1 200 OK');

echo json_encode($apiInfo, JSON_PRETTY_PRINT);


// "endpoint" => "/users",
//                 "method" => "GET",
//                 "description" => "Retourne une liste de tous les utilisateurs."
