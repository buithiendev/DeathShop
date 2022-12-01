import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '~/pages/Categories/categoriesSlice';
import seriesReducer from '~/pages/Categories/pages/EditCategory/components/AddOrEditSeries/seriesSlice';
import usersReducer from '~/pages/Users/usersSlice';
import productsReducer from '~/pages/Products/productsSlice'
import currentUserReducer from './currentUserSlice';

const rootReducer = {
    users: usersReducer,
    currentUser: currentUserReducer,
    categories: categoriesReducer,
    series: seriesReducer,
    products: productsReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
