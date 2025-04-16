// IMPORTING MODULES
import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

// DEFINE USER SCHEMA
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email address');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            'Password must be at least 8 characters long, contain at least one uppercas letter, one lowercase letter, one digit, and one special character',
          );
        }
      },
    },
    age: {
      type: Number,
      min: 16,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    photoUrl: {
      type: String,
      default: 'https://placehold.co/600x400',

      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error('Invalid URL');
        }
      },
    },
    about: {
      type: String,
      default: "This user hasn't added any information yet.",
    },
    skills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

// METHOD TO CHECK IF ENTERED PASSWORD MATCHES STORED HASHED PASSWORD
userSchema.methods.isPasswordCorrect = async function () {
  return await bcrypt.compare(password, this.password);
};

// METHOD TO GENERATE ACCESS TOKEN FOR USER AUTHENTICATION
userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
  return token;
};

// CREATE AND EXPORT USER MODEL
export const User = mongoose.model('User', userSchema);
