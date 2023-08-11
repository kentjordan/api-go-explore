-- Create user 'goexplore' with SUPERUSER privilege
CREATE USER goexplore WITH LOGIN SUPERUSER;
ALTER USER goexplore WITH PASSWORD '@goexplore++';

-- Custom types
CREATE TYPE ROLE as ENUM ('ADMIN', 'REGULAR');

-- Create database schema
CREATE TABLE "User"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role ROLE DEFAULT 'REGULAR',
    from_country TEXT NOT NULL,
    current_barangay TEXT NOT NULL,
    current_city TEXT NOT NULL
);

CREATE TABLE "Place"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    category TEXT,
    title TEXT,
    description TEXT,
    photos TEXT[]
);

CREATE TABLE "VisitedPlace"(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    user_id UUID,
    place_id UUID,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "User"(id),
    CONSTRAINT fk_place_id FOREIGN KEY (place_id) REFERENCES "Place"(id)
);