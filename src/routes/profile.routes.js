// IMPORTING MODULES
import { Router } from 'express';
import {
  editProfileController,
  viewProfileController,
} from '../controllers/profile.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';

// CREATING ROUTER INSTANCE
const router = Router();

// VIEW PROFILE ROUTE
router.get('/view', authMiddleware, viewProfileController);

// EDIT PROFILE ROUTE
router.patch('/edit', authMiddleware, editProfileController);

// EXPORTING ROUTER INSTANCE
export default router;
