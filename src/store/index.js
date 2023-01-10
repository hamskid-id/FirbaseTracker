import { configureStore } from "@reduxjs/toolkit";
import auth_Slice, { loadUser } from './authSlice'

const store = configureStore({
    reducer:{
        auth: auth_Slice.reducer,
    }
})

store.dispatch(loadUser(null));
export default store;