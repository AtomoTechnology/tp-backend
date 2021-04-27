-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-04-2021 a las 00:42:06
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kayak`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateOrUpdate` (IN `_id` BIGINT(20), IN `_firstName` VARCHAR(200), IN `_lastName` VARCHAR(100), IN `_address` VARCHAR(250), IN `_phone` VARCHAR(15))  IF _id = 0 THEN
    	INSERT INTO users (address, creationDate, firstName, lastName, phone, state) VALUES(_address, CURDATE(), _firstName, _lastName, _phone, 1);	
        SET _id = LAST_INSERT_ID();
    ELSE 
    	UPDATE users SET address = _address, firstName = _firstName, lastName = _lastName WHERE id = _id;
    END IF$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateOrUpdateUser` (IN `_id` INT(20), IN `_firstName` VARCHAR(200), IN `_lastName` VARCHAR(100), IN `_address` VARCHAR(250), IN `_phone` VARCHAR(15), IN `_idRole` BIGINT(20), IN `_userName` VARCHAR(100), IN `_userPass` VARCHAR(100))  IF  _id = 0 THEN
    	INSERT INTO users (address, creationDate, firstName, lastName, phone, state) VALUES(_address, CURDATE(),  _firstName, _lastName, _phone, 1);
        SET @_idUser = last_insert_id();
        INSERT INTO accounts(idUser, idRole, userName, userPass, state) VALUES(@_idUser, _idRole, _userName, _userPass, 1);
    ELSE 
    	UPDATE users SET address = _address, firstName = _firstName, lastName = _lastName, phone = _phone  WHERE id = _id;
END IF$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts`
--

CREATE TABLE `accounts` (
  `id` bigint(20) NOT NULL,
  `idUser` bigint(20) NOT NULL,
  `idRole` bigint(20) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `userPass` varchar(100) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`id`, `idUser`, `idRole`, `userName`, `userPass`, `state`) VALUES
(8, 23, 1, 'prade516', '$2a$10$lTKCaq4TKTY8zJ/Vun9fqe0v1h1XdomTXYgT7TV0lvKo/tPlh5Oxi', 1),
(11, 26, 2, 'Jere', '$2a$10$nig7w60MGA5EbyD8N/hzsuj78l9yJDYho7tfqCqlahcYbUqT/vG6y', 1),
(15, 30, 2, 'Jereq', '$2a$10$jTqkeCa2A1R.89tbAh5d2uwbyOASIX0lOq/Dt40AANmUfGrkb4vFe', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `state`) VALUES
(1, 'admin', 'Tiene permiso para hacer todo', 1),
(2, 'Employee', 'Con aecceso limitado', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `address` varchar(250) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `creationDate`, `address`, `phone`, `state`) VALUES
(1, 'Juana Camilla Jere', 'Gonano', '2021-04-24 19:14:05', 'Ov Largos', '341546', 1),
(2, 'Jere', 'Eugene', '2021-04-24 19:53:53', 'Ov Largos', '3415555', 1),
(3, 'Itati', 'Gonano', '2021-04-24 00:00:00', 'Ov Largos', '341546', 1),
(4, 'Juana Camilla', 'Gonano', '2021-04-24 00:00:00', 'Ov Largos', '341546', 2),
(5, 'Juana Camilla Jere', 'Gonano', '2021-04-24 00:00:00', 'Ov Largos', '341546', 1),
(6, 'Juana Camilla Jere', 'Gonano', '2021-04-24 00:00:00', 'Ov Largos', '341546', 1),
(7, 'Juana Camilla Jere', 'Gonano', '2021-04-24 00:00:00', 'Ov Largos', '341546', 1),
(8, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(9, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(10, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(11, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(12, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(13, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(14, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(15, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(16, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(17, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(18, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(19, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(20, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(21, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(22, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(23, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(24, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(25, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(26, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(27, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(28, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(29, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(30, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accounts_ibfk_1` (`idUser`),
  ADD KEY `idRole` (`idRole`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `accounts_ibfk_2` FOREIGN KEY (`idRole`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
