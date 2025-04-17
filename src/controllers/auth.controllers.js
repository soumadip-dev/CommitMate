// IMPORTING MODULES
import bcrypt from 'bcryptjs';
import { User } from '../models/user.models.js';
import { validateLoginData, validateSignUpData } from '../utils/validations.js';

// CONTROLLER FOR SIGNUP
const signupController = async (req, res) => {
  try {
    // Validate incoming request body
    validateSignUpData(req);

    // Extract necessary fields from the request
    const { firstName, lastName, emailId, password, age, gender } = req.body;

    // Hash the password using bcrypt
    const hashedPass = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPass,
      age,
      gender,
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
};

// CONTROLLER FOR LOGIN
const loginController = async (req, res) => {
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
};

// CONTROLLER FOR LOGOUT
const logoutController = async (req, res) => {
  // Remove the JWT token from the cookie
  res.cookie('token', '', {});

  // Send success response to user
  res.status(200).send('Logged out successfully');
};

// EXPORTING CONTROLLERS
export { loginController, logoutController, signupController };
