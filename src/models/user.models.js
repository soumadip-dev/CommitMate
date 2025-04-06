// IMPORTING MODULES
import mongoose, { Schema } from 'mongoose';

// DEFINE USER SCHEMA
const userSchema = new Schema({
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
  },
  password: {
    type: String,
    required: true,
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
    type: {
      url: { type: String },
      localpath: { type: String },
    },
    default: () => ({
      url: 'https://placehold.co/600x400',
      localpath: '',
    }),
  },
  about: {
    type: String,
    default: "This user hasn't added any information yet.",
  },
  skills: {
    type: [String],
    default: [],
  },
},{timestamps:true});

// CREATE AND EXPORT USER MODEL
export const User = mongoose.model('User', userSchema);
