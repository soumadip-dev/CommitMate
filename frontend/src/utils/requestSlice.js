import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'request',
  initialState: {
    data: [], // Initialize as an object with data array
  },
  reducers: {
    addRequest: (state, action) => {
      state.data = action.payload;
    },
    removeRequest: (state, action) => {
      state.data = [];
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
