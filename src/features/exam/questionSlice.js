import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { question } from '../../fakeData/question';

const questionSlice = createSlice({
  name: 'question',
  initialState: {
    loading: false,
    questionList: [],
  },
  reducers: {
    addNewQuestion(state, action) {
      state.questionList.push(action.payload);
    },
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
      });
  },
});
export const fetchQuestion = createAsyncThunk('question/fetchQuestion', async () => {
  return question;
});
export const addNewQuestion = createAsyncThunk('question/addNewQuestion', async () => {});
const questionReducer = questionSlice.reducer;
export default questionReducer;
export const questionAction = questionSlice.actions;
export const questionSelector = (state) => state.question.questionList;