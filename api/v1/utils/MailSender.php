<?php

use Brevo\Client\Configuration;
use Brevo\Client\Api\TransactionalEmailsApi;
use Brevo\Client\Model\SendSmtpEmail;
use GuzzleHttp\Client;

class MailSender
{
    // Définitions des constantes pour éviter les répétitions
    private const SENDER_NAME = 'Kilo-Share';
    private const SENDER_EMAIL = 'contact@m2acode.com';

    /**
     * Envoie un email via l'API Brevo
     * 
     * @param string $subject   Sujet de l'email
     * @param array $to         Tableau contenant les destinataires (nom et email)
     * @param string $body      Contenu HTML de l'email
     * @return bool             Retourne true en cas de succès, false en cas d'erreur
     */
    public function send_mail(string $subject, array $to, string $body): bool
    {
        // Configuration de l'API Brevo
        $config = Configuration::getDefaultConfiguration()->setApiKey('api-key', $_ENV['BREVO_API_KEY']);

        $apiInstance = new TransactionalEmailsApi(
            new Client([
                'verify' => false, // Désactive la vérification SSL (à utiliser uniquement pour le débogage)
            ]),
            $config
        );

        // Validation des destinataires
        if (empty($to) || !is_array($to)) {
            error_log('Erreur : Destinataires invalides.');
            return false;
        }

        // Création du modèle d'email
        $sendSmtpEmail = new SendSmtpEmail([
            'subject' => $subject,
            'sender' => [
                'name' => self::SENDER_NAME,
                'email' => self::SENDER_EMAIL,
            ],
            'to' => $to,
            'htmlContent' => $body,
            'params' => ['bodyMessage' => 'made just for you!'],
        ]);

        try {
            // Envoi de l'email
            $result_mail = $apiInstance->sendTransacEmail($sendSmtpEmail);

            // Vous pouvez déboguer le résultat si nécessaire
            // error_log(print_r($result_mail, true));

            return true;
        } catch (Exception $e) {
            // Log de l'erreur pour débogage
            error_log('Erreur lors de l\'envoi de l\'email : ' . $e->getMessage());
            return false;
        }
    }
}
?>