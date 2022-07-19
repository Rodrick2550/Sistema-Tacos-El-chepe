import { Router } from 'express';
import { createOrderItemHandler } from '../controllers/orderItem.controller.js';

const router = Router();

router.post('/', createOrderItemHandler);

export default router;