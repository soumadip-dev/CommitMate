// IMPORTING MODULES
import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middlewares.js';
import { viewProfileController } from '../controllers/profile.controllers.js';

// CREATING ROUTER INSTANCE
const router = Router();

// VIEW PROFILE ROUTE
router.get('/view', authMiddleware, viewProfileController);

// EXPORTING ROUTER INSTANCE
export default router;
