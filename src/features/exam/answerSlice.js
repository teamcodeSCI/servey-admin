import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { answer } from '../../fakeData/answer';

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
export const fetchAnswer = createAsyncThunk('answer/fetchAnswer', async () => {
  return answer;
});
const answerReducer = answerSlice.reducer;
export default answerReducer;
export const answerAction = answerSlice.actions;

export const answerSelector = (state) => state.answer.answerList;
