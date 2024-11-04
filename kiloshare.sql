-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 24, 2024 at 08:45 PM
-- Server version: 8.0.31
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kiloshare`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
CREATE TABLE IF NOT EXISTS `announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `space_available` decimal(18,2) NOT NULL,
  `price_kilo` decimal(18,2) NOT NULL DEFAULT '0.00',
  `price_per_kilo` int UNSIGNED NOT NULL DEFAULT (0),
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
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `description`, `space_available`, `price_kilo`, `price_per_kilo`, `departure_city`, `arrival_city`, `departure_date`, `arrival_date`, `collection_date`, `user_id`, `status_id`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Montreal a Gao', 'Bonjour j&#039;ai 50 KG pour Dakar.', '10.00', '20.00', 0, 'Montreal', 'Gao', '2024-11-15', '2024-11-16', '2024-11-17', 1, 1, 0, '2024-10-19 02:23:52', '2024-10-19 17:09:42'),
(2, 'Montreal a Dakar', 'Bonjour j&#039;ai 50 KG pour Dakar.', '10.00', '20.00', 0, 'Montreal', 'Dakar', '2024-11-15', '2024-11-14', '2024-11-20', 1, 1, 0, '2024-10-19 16:30:50', '2024-10-19 16:30:50'),
(3, 'Montreal a Dakar', 'Bonjour j&#039;ai 50 KG pour Dakar.', '10.00', '20.00', 0, 'Montreal', 'Dakar', '2024-11-15', '2024-11-16', '2024-11-17', 1, 1, 1, '2024-10-19 16:47:48', '2024-10-19 16:47:48');

-- --------------------------------------------------------

--
-- Table structure for table `document_types`
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
-- Table structure for table `profiles`
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
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `name`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 0, '2024-10-14 16:40:02', '0000-00-00 00:00:00'),
(2, 'Visitor 2', 0, '2024-10-14 16:40:17', '2024-10-19 18:25:45'),
(3, 'Visitor 234', 1, '2024-10-19 18:07:18', '2024-10-19 18:19:01'),
(4, 'supervisor', 1, '2024-10-19 18:08:04', '2024-10-19 18:08:04');

-- --------------------------------------------------------

--
-- Table structure for table `status`
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
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `name`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Pending confirmation', 0, '2024-10-20 20:16:46', '2024-10-20 20:16:46'),
(2, 'Confirmed', 1, '2024-10-20 20:20:49', '2024-10-20 20:20:55'),
(3, 'Under negotiation', 0, '2024-10-20 20:22:53', '2024-10-20 20:22:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
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
  `active` int NOT NULL DEFAULT '1',
  `is_deleted` int DEFAULT (0),
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_users` (`phone`),
  KEY `fk_users_document_types` (`document_type_id`),
  KEY `fk_users_profiles` (`profile_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `phone`, `email`, `password`, `profile_id`, `document_type_id`, `active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Abdoulaye', 'Mohamed', '5068506548', 'abdoulaye@gmail.com', '$2y$10$mxu4KE3tqTdy8s34o1eTgu/pDFDcIptUbVh2MkC97XK24HRu02MKC', 1, NULL, 1, 0, '2024-10-14 16:42:02', '2024-10-14 16:42:02'),
(2, 'Ali', 'Sani', '91572447', 'ali@gmail.com', '$2y$10$cL5/tlT/S0auCIlVTg60buf6MWHSe.6DpXgpqahrIYXlN72ODyrLi', 0, NULL, 1, 0, '2024-10-14 20:58:54', '2024-10-14 20:58:54');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;