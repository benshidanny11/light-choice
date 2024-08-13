import React, { useEffect } from "react";
import Router from "./Router";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./redux/slice/authSlice";
import Spinners from "./components/Spinners";


function App() {
const dispatch = useDispatch()
  useEffect(()=>{
    if(localStorage.getItem("token")) dispatch(loginUser())
      else dispatch(logoutUser())
  },[dispatch])
  return (
  <div>
      <Router/>
      <Spinners />
  </div>
  );
}

export default App;
