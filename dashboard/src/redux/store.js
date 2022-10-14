import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        //products,cart...
        // user: userReducer,
    }
})

export default store