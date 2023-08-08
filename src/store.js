import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from "./redux/reducers";

const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})


export default store;



