import connection from "../../../config/database.js";

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
  }
  catch (e) {
    console.log(e);
    return res.status(500).send();
  }
}

export { createOrderItemHandler };