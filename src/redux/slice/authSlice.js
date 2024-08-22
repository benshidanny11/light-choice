import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("user") ? true : false,
    user: null,
  },
  reducers: {
    loginUser: (state) => {
      state.isAuthenticated = true;
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
