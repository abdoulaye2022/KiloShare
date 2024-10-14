<?php
class ErrorHandler {
    private static $messages;

    public function __construct($errorMessages) {
        self::$messages = $errorMessages;
    }

    public static function getMessage($key) {
        return self::$messages[$key] ?? 'Unknown error';
    }
}
