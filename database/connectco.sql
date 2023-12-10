-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2023 at 02:29 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `connectco`
--

-- --------------------------------------------------------

--
-- Table structure for table `msg`
--

CREATE TABLE `msg` (
  `id` int(11) NOT NULL,
  `senderid` int(11) NOT NULL,
  `receiverid` int(11) NOT NULL,
  `txt` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `msg`
--

INSERT INTO `msg` (`id`, `senderid`, `receiverid`, `txt`) VALUES
(28, 0, 0, '$txt'),
(29, 1, 3, 'Hey'),
(30, 1, 2, 'yo'),
(31, 1, 2, 'test'),
(32, 1, 2, 'bro'),
(33, 1, 2, 'one'),
(34, 1, 2, 'two'),
(35, 2, 1, 'hey man'),
(36, 2, 1, 'whats up'),
(37, 1, 5, 'Hello'),
(38, 1, 5, 'TEST'),
(39, 5, 1, 'THIS IS MY REPLY');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `doer` varchar(255) NOT NULL,
  `taskname` varchar(255) NOT NULL,
  `taskdesc` varchar(255) NOT NULL,
  `duedate` date NOT NULL,
  `duetime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `doer`, `taskname`, `taskdesc`, `duedate`, `duetime`) VALUES
(1, 'Ezekiel Kyle', 'Test', 'Test', '2023-11-22', '15:30:00'),
(2, 'Don Martin', 'Task #1', 'Task #1', '2023-11-17', '19:45:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(20) NOT NULL,
  `team` int(11) NOT NULL,
  `control` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `team`, `control`, `fname`, `lname`) VALUES
(1, 'ezekiel.blanco1@gmail.com', 'testtest1!', 0, 0, 'Ezekiel Kyle', 'Blanco'),
(2, 'don.martin.francisco@adamson.edu.ph', 'imissyou', 0, 0, 'Don Martin', 'Francisco'),
(3, 'elvin.john.cervania@adamson.edu.ph', 'helloworld', 0, 0, 'Elvin John', 'Cervania'),
(4, 'john.andrei.cabili@adamson.edu.ph', 'asdfghjkl', 0, 0, 'John Andrei', 'Cabili'),
(5, 'patricia.colleen.palmejar@adamson.edu.ph', 'patotot1', 0, 0, 'Patricia Colleen', 'Palmejar'),
(6, 'admin', 'admin123', 0, 1, 'Admin', 'Account'),
(7, 'juandelacruz@gmail.com', 'testpass2', 0, 0, 'Juan', 'Dela Cruz');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `msg`
--
ALTER TABLE `msg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `msg`
--
ALTER TABLE `msg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
