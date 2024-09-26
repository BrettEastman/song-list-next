DROP DATABASE IF EXISTS songs_db;
CREATE DATABASE songs_db;
\c songs_db;

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year INT,
  genre VARCHAR(100),
  watched BOOLEAN DEFAULT FALSE
);

-- Insert sample data (optional)
INSERT INTO songs (title, year, genre, watched) VALUES
('Inception', 2010, 'Sci-Fi', false),
('The Dark Knight', 2008, 'Action', true),
('Interstellar', 2014, 'Sci-Fi', true),
('Mean Girls', 2024, 'Comedy', false),
('Hackers', 1995, 'Crime-Thriller', false),
('The Grey', 2011, 'Survival-Thriller', false),
('Sunshine', 2007, 'Sci-Fi', false),
('Ex Machina', 2014, 'Sci-Fi', false);