import { Router } from 'express';
import { authenticationUserHandler, createUserHandler } from '../controllers/user.controller.js';

const router = Router();

router
	.post('/authentication', authenticationUserHandler)
	.post('/', createUserHandler);

export default router;