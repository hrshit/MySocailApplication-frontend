import { configureStore } from '@reduxjs/toolkit'
import { authReducer, messageReducer } from "./redux/reducers";

const store = configureStore({
    reducer: {
        auth: authReducer,
        messages: messageReducer
    }
})


export default store;



