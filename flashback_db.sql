-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2025 at 09:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flashback_db`
--

-- --------------------------------------------------------

--
-- Independent Tables (No Foreign Key Dependencies)
--

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `theme_preference` varchar(20) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `user_type` varchar(20) DEFAULT NULL,
  `interests` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`interests`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `school_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `domain` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `color` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- First Level Dependencies (Depend on independent tables)
--

--
-- Table structure for table `folders`
--

CREATE TABLE `folders` (
  `folder_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `last_modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_favorite` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `user_schools`
--

CREATE TABLE `user_schools` (
  `user_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Second Level Dependencies (Depend on users and folders)
--

--
-- Table structure for table `decks`
--

CREATE TABLE `decks` (
  `deck_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `folder_id` int(11) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `last_modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_studied` datetime DEFAULT NULL,
  `is_favorite` tinyint(1) NOT NULL DEFAULT 0,
  `is_public` tinyint(1) NOT NULL DEFAULT 0,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Third Level Dependencies (Depend on decks and categories)
--

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `card_id` int(11) NOT NULL,
  `deck_id` int(11) NOT NULL,
  `front_content` text NOT NULL,
  `back_content` text NOT NULL,
  `front_image_url` varchar(255) DEFAULT NULL,
  `back_image_url` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `last_modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `deck_categories`
--

CREATE TABLE `deck_categories` (
  `deck_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `deck_statistics`
--

CREATE TABLE `deck_statistics` (
  `stat_id` int(11) NOT NULL,
  `deck_id` int(11) NOT NULL,
  `total_cards` int(11) NOT NULL DEFAULT 0,
  `mastered_cards` int(11) NOT NULL DEFAULT 0,
  `learning_cards` int(11) NOT NULL DEFAULT 0,
  `new_cards` int(11) NOT NULL DEFAULT 0,
  `mastery_percentage` float NOT NULL DEFAULT 0,
  `last_calculated` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `study_sessions`
--

CREATE TABLE `study_sessions` (
  `session_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `deck_id` int(11) NOT NULL,
  `started_at` datetime NOT NULL DEFAULT current_timestamp(),
  `ended_at` datetime DEFAULT NULL,
  `cards_studied` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Fourth Level Dependencies (Depend on cards)
--

--
-- Table structure for table `card_tags`
--

CREATE TABLE `card_tags` (
  `card_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `study_progress`
--

CREATE TABLE `study_progress` (
  `progress_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `card_id` int(11) NOT NULL,
  `ease_factor` float NOT NULL DEFAULT 2.5,
  `last_studied` datetime DEFAULT NULL,
  `next_review` datetime DEFAULT NULL,
  `review_count` int(11) NOT NULL DEFAULT 0,
  `last_performance` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Dumping data for tables
--

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `created_at`, `theme_preference`, `last_login`, `user_type`, `interests`) VALUES
(1, 'example', 'example@email.com', '$2b$10$42x.IOz611DDExs3ycr9UeRInK0C.uO/eg.Kv7w0c94bEnw9OlQq6', '2025-04-30 17:00:05', NULL, NULL, NULL, '[\"coding\",\"design\"]');

--
-- Dumping data for table `folders`
--

INSERT INTO `folders` (`folder_id`, `user_id`, `name`, `created_at`, `last_modified`, `is_favorite`) VALUES
(1, 1, 'Net101', '2025-05-01 15:29:31', '2025-05-01 15:29:31', 1),
(2, 1, 'Gec Art', '2025-05-01 15:29:31', '2025-05-01 15:29:31', 0),
(3, 1, 'MIL', '2025-05-01 15:29:31', '2025-05-01 15:29:31', 1),
(4, 1, 'Gec Hist', '2025-05-01 15:29:31', '2025-05-01 15:29:31', 1),
(5, 1, 'Spanish', '2025-05-01 15:29:31', '2025-05-01 15:29:31', 0),
(6, 1, 'German', '2025-05-01 15:29:31', '2025-05-01 15:29:31', 1),
(7, 1, 'Portuguese', '2025-05-01 15:29:31', '2025-05-01 15:29:31', 1);

--
-- Dumping data for table `decks`
--

INSERT INTO `decks` (`deck_id`, `user_id`, `folder_id`, `title`, `description`, `created_at`, `last_modified`, `last_studied`, `is_favorite`, `is_public`, `is_deleted`, `deleted_at`) VALUES
(1, 1, 1, 'Net101', 'Networking', '2025-05-01 15:29:41', '2025-05-01 15:29:41', NULL, 0, 0, 0, NULL),
(2, 1, 2, 'Gec Art', 'Art History', '2025-05-01 15:29:41', '2025-05-01 15:29:41', NULL, 0, 0, 0, NULL),
(3, 1, 3, 'MIL', 'Media', '2025-05-01 15:29:41', '2025-05-01 15:29:41', NULL, 0, 0, 0, NULL),
(4, 1, 4, 'Gec Hist', 'Philippine History', '2025-05-01 15:29:41', '2025-05-01 15:29:41', NULL, 0, 0, 0, NULL),
(5, 1, 5, 'Spanish', 'Basic Spanish', '2025-05-01 15:29:41', '2025-05-01 15:29:41', NULL, 0, 0, 0, NULL),
(6, 1, 6, 'German', 'Basic German', '2025-05-01 15:29:41', '2025-05-01 15:29:41', NULL, 0, 0, 0, NULL),
(7, 1, 7, 'Portugues', 'Basic Portuguese', '2025-05-01 15:29:41', '2025-05-01 15:29:41', NULL, 0, 0, 0, NULL);

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`card_id`, `deck_id`, `front_content`, `back_content`, `front_image_url`, `back_image_url`, `notes`, `position`, `created_at`, `last_modified`) VALUES
(1, 1, 'If a signal does not change at all. Its frequency is what ', 'Zero', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(2, 1, 'It means that a frequency that change over a long span of time', 'High', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(3, 1, 'It is a transmission that have discrete states and takes discrete values.', 'Digital Data', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(4, 1, 'It is a transmission that can have only a limited number of values.', 'Digital Signals', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(5, 1, 'It is a transmission that can have an infinite number of values in range', 'Analog Signals', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(6, 2, 'The gothic cathedrals express the aforementioned sentiments that possessed the soul of Northern Europe- Middle Ages.', 'Vertical Lines', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(7, 2, 'Found landscapes calm bodies of water and in the distant meeting of the earth and sky which is called', 'Horizontal Lines', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(8, 2, 'Modify the sharpness of Vertical and Horizontal lines giving a harmonizing effect?', 'Transitional Lines', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(9, 2, 'It occurs when two or more lines are drawn within a corner', 'Transitional Lines', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(10, 2, 'An important element at the disposal of every artist?', 'Line', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(11, 3, 'What was used in Egypt around 2500 BC for writing?', 'Papyrus', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(12, 3, 'When was the typewriter invented?', '1800', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(13, 3, 'What was the first newspaper published in 1640?', 'The London Gazette', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(14, 3, 'What significant development occurred in Mesopotamia around 2400 BC?', 'Clay tablets', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(15, 3, 'What is one example of a prehistoric artifact from 35000 BC', 'Cave paintings', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(16, 4, 'The word is not used to imply disparagement of any sort, but it does imply the necessity for the application of special kinds of safeguards against error.', 'subjective', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(17, 4, 'Is the linguistic and philosophical study of meaning in language', 'Semantics', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(18, 4, 'Cannot be seen, felt, tasted, heard, or smelled', 'Testimony', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(19, 4, 'Its duty is to draw insights from the ideas and realities that have shaped the lives of men and women and the society.', 'historian\'s', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(20, 4, 'Are the requirements we all need individually for human survival', 'physiological needs', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(21, 5, 'El mensaje fue recibido.', 'The message was received', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(22, 5, 'La reunion fue cancelada.', 'The meeting was canceled', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(23, 5, 'Las cartas fueron enviadas.', 'the letters were sent', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(24, 5, 'El libro fue leído.', 'The book was read', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(25, 5, 'La casa fue construida.', 'The house was built', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(26, 6, 'Es schneit', 'It is snowing', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(27, 6, 'Die Temperatur', 'The temperature', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(28, 6, 'Der Schnee', 'The Snow', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(29, 6, 'Der Regen', 'The rain', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(30, 6, 'Das wetter', 'The Weather', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(31, 7, 'e importante que nos falemos', 'its important that we speak', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(32, 7, 'e necessario que ele trabalhe', 'its necessary that he works', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(33, 7, 'que nós tenhamos', 'That he does', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(34, 7, 'que ele faca', 'That he does', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(35, 7, 'que você venha', 'that we have', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59');

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`card_id`),
  ADD KEY `deck_id` (`deck_id`);

--
-- Indexes for table `card_tags`
--
ALTER TABLE `card_tags`
  ADD PRIMARY KEY (`card_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `decks`
--
ALTER TABLE `decks`
  ADD PRIMARY KEY (`deck_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `folder_id` (`folder_id`);

--
-- Indexes for table `deck_categories`
--
ALTER TABLE `deck_categories`
  ADD PRIMARY KEY (`deck_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `deck_statistics`
--
ALTER TABLE `deck_statistics`
  ADD PRIMARY KEY (`stat_id`),
  ADD UNIQUE KEY `deck_id` (`deck_id`);

--
-- Indexes for table `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`folder_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`school_id`),
  ADD UNIQUE KEY `domain` (`domain`);

--
-- Indexes for table `study_progress`
--
ALTER TABLE `study_progress`
  ADD PRIMARY KEY (`progress_id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`card_id`),
  ADD KEY `card_id` (`card_id`);

--
-- Indexes for table `study_sessions`
--
ALTER TABLE `study_sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `deck_id` (`deck_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_schools`
--
ALTER TABLE `user_schools`
  ADD PRIMARY KEY (`user_id`,`school_id`),
  ADD KEY `school_id` (`school_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `decks`
--
ALTER TABLE `decks`
  MODIFY `deck_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `deck_statistics`
--
ALTER TABLE `deck_statistics`
  MODIFY `stat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `folders`
--
ALTER TABLE `folders`
  MODIFY `folder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `school_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `study_progress`
--
ALTER TABLE `study_progress`
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `study_sessions`
--
ALTER TABLE `study_sessions`
  MODIFY `session_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`deck_id`) REFERENCES `decks` (`deck_id`) ON DELETE CASCADE;

--
-- Constraints for table `card_tags`
--
ALTER TABLE `card_tags`
  ADD CONSTRAINT `card_tags_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `cards` (`card_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `card_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE;

--
-- Constraints for table `decks`
--
ALTER TABLE `decks`
  ADD CONSTRAINT `decks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `decks_ibfk_2` FOREIGN KEY (`folder_id`) REFERENCES `folders` (`folder_id`) ON DELETE SET NULL;

--
-- Constraints for table `deck_categories`
--
ALTER TABLE `deck_categories`
  ADD CONSTRAINT `deck_categories_ibfk_1` FOREIGN KEY (`deck_id`) REFERENCES `decks` (`deck_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `deck_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `deck_statistics`
--
ALTER TABLE `deck_statistics`
  ADD CONSTRAINT `deck_statistics_ibfk_1` FOREIGN KEY (`deck_id`) REFERENCES `decks` (`deck_id`) ON DELETE CASCADE;

--
-- Constraints for table `folders`
--
ALTER TABLE `folders`
  ADD CONSTRAINT `folders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `study_progress`
--
ALTER TABLE `study_progress`
  ADD CONSTRAINT `study_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `study_progress_ibfk_2` FOREIGN KEY (`card_id`) REFERENCES `cards` (`card_id`) ON DELETE CASCADE;

--
-- Constraints for table `study_sessions`
--
ALTER TABLE `study_sessions`
  ADD CONSTRAINT `study_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `study_sessions_ibfk_2` FOREIGN KEY (`deck_id`) REFERENCES `decks` (`deck_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_schools`
--
ALTER TABLE `user_schools`
  ADD CONSTRAINT `user_schools_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_schools_ibfk_2` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;