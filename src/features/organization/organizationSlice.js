import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getRequest } from '../../services/requestsHandlerService';

const fetchData = createAsyncThunk(
  'organization/fetchData',
  () => getRequest('/organizations/1/public'),
  {
    condition: (_, { getState, extra }) => {
      const { organization } = getState();
      return !organization.isFetching;
    },
  }
);

export const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
    isFetching: false,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isFetching = true;
      state.data = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addMatcher(
      isAnyOf(fetchData.fulfilled, fetchData.rejected),
      (state) => {
        state.isFetching = false;
      }
    );
  },
});

export { fetchData };
export default organizationSlice.reducer;
