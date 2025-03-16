// Importing
import express from 'express';
import { User } from './models/user.models.js';

// Create an Express application
const app = express();

app.post('/signup', async (req, res) => {
  const userObj = {
    firstName: 'Soumadip',
    lastName: 'Majila',
    emailId: 'soumadip@two.com',
    password: 'securePassword123',
    age: 24,
    gender: 'Male',
  };

  try {
    const existingUser = await User.findOne({ emailId: userObj.emailId });
    if (existingUser) {
      res.status(400).send('User already present');
    } else {
      const user = new User(userObj);
      await user.save();
      res.status(201).send('User added to DB');
    }
  } catch (err) {
    console.log(err);
  }
});

// Export the app instance
export default app;
