import { Router } from 'express';
import {
  createOrderHandler,
  getOrdersHandler,
  payOrderHandler,
} from '../controllers/order.controller.js';

const router = Router();

router.post('/', createOrderHandler).get('/', getOrdersHandler).post('/pay/:id', payOrderHandler);

export default router;
