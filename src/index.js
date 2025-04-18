// IMPORTING MODULES
import dotenv from 'dotenv';
import app from './app.js';
import connectDb from './db/index.js';

// LOAD ENVIRONMENT VARIABLES FROM .env FILE
dotenv.config({
  path: './.env',
});

// SET THE PORT FOR THE SERVER
const PORT = process.env.PORT || 8000;

// ESTABLISH A CONNECTION TO THE MONGODB DATABASE
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      `🥹 Server failed to start due to MongoDB connection error: ${error}`,
    );
  });
