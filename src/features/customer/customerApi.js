import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../../utils/const';
import { removeAccents } from '../../utils/help';

export const fetchCustomer = createAsyncThunk('customer/fetchCustomer', async ({ filter, pageNum }) => {
  const response = await fetch(`${baseURL}/customer`, {
    headers: {
      Authorization: localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const render = await response.json();
  const customer = render.data;
  const search = removeAccents(filter);
  const paginationLimit = 10;
  const data = search === '' ? customer : customer.filter((item) => removeAccents(item.ip).search(search) !== -1);
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
