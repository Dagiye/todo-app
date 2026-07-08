INSERT INTO todos (title, completed) VALUES
('Plan the next sprint', false),
('Write project documentation', true),
('Review pull requests', false)
ON CONFLICT DO NOTHING;
