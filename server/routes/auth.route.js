import express from 'express';
import { signUp, signIn, google, signOut } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);
router.post('/google', google);

export default router;
