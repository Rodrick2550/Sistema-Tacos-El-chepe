import 'dotenv/config';
import cors from 'cors';
import express, { application } from 'express';
import userRoutes from '../api/v1/routes/user.route.js';
import productRoutes from '../api/v1/routes/product.route.js';
import orderRoutes from '../api/v1/routes/order.route.js';
import orderItemRoutes from '../api/v1/routes/orderItem.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/order-items', orderItemRoutes);
app.use('/images', express.static(path.join(__dirname, '../static/images')));

export default app;
