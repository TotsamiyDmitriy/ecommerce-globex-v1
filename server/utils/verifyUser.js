import User from '../models/user.model.js';
import { errorHandler } from './error.js';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));
    req.user = user;
    next();
  });
};

export const verifyIsAuthor = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.isAuthor === false) {
    return next(errorHandler(403, 'Forbidden, you are not Author'));
  }
  next();
};
