import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
