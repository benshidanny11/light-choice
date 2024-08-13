import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/css/signup.css";
import { Email, Password } from "../shared/Input";
import { Button, ProgressBar } from "../shared/Elements";
import { ContentHead } from "../shared/Contents";
import Alert from "../shared/Alert";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/thunk/auth";
import { setError, setSuccess } from "../redux/slice/global";

function Login() {
  const global = useSelector((state) => state.global);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailErrors, setEmailErrors] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLoginSuccess = (response) => {
    setEmailErrors(undefined);
    setPasswordErrors(undefined);
  };

  

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { username: email, password };
    dispatch(login(data, navigate));
  };
  return (
    <div className="loginContainer signUpContainer">
      <div className="col-12 right d-flex justify-content-center align-items-center">
        <div className="c-f-u-content">
          <ContentHead />
          <div className="c-f-content">
            <div className="c-f-i-content py-4 px-5">
              {global.error && (
                <Alert
                  info={{type: "err",message:global.error,}}
                  handleCloseAlert={() => dispatch(setError(null))}
                />
              )}
              {global.success && (
                <Alert
                  info={{type: "success",message:global.success,}}
                  handleCloseAlert={() => dispatch(setSuccess(null))}
                />
              )}
              <div className="c-content-fields w-auto">
                <h6>Sign In 🤞</h6>
                <form onSubmit={handleLogin}>
                  <div className="input-field-container">
                    <Email
                      handleOnChange={handleEmailChange}
                      value={email}
                      errors={emailErrors}
                      labeled
                      placeholder={"Email or phone"}
                      label={"User name"}
                    />
                  </div>
                  <div className="input-field-container">
                    <Password
                      handleOnChange={handlePasswordChange}
                      value={password}
                      errors={passwordErrors}
                    />
                  </div>

                  <div className="input-field-container">
                    <Button label="Sign In" classes="primary-button" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="f-c-link-b w-auto py-3 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-row">
              <span className="px-1">Don&apos;t an account? </span>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
