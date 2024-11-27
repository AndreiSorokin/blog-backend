CREATE TABLE blogs (
   id SERIAL PRIMARY KEY,
   author VARCHAR(255),
   url VARCHAR(255) NOT NULL,
   title VARCHAR(255) NOT NULL,
   likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Author1', 'url1', 'title1', 1);
INSERT INTO blogs (author, url, title, likes) VALUES ('Author2', 'url2', 'title2', 2);