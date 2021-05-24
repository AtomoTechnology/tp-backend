-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-05-2021 a las 16:47:30
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
(15, 30, 1, 'Jereq', '$2a$10$jTqkeCa2A1R.89tbAh5d2uwbyOASIX0lOq/Dt40AANmUfGrkb4vFe', 1),
(16, 31, 2, 'Jereqr', '$2a$10$Dua9u.9hdnnnohYvyuD7iOchNqIj/.SNusaOQs1q/Wt8h1JZ2rkbG', 1),
(17, 32, 2, 'prade', '$2a$10$8al1KitPpxtrgl28phG7ZemW6dXkFy4y1Hc66B2fL5X3HB0VHEahe', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hangers`
--

CREATE TABLE `hangers` (
  `id` bigint(20) NOT NULL,
  `idLocation` bigint(20) NOT NULL,
  `nrohanger` int(11) NOT NULL,
  `description` int(11) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kayakhangers`
--

CREATE TABLE `kayakhangers` (
  `id` int(11) NOT NULL,
  `idhanger` bigint(20) NOT NULL,
  `idkayak` bigint(20) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kayaks`
--

CREATE TABLE `kayaks` (
  `id` bigint(20) NOT NULL,
  `idPartner` bigint(20) NOT NULL,
  `idhanger` bigint(20) NOT NULL,
  `idKayakType` bigint(20) NOT NULL,
  `crewmember` int(11) NOT NULL,
  `shovelQuantity` int(11) NOT NULL,
  `nroKayak` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `img` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kayaktypes`
--

CREATE TABLE `kayaktypes` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `kayaktypes`
--

INSERT INTO `kayaktypes` (`id`, `name`, `description`, `state`) VALUES
(1, 'Kayak de competición en mar', 'Los kayaks de competición en mar o surf ski, son embarcaciones pensadas para competir en mar abierto, competiciones internacionales en mar abierto y en los cinco continentes, algunas de ellas de cierto renombre. Se trata de embarcaciones largas (6 m de eslora) y estrechas (45 cm de ancho); que deben ser rápidas y suficientemente estables. Para poder domar el oleaje marino acumulan bastante volumen en proa y en ocasiones se diseñan con elementos adicionales como proas de \'pato\'. Como es habitual ', 1),
(2, 'Kayak de mar y travesía', 'Por sus formas, quizá sean los modelos actuales que más recuerdan los kayaks esquimales. Su rasgo característico serán su proa y popa ligeramente elevadas y de perfil muy redondeado que les permite acometer el oleaje con garantías. Serán kayaks largos, capaces de cubrir grandes distancias, más anchos que los modelos de velocidad y con compartimentos estancos que les permiten llevar cierta cantidad de carga (como provisiones, agua, elementos de campamento, botiquín, cartografía, sistemas de comun', 1),
(5, 'Kayak de Slalom', 'Adaptados a las competiciones de Slalom en aguas bravas, disciplina olímpica que consiste en recorrer un circuito a través de \"puertas\" hechas con dos varillas que cuelgan a unos pocos centímetros del agua, a las que no debe tocar el kayak, el remo o el competidor. Estas embarcaciones evolucionan en zonas de fuerte corriente e incluso desnivel donde es esencial una gran capacidad de maniobra. Son kayaks muy cortos (3.5m), relativamente estrechos (60cm), redondeados y planos en proa y popa.', 1),
(6, 'Kayak de aguas bravas', 'Deben ser embarcaciones rápidas y capaces de desenvolverse bajo fuertes corrientes y grandes volúmenes de agua. Su diseño en algunos aspectos se asemeja a los kayaks de pista. Son largos, relativamente estrechos y con formas verticales en proa y popa. Se diferencian de estos en que se diseñan acumulando cierto volumen extra por encima flotando como si nada, especialmente en proa. Dicho rasgo les permite salir a flote rápidamente y evolucionar ágilmente en saltos o desniveles de agua. Finalmente ', 1),
(7, 'Kayak de polo', 'Muestran cierto parecido a las modelos clásicos de aguas bravas. Son kayaks cortos, de casco redondeado y acabados en proa y popa también redondeadas, que en muchas ocasiones se remata con una pieza de goma; pues son frecuentes los golpes entre jugadores. Se diferencian de los modelos de eslalon en las formas más redondeadas en sus extremos. Su comportamiento hidrodinámico en aguas tranquilas será muy similar. Serán embarcaciones maniobrables y en general lentas en comparación a los modelos de p', 1),
(8, 'Kayak de surf y de estilo libre', 'Adecuado a las nuevas modalidades de piragüismo, en sus orígenes el Kayak surf se practicaba con kayaks de aguas bravas. Su desarrollo general ha generado embarcaciones específicas. En general, son kayaks muy cortos, de casco poco redondeado, de apariencia plana y en ocasiones incluyendo bordes, aristas o quillas. Proa y popa también suelen presentar una apariencia plana. La proa ligeramente levantada y la popa más baja y más plana, tal y como suelen acabar las tablas de surf. Su diseño suele in', 1),
(9, 'Kayak Sit-on-top', 'Vienen en configuraciones de 1 a 4 palistas, y son populares para la paseos, travesías, pesca y buceo. El asiento está ligeramente por encima del nivel del agua, por lo que el centro de gravedad del palista es más alto que en un kayak tradicional. Para compensar el centro de gravedad más alto, estos modelos son más anchos y más lentos que un kayak tradicional de la misma longitud.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locations`
--

CREATE TABLE `locations` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partners`
--

CREATE TABLE `partners` (
  `id` bigint(20) NOT NULL,
  `fistName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `address` varchar(250) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(30, 'con controlador', 'babel', '2021-04-25 00:00:00', 'Ov Largos', '341546', 1),
(31, 'con controlador', 'babel', '2021-05-19 00:00:00', 'Ov Largos', '341546', 1),
(32, 'con controlador', 'babel', '2021-05-19 00:00:00', 'Ov Largos', '341546', 1);

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
-- Indices de la tabla `hangers`
--
ALTER TABLE `hangers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hanger_location` (`idLocation`);

--
-- Indices de la tabla `kayakhangers`
--
ALTER TABLE `kayakhangers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kayakHanger_hanger` (`idhanger`),
  ADD KEY `kayakHanger_kayak` (`idkayak`);

--
-- Indices de la tabla `kayaks`
--
ALTER TABLE `kayaks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kayak_kayakType` (`idKayakType`),
  ADD KEY `kayak_hanger` (`idhanger`),
  ADD KEY `kayak_partner` (`idPartner`);

--
-- Indices de la tabla `kayaktypes`
--
ALTER TABLE `kayaktypes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `hangers`
--
ALTER TABLE `hangers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `kayakhangers`
--
ALTER TABLE `kayakhangers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `kayaks`
--
ALTER TABLE `kayaks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `kayaktypes`
--
ALTER TABLE `kayaktypes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `locations`
--
ALTER TABLE `locations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `partners`
--
ALTER TABLE `partners`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `accounts_ibfk_2` FOREIGN KEY (`idRole`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `hangers`
--
ALTER TABLE `hangers`
  ADD CONSTRAINT `hanger_location` FOREIGN KEY (`idLocation`) REFERENCES `locations` (`id`);

--
-- Filtros para la tabla `kayakhangers`
--
ALTER TABLE `kayakhangers`
  ADD CONSTRAINT `kayakHanger_hanger` FOREIGN KEY (`idhanger`) REFERENCES `hangers` (`id`),
  ADD CONSTRAINT `kayakHanger_kayak` FOREIGN KEY (`idkayak`) REFERENCES `kayaks` (`id`);

--
-- Filtros para la tabla `kayaks`
--
ALTER TABLE `kayaks`
  ADD CONSTRAINT `kayak_hanger` FOREIGN KEY (`idhanger`) REFERENCES `hangers` (`id`),
  ADD CONSTRAINT `kayak_kayakType` FOREIGN KEY (`idKayakType`) REFERENCES `kayaktypes` (`id`),
  ADD CONSTRAINT `kayak_partner` FOREIGN KEY (`idPartner`) REFERENCES `partners` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
