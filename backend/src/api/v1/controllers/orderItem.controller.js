import connection from '../../../config/database.js';

const createOrderItemHandler = async (req, res) => {
  const { id_order, id_product, quantity } = req.body;

  try {
    // check if order item exists with the same product and the same order
    const orderItem = await connection.query(
      `SELECT * FROM order_items WHERE order_id_order = ? AND product_id_product = ?`,
      [id_order, id_product]
    );

    // get product price
    const product = await connection.query(
      `SELECT * FROM products WHERE id_product = ?`,
      [id_product]
    );

    if (orderItem[0].length > 0) {
      // update quantity and calculate total (price * quantity)
      // string to int
      const newQuantity = orderItem[0][0].quantity + parseInt(quantity);
      const newTotal = newQuantity * product[0][0].price;

      await connection.query(
        `UPDATE order_items SET quantity = ?, total = ? WHERE order_id_order = ? AND product_id_product = ?`,
        [newQuantity, newTotal, id_order, id_product]
      );
      return res.status(200).send();
    }

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
    if (id_order) {

    const orderItems = await connection.query(
      `SELECT order_items.id_order_item, order_items.quantity, order_items.total, products.name AS product_name FROM order_items INNER JOIN products ON order_items.product_id_product = products.id_product WHERE order_items.order_id_order = ?`,
      [id_order]
    );
    } else {
      const orderItems = await connection.query(
        `SELECT order_items.id_order_item, order_items.quantity, order_items.total, products.name AS product_name FROM order_items INNER JOIN products ON order_items.product_id_product = products.id_product`
      );
    }


    return res.status(200).json(orderItems[0]);
  } catch (e) {
    return res.status(500).send();
  }
};

export { createOrderItemHandler, getOrderItemsHandler };
