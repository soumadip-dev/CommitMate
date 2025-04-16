// IMPORTING MODULES
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import express from 'express';
import authMiddleware from './middlewares/auth.middlewares.js';
import { User } from './models/user.models.js';
import { validateLoginData, validateSignUpData } from './utils/validations.js';

// INITIALIZING EXPRESS APP
const app = express();

// MIDDLEWARE SETUP
app.use(express.json());
app.use(cookieParser());

// ROUTE: USER SIGNUP
app.post('/signup', async (req, res) => {
  try {
    // Validate incoming request body
    validateSignUpData(req);

    // Extract necessary fields from the request
    const { firstName, lastName, emailId, password } = req.body;

    // Hash the password using bcrypt
    const hashedPass = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPass,
    });

    // Save the user to the database
    await user.save();

    // Send success response
    res.status(201).send('User successfully created');
  } catch (err) {
    res
      .status(500)
      .send(
        `An error occurred during signup: ${err.message}. Please try again later.`,
      );
  }
});

// ROUTE: USER LOGIN
app.post('/login', async (req, res) => {
  try {
    // Validate login request body
    validateLoginData(req);

    // Extract credentials
    const { emailId, password } = req.body;

    // Find user by email
    const user = await User.findOne({ emailId });

    if (!user) {
      // User not found
      throw new Error('Invalid credientials');
    }

    // Compare provided password with stored hash
    const isPasswordValid = user.isPasswordCorrect(password);

    if (isPasswordValid) {
      // Generate JWT token
      const token = user.generateAccessToken();

      // Add the token to cookie and send the response back to the user
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: parseInt(process.env.COOKIE_MAX_AGE),
      });

      // Respond with success
      res.status(200).send('Login Successfull');
    } else {
      // Password mismatch
      throw new Error('Invalid credientials');
    }
  } catch (err) {
    res
      .status(500)
      .send(
        `An error occurred during login: ${err.message}. Please try again later.`,
      );
  }
});

// ROUTE: USER PROFILE
app.get('/profile', authMiddleware, async (req, res) => {
  try {
    // User is already attached to req by authMiddleware
    const user = req.user;

    // Return user data
    res.status(200).send(user.firstName);
  } catch (err) {
    res
      .status(500)
      .send(
        `An error occurred during profile request: ${err.message}. Please try again later.`,
      );
  }
});

// EXPORTING APP
export default app;
