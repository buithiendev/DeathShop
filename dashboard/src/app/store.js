import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '~/pages/Users/pages/MainPage/usersSlice'

const rootReducer = {
    users: usersReducer,
}

const store = configureStore({
    reducer: rootReducer,

})

export default store;