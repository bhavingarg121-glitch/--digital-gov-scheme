-- Insert a few test users
INSERT INTO users (phone) VALUES
('9876543210'),
('user@example.com'),
('9123456789');

-- Insert sample OTPs (for testing only)
INSERT INTO otps (phone, otp) VALUES
('9876543210', '123456'),
('user@example.com', '654321');
