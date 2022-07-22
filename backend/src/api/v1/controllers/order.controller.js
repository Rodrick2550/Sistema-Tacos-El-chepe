import connection from '../../../config/database.js';

const createOrderHandler = async (req, res) => {
  const { id_table, id_mesero } = req.body;

  try {
    await connection.query(
      `INSERT INTO orders (table_id_table, mesero_id_user) VALUES (?, ?)`,
      [id_table, id_mesero]
    );

    await connection.query(
      `UPDATE tables SET status = 'occupied' WHERE id_table = ?`,
      [id_table]
    );

    return res.status(201).send();
  } catch (e) {
    return res.status(500).send();
  }
};

const getOrdersHandler = async (req, res) => {
  const { id_mesero } = req.query;

  try {
    const orders = await connection.query(
      `SELECT tables.name, orders.id_order FROM tables INNER JOIN orders ON tables.id_table = orders.table_id_table WHERE orders.mesero_id_user = ?`,
      [id_mesero]
    );

    return res.status(200).json(orders[0]);
  } catch (e) {
    return res.status(500).send();
  }
};

export { createOrderHandler, getOrdersHandler };
