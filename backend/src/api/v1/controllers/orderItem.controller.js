const createOrderItemHandler = async (req, res) => {
  const { id_order, id_product, quantity } = req.body;

  try {

    // check if order item exists with the same product and the same order
    const orderItems = await connection.query(
      `SELECT * FROM order_items WHERE id_order = ? AND id_product = ?`,
      [id_order, id_product]
    );

    if (orderItems[0].length > 0) {
      return res.status(409).json({
        message: 'El producto ya existe en la orden'
      });
    }

    const orderItem = await connection.query(
      `INSERT INTO order_items (id_order, id_product, quantity) VALUES (?, ?, ?)`,
      [id_order, id_product, quantity]
    );
    return res.status(201).json({
      message: 'Orden creada correctamente'
    });
  }
  catch (e) {
    return res.status(500).json({
      message: 'Error al crear la orden'
    });
  }
}

export { createOrderItemHandler };