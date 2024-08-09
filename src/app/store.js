/* eslint-disable import/prefer-default-export */
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import userReducer from './features/user/_userSlice';
import  productReducer  from './features/product/_productSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
  logger: true,
}, applyMiddleware(thunk));
