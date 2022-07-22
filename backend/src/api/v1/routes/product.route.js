import { Router } from 'express';
import { createProductHandler, getProductsHandler, getProductByIdHandler, removeProductHandler } from '../controllers/product.controller.js';
import storage from '../utils/multer.js';
import multer from 'multer';

const uploader = multer({ storage });

const router = Router();

router
  .post('/', uploader.single('image'), createProductHandler)
  .delete('/:id', removeProductHandler)
  .get('/', getProductsHandler)
  .get('/:id', getProductByIdHandler);

export default router;
