/* eslint-disable no-lone-blocks */
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import key from 'uniqid'
 import Login from './auth/Login';
import Signup from './auth/Signup';
import Layout from './layouts/Layout';
import NotFound from './shared/NotFound';
import PersistLogin from './auth/PersistLogin';
import Home from './Pages/Home';


function App() {

  return (
    <Routes>
      <Route path="/" key={key()} element={<Layout />}>
        {/* Public Routes for users */}
    

        <Route path="/signup" key={key()} element={<Signup />} />
        <Route path="/login" key={key()} element={<Login />} />
    

        <Route path="*" key={key()} element={<NotFound />} />
        {/* <Route path="/unauthorized" key={key()} element={<NotFound />} /> */}
        { /*Private routes*/ }
        <Route element={<PersistLogin />}>
        <Route path="/" key={key()} element={<Home />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
