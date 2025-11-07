create database voluntariosdb;
use voluntariosdb;

CREATE TABLE voluntario (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    interesse VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM voluntario;