CREATE DATABASE mysql_express_node;

USE mysql_express_node;

CREATE TABLE users(
    id INT(100) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(100)  NOT NULL
);

ALTER TABLE users ADD PRIMARY KEY (id);

ALTER TABLE users MODIFY id INT(10) not NULL AUTO_INCREMENT, AUTO_INCREMENT = 10;

DESCRIBE users;
