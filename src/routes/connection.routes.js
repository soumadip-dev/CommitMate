// IMPORTING MODULES
import { Router } from 'express';
import {
  reviewConnectionController,
  sendConnectionController,
} from '../controllers/connestion.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';

// CREATING ROUTER INSTANCE
const router = Router();

router.post('/send/:status/:userId', authMiddleware, sendConnectionController);
router.post(
  '/review/:status/:requestId',
  authMiddleware,
  reviewConnectionController,
);



// EXPORTING ROUTER INSTANCE
export default router;
