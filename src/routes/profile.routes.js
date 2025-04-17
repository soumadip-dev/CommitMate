// IMPORTING MODULES
import { Router } from 'express';
import {
  editProfileController,
  viewProfileController,
  editProfilePasswordController,
} from '../controllers/profile.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';

// CREATING ROUTER INSTANCE
const router = Router();

// VIEW PROFILE ROUTE
router.get('/view', authMiddleware, viewProfileController);

// EDIT PROFILE ROUTE
router.patch('/edit', authMiddleware, editProfileController);

// RESET PASSWORD OF PROFILE ROUTE
router.patch('/resetpassword', authMiddleware, editProfilePasswordController);

// EXPORTING ROUTER INSTANCE
export default router;
