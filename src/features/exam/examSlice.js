import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeAccents } from '../../utils/help';
import { baseURL } from '../../utils/const';

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
            })
            .addCase(updateExam.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateExam.fulfilled, (state, action) => {
                state.loading = false;
                for (let i = 0; i < state.examList.length; i++) {
                    if (state.examList[i].id === action.payload.id) {
                        state.examList[i] = action.payload;
                    }
                }
                state.examList = [...state.examList];
            })
            .addCase(deleteExam.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteExam.fulfilled, (state, action) => {
                state.loading = false;
                state.examList = state.examList.filter((item) => item.id !== action.payload.id);
            });
    },
});
export const fetchExam = createAsyncThunk('exam/fetchExam', async({ filter, pageNum }) => {
    const response = await fetch(`${baseURL}/exam`, {
        headers: {
            Authorization: localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
    const render = await response.json();
    const exam = render.data;
    const search = removeAccents(filter);
    const paginationLimit = 10;
    const data = search === '' ? exam : exam.filter((item) => removeAccents(item.exam).search(search) !== -1);
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
export const addNewExam = createAsyncThunk('exam/addNewExam', async(newExam) => {
    const response = await fetch(`${baseURL}/exam/create`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            Authorization: localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(newExam),
    });
    const data = await response.json();

    return data.data;
});
export const updateExam = createAsyncThunk('exam/updateExam', async({ id, payload }) => {
    const response = await fetch(`${baseURL}/exam/${id}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            Authorization: localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ exam: payload }),
    });

    const data = await response.json();
    return data.data;
});
export const deleteExam = createAsyncThunk('exam/deleteExam', async(id) => {
    const response = await fetch(`${baseURL}/exam/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            Authorization: localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    const data = await response.json();
    return data.data;
});
const examReducer = examSlice.reducer;
export default examReducer;
export const loadingSelector = (state) => state.exam.loading;
export const examSelector = (state) => state.exam.examList;
export const pageCountSelector = (state) => state.exam.pageCount;
export const rangeSelector = (state) => state.exam.range;