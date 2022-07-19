import app from './main.js';
import connection from './database.js';

app.listen(3000, async () => {
  connection.connect((err) => {
    if (err) throw err;
    console.log('Base de datos conectada');
  });

  console.log(`Example app listening on port 3000`);
});
