/* eslint-disable no-lone-blocks */
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import key from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';

//import Login from './auth/Login';
import Signup from './auth/Signup';
import Layout from './layouts/Layout';
import NotFound from './shared/NotFound';


function App() {
 // const user = useSelector(state => state?.user?.MyProfile);
  const dispatch = useDispatch();
  // Load health tips

  return (
    <Routes>
      <Route path="/" key={key()} element={<Layout />}>
        {/* Public Routes for users */}
    

        <Route path="/signup" key={key()} element={<Signup />} />
    

        <Route path="*" key={key()} element={<NotFound />} />
        {/* <Route path="/unauthorized" key={key()} element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;