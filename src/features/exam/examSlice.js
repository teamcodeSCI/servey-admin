import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { exam } from '../../fakeData/exam';

const examSlice = createSlice({
  name: 'exam',
  initialState: {
    loading: false,
    examList: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExam.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchExam.fulfilled, (state, action) => {
        state.loading = false;
        state.examList = action.payload;
      })
      .addCase(fetchExam.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const fetchExam = createAsyncThunk('exam/fetchExam', async () => {
  return exam;
});
const examReducer = examSlice.reducer;
export default examReducer;

export const examSelector = (state) => state.exam.examList;
