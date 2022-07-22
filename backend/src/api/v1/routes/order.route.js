import { Router } from 'express';
import {
  createOrderHandler,
  getOrdersHandler,
} from '../controllers/order.controller.js';

const router = Router();

router.post('/', createOrderHandler).get('/', getOrdersHandler);

export default router;
