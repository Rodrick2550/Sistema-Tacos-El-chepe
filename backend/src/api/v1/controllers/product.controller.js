import connection from '../../../config/database.js';
import BinarySearchTree from '../utils/BinarySearchTree.js';

const createProductHandler = async (req, res) => {
	const { name, description, price } = req.body;

	const urlImage = `http://${req.get('host')}/images/${req.file.filename}`;

	try {
		const product = await connection.query(
			`INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)`,
			[name, description, price, urlImage]
		);
		return res.status(200).json({
			message: 'Producto creado correctamente'
		});
	} catch(e) {
		return res.status(500).json({
			message: 'Error al crear el producto'
		});
	}
}

const getProductsHandler = async (req, res) => {
	try {
		const products = await connection.query(
			`SELECT * FROM products`
		);
		return res.status(200).json({
			message: 'Productos obtenidos correctamente',
			products: products[0]
		});
	} catch(e) {
		return res.status(500).json({
			message: 'Error al obtener los productos'
		});
	}
}

const getProductByIdHandler = async (req, res) => {
	const { id } = req.params;

	try {
		const product = await connection.query(
			`SELECT * FROM products WHERE id_product = ?`,
			[id]
		);

		if (product[0].length === 0) {
			return res.status(404).send({ message: 'Producto no encontrado' });
		}

		return res.status(200).json({
			message: 'Producto obtenido correctamente',
			product: product[0][0]
		});


	} catch(e) {
		return res.status(500).json({
			message: 'Error al obtener el producto'
		});
	}
}

const updateProductHandler = async (req, res) => {
	const { id } = req.params;
	const { name, description, price } = req.body;

	try {
		const product = await connection.query(
			`UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?`,
			[name, description, price, id]
		);
		return res.status(200).json({
			message: 'Producto actualizado correctamente'
		});
	} catch(e) {
		return res.status(500).json({
			message: 'Error al actualizar el producto'
		});
	}
}

const removeProductHandler = async (req, res) => {
	const { id } = req.params;

	try {
		const product = await connection.query(
			`DELETE FROM products WHERE id = ?`,
			[id]
		);
		return res.status(200).json({
			message: 'Producto eliminado correctamente'
		});
	} catch(e) {
		return res.status(500).json({
			message: 'Error al eliminar el producto'
		});
	}
}

export { createProductHandler, getProductsHandler, getProductByIdHandler, updateProductHandler, removeProductHandler };