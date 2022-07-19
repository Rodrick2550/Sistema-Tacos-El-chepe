import mysql2 from 'mysql2/promise';
import tables from '../api/v1/models/index.js'

const connection = await mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

await connection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`
);

connection.query(`USE ${process.env.DB_NAME}`);

for(const table of tables){
  await connection.query(table);
}

export default connection;
