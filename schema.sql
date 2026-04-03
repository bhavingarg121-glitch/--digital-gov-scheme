-- schema.sql

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OTPs table
CREATE TABLE otps (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(50) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster lookups
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_otps_phone ON otps(phone);
