import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Public from "./components/Public";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/" replace />;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
  },
  {
    path: "*",
    element: <Public />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <ProtectedRoute element={<Home />} />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
