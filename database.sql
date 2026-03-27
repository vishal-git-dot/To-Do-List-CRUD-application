CREATE DATABASE todo_db;

USE todo_db;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255),
  due DATE,
  priority VARCHAR(20),
  completed TINYINT(1) DEFAULT 0
);
