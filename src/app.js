// Importing
import express from 'express';
import { User } from './models/user.models.js';

// Create an Express application
const app = express();

// Middleware to parse JSON in request body
app.use(express.json());

app.post('/signup', async (req, res) => {
  const userObj = req.body;

  try {
    const existingUser = await User.findOne({ emailId: userObj.emailId });
    if (existingUser) {
      return res.status(400).send('User already present');
    }

    const user = new User(userObj);
    await user.save();
    res.status(201).send('User added to DB');
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Export the app instance
export default app;
