// IMPORTING MODULES
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { validateProfileEditData } from '../utils/validations.js';

// CONTROLLER FOR VIEW PROFILE
const viewProfileController = async (req, res) => {
  try {
    // User is already attached to req by authMiddleware
    const user = req.user;

    // Throw an error if the user is not found
    if (!user) {
      throw new Error(
        'User not found. Please make sure you are authenticated.',
      );
    }

    // Send response with the full name in the message
    res.status(200).json({
      message: `Profile fetched successfully: ${user.firstName} ${user.lastName}`,
    });
  } catch (err) {
    // Handle error
    res.status(500).json({
      error: `An error occurred during profile request: ${err.message}. Please try again later.`,
    });
  }
};

// CONTROLLER FOR UPDATE PROFILE
const editProfileController = async (req, res) => {
  try {
    // Check if given field is allowed to validate or not
    if (!validateProfileEditData(req)) {
      throw new Error('Invalid Edit request');
    }

    // User is already attached to req by authMiddleware
    const loggedInUser = req.user;

    // Update fields only if provided
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key] ?? loggedInUser[key];
    });

    // Save the changes to the database
    await loggedInUser.save();

    // Send success response with updated user
    res
      .status(200)
      .json({ message: `Your profile has been updated successfully.` });
  } catch (error) {
    res.status(400).json({ error: `Error updating profile: ${error.message}` });
  }
};

const editProfilePasswordController = async (req, res) => {
  try {
    const { password } = req.body;

    // Check if given field is allowed to validate or not
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      throw new Error(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      );
    }
    // User is already attached to req by authMiddleware
    const loggedInUser = req.user;

    // Update hashed password only if provided
    const hashedPassword = await bcrypt.hash(password, 10);
    loggedInUser.password = hashedPassword ?? loggedInUser.password;

    // Save the changes to the database
    await loggedInUser.save();

    // after changing the password logout the user
    res.cookie('token', '', {});

    // Send success response with updated user
    res
      .status(200)
      .json({ message: `Your password has been updated successfully.` });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Error updating password: ${error.message}` });
  }
};

// EXPORTING CONTROLLERS
export {
  editProfileController,
  editProfilePasswordController,
  viewProfileController,
};
