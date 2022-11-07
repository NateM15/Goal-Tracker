CREATE DATABASE goals;

DROP TABLE IF EXISTS current_goal;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS goal_type;


CREATE TABLE goal_type (
    id int GENERATED ALWAYS AS IDENTITY,
    type VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE goals (
    goal_id int GENERATED ALWAYS AS IDENTITY,
    goal VARCHAR(10000),
    goal_type_id int,
    PRIMARY KEY(goal_id),
    CONSTRAINT fk_goal_type
        FOREIGN KEY(goal_type_id)
            REFERENCES goal_type(id)
            ON DELETE CASCADE
);

CREATE TABLE current_goal (
    id int GENERATED ALWAYS AS IDENTITY,
    goal VARCHAR(10000),
    PRIMARY KEY(id)
);



INSERT INTO goal_type (type) VALUES
('Short-Term'),
('Long-Term');

INSERT INTO current_goal (goal) VALUES ('test');