-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2025 at 10:20 AM
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
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `school_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `domain` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `color` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

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
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `created_at`, `theme_preference`, `last_login`, `user_type`, `interests`) VALUES
(1, 'exze', 'akina.alegre@gmail.com', '$2b$10$5DeNgiab5HWT9dcFUwYwCe3sPSP0WwQqNExVEBWkEifL5fjHtB84K', '2025-04-30 17:00:05', NULL, NULL, NULL, '[\"coding\",\"design\"]'),
(2, 'example', 'example@email.com', '$2b$10$42x.IOz611DDExs3ycr9UeRInK0C.uO/eg.Kv7w0c94bEnw9OlQq6', '2025-05-02 14:06:31', NULL, NULL, 'Other', '[\"Media\"]');

-- --------------------------------------------------------

--
-- Table structure for table `folders`
--

CREATE TABLE `folders` (
  `folder_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `last_modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_favorite` tinyint(1) NOT NULL DEFAULT 0,
  `color` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `folders`
--

INSERT INTO `folders` (`folder_id`, `user_id`, `name`, `created_at`, `last_modified`, `is_favorite`, `color`) VALUES
(1, 1, 'Technology', '2025-05-01 15:29:31', '2025-05-02 01:52:59', 1, 'sky'),
(2, 1, 'Language', '2025-05-01 15:29:31', '2025-05-02 01:52:45', 0, 'pink'),
(3, 1, 'Gec Subs', '2025-05-01 15:29:31', '2025-05-02 01:53:14', 1, 'yellow'),
(4, 1, 'Folder 4', '2025-05-01 15:29:31', '2025-05-02 23:45:24', 1, 'lime'),
(5, 1, 'Folder 5', '2025-05-01 15:29:31', '2025-05-02 14:01:05', 0, 'red'),
(18, 1, 'Math', '2025-05-02 16:21:27', '2025-05-02 16:21:27', 0, 'blue'),
(19, 1, 'Fit Me', '2025-05-02 16:21:27', '2025-05-02 16:21:27', 0, 'green');



-- --------------------------------------------------------

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

--
-- Dumping data for table `decks`
--

INSERT INTO `decks` (`deck_id`, `user_id`, `folder_id`, `title`, `description`, `created_at`, `last_modified`, `last_studied`, `is_favorite`, `is_public`, `is_deleted`, `deleted_at`) VALUES
(1, 1, 1, 'Net101', 'Networking my ass', '2025-05-01 15:29:41', '2025-05-02 20:52:15', NULL, 0, 0, 0, NULL),
(2, 1, 3, 'Gec Art', 'Art Appreciation', '2025-05-01 15:29:41', '2025-05-02 20:31:54', NULL, 0, 0, 0, NULL),
(3, 1, 1, 'MIL', 'Media', '2025-05-01 15:29:41', '2025-05-02 01:54:39', NULL, 0, 0, 0, NULL),
(4, 1, 3, 'Gec Hist', 'Philippine History', '2025-05-01 15:29:41', '2025-05-02 01:54:20', NULL, 0, 0, 0, NULL),
(5, 1, 2, 'Spanish', 'Basic Spanish', '2025-05-01 15:29:41', '2025-05-02 01:54:51', NULL, 0, 0, 0, NULL),
(6, 1, 2, 'German', 'Basic German', '2025-05-01 15:29:41', '2025-05-02 20:53:30', NULL, 0, 0, 0, NULL),
(7, 1, 4, 'Portugues', 'Basic Portuguese', '2025-05-01 15:29:41', '2025-05-02 01:55:26', NULL, 0, 0, 0, NULL),
(10, 1, 18, 'Gec Math', NULL, '2025-05-02 16:22:57', '2025-05-02 16:22:57', NULL, 0, 0, 0, NULL),
(11, 1, 2, 'Test Deck', NULL, '2025-05-02 17:52:54', '2025-05-02 20:28:58', NULL, 0, 0, 1, '2025-05-02 20:28:58'),
(12, 1, 2, 'Another test deck', NULL, '2025-05-02 17:53:17', '2025-05-02 20:28:55', NULL, 0, 0, 1, '2025-05-02 20:28:55'),
(13, 1, 19, 'Fit Me', 'Movement Enchancement' , '2025-05-02 17:53:17', '2025-05-02 20:28:55', NULL, 0, 0, 1, '2025-05-02 20:28:55');


