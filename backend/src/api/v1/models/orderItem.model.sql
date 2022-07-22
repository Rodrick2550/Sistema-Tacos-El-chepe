CREATE TABLE IF NOT EXISTS order_items (
  id_order_item INT PRIMARY KEY AUTO_INCREMENT,
  order_id_order INT NOT NULL,
  product_id_product INT NOT NULL,
  status ENUM('todo', 'in progress', 'done') NOT NULL DEFAULT 'todo',
  quantity INT NOT NULL,
  total INT NOT NULL,
  CONSTRAINT fk_order_items_orders FOREIGN KEY (order_id_order) REFERENCES orders (id_order),
  CONSTRAINT fk_order_items_products FOREIGN KEY (product_id_product) REFERENCES products (id_product)
);