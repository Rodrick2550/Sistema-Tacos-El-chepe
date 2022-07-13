CREATE TABLE IF NOT EXISTS users (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL,
  apellido VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(60) NOT NULL,
  role ENUM('admin', 'waiter') NOT NULL DEFAULT 'waiter'
);