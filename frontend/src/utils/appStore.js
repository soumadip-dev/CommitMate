// Import configureStore
import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import feedReducer from './feedSlice';
import useReducer from './userSlice';

// Create app store
const appStore = configureStore({
  reducer: {
    user: useReducer, // User slice
    feed: feedReducer, // Feed slice
  },
});

// Export store
export default appStore;
