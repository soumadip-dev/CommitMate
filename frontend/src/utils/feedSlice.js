// Import createSlice
import { createSlice } from '@reduxjs/toolkit';

// Create feed slice
const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload, // Add feed
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter(user => user._id !== action.payload); // Remove user from feed
      return newFeed;
    },
  },
});

// Export reducer
export default feedSlice.reducer;

// Export actions
export const { addFeed, removeUserFromFeed } = feedSlice.actions;
