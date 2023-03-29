import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../utils/const';

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
        state.currentUser = actions.payload.data;
        state.logged = actions.payload.status;
        state.message = actions.payload;
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
  const response = await fetch(`${baseURL}/login`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(info),
  });
  const data = await response.json();
  if (data.error) {
    return data.error;
  }
  localStorage.setItem('access_token', data.data.token);
  return data;
});
export const getLogout = createAsyncThunk('auth/getLogout', async () => {
  localStorage.clear();
});
const authReducer = authSlice.reducer;
export default authReducer;

export const messageSelector = (state) => state.auth.message;
export const currentUserSelector = (state) => state.auth.currentUser;
export const loggedSelector = (state) => state.auth.logged;
export const loggingSelector = (state) => state.auth.logging;
