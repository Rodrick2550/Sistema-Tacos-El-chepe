import connection from "../../../config/database.js";

const createUserHandler = async (req, res) => {

	const { firstName, lastName, email, password, role } = req.body;

	try {
		const user = await connection.query(
			`INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)`,
			[firstName, lastName, email, password, role]
		);
		return res.status(201).send();
	} catch(e) {
		return res.status(500).send();
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