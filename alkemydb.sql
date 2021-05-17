-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-05-2021 a las 00:21:56
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alkemydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `charactermovies`
--

CREATE TABLE `charactermovies` (
  `movieId` int(11) NOT NULL,
  `characterId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `charactermovies`
--

/* INSERT INTO `charactermovies` (`movieId`, `characterId`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2021-05-17 19:44:50', '2021-05-17 19:44:50'),
(1, 2, '2021-05-17 19:48:46', '2021-05-17 19:48:46');
*/
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `characters`
--

CREATE TABLE `characters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `age` int(11) NOT NULL,
  `weight` double NOT NULL,
  `history` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `characters`
/*Insert characters in DB

INSERT INTO `characters` (`id`, `name`, `age`, `weight`, `history`, `image`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 'Robert Downey Jr', 56, 78, 'an American actor, voice actor, producer, and singer.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/220px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg', 'Avengers: End game', '2021-05-17 19:44:50', '2021-05-17 19:44:50'),
(2, 'Chris Evans', 39, 77, 'is an American actor, voice actor, director, and producer.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Chris_Evans_2020_%28cropped%29.jpg/220px-Chris_Evans_2020_%28cropped%29.jpg', 'Avengers: End game', '2021-05-17 19:48:46', '2021-05-17 19:48:46');
*/
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
 */
--
-- Volcado de datos para la tabla `genres`
--Insert  genre in DB

/*INSERT INTO `genres` (`id`, `name`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Action', 'action', '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
(2, 'Science fiction', 'scfic', '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
(3, 'Comedy', 'comedy', '2021-05-17 00:00:00', '2021-05-17 00:00:00');
*/
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `creation_date` date NOT NULL,
  `qualification` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `genreId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `movies`
-- Insert a movie in DB

/*INSERT INTO `movies` (`id`, `title`, `image`, `creation_date`, `qualification`, `createdAt`, `updatedAt`, `genreId`) VALUES
(1, 'Avengers: End game', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Avengers_Endgame_Logo_Black.svg/1200px-Avengers_Endgame_Logo_Black.svg.png', '2019-04-22', 4, '2021-05-17 19:43:14', '2021-05-17 20:40:14', 1),
(2, ' Rogue One: A Star Wars Story', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Star_Wars_Rogue_One_Logo.svg/275px-Star_Wars_Rogue_One_Logo.svg.png', '2016-12-15', 5, '2021-05-17 19:45:53', '2021-05-17 19:45:53', 1);
*/
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--


/*INSERT INTO `users` (`id`, `email`, `name`, `password`, `createdAt`, `updatedAt`) VALUES
('329b3071-97a8-45cd-852e-945c4915906f', 'emi@gmail.com ', 'Emiliano', '$2a$10$b/9rAKW18.XA7yWKEucP2ukbv3DRcTJzIerOTqO6antWXDvx3hYqy', '2021-05-17 20:07:47', '2021-05-17 20:07:47');
*/
--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `charactermovies`
--
ALTER TABLE `charactermovies`
  ADD PRIMARY KEY (`movieId`,`characterId`),
  ADD UNIQUE KEY `characterMovies_movieId_characterId_unique` (`movieId`,`characterId`),
  ADD KEY `characterId` (`characterId`);

--
-- Indices de la tabla `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genreId` (`genreId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `charactermovies`
--
ALTER TABLE `charactermovies`
  ADD CONSTRAINT `charactermovies_ibfk_1` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `charactermovies_ibfk_2` FOREIGN KEY (`characterId`) REFERENCES `characters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
