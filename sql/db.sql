-- Create user 'goexplore' with SUPERUSER privilege
CREATE USER goexplore WITH LOGIN SUPERUSER;
ALTER USER goexplore WITH PASSWORD '@goexplore++';

-- Create Database
CREATE DATABASE "GoExplore";

-- Drop any tables if exists
DROP TABLE IF EXISTS "VisitedPlace";
DROP TABLE IF EXISTS "Place";
DROP TABLE IF EXISTS "User";
DROP TYPE IF EXISTS role;

-- Custom types
CREATE TYPE ROLE as ENUM ('ADMIN', 'REGULAR');

-- Create database schema
CREATE TABLE "User"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role ROLE DEFAULT 'REGULAR',
    from_country TEXT NOT NULL,
    current_province TEXT NOT NULL,
    current_city TEXT NOT NULL,
    current_barangay TEXT NOT NULL
);

CREATE TABLE "Place"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    category TEXT,
    title TEXT,
    description TEXT,
    photos TEXT[],
    contact VARCHAR(16),
    province TEXT,
    city TEXT,
    barangay TEXT
);

CREATE TABLE "VisitedPlace"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    user_id UUID,
    place_id UUID,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "User"(id),
    CONSTRAINT fk_place_id FOREIGN KEY (place_id) REFERENCES "Place"(id)
);

CREATE TABLE "Event"(
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	title TEXT,
	description TEXT,
	date TIMESTAMP,
	image TEXT[],
	city TEXT,
	province TEXT,
	barangay TEXT
);