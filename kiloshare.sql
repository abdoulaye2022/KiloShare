-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 12 nov. 2024 à 17:33
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `kiloshare`
--

-- --------------------------------------------------------

--
-- Structure de la table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
CREATE TABLE IF NOT EXISTS `announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `space_available` decimal(18,2) NOT NULL,
  `price_kilo` decimal(18,2) NOT NULL DEFAULT '0.00',
  `price_per_kilo` int UNSIGNED NOT NULL DEFAULT (0),
  `departure_country` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `arrival_country` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `departure_city` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `arrival_city` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `departure_date` date NOT NULL,
  `arrival_date` date NOT NULL,
  `collection_date` date NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `status_id` int UNSIGNED NOT NULL,
  `is_deleted` int DEFAULT (0),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_trips` (`user_id`),
  KEY `fk_trips_status` (`status_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `description`, `space_available`, `price_kilo`, `price_per_kilo`, `departure_country`, `arrival_country`, `departure_city`, `arrival_city`, `departure_date`, `arrival_date`, `collection_date`, `user_id`, `status_id`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Montreal a Gao', 'Bonjour j&#039;ai 50 KG pour Dakar.', '10.00', '20.00', 0, '', '', 'Montreal', 'Gao', '2024-11-15', '2024-11-16', '2024-11-17', 1, 1, 0, '2024-10-19 02:23:52', '2024-10-19 17:09:42'),
(2, 'Montreal a Dakar', 'Bonjour j&#039;ai 50 KG pour Dakar.', '10.00', '20.00', 0, '', '', 'Montreal', 'Dakar', '2024-11-15', '2024-11-14', '2024-11-20', 1, 1, 0, '2024-10-19 16:30:50', '2024-10-19 16:30:50'),
(3, 'Montreal a Dakar', 'Bonjour j&#039;ai 50 KG pour Dakar.', '10.00', '20.00', 0, '', '', 'Montreal', 'Dakar', '2024-11-15', '2024-11-16', '2024-11-17', 1, 1, 1, '2024-10-19 16:47:48', '2024-10-19 16:47:48');

-- --------------------------------------------------------

--
-- Structure de la table `document_types`
--

DROP TABLE IF EXISTS `document_types`;
CREATE TABLE IF NOT EXISTS `document_types` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `number` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `is_deleted` int DEFAULT (0),
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  `expiration_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Type de pièce d’identité';

-- --------------------------------------------------------

--
-- Structure de la table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `is_deleted` int DEFAULT (0),
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Profil utilisateur';

--
-- Déchargement des données de la table `profiles`
--

INSERT INTO `profiles` (`id`, `name`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 0, '2024-10-14 16:40:02', '0000-00-00 00:00:00'),
(2, 'Visitor 2', 0, '2024-10-14 16:40:17', '2024-10-19 18:25:45'),
(3, 'Visitor 234', 1, '2024-10-19 18:07:18', '2024-10-19 18:19:01'),
(4, 'supervisor', 1, '2024-10-19 18:08:04', '2024-10-19 18:08:04');

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `is_deleted` int DEFAULT (0),
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`id`, `name`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Pending confirmation', 0, '2024-10-20 20:16:46', '2024-10-20 20:16:46'),
(2, 'Confirmed', 1, '2024-10-20 20:20:49', '2024-10-20 20:20:55'),
(3, 'Under negotiation', 0, '2024-10-20 20:22:53', '2024-10-20 20:22:53');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profile_id` int UNSIGNED NOT NULL,
  `document_type_id` int UNSIGNED DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `is_deleted` int DEFAULT (0),
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_users` (`phone`),
  KEY `fk_users_document_types` (`document_type_id`),
  KEY `fk_users_profiles` (`profile_id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `phone`, `email`, `password`, `profile_id`, `document_type_id`, `status`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Abdoulaye', 'Mohamed', '5068506548', 'abdoulaye@gmail.com', '$2y$10$mxu4KE3tqTdy8s34o1eTgu/pDFDcIptUbVh2MkC97XK24HRu02MKC', 1, NULL, 1, 0, '2024-10-14 16:42:02', '2024-11-04 00:24:46'),
(2, 'Ali', 'Sani', '91572447', 'ali@gmail.com', '$2y$10$cL5/tlT/S0auCIlVTg60buf6MWHSe.6DpXgpqahrIYXlN72ODyrLi', 0, NULL, 1, 0, '2024-10-14 20:58:54', '2024-10-14 20:58:54'),
(6, 'Sadou', 'Garba', '4185268569', 'sadou@gmail.com', '$2y$10$CwXYEwMD85GlKHOYEFSbmeENbYrjNKxagODhm8qvHIHvxjaM1LDIy', 1, NULL, 0, 0, '2024-10-31 23:44:51', '2024-10-31 23:44:51'),
(7, 'Hassan', 'Malik', '74562358', 'hassan@gmail.com', '$2y$10$OZX1Pm8Ev7F8cIG769u1uOKI4OQAPq3TkWvS2r9u0SysGOI3sjLOy', 2, NULL, 1, 0, '2024-11-01 00:12:20', '2024-11-01 00:12:20'),
(8, 'terra', 'jhdgsjh', '41526352', 'tera@gmail.com', '$2y$10$pQn2Yalbr5dOQiRqj55oMO1LmY6tQZcWgI4UvIoLpNaWCVFbn91Hq', 2, NULL, 0, 0, '2024-11-01 00:17:05', '2024-11-01 00:17:05'),
(9, 'Abdou', 'Moussa', '41523589', 'moussa@gmail.com', '$2y$10$Z/SoUhJdSSAhY03l8stQAukoJcx6lxcs.sGWwVmVRTJGsQ2p3npK6', 2, NULL, 0, 1, '2024-11-01 00:20:16', '2024-11-01 00:20:16'),
(10, 'Fatim', 'Balayira', '5068596859', 'fatim@gmail.com', '$2y$10$FwfJRqztfhOvLkAqXAJDfuk6BGWme/LIUU8dCQGnCC/i8ONFEBp6G', 2, NULL, 1, 0, '2024-11-01 00:43:05', '2024-11-01 00:43:05'),
(11, 'bachir', 'Mamoudou', '5065421453625', 'bachir@gmail.com', '$2y$10$BfXfxDdGvJiZSA4JBBV2hu1df0ui2T2xIilWyw6MfiEDcMlBZBZiu', 2, NULL, 1, 0, '2024-11-01 00:48:49', '2024-11-01 00:48:49'),
(12, 'Tanimoune', 'Hli', '74859654', 'tanimoune@gmail.com', '$2y$10$kum0i3HCF9OgO7jfqURJaOXnUJduo9m5QWxgwl70A8Sd1qYbFuPMK', 2, NULL, 1, 0, '2024-11-01 01:09:23', '2024-11-01 01:09:23'),
(13, 'Hamani', 'Moussa', '74521456', 'hamani@gmail.com', '$2y$10$hpGkFXPF0nNTrgZX3t6mD.BLRo2GMMTwasvJsA5EK/Pym1WK1Fcqm', 2, NULL, 1, 1, '2024-11-01 13:35:32', '2024-11-01 13:35:32'),
(14, 'Anmol', 'Sara', '564789034', 'anmol@gmail.com', '$2y$10$XbAVyP2s7VMoPGEBUY4PJOT7kxE9BtsVuSfEOSH.HymWcy9KNy7Aa', 2, NULL, 1, 1, '2024-11-02 20:12:23', '2024-11-02 20:12:23'),
(15, 'anmol', 'Daouda', '6465464654', 'anmol@gmail.com', '$2y$10$Xa44aeibkNp2Ljn6srJU4OY2i/3emGxQqfUc/OKENETBJrLi9JKLC', 2, NULL, 1, 0, '2024-11-02 20:26:06', '2024-11-02 20:26:06'),
(16, 'r2', 't1', '575768686', 't1@gmail.com', '$2y$10$/grpDNPHX.y5DW0qZ0wqu.TxHihwJNQcUT5d1kmbpOOIIbU4sC4Sa', 2, NULL, 1, 1, '2024-11-02 20:27:47', '2024-11-02 20:27:47'),
(17, 'Toni', 'Moussa', '5673546789', 'tony@gmail.com', '$2y$10$CpCS8opsoK3xIy1Jf/3e9.HEKW2SayF/hotpInA23xM6FXFcBXrsq', 2, NULL, 1, 0, '2024-11-03 00:25:40', '2024-11-03 00:25:40'),
(18, 'hero', 'Moussa', '92572447', 'jero@gmail.com', '$2y$10$t5havCd3kwQyPIAjJsxDHuh6jR1ylalw4MzhAsJA0AH5J390PQXxC', 2, NULL, 1, 1, '2024-11-03 00:28:50', '2024-11-03 00:28:50'),
(19, 'Kad', 'ULO', '678953535', 'kad@gmail.com', '$2y$10$gBhUlJtTFJfZ1ZHqFrvyZum7Yk/E.8G2xYgosJhaUeFHEFn/.KZRW', 2, NULL, 1, 1, '2024-11-03 00:53:15', '2024-11-03 00:53:15'),
(20, 'hdjs', 'ldlsjldjs', '77373737', 'jjsjs@gmail.com', '$2y$10$V.7sdOTYVnXjzPTAnXRVU.6Z9oG9fFOFa7vI5PinkKuvUl0SjVtTK', 2, NULL, 1, 0, '2024-11-03 01:07:05', '2024-11-03 01:07:05'),
(21, 'hjdjsgjds', 'kjhkjdskj', '79696986', 'gjgjhgj@gmail.com', '$2y$10$rEDY0Mio9NlQ8eBz6TbUIe4fOg/Dl/qkPPmjE3vg6ITbwQcJ4iS9i', 2, NULL, 1, 1, '2024-11-03 01:09:58', '2024-11-03 01:09:58');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;