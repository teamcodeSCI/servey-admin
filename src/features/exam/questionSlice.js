import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../utils/const';

const questionSlice = createSlice({
  name: 'question',
  initialState: {
    loading: false,
    questionList: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestion.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questionList = action.payload;
      })
      .addCase(fetchQuestion.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewQuestion.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addNewQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questionList.push(action.payload);
      })
      .addCase(updateQuestion.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
        for (let i = 0; i < state.questionList.length; i++) {
          if (state.questionList[i].id === action.payload.id) {
            state.questionList[i] = action.payload;
          }
        }
        state.questionList = [...state.questionList];
      })
      .addCase(deleteQuestion.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questionList = state.questionList.filter((item) => item.id !== action.payload.id);
      });
  },
});
export const fetchQuestion = createAsyncThunk('question/fetchQuestion', async (examId) => {
  const response = await fetch(`${baseURL}/question?exam_id=${examId}`);
  const data = await response.json();
  return data.data;
});
export const addNewQuestion = createAsyncThunk('question/addNewQuestion', async (newQuestion) => {
  const response = await fetch(`${baseURL}/question/create`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(newQuestion),
  });
  const data = await response.json();
  return data.data;
});
export const updateQuestion = createAsyncThunk('question/updateQuestion', async ({ id, payload }) => {
  const response = await fetch(`${baseURL}/question/${id}`, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ question: payload }),
  });
  const data = await response.json();
  return data.data;
});
export const deleteQuestion = createAsyncThunk('question/deleteQuestion', async (id) => {
  const response = await fetch(`${baseURL}/question/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  const data = await response.json();
  console.log('data: ', data);
  return data.data;
});
const questionReducer = questionSlice.reducer;
export default questionReducer;
export const questionAction = questionSlice.actions;
export const questionSelector = (state) => state.question.questionList;
export const loadingSelector = (state) => state.question.loading;
