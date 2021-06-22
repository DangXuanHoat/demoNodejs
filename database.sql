SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `roles` (`id`, `slug`, `name`, `permissions`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Admin', '{\"admin\":1}', '2018-09-20 08:10:12', '2018-09-20 08:10:12'),
(2, 'doctor', 'Doctor', NULL, '2018-09-20 08:10:12', '2018-09-20 08:10:12'),
(3, 'laboratory', 'Laboratory', NULL, '2018-09-20 08:10:12', '2018-09-20 08:10:12')

CREATE TABLE `role_users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) UNIQUE  COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8mb4_unicode_ci,
  `last_login` timestamp NULL DEFAULT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `is_active` int(1) NOT NULL DEFAULT 0,
  `is_reported` int(1) NOT NULL DEFAULT 0,
  `is_blocked` int(1) NOT NULL DEFAULT 0,
  `preferences` text NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE  `messages` (
  `id` INT NOT NULL,
  `guid` VARCHAR(100) NOT NULL,
  `conversation_id` INT NOT NULL,
  `sender_id` INT NOT NULL,
  `message_type` ENUM('text', 'image', 'vedio', 'audio') NOT NULL,
  `message` VARCHAR(255) NOT NULL DEFAULT '',
  `created_at` DATETIME NOT NULL,
  `deleted_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

INSERT INTO `users` (`id`, `email`, `password`, `permissions`, `last_login`, `first_name`, `last_name`, `created_at`, `updated_at`, `deleted_at`, `bio`, `gender`, `dob`, `pic`, `country`, `user_state`, `city`, `address`, `postal`, `medicoID`, `change_pwd_status`, `calendar_login`, `changepass_date`, `changepassndays`) VALUES
(1, 'admin@admin.com', '$2y$10$d1hJMFYkoKg/ciGlE0sWL.7s9JJY0S3yCZfQO0HGJDNKcepj5o8gO', NULL, '2019-02-06 09:28:42', 'John', 'Doe', '2018-09-20 08:10:12', '2019-02-06 09:28:42', NULL, NULL, NULL, NULL, NULL, NULL, 'NULL', NULL, NULL, NULL, 'Mario Libera', 0, NULL, NULL, 0),
(2, 'quocanhnguyen507@gmail.com', '$2y$10$nV4io6XvK9MIlEWXJD1UK.p5oPgEaGadwN7Mp9KR6mfNUe/JYGC/u', NULL, NULL, 'Nguyen', 'Quoc Anh', '2018-10-17 16:08:27', '2018-10-17 16:08:27', NULL, 'er', 'female', '2018-10-03', 'Rbl3wpRVa6.png', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 0),
