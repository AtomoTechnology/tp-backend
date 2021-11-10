CREATE DATABASE  IF NOT EXISTS `kayak` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `kayak`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: kayak
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userId` bigint NOT NULL,
  `roleId` bigint NOT NULL,
  `userName` varchar(100) NOT NULL,
  `userPass` varchar(100) NOT NULL,
  `state` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_ibfk_1` (`userId`),
  KEY `idRole` (`roleId`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `accounts_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (33,61,1,'prade516','$2a$10$18EggcQtK.wAX/zuQSkBPedIXYrcyC6X0Ddqnjf6Egk2.j9wjhVUK',1);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documenttypes`
--

DROP TABLE IF EXISTS `documenttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documenttypes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `state` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documenttypes`
--

LOCK TABLES `documenttypes` WRITE;
/*!40000 ALTER TABLE `documenttypes` DISABLE KEYS */;
INSERT INTO `documenttypes` VALUES (1,'DNI','El DNI contiene información sobre su identidad. Pero, lo más importante es que este documento tiene un número personal. El número del DNI es necesario para cualquier contrato.',1),(2,'PASAPORTE','PASAPORTE',1),(3,'L.C','Libreta Cívica',1),(4,'L.E.','Libreta de Enrolamiento',1);
/*!40000 ALTER TABLE `documenttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangers`
--

DROP TABLE IF EXISTS `hangers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idLocation` bigint NOT NULL,
  `nrohanger` int NOT NULL,
  `description` varchar(500) NOT NULL,
  `creationDate` datetime DEFAULT NULL,
  `state` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hanger_location` (`idLocation`),
  CONSTRAINT `hanger_location` FOREIGN KEY (`idLocation`) REFERENCES `locations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangers`
--

LOCK TABLES `hangers` WRITE;
/*!40000 ALTER TABLE `hangers` DISABLE KEYS */;
INSERT INTO `hangers` VALUES (1,4,1,'Description','2021-11-04 03:17:27',1);
/*!40000 ALTER TABLE `hangers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kayakhangers`
--

DROP TABLE IF EXISTS `kayakhangers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kayakhangers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idhanger` bigint NOT NULL,
  `idkayak` bigint NOT NULL,
  `state` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `kayakHanger_hanger` (`idhanger`),
  KEY `kayakHanger_kayak` (`idkayak`),
  CONSTRAINT `kayakHanger_hanger` FOREIGN KEY (`idhanger`) REFERENCES `hangers` (`id`),
  CONSTRAINT `kayakHanger_kayak` FOREIGN KEY (`idkayak`) REFERENCES `kayaks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kayakhangers`
--

LOCK TABLES `kayakhangers` WRITE;
/*!40000 ALTER TABLE `kayakhangers` DISABLE KEYS */;
/*!40000 ALTER TABLE `kayakhangers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kayaks`
--

DROP TABLE IF EXISTS `kayaks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kayaks` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userId` bigint NOT NULL,
  `hangerId` bigint NOT NULL,
  `KayaktypeId` bigint NOT NULL,
  `crewmember` int NOT NULL,
  `shovelQuantity` int NOT NULL,
  `nroKayak` int NOT NULL,
  `creationDate` datetime DEFAULT NULL,
  `img` longtext,
  `state` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `kayak_kayakType` (`KayaktypeId`),
  KEY `kayak_hanger` (`hangerId`),
  KEY `kayak_user_idx` (`userId`),
  CONSTRAINT `kayak_hanger` FOREIGN KEY (`hangerId`) REFERENCES `hangers` (`id`),
  CONSTRAINT `kayak_kayakType` FOREIGN KEY (`KayaktypeId`) REFERENCES `kayaktypes` (`id`),
  CONSTRAINT `kayak_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kayaks`
--

LOCK TABLES `kayaks` WRITE;
/*!40000 ALTER TABLE `kayaks` DISABLE KEYS */;
INSERT INTO `kayaks` VALUES (1,61,1,1,1,1,12,'2021-11-03 00:28:53','sdfsdf',1);
/*!40000 ALTER TABLE `kayaks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kayaktypes`
--

DROP TABLE IF EXISTS `kayaktypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kayaktypes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `creationDate` datetime DEFAULT NULL,
  `state` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kayaktypes`
--

LOCK TABLES `kayaktypes` WRITE;
/*!40000 ALTER TABLE `kayaktypes` DISABLE KEYS */;
INSERT INTO `kayaktypes` VALUES (1,'Kayak de competición en mar','Los kayaks de competición en mar o surf ski, son embarcaciones pensadas para competir en mar abierto, competiciones internacionales en mar abierto y en los cinco continentes, algunas de ellas de cierto renombre. Se trata de embarcaciones largas (6 m de eslora) y estrechas (45 cm de ancho); que deben ser rápidas y suficientemente estables. Para poder domar el oleaje marino acumulan bastante volumen en proa y en ocasiones se diseñan con elementos adicionales como proas de \'pato\'. Como es habitual ','2021-11-03 00:28:53',1),(2,'Kayak de mar y travesía','Por sus formas, quizá sean los modelos actuales que más recuerdan los kayaks esquimales. Su rasgo característico serán su proa y popa ligeramente elevadas y de perfil muy redondeado que les permite acometer el oleaje con garantías. Serán kayaks largos, capaces de cubrir grandes distancias, más anchos que los modelos de velocidad y con compartimentos estancos que les permiten llevar cierta cantidad de carga (como provisiones, agua, elementos de campamento, botiquín, cartografía, sistemas de comun','2021-11-03 00:28:53',1),(5,'Kayak de Slalom','Adaptados a las competiciones de Slalom en aguas bravas, disciplina olímpica que consiste en recorrer un circuito a través de \"puertas\" hechas con dos varillas que cuelgan a unos pocos centímetros del agua, a las que no debe tocar el kayak, el remo o el competidor. Estas embarcaciones evolucionan en zonas de fuerte corriente e incluso desnivel donde es esencial una gran capacidad de maniobra. Son kayaks muy cortos (3.5m), relativamente estrechos (60cm), redondeados y planos en proa y popa.','2021-11-03 00:28:53',1),(6,'Kayak de aguas bravas','Deben ser embarcaciones rápidas y capaces de desenvolverse bajo fuertes corrientes y grandes volúmenes de agua. Su diseño en algunos aspectos se asemeja a los kayaks de pista. Son largos, relativamente estrechos y con formas verticales en proa y popa. Se diferencian de estos en que se diseñan acumulando cierto volumen extra por encima flotando como si nada, especialmente en proa. Dicho rasgo les permite salir a flote rápidamente y evolucionar ágilmente en saltos o desniveles de agua. Finalmente ','2021-11-03 00:28:53',1),(7,'Kayak de polo','Muestran cierto parecido a las modelos clásicos de aguas bravas. Son kayaks cortos, de casco redondeado y acabados en proa y popa también redondeadas, que en muchas ocasiones se remata con una pieza de goma; pues son frecuentes los golpes entre jugadores. Se diferencian de los modelos de eslalon en las formas más redondeadas en sus extremos. Su comportamiento hidrodinámico en aguas tranquilas será muy similar. Serán embarcaciones maniobrables y en general lentas en comparación a los modelos de p','2021-11-03 00:28:53',1),(8,'Kayak de surf y de estilo libre','Adecuado a las nuevas modalidades de piragüismo, en sus orígenes el Kayak surf se practicaba con kayaks de aguas bravas. Su desarrollo general ha generado embarcaciones específicas. En general, son kayaks muy cortos, de casco poco redondeado, de apariencia plana y en ocasiones incluyendo bordes, aristas o quillas. Proa y popa también suelen presentar una apariencia plana. La proa ligeramente levantada y la popa más baja y más plana, tal y como suelen acabar las tablas de surf. Su diseño suele in','2021-11-03 00:28:53',1),(9,'Kayak Sit-on-top','Vienen en configuraciones de 1 a 4 palistas, y son populares para la paseos, travesías, pesca y buceo. El asiento está ligeramente por encima del nivel del agua, por lo que el centro de gravedad del palista es más alto que en un kayak tradicional. Para compensar el centro de gravedad más alto, estos modelos son más anchos y más lentos que un kayak tradicional de la misma longitud.','2021-11-03 00:28:53',1),(10,'para probar','para probar modificar','2021-11-10 00:46:50',2);
/*!40000 ALTER TABLE `kayaktypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `creationDate` datetime DEFAULT NULL,
  `state` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (4,'Sur','Al lado sur','2021-11-03 02:25:15',1),(5,'Norte','Al lado norte','2021-11-03 02:26:06',1);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `state` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','Tiene permiso para hacer todo',1),(2,'Employee','Con aecceso limitado',1),(3,'Socio','Con acceso muy limidado',1),(4,'Full admin','TIene acceso full',1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(250) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `state` int NOT NULL,
  `idDocumentType` bigint NOT NULL,
  `docNumber` varchar(20) NOT NULL,
  `mail` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_documentType` (`idDocumentType`),
  CONSTRAINT `user_documentType` FOREIGN KEY (`idDocumentType`) REFERENCES `documenttypes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (61,'Pradel','Eugene','2021-11-03 00:28:53','España 10800','34578451247',1,1,'94324590','prade516@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'kayak'
--
/*!50003 DROP PROCEDURE IF EXISTS `CreateOrUpdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateOrUpdate`(IN `_id` BIGINT(20), IN `_firstName` VARCHAR(200), IN `_lastName` VARCHAR(100), IN `_address` VARCHAR(250), IN `_phone` VARCHAR(15))
IF _id = 0 THEN
    	INSERT INTO users (address, creationDate, firstName, lastName, phone, state) VALUES(_address, CURDATE(), _firstName, _lastName, _phone, 1);	
        SET _id = LAST_INSERT_ID();
    ELSE 
    	UPDATE users SET address = _address, firstName = _firstName, lastName = _lastName WHERE id = _id;
    END IF ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateOrUpdateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateOrUpdateUser`(IN `_id` BIGINT(20), IN `_firstName` VARCHAR(200), IN `_lastName` VARCHAR(100), IN `_address` VARCHAR(250), IN `_phone` VARCHAR(15), IN `_idRole` BIGINT(20), IN `_userName` VARCHAR(100), IN `_userPass` VARCHAR(100), IN `_idDocumentType` BIGINT, IN `_mail` varchar(100), IN `_docNumber` varchar(20))
IF  _id = 0 THEN
    	INSERT INTO users (idDocumentType,address, creationDate, firstName, lastName,docNumber,mail, phone, state) VALUES(_idDocumentType,_address, CURDATE(),  _firstName, _lastName,_docNumber,_mail, _phone, 1);
        SET @_idUser = last_insert_id();
        INSERT INTO accounts(idUser, idRole, userName, userPass, state) VALUES(@_idUser, _idRole, _userName, _userPass, 1);
    ELSE 
    	UPDATE users SET address = _address, firstName = _firstName, lastName = _lastName,docNumber = _docNumber,mail =_mail, phone = _phone, idDocumentType= _idDocumentType  WHERE id = _id;
END IF ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-09 21:58:02
