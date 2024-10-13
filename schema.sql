CREATE TABLE skaters (
    id SERIAL PRIMARY KEY,
    skater_name TEXT,
    nationality TEXT,
    brand TEXT,
    bio TEXT
);

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    skater_id INTEGER REFERENCES skaters(id),
    video_name TEXT,
    video_date INTEGER CHECK (video_date >= 1000 AND video_date <= 9999),
    youtube_url TEXT
);


CREATE TABLE pictures (
    id SERIAL PRIMARY KEY,
    skater_id INTEGER REFERENCES skaters(id),
    skater_picture TEXT
);