import express from 'express';

import {
  createWishlist,
  getWishlists,
  updateWishlist,
  deleteWishlist,
} from '../controllers/wishlist.controller.js';

import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createWishlist);

router.get('/', verifyToken, getWishlists);

router.post('/update/:id', verifyToken, updateWishlist);

router.delete('/delete/:id', verifyToken, deleteWishlist);

export default router;
