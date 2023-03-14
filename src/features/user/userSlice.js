import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    userList: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
});
const userReducer = userSlice.reducer;
export default userReducer;
export const userActions = userSlice.actions;

export const userSelector = (state) => state.user.userList;
