import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import organizationReducer from "../features/organization/organizationSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    organization: organizationReducer,
  },
});
