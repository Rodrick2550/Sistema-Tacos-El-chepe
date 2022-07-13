import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let tables = [];

const cleanSQL = (sqlScript) => sqlScript.replace(/[\r\n]/gm, '');

const tableTable = cleanSQL(fs.readFileSync(`${__dirname}/table.model.sql`).toString());
tables.push(tableTable);
const productTable = cleanSQL(fs.readFileSync(`${__dirname}/product.model.sql`).toString());
tables.push(productTable);
const userTable = cleanSQL(fs.readFileSync(`${__dirname}/user.model.sql`).toString());
tables.push(userTable);
const orderTable = cleanSQL(fs.readFileSync(`${__dirname}/order.model.sql`).toString());
tables.push(orderTable);
const orderItemTable = cleanSQL(fs.readFileSync(`${__dirname}/orderItem.model.sql`).toString());
tables.push(orderItemTable);

export default tables;