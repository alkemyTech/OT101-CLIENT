import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';

const login = createAsyncThunk('users/login', (data) =>
  authService.login(data)
);

const verifyToken = createAsyncThunk(
  'users/verifyToken',
  authService.verifyToken
);

const deleteAccount = createAsyncThunk('users/deleteAccount', (id) =>
  authService.deleteAccount(id)
);
const editProfile = createAsyncThunk('users/edit', ({ id, data }) =>
  authService.editProfile(id, data)
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    isTokenVerified: false,
    data: { // TEMP
      firstName: 'Test firstname',
      lastName: 'Test lastname',
      email: 'test@email',
      image: '',
      role: { name: 'Admin' },
    },
  },
  reducers: {
    clearData: (state) => {
      state.isLogged = false;
      state.isTokenVerified = false;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLogged = true;
      state.data = payload;
    });

    builder.addCase(verifyToken.fulfilled, (state, { payload }) => {
      state.isLogged = true;
      state.data = payload;
    });

    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.isLogged = false;
      state.data = null;
    });

    builder.addCase(editProfile.fulfilled, (state, { payload }) => {
      state.data.firstName = payload.firstName;
      state.data.lastName = payload.lastName;
      state.data.email = payload.email;
    });

    builder.addMatcher(
      isAnyOf(verifyToken.fulfilled, verifyToken.rejected),
      (state) => {
        state.isTokenVerified = true;
      }
    );
  },
});

export const { clearData } = userSlice.actions;
export { login, verifyToken, deleteAccount, editProfile };
export default userSlice.reducer;