-- --------------------------------------------------------

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
(31, 7, 'e importante que nos falemos', 'its important that we speak', 'https://placehold.co/100', NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-04 05:59:17'),
(32, 7, 'e necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe e necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe e necessario que ele trabalhe\ne necessario que ele trabalhe\ne necessario que ele trabalhe\n', 'its necessary that he works', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-04 06:08:10'),
(33, 7, 'que nós tenhamos', 'That he does', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(34, 7, 'que ele faca', 'That he does', NULL, NULL, NULL, 0, '2025-05-01 15:29:59', '2025-05-01 15:29:59'),
(35, 13, 'What is movement enhancement?', 'Training focused on improving quality, efficiency, and range of movement', NULL, NULL, NULL, 0, NOW(), NOW()),
(36, 13, 'What are the benefits of movement enhancement?', 'Improved posture, reduced injury risk, better athletic performance', NULL, NULL, NULL, 0, NOW(), NOW()),
(37, 13, 'What is proprioception?', 'The body''s ability to sense movement, action, and location', NULL, NULL, NULL, 0, NOW(), NOW()),
(38, 13, 'What are the 3 planes of movement?', 'Sagittal (forward/backward), Frontal (side-to-side), Transverse (rotational)', NULL, NULL, NULL, 0, NOW(), NOW()),
(39, 13, 'What is the difference between mobility and flexibility?', 'Mobility is active movement, flexibility is passive range', NULL, NULL, NULL, 0, NOW(), NOW()),
(40, 13, 'What are primal movement patterns?', 'Basic human movements: squat, lunge, push, pull, bend, twist, gait', NULL, NULL, NULL, 0, NOW(), NOW()),
(41, 13, 'What is a corrective exercise?', 'Exercises designed to improve movement imbalances', NULL, NULL, NULL, 0, NOW(), NOW()),
(42, 13, 'What is kinetic chain movement?', 'How different body segments work together during motion', NULL, NULL, NULL, 0, NOW(), NOW()),
(43, 13, 'What is the importance of scapular mobility?', 'Essential for proper shoulder function and upper body movements', NULL, NULL, NULL, 0, NOW(), NOW()),
(44, 13, 'What is the difference between open and closed kinetic chain exercises?', 'Open: distal segment moves (leg kick); Closed: fixed (squat)', NULL, NULL, NULL, 0, NOW(), NOW()),
(45, 13, 'What are the components of proper breathing during movement?', 'Diaphragmatic breathing, maintaining intra-abdominal pressure', NULL, NULL, NULL, 0, NOW(), NOW()),
(46, 13, 'What is neuromuscular efficiency?', 'The ability of the nervous system to properly recruit muscles', NULL, NULL, NULL, 0, NOW(), NOW()),
(47, 13, 'What is reciprocal inhibition?', 'When one muscle contracts, its antagonist relaxes', NULL, NULL, NULL, 0, NOW(), NOW()),
(48, 13, 'What are common movement compensations?', 'When the body alters movement patterns due to limitations', NULL, NULL, NULL, 0, NOW(), NOW()),
(49, 13, 'What is the importance of hip mobility?', 'Affects lower back health, squat depth, and athletic performance', NULL, NULL, NULL, 0, NOW(), NOW()),
(50, 13, 'What is the joint-by-joint approach?', 'Concept that alternating joints need stability/mobility (ankle-mobile, knee-stable, etc.)', NULL, NULL, NULL, 0, NOW(), NOW()),
(51, 13, 'What are common ankle mobility restrictions?', 'Limited dorsiflexion from tight calves or joint issues', NULL, NULL, NULL, 0, NOW(), NOW()),
(52, 13, 'What is the importance of thoracic spine mobility?', 'Essential for rotational movements and overhead motions', NULL, NULL, NULL, 0, NOW(), NOW()),
(53, 13, 'What are movement prep exercises?', 'Dynamic exercises to prepare the body for activity', NULL, NULL, NULL, 0, NOW(), NOW()),
(54, 13, 'What is the difference between bilateral and unilateral movements?', 'Bilateral: both sides together; Unilateral: one side at a time', NULL, NULL, NULL, 0, NOW(), NOW()),
(55, 13, 'What is a movement screen?', 'Assessment to identify movement limitations/imbalances', NULL, NULL, NULL, 0, NOW(), NOW()),
(56, 13, 'What are common causes of poor movement patterns?', 'Muscle imbalances, past injuries, poor posture, sedentary lifestyle', NULL, NULL, NULL, 0, NOW(), NOW()),
(57, 13, 'What is the importance of core stability in movement?', 'Provides foundation for efficient force transfer between upper/lower body', NULL, NULL, NULL, 0, NOW(), NOW()),
(58, 13, 'What is the role of fascia in movement?', 'Connective tissue that transmits force and affects movement quality', NULL, NULL, NULL, 0, NOW(), NOW()),
(59, 13, 'What are the benefits of barefoot training?', 'Improves foot strength, proprioception, and natural movement patterns', NULL, NULL, NULL, 0, NOW(), NOW()),
(60, 13, 'What is dynamic joint mobility?', 'Active movements that take joints through their full range', NULL, NULL, NULL, 0, NOW(), NOW()),
(61, 13, 'What is the importance of grip strength in movement?', 'Affects pulling movements and overall force production', NULL, NULL, NULL, 0, NOW(), NOW()),
(62, 13, 'What are common shoulder mobility restrictions?', 'Limited overhead mobility from tight lats or rotator cuff issues', NULL, NULL, NULL, 0, NOW(), NOW()),
(63, 13, 'What is the role of the vestibular system in movement?', 'Provides balance and spatial orientation information', NULL, NULL, NULL, 0, NOW(), NOW()),
(64, 13, 'What is the importance of foot mobility?', 'Affects entire kinetic chain from ground up', NULL, NULL, NULL, 0, NOW(), NOW());

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `card_id` int(11) NOT NULL,
  `deck_id` int(11) NOT NULL,
  `rating` varchar(10) NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`school_id`),
  ADD UNIQUE KEY `domain` (`domain`);

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
-- Indexes for table `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`folder_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `decks`
--
ALTER TABLE `decks`
  ADD PRIMARY KEY (`deck_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `folder_id` (`folder_id`);

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`card_id`),
  ADD KEY `deck_id` (`deck_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `card_id` (`card_id`),
  ADD KEY `deck_id` (`deck_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `school_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `folders`
--
ALTER TABLE `folders`
  MODIFY `folder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `decks`
--
ALTER TABLE `decks`
  MODIFY `deck_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `folders`
--
ALTER TABLE `folders`
  ADD CONSTRAINT `folders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `decks`
--
ALTER TABLE `decks`
  ADD CONSTRAINT `decks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `decks_ibfk_2` FOREIGN KEY (`folder_id`) REFERENCES `folders` (`folder_id`) ON DELETE SET NULL;

--
-- Constraints for table `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`deck_id`) REFERENCES `decks` (`deck_id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`card_id`) REFERENCES `cards` (`card_id`),
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`deck_id`) REFERENCES `decks` (`deck_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;