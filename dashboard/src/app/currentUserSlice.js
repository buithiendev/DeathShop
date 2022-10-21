import { createSlice } from '@reduxjs/toolkit';

const currentUser = createSlice({
    name: 'currentUser',
    initialState: {
        status: false,
        info: null,
    },
    reducers: {
        setInfoCurrentUser: (state, action) => {
            state.status = true;
            state.info = action.payload;
        },
        clearCurrentUser: (state) => {
            state.status = false;
            state.info = null;
        },
    },
});

const { reducer, actions } = currentUser;

export const { setInfoCurrentUser, clearCurrentUser } = actions;
export default reducer;
