// IMPORTING MODULES
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from './models/user.models.js';
import { validateLoginData, validateSignUpData } from './utils/validations.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

// ROUTE: SIGNUP
app.post('/signup', async (req, res) => {
  try {
    // Validate incoming sign-up data
    validateSignUpData(req);

    // Destructure necessary fields from the request body
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password using bcrypt
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
    console.error('Error during user signup:', err);

    res
      .status(500)
      .send(
        `An error occurred during signup: ${err.message}. Please try again later.`,
      );
  }
});

// ROUTE: LOGIN
app.post('/login', async (req, res) => {
  try {
    // Validate incoming login data
    validateLoginData(req);

    // Destructure email and password from the request body
    const { emailId, password } = req.body;

    // Check if user is present or not
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error('Invalid credientials');
    }

    // Check if password is correct or not
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Create a JWT Token
      const token = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
      );

      console.log(token);

      // Add the token to cookie and send the response back to the user
      res.cookie('token', token);

      res.status(200).send('Login Successfull');
    } else {
      throw new Error('Invalid credientials');
    }
  } catch (err) {
    console.error('Error during user login:', err);

    res
      .status(500)
      .send(
        `An error occurred during login: ${err.message}. Please try again later.`,
      );
  }
});

// ROUTE: PROFILE
app.get('/profile', async (req, res) => {
  try {
    // Get token from the cookie
    const { token } = req.cookies;

    if (!token) {
      throw new Error('No token found');
    }

    // Verify the token
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Get user data from the decoded token
    const { _id } = decoded;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error('User not found');
    }
 
    res.status(200).send(user);
  } catch (err) {
    console.error('Error in profile:', err);

    res
      .status(500)
      .send(
        `An error occurred during profile request: ${err.message}. Please try again later.`,
      );
  }
});

// ROUTE: UPDATE USER DETAILS
app.patch('/update/:userId', async (req, res) => {
  const userId = req.params?.userId;
  const userObj = req.body;

  const ALLOWED_UPDATES = ['photoUrl', 'about', 'gender', 'age', 'skills'];

  const isUpdateAllowed = Object.keys(userObj).every((key) =>
    ALLOWED_UPDATES.includes(key),
  );

  const isMaxSkillReach = userObj.skills.length < 10;

  if (!isUpdateAllowed || !isMaxSkillReach) {
    return res.status(400).json({ message: 'Update not allowed' });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, userObj, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({ message: 'Updation successful' });
  } catch (err) {
    console.error('Error updating user:', err);

    res.status(400).json({ message: 'Updation failed' });
  }
});

// ROUTE: DELETE USER
app.delete('/delete', async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);

    console.log('Deleted user:', user);
    res.status(200).json({ message: 'Deletion successful' });
  } catch (err) {
    console.error('Error deleting user:', err);

    res.status(400).json({ message: err.message });
  }
});

// EXPORTING APP
export default app;
