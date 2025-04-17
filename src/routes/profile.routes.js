// IMPORTING MODULES
import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middlewares.js';

// CREATING ROUTER INSTANCE
const router = Router();

// VIEW PROFILE ROUTE
router.get('/view', authMiddleware, async (req, res) => {
  try {
    // User is already attached to req by authMiddleware
    const user = req.user;

    // Return user data
    res.status(200).send(user.firstName);
  } catch (err) {
    // Handle error
    res
      .status(500)
      .send(
        `An error occurred during profile request: ${err.message}. Please try again later.`,
      );
  }
});

// EXPORTING ROUTER INSTANCE
export default router;
