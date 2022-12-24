import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './currentUserSlice';

const rootReducer = {
    currentUser: currentUserReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
