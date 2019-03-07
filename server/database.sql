DROP DATABASE IF EXISTS `project`;
CREATE DATABASE `project`;
USE `project`
DROP TABLE IF EXISTS `houses`;
CREATE TABLE `houses`
(
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `link` VARCHAR(255) NOT NULL UNIQUE KEY,
  `market_date`DATETIME  NOT NULL,
  `location_country` VARCHAR(200) NOT NULL,
  `location_city` VARCHAR(200)NOT NULL,
  `location_address` VARCHAR(200)NOT NULL,
  `location_coordinates_lat` FLOAT(10,6) NOT NULL,
  `location_coordinates_lng` FLOAT(11,6) NOT NULL,
  `size_living_area`INT NOT NULL,
  `size_rooms` INT NOT NULL,
  `price_value` FLOAT NOT NULL,
  `price_currency` CHAR(3) NOT NULL,
  `description` TEXT  ,
  `title` TEXT ,
  `images` VARCHAR(255) DEFAULT '',
  `sold` INT DEFAULT '0')

[{
"link":"<https://www.google.nl/>",
 "market_date":"",
  "location_country" :"Netherlands",
  "location_city":"Amsterdam",
  "location_address":"wesperplain",
  "location_coordinates_lat"  :0.465,
  "location_coordinates_lng" :0.677,
  "size_living_area": 25,
  "size_rooms"  :3,
  "price_value"  :2500.478,
  "price_currency":"EUR",
  "description" :"ghvjk",
  "title"  :"opiu",
  "images":"<https://www.google.nl/>,<https://www.google.nl/>",
  "sold":0
}]