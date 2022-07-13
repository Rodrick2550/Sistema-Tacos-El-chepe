CREATE TABLE IF NOT EXISTS tables (
  id_table INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL,
  status ENUM('available', 'occupied') NOT NULL DEFAULT 'available'
);