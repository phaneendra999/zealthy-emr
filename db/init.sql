-- Run this against your PostgreSQL instance
-- psql -U postgres -f db/init.sql

CREATE DATABASE emr_db;
\c emr_db;

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(255) NOT NULL,
  datetime TIMESTAMP NOT NULL,
  repeat_schedule VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS medications (
  name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS dosages (
  value VARCHAR(100) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS prescriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  medication VARCHAR(255) NOT NULL,
  dosage VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  refill_on DATE,
  refill_schedule VARCHAR(50)
);

-- Seed medications
INSERT INTO medications (name) VALUES
  ('Lisinopril'), ('Metformin'), ('Atorvastatin'), ('Amlodipine'),
  ('Omeprazole'), ('Levothyroxine'), ('Metoprolol'), ('Albuterol'),
  ('Gabapentin'), ('Sertraline')
ON CONFLICT DO NOTHING;

-- Seed dosages
INSERT INTO dosages (value) VALUES
  ('5mg'), ('10mg'), ('20mg'), ('25mg'), ('50mg'),
  ('100mg'), ('200mg'), ('500mg'), ('1000mg'), ('0.5mg')
ON CONFLICT DO NOTHING;

-- Seed a test user
INSERT INTO users (name, email, password) VALUES
  ('John Doe', 'john@example.com', 'password123')
ON CONFLICT DO NOTHING;
