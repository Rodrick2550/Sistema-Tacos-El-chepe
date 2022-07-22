import { Router } from 'express';
import { getAvailableTables } from '../controllers/table.controller.js';

const router = Router();

router.get('/', getAvailableTables);

export default router;