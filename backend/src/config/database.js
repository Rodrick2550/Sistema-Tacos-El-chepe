import mysql2 from 'mysql2/promise';

class ConnectionDB {
  constructor() {
    if (ConnectionDB.instance) return ConnectionDB.instance;

    console.log('solo debe aparecer una vez');
    ConnectionDB.instance = this;

    this.connection = null;
  }

  async createConnection() {
    if (!this.connection) {
      this.connection = await mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });
      this.connection.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`
      );
      this.connection.query(`USE ${process.env.DB_NAME}`);
    }
  }
}

export default ConnectionDB;
