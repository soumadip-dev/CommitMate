// IMPORTING MODULEs
import validator from 'validator';

// VALIDATE SIGN-UP DATA
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error('First name and last name are required.');
  }

  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error('First name must be between 4 and 50 characters.');
  }

  if (lastName.length < 4 || lastName.length > 50) {
    throw new Error('Last name must be between 4 and 50 characters.');
  }

  if (!validator.isEmail(emailId)) {
    throw new Error('Invalid email address.');
  }

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
};

// VALIDATE LOGIN DATA
const validateLoginData = (req) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    throw new Error('Email and password are required.');
  }

  if (!validator.isEmail(emailId)) {
    throw new Error('Invalid email address.');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }
};

// EXPORTING FUNCTIONS
export { validateLoginData, validateSignUpData };
