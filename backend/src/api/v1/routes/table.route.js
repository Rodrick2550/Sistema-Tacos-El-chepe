import { Router } from 'express';
import { getAvailableTables } from '../controllers/tables.controller.js';

const router = Router();

router.get('/', getAvailableTables);

export default router;