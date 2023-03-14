import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  logged: false,
  loading: false,
  message: '',
  currentUser: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.pending, (state, actions) => {
        state.logging = true;
      })
      .addCase(getLogin.fulfilled, (state, actions) => {
        state.logging = false;
        state.currentUser = actions.payload.currentUser;
        state.message = actions.payload.message;
        state.logged = actions.payload.logged;
      })
      .addCase(getLogin.rejected, (state, actions) => {
        state.logging = false;
        state.logged = false;
      })
      .addCase(getLogout.pending, (state, actions) => {
        state.logging = true;
      })
      .addCase(getLogout.fulfilled, (state, actions) => {
        state.logging = false;
        state.currentUser = null;
        state.message = '';
        state.logged = false;
      })
      .addCase(getLogout.rejected, (state, actions) => {
        state.logging = false;
        state.logged = false;
      });
  },
});
export const getLogin = createAsyncThunk('auth/getLogin', async (info) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  const user = data.find((item) => item.username === info.phone);
  if (!user) {
    return { logged: false, message: 'Sai số điện thoại hoặc mật khẩu' };
  }
  if (info.password !== '123123') {
    return { logged: false, message: 'Sai số điện thoại hoặc mật khẩu' };
  }
  localStorage.setItem('access_token', user.phone);

  return { logged: true, message: 'Đăng nhập thành công', currentUser: user };
});
export const getLogout = createAsyncThunk('auth/getLogout', async () => {
  localStorage.clear();
});
const authReducer = authSlice.reducer;
export default authReducer;

export const messageSelector = (state) => state.auth.message;
export const currentUserSelector = (state) => state.auth.currentUser;
export const loggedSelector = (state) => state.auth.logged;
