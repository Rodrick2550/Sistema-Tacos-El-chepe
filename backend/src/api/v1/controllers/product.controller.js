import connection from '../../../config/database.js';
import BinarySearchTree from '../utils/BinarySearchTree.js';

const createProductHandler = async (req, res) => {
  const { name, description, price, category } = req.body;

  const urlImage = `http://${req.get('host')}/images/${req.file.filename}`;

  try {
    const product = await connection.query(
      `INSERT INTO products (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)`,
      [name, description, price, category, urlImage]
    );

    return res.status(201).send();
  } catch (e) {
    return res.status(500).send();
  }
};

const getProductsHandler = async (req, res) => {
  try {
    const products = await connection.query(`SELECT * FROM products`);
    return res.status(200).send(products[0]);
  } catch (e) {
    return res.status(500).send();
  }
};

const getProductByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await connection.query(`SELECT * FROM products`);

    const bst = new BinarySearchTree();

    product[0].forEach((item) => {
      bst.insert(item);
    });

    const productById = bst.search(bst.getRootNode(), id);

    if (productById) {
      return res.status(200).send(productById.data);
    }

    return res.status(404).send();
  } catch (e) {
    console.log(e)
    return res.status(500).send();
  }
};

const updateProductHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;

  const urlImage = `http://${req.get('host')}/images/${req.file.filename}`;

  try {
    const product = await connection.query(
      `UPDATE products SET name = ?, description = ?, price = ?, category = ?, image = ? WHERE id_product = ?`,
      [name, description, price, category, urlImage, id]
    );
    return res.status(200).send();
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};

const removeProductHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await connection.query(
      `DELETE FROM products WHERE id_product = ?`,
      [id]
    );
    return res.status(200).send();
  } catch (e) {
    return res.status(500).send();
  }
};

export {
  createProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  removeProductHandler,
};
