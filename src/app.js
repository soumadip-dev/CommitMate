// IMPORTING MODULES
import express from 'express';
import { User } from './models/user.models.js';

const app = express();
app.use(express.json());

// ROUTE: ADD NEW USER
app.post('/add', async (req, res) => {
  const userObj = req.body;

  try {
    const existingUser = await User.findOne({ emailId: userObj.emailId });
    if (existingUser) {
      return res.status(400).json({ message: 'User already present' });
    }

    const user = new User(userObj);
    await user.save();
    res.status(201).json({ message: 'User added to DB' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: err.message });
  }
});

// ROUTE: UPDATE USER DETAILS
app.patch('/update/:userId', async (req, res) => {
  const userId = req.params?.userId;
  const userObj = req.body;

  const ALLOWED_UPDATES = ['photoUrl', 'about', 'gender', 'age', 'skills'];

  const isUpdateAllowed = Object.keys(userObj).every((k) => {
    return ALLOWED_UPDATES.includes(k);
  });

  const ismaxSkillReach = userObj.skills.length < 10;

  if (!isUpdateAllowed || !ismaxSkillReach) {
    return res.status(400).json({ message: 'Update not allowed' });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, userObj, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({ message: 'Updation done' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Updation failed' });
  }
});

// ROUTE: DELETE USER
app.delete('/delete', async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    console.log(user);
    res.status(200).json({ message: 'Deletion successful' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// EXPORTING APP
export default app;
