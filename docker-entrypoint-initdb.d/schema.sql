CREATE TABLE if NOT EXISTS songs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  instrument TEXT NOT NULL DEFAULT '',
  artist TEXT NOT NULL DEFAULT '',
  pdf TEXT NOT NULL DEFAULT ''
);

-- Insert sample data:
INSERT INTO songs (title, instrument, artist, pdf) VALUES
('I Wanna Hold Your Hand', 'Drums', 'The Beatles', 'https://drive.google.com/file/d/1pTYWPnwRnh2rUBPfOQTWuXUhQuuE1LBZ/view?usp=sharing'),
('I Dont Wanna Hear It', 'Drums', 'Minor Threat', 'https://drive.google.com/file/d/1-xnVv5xNG5-QHjhIGFbO2E4puUxDjRf4/view?usp=sharing'),
('Another One Bites the Dust', 'Bass-tab-score', 'Queen', 'https://drive.google.com/file/d/1hTfb9BEZqTw8t7hzKQPTFI1-8Kjxsbm9/view?usp=sharing');
