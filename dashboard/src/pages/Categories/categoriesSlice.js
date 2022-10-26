import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { add, update ,getAll} from '~/utils/CategoriesAPIRoutes';

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
    const res = await axios.get(getAll);
    return res.data
})

export const addCategory = createAsyncThunk('categories/addCategory', async (data, thunkAPI) => {
    const res = await axios.post(add, data);
    return res.data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (data, thunkAPI) => {
    const { id, name, description } = data;
    const res = await axios.post(`${update}/${id}`, {
        name,
        description,
    });
    return res.data.category;
});

const categories = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading: false,
        success: false,
    },
    reducers: {},
    extraReducers: {
        [getCategories.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.categories = action.payload;
        },
        [getCategories.rejected]: (state, action) => {
            state.loading = false;
        },
        [addCategory.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [addCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            if (action.payload) state.categories.push(action.payload);
        },
        [addCategory.rejected]: (state, action) => {
            state.loading = false;
        },
        [updateCategory.pending]: (state, action) => {
            state.loading = true;
            state.success = false;
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.categories.find((category, index) => {
                if (category._id === action.payload._id) {
                    state.categories[index] = action.payload;
                    return true;
                }
                return false;
            });
        },
        [updateCategory.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});

const { reducer } = categories;

export default reducer;
