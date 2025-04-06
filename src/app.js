// Import the Express framework
import express from 'express';
import healthCheckRouter from './routes/healthcheck.routes.js';

// Create an Express application
const app = express();



// Export the app instance for use in other files (e.g., server.js)
export default app;
