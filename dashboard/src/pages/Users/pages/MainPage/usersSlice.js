import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAllUsersRoute, registerRoute } from '~/utils/APIRoutes';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const res = await axios.get(getAllUsersRoute);
    return res.data;
});

export const addUser = createAsyncThunk('users/addUser', async (data, thunkAPI) => {
    const { firstName, lastName, email, role, password, phone, status } = data;
    const res = await axios.post(registerRoute, {
        firstName,
        lastName,
        email,
        role,
        password,
        phone,
        status,
    });
    return res.data;
});


const users = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [getUsers.rejected]: (state, action) => {
            state.loading = false;
        },
        [addUser.pending]: (state, action) => {
            state.loading = true;
        },
        [addUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        },
        [getUsers.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});

const { reducer, actions } = users;

export default reducer;
