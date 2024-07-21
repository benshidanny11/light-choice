/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMyProfile: (state, action) => {
      state.MyProfile = { ...action.payload?.user?.user };
    },
    logout: state => {
      state.MyProfile = {};
    },
  },
});

export const { setMyProfile, logout } = userSlice.actions;
export default userSlice.reducer;
