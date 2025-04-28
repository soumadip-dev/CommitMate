import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
      return state;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});
export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
