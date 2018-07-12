
DROP DATABASE IF EXISTS whats_for_dinner_db;
CREATE DATABASE whats_for_dinner_db;

USE whats_for_dinner_db;

DROP TABLE IF EXISTS meal_master;

CREATE TABLE meal_master (
	id INT NOT NULL AUTO_INCREMENT, 
	meal VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
);


SELECT * FROM meal_master;