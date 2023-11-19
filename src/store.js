import { configureStore } from '@reduxjs/toolkit'
import { authReducer, messageReducer, notificationReducer } from "./redux/reducers";

const store = configureStore({
    reducer: {
        auth: authReducer,
        messages: messageReducer,
        notifications: notificationReducer
    }
})


export default store;



