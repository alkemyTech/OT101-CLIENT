import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';

const login = createAsyncThunk('users/login', (data) => authService.login(data));

const verifyToken = createAsyncThunk('users/verifyToken', () => authService.verifyToken());

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    isTokenVerified: false,
  },
  reducer: {
    clearData: (state) => {
      state.isLogged = false;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogged = true;
      state.data = action.payload;
    });

    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.isLogged = true;
      state.data = action.payload;
    });
    
    builder.addMatcher(isAnyOf(verifyToken.fulfilled, verifyToken.rejected), (state) => {
      state.isTokenVerified = true;
    });

  },
});

export const { clearData } = userSlice.actions;
export { login, verifyToken };
export default userSlice.reducer;
