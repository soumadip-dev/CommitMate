// Import createSlice
import { createSlice } from '@reduxjs/toolkit';

// Create feed slice
const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload, // Add feed
    removeFeed: (state, action) => null, // Remove feed
  },
});

// Export reducer
export default feedSlice.reducer;

// Export actions
export const { addFeed, removeFeed } = feedSlice.actions;
