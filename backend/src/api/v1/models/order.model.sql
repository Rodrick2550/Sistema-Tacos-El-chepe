CREATE TABLE IF NOT EXISTS orders (
  id_order INT PRIMARY KEY AUTO_INCREMENT,
  table_id_table INT NOT NULL,
  mesero_id_user INT NOT NULL,
  total INT NOT NULL DEFAULT 0,
  status ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',
  CONSTRAINT fk_orders_tables FOREIGN KEY (table_id_table) REFERENCES tables (id_table) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_orders_users FOREIGN KEY (mesero_id_user) REFERENCES users (id_usuario) ON UPDATE CASCADE ON DELETE CASCADE
);