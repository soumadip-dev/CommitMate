// IMPORTING MODULES
import { Router } from 'express';

import {
  getAllConnectionRequestsController,
  getAllEstablishedConnectionsController,
  getFeedController,
} from '../controllers/user.cntrollers.js';

import authMiddleware from '../middlewares/auth.middlewares.js';

// CREATING ROUTER INSTANCE
const router = Router();

// ROUTE TO GET ALL PENDING CONNECTION REQUESTS
router.get('/requests', authMiddleware, getAllConnectionRequestsController);

// ROUTE TO GET ALL ESTABLISHED CONNECTIONS
router.get(
  '/connections',
  authMiddleware,
  getAllEstablishedConnectionsController,
);

// ROUTE TO GET USER FEED
router.get('/feed', authMiddleware, getFeedController);

// EXPORTING ROUTER INSTANCE
export default router;
