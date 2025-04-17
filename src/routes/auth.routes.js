// IMPORTING MODULES
import { Router } from 'express';
import {
  loginController,
  logoutController,
  signupController,
} from '../controllers/auth.controllers.js';

// CREATING ROUTER INSTANCE
const router = Router();

// SIGNUP ROUTE
router.post('/signup', signupController);

// LOGIN ROUTE
router.post('/login', loginController);

// LOGOUT ROUTE
router.post('/logout', logoutController);

// EXPORTING ROUTER INSTANCE
export default router;
