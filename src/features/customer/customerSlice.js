import { createSlice } from '@reduxjs/toolkit';
import { fetchCustomer } from './customerApi';

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    loading: false,
    customerList: [],
    pageCount: 0,
    range: 7,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customerList = action.payload.data;

        state.pageCount = action.payload.pageCount;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
const customerReducer = customerSlice.reducer;
export default customerReducer;
export const customerSelector = (state) => state.customer.customerList;
export const customerLoadingSelector = (state) => state.customer.loading;
export const pageCountSelector = (state) => state.customer.pageCount;
export const rangeSelector = (state) => state.customer.range;
