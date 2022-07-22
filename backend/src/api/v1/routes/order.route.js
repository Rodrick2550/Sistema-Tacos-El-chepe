import { Router } from 'express';
import {
  createOrderHandler,
  getOrdersHandler,
  payOrderHandler,
  getALlOrdersPendingHandler
} from '../controllers/order.controller.js';

const router = Router();

router.post('/', createOrderHandler).get('/', getOrdersHandler).post('/pay/:id', payOrderHandler).get('/pending', getALlOrdersPendingHandler);

export default router;
