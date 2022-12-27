import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '~/pages/Categories/categoriesSlice';
import seriesReducer from '~/pages/Categories/pages/EditCategory/components/AddOrEditSeries/seriesSlice';
import usersReducer from '~/pages/Users/usersSlice';
import productsReducer from '~/pages/Products/productsSlice'
import currentUserReducer from './currentUserSlice';
import ordersReducer from '~/pages/Orders/ordersSlice'

const rootReducer = {
    users: usersReducer,
    currentUser: currentUserReducer,
    categories: categoriesReducer,
    series: seriesReducer,
    products: productsReducer,
    orders: ordersReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
