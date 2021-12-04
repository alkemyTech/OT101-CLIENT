import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    isTokenVerified: false,
  },
  reducer: {
    verifyAuth: (state) => {
      state.isTokenVerified = true;
    },
    login: (state, action) => {
      state.isLogged = true;
      state.data = action.payload;
    },
    logout: (state) => {
      state.isLogged = false;
      state.data = null;
    },
  },
});

export const { login, logout, verifyAuth } = userSlice.actions;
export default userSlice.reducer;
