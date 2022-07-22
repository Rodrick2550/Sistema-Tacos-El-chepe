import { Router } from 'express';
import {
  createOrderItemHandler,
  getOrderItemsHandler,
  updateOrderItemHandler,
} from '../controllers/orderItem.controller.js';

const router = Router();

router
  .post('/', createOrderItemHandler)
  .get('/', getOrderItemsHandler)
  .put('/:id_order_item', updateOrderItemHandler);

export default router;
