-- Create user 'goexplore' with SUPERUSER privilege
ALTER USER postgres WITH PASSWORD '@goexplore++';

-- Create Database
CREATE DATABASE "GoExplore";

-- Drop any tables if exists
DROP TABLE IF EXISTS "Feedback";
DROP TABLE IF EXISTS "Itinerary";
DROP TABLE IF EXISTS "Event";
DROP TABLE IF EXISTS "VisitedPlace";
DROP TABLE IF EXISTS "Place";
DROP TABLE IF EXISTS "User";

DROP TYPE IF EXISTS role;

-- Custom types
CREATE TYPE ROLE as ENUM ('SUPER-ADMIN', 'ADMIN', 'REGULAR');

-- Create database schema
CREATE TABLE "User"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender VARCHAR(6) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role ROLE DEFAULT 'REGULAR',
    from_country TEXT NOT NULL,
    current_province TEXT NOT NULL,
    current_city TEXT NOT NULL,
    profile_photo TEXT
);

CREATE TABLE "Place"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    category TEXT,
    social_links JSON,
    title TEXT,
    description TEXT,
    photos TEXT[],
    contact TEXT[],
    province TEXT,
    city TEXT,
    barangay TEXT,
    season_id UUID DEFAULT NULL,
    CONSTRAINT fk_season_id
        FOREIGN KEY (season_id)
        REFERENCES "Season"(id)
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
	images TEXT[],
	city TEXT,
	province TEXT,
	barangay TEXT
);

CREATE TABLE "Itinerary"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    place_id UUID,
    user_id UUID,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "User"(id),
    CONSTRAINT fk_place_id FOREIGN KEY (place_id) REFERENCES "Place"(id)
);

CREATE TABLE "ItineraryBuilder"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    place_name TEXT NOT NULL,
    event_date TIMESTAMP NOT NULL,
    event_color TEXT NOT NULL,
    event_icon TEXT NOT NULL,
    notes TEXT,
    user_id UUID NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "User"(id)
);

CREATE TABLE "Feedback"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    rating FLOAT,
    comment TEXT,
    user_id UUID,
    place_id UUID,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "User"(id),
    CONSTRAINT fk_place_id FOREIGN KEY (place_id) REFERENCES "Place"(id)
);

CREATE TABLE "LoggedInHistory"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    refresh_token TEXT,
    user_id UUID,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "User"(id)
);

CREATE TABLE "LearnMore"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    images TEXT[],
    description TEXT
);

CREATE TABLE "Footer"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    description TEXT
);

CREATE TABLE "ThingToBring"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    images TEXT[],
    title TEXT,
    description TEXT
);

CREATE TABLE "ThingToAvoid"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    images TEXT[],
    title TEXT,
    description TEXT
);

CREATE TABLE "ThingToRemember"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    images TEXT[],
    title TEXT,
    description TEXT
);

CREATE TABLE "LoveOurPlanet"(
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
	title TEXT
);

CREATE TABLE "Preferences"(
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
	preferenced_categories TEXT[],
	user_id UUID UNIQUE,
	CONSTRAINT fk_userId FOREIGN KEY (user_id) REFERENCES "User"(id)
);

CREATE TABLE "WhereToGo"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    images TEXT[],
    title TEXT,
    description TEXT
);

CREATE TABLE "ReplyComment"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    reply_comment TEXT,
    user_id UUID NOT NULL,
    feedback_id UUID NOT NULL,
    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
        REFERENCES "User"(id),
    CONSTRAINT fk_feedback_id
        FOREIGN KEY (feedback_id)
        REFERENCES "Feedback"(id)
);

CREATE TABLE "Season"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    name VARCHAR(255),
    description TEXT,
    month VARCHAR(128),
    day INT
);