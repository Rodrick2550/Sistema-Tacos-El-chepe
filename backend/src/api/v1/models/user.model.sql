CREATE TABLE IF NOT EXISTS users (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(60) NOT NULL,
  lastName VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  role ENUM('admin', 'waiter', 'chef') NOT NULL DEFAULT 'waiter'
);