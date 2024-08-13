import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/slice/authSlice';
import globalReducer from './redux/slice/global'
import productReducer from './redux/slice/products'
const store = configureStore({
  reducer: {
    auth: authReducer,
    global:globalReducer,
    products:productReducer
  },
});

export default store;
