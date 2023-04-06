import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import answerReducer from '../features/exam/answerSlice';
import examReducer from '../features/exam/examSlice';
import questionReducer from '../features/exam/questionSlice';
import userReducer from '../features/user/userSlice';
import customerReducer from '../features/customer/customerSlice';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  exam: examReducer,
  question: questionReducer,
  answer: answerReducer,
  customer: customerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
