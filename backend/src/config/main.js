import 'dotenv/config';
import express from 'express';
import userRoutes from '../api/v1/routes/user.route.js';
import productRoutes from '../api/v1/routes/product.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/images', express.static(path.join(__dirname, '../static/images')));

export default app;
