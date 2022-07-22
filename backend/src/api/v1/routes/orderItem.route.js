import { Router } from 'express';
import {
  createOrderItemHandler,
  getOrderItemsHandler,
} from '../controllers/orderItem.controller.js';

const router = Router();

router
  .post('/', createOrderItemHandler)
  .get('/', getOrderItemsHandler)

export default router;
