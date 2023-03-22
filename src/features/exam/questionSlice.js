import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../utils/const';

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
export const fetchQuestion = createAsyncThunk('question/fetchQuestion', async (examId) => {
  const response = await fetch(`${baseURL}/question?exam_id=${examId}`);
  const data = await response.json();
  return data.data;
});
export const addNewQuestion = createAsyncThunk('question/addNewQuestion', async () => {});
const questionReducer = questionSlice.reducer;
export default questionReducer;
export const questionAction = questionSlice.actions;
export const questionSelector = (state) => state.question.questionList;
export const loadingSelector = (state) => state.question.loading;
