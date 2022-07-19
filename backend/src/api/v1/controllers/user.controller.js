import connection from "../../../config/database.js";

const createUserHandler = async (req, res) => {

	// create user with myql2 promise
	const { firstName, lastName, email, password } = req.body;

	try {
		const user = await connection.query(
			`INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`,
			[firstName, lastName, email, password]
		);
		return res.status(201).json({
			message: 'Usuario creado correctamente'
		});
	} catch(e) {
		return res.status(500).json({
			message: 'Error al crear el usuario'
		});
	}
}


const authenticationUserHandler = async (req, res) => {
	const { email, password } = req.body;

	// create user with myql2 promise
	try {
		const user = await connection.query(
			`SELECT * FROM users WHERE email = ? AND password = ?`,
			[email, password]
		);
		if(user[0].length === 0) {
			return res.status(401).json({
				message: 'Error al autenticar el usuario'
			});
		}
		return res.status(200).json(user[0][0]);
	} catch(e) {
		return res.status(401).json({
			message: 'Error al autenticar el usuario'
		});
	}
}

export {
	createUserHandler,
	authenticationUserHandler
}