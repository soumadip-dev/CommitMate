// IMPORTING MODULES
import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';

// AUTH MIDDLEWARE FUNCTION
const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from cookies
    const { token } = req.cookies;

    // Check if token exists
    if (!token) {
      throw new Error('Authentication token missing');
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Validate decoded token
    if (!decoded || !decoded._id) {
      throw new Error('Invalid token');
    }

    // Find user in the database
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error('User not found');
    }

    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    // Handle errors
    res.status(401).send(error.message);
  }
};

// EXPORTING MIDDLEWARE
export default authMiddleware;
