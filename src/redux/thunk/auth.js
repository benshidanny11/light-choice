import { callApi } from "../helper";
import { loginUser } from "../slice/authSlice";
import { setSuccess } from "../slice/global";

export const login = (data, navigate) => async (dispatch) => {
  const res = await callApi({ url: "/auth/login", body: data, dispatch });
  if (res) {
    localStorage.setItem("user", JSON.stringify(res.userData));
    localStorage.setItem("token", res.accesstoken);
    dispatch(loginUser(res));
    if (res.userData.role === "ADMIN") navigate("/home");
    else navigate("/");
  }
};

export const signup = (data, navigate) => async (dispatch) => {
  const res = await callApi({ url: "/auth/signup", body: data, dispatch });
  if (res) {
    navigate("/login");
    dispatch(setSuccess("You have successfully signed up to right choice"));
  }
};
