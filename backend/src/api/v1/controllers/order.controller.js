const createOrderHandler = async (req, res) => {
  const { id_table, id_mesero } = req.body;

  try {
    const order = await connection.query(
      `INSERT INTO orders (id_table, id_mesero) VALUES (?, ?)`,
      [id_table, id_mesero]
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

export { createOrderHandler };