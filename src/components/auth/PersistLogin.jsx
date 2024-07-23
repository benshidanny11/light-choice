/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-expressions */
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import useRefreshToken from '../../hooks/useRefreshToken';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Splash from '../shared/Splash';

function PersistLogin() {
 // const refresh = useRefreshToken();
 const navigate=useNavigate();
  const { auth } = useAuth();

  const goToLogin = () => {
   navigate('/login')
  };

  useEffect(() => {
    !auth.accesstoken ?? goToLogin();
  }, [auth.accesstoken]);

  return (
    <>
       <Outlet />
    </>
  );
}

export default PersistLogin;
