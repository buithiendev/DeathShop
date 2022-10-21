import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '~/pages/Users/usersSlice'
import currentUserReducer from './currentUserSlice'

const rootReducer = {
    users: usersReducer,
    currentUser: currentUserReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;