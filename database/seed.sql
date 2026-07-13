INSERT INTO users (name, email, password) VALUES
('Demo User', 'demo@example.com', '$2b$10$Qv7q7D61y6fWJ4Hs2vJvFeC/5AZgCWxqjl2qQlLtj4QvPv4D91gFW')
ON CONFLICT (email) DO NOTHING;

INSERT INTO todos (title, completed, user_id)
SELECT 'Plan the next sprint', false, u.id FROM users u WHERE u.email = 'demo@example.com'
UNION ALL
SELECT 'Write project documentation', true, u.id FROM users u WHERE u.email = 'demo@example.com'
UNION ALL
SELECT 'Review pull requests', false, u.id FROM users u WHERE u.email = 'demo@example.com';
