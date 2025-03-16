import dotenv from 'dotenv';
import app from './app.js';
import connectDb from './db/index.js';

// Load environment variables from .env file
dotenv.config({
  path: './.env',
});

// Set the port for the server
const PORT = process.env.PORT || 8000;

// Establish a connection to the MongoDB database
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
