import app from './main.js';
import ConnectionDB from './database.js';
import tables from '../api/v1/models/index.js'

const connectionDB = new ConnectionDB();
await connectionDB.createConnection();
await connectionDB.createTables(tables);

app.listen(3000, async () => {
  connectionDB.connection.connect((err) => {
    if (err) throw err;
    console.log('Base de datos conectada');
  });

  console.log(`Example app listening on port 3000`);
});
