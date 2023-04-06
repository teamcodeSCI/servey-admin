import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../utils/const';

const answerSlice = createSlice({
  name: 'answer',
  initialState: {
    loading: false,
    answerList: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.answerList = action.payload;
      })
      .addCase(fetchAnswer.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewAnswer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addNewAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.answerList.push(action.payload);
      })
      .addCase(updateAnswer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateAnswer.fulfilled, (state, action) => {
        state.loading = false;
        for (let i = 0; i < state.answerList.length; i++) {
          if (state.answerList[i].id === action.payload.id) {
            state.answerList[i] = action.payload;
          }
        }
        state.answerList = [...state.answerList];
      })
      .addCase(deleteAnswer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.answerList = state.answerList.filter((item) => item.id !== action.payload.id);
      });
  },
});
export const fetchAnswer = createAsyncThunk('answer/fetchAnswer', async (questionId) => {
  const response = await fetch(`${baseURL}/answer?question_id=${questionId}`, {
    headers: {
      Authorization: localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  return data.data;
});
export const addNewAnswer = createAsyncThunk('answer/addNewAnswer', async (newAnswer) => {
  const response = await fetch(`${baseURL}/answer/create`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      Authorization: localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(newAnswer),
  });
  const data = await response.json();
  return data.data;
});
export const updateAnswer = createAsyncThunk('answer/updateAnswer', async ({ id, payload }) => {
  const response = await fetch(`${baseURL}/answer/${id}`, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      Authorization: localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ answer: payload }),
  });
  const data = await response.json();
  return data.data;
});
export const deleteAnswer = createAsyncThunk('answer/deleteAnswer', async (id) => {
  const response = await fetch(`${baseURL}/answer/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      Authorization: localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  const data = await response.json();
  return data.data;
});
const answerReducer = answerSlice.reducer;
export default answerReducer;

export const answerSelector = (state) => state.answer.answerList;
export const answerLoadingSelector = (state) => state.answer.loading;
