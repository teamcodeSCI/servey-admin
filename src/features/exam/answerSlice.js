import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../utils/const';

const answerSlice = createSlice({
  name: 'answer',
  initialState: {
    loading: false,
    answerList: [],
  },
  reducers: {
    addNewAnswer(state, action) {
      state.answerList.push(action.payload);
    },
    deleteAnswer(state, action) {
      state.answerList = state.answerList.filter((item) => {
        return item._id !== action.payload;
      });
    },
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
      });
  },
});
export const fetchAnswer = createAsyncThunk('answer/fetchAnswer', async (questionId) => {
  const response = await fetch(`${baseURL}/answer?question_id=${questionId}`);
  const data = await response.json();
  return data.data;
});
const answerReducer = answerSlice.reducer;
export default answerReducer;
export const answerAction = answerSlice.actions;

export const answerSelector = (state) => state.answer.answerList;
export const answerLoadingSelector = (state) => state.answer.loading;
