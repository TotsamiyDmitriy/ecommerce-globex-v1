import express from 'express';
import {
  createProduct,
  getAllProducts,
  getAuthorProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  filtersProducts,
} from '../controllers/product.controller.js';
import { verifyIsAuthor, verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/filters/:id', filtersProducts);

router.post('/create', verifyToken, verifyIsAuthor, createProduct);

router.get('/:id', verifyToken, verifyIsAuthor, getAuthorProducts);

router.get('/get/:id', getAllProducts);

router.get('/get-one/:id', getOneProduct);

router.post('/update/:id', verifyToken, verifyIsAuthor, updateProduct);

router.delete('/delete/:id', verifyToken, verifyIsAuthor, deleteProduct);

export default router;
