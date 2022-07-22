import connection from '../../../config/database.js';

const createOrderItemHandler = async (req, res) => {
  const { id_order, id_product, quantity } = req.body;

  try {
    // get product price
    const product = await connection.query(
      `SELECT * FROM products WHERE id_product = ?`,
      [id_product]
    );

    // create new order item
    await connection.query(
      `INSERT INTO order_items (order_id_order, product_id_product, quantity, total) VALUES (?, ?, ?, ?)`,
      [id_order, id_product, quantity, quantity * product[0][0].price]
    );

    return res.status(200).send();
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};

const getOrderItemsHandler = async (req, res) => {
  const { id_order } = req.query;

  try {
    // join order_items and products tables
    let orderItems;
    if (id_order) {
      orderItems = await connection.query(
        `SELECT order_items.id_order_item, order_items.quantity, order_items.total, products.id_product, products.name AS product_name FROM order_items INNER JOIN products ON order_items.product_id_product = products.id_product WHERE order_items.order_id_order = ?`,
        [id_order]
      );
    } else {
      orderItems = await connection.query(
        `SELECT order_items.id_order_item, order_items.quantity, order_items.total, order_items.status, products.name AS product_name FROM order_items INNER JOIN products ON order_items.product_id_product = products.id_product`
      );
    }

    return res.status(200).json(orderItems[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};

const updateOrderItemHandler = async (req, res) => {
  const { status } = req.body;
  const { id_order_item } = req.params;

  try {
    // update order item status
    await connection.query(
      `UPDATE order_items SET status = ? WHERE id_order_item = ?`,
      [status, id_order_item]
    );

    return res.status(200).send();
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};

export { createOrderItemHandler, getOrderItemsHandler, updateOrderItemHandler };
