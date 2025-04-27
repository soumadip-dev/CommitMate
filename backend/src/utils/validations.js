// IMPORTING MODULEs
import validator from 'validator';

// VALIDATE SIGN-UP DATA
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;

  if (!firstName || !lastName) {
    throw new Error('First name and last name are required.');
  }

  if (firstName.length < 2 || firstName.length > 50) {
    throw new Error('First name must be between 2 and 50 characters.');
  }

  if (lastName.length < 2 || lastName.length > 50) {
    throw new Error('Last name must be between 2 and 50 characters.');
  }

  if (!validator.isEmail(emailId)) {
    throw new Error('Invalid email address.');
  }
  if (age === undefined || typeof age !== 'number' || isNaN(age)) {
    throw new Error('Age is required and must be a number.');
  }

  if (age < 16) {
    throw new Error('Minimum age requirement is 16.');
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

// VALIDATE PROFILE EDIT DATA
const validateProfileEditData = (req) => {
  const allowedEdit = [
    'firstName',
    'lastName',
    'emailId',
    'age',
    'gender',
    'photoUrl',
    'about',
    'skills',
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEdit.includes(field),
  );
  return isEditAllowed;
};

// EXPORTING FUNCTIONS
export { validateLoginData, validateProfileEditData, validateSignUpData };
