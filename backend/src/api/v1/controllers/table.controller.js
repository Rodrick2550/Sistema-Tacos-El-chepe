import connection from '../../../config/database.js';

const getAvailableTables = async (req, res) => {
  try {
    const tables = await connection.query(
      `SELECT * FROM tables WHERE status = 'available'`
    );

    res.status(200).send(tables[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};

export { getAvailableTables };
