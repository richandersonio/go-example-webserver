CREATE DATABASE gowebserverexample;
USE gowebserverexample;

CREATE USER 'gowebserver'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'gowebserver'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;

CREATE TABLE `guest_book` (
  `message` varchar(256) DEFAULT NULL,
  `from` varchar(128) DEFAULT NULL,
  `posted` datetime DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE `log` (
  `idlog` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`idlog`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

insert into log(message, time) values ('database created', NOW() );
insert into guest_book(guest_book.from, guest_book.message, posted) values ('rich anderson', 'nice looking site', NOW());

