DROP DATABASE IF EXISTS project;
CREATE DATABASE
IF NOT EXISTS
 project;

USE project;

DROP TABLE IF EXISTS houses;
CREATE TABLE houses
(
  `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `link` VARCHAR(255) UNIQUE KEY,
 `market_date`DATETIME  NOT NULL ,
  `Location_country` VARCHAR(200) NOT NULL,
  `location_city` VARCHAR(200)NOT NULL,
  `location_address` VARCHAR(200)NOT NULL,
  `location_coordinates_lat` FLOAT(10,6),
  `location_coordinates_lng` FLOAT(10,6),
  `size_living_area`INT NOT NULL,
  `size_rooms` INT NOT NULL,
  `price_value` FLOAT NOT NULL,
  `price_currency` CHAR(3) NOT NULL,
  `description` TEXT,
  `title` TEXT,
  `images` VARCHAR(255),
  `sold` INT)