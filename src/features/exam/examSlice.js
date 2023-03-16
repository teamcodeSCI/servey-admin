import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { exam } from '../../fakeData/exam';
import { removeAccents } from '../../utils/help';

const examSlice = createSlice({
  name: 'exam',
  initialState: {
    loading: false,
    examList: [],
  },
  reducers: {
    addExam(state, action) {
      state.examList.push(action.payload);
    },
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
export const fetchExam = createAsyncThunk('exam/fetchExam', async (filter) => {
  const search = removeAccents(filter);
  if (search === '') return exam;
  return exam.filter((item) => removeAccents(item.name).search(search) !== -1);
});
export const addExam = createAsyncThunk('exam/addExam', async () => {});
const examReducer = examSlice.reducer;
export default examReducer;
export const examAction = examSlice.actions;
export const examSelector = (state) => [...state.exam.examList].reverse();
