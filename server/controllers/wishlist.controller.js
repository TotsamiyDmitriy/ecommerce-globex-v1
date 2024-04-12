import Wishlist from '../models/wishlist.model.js';
import { errorHandler } from '../utils/error.js';

export const createWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.create(req.body);
    res.status(201).json(wishlist);
  } catch (error) {
    next(error);
  }
};
export const getWishlists = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.create(req.body);
    res.status(201).json(wishlist);
  } catch (error) {
    next(error);
  }
};
export const getProductsByWishlists = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findById(req.body.id);
    if (!wishlist) return next(errorHandler(404, 'Wishlist not found!'));
  } catch (error) {
    next(error);
  }
};
export const getWishlistByUser = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findById(req.body.id);
    if (!wishlist) return next(errorHandler(404, 'Wishlist not found!'));
  } catch (error) {
    next(error);
  }
};
export const updateWishlist = async (req, res, next) => {};
export const deleteWishlist = async (req, res, next) => {};
