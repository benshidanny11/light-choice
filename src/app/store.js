/* eslint-disable import/prefer-default-export */
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import userReducer from './features/user/_userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  logger: true,
}, applyMiddleware(thunk));
