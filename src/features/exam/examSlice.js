import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { exam } from '../../fakeData/exam';
import { removeAccents } from '../../utils/help';

const examSlice = createSlice({
  name: 'exam',

  initialState: {
    loading: false,
    limit: 2,
    search: '',
    pageCount: 0,
    range: 7,
    examList: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExam.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchExam.fulfilled, (state, action) => {
        state.loading = false;
        state.examList = action.payload.data;
        state.pageCount = action.payload.pageCount;
      })
      .addCase(fetchExam.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewExam.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addNewExam.fulfilled, (state, action) => {
        state.loading = false;
        state.examList.push(action.payload);
      });
  },
});
export const fetchExam = createAsyncThunk('exam/fetchExam', async ({ filter, pageNum }) => {
  const search = removeAccents(filter);
  const paginationLimit = 2;
  const data = search === '' ? exam : exam.filter((item) => removeAccents(item.name).search(search) !== -1);
  const pageCount = Math.ceil(data.length / paginationLimit);

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;
  const renderData = [];
  data.forEach((item, index) => {
    if (index >= prevRange && index < currRange) {
      renderData.push(item);
    }
  });
  return { data: renderData, pageCount: pageCount };
});
export const addNewExam = createAsyncThunk('exam/addNewExam', async (newExam) => {
  return newExam;
});
const examReducer = examSlice.reducer;
export default examReducer;

export const examSelector = (state) => state.exam.examList;
export const pageCountSelector = (state) => state.exam.pageCount;
export const rangeSelector = (state) => state.exam.range;
