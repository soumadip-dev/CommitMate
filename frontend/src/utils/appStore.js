// Import configureStore
import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import conectionReducer from './connectionSlice';
import feedReducer from './feedSlice';
import requestReducer from './requestSlice';
import useReducer from './userSlice';

// Create app store
const appStore = configureStore({
  reducer: {
    user: useReducer, // User slice
    feed: feedReducer, // Feed slice
    connection: conectionReducer, // Connection slice
    request: requestReducer, // Request slice
  },
});

// Export store
export default appStore;
