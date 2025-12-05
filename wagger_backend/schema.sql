CREATE SCHEMA IF NOT EXISTS wagger_db;
SET SCHEMA 'wagger_db';

DROP TABLE IF EXISTS dogs CASCADE;

CREATE TABLE dogs (
    id SERIAL PRIMARY KEY,
    dog_name VARCHAR(150) NOT NULL,
    age INT,
    breed VARCHAR(150),
	distance INT,
    bio TEXT,
    tags TEXT[]
);