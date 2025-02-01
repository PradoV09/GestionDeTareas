-- Crear base de datos (si no existe)
CREATE DATABASE gestordetareas;

USE gestordetareas;

-- Tabla de usuarios
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE, -- Email único
  password VARCHAR(50) NOT NULL
);

-- Tabla de tareas
CREATE TABLE task (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  due_date DATE
);

-- Tabla de tareas compartidas
CREATE TABLE shared_tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_id INT NOT NULL,
  email VARCHAR(50) NOT NULL,
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE,
  FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
);
