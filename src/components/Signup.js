import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/signup.css";

import { Email, Password } from "../shared/Input";
import { Button, ProgressBar } from "../shared/Elements";
import { ContentHead } from "../shared/Contents";
import Alert from "../shared/Alert";
import FormTextInput from "../shared/FormTextInput";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/thunk/auth";
import { setError } from "../redux/slice/global";
const countryCode = (number) => {
  if (!number.startsWith("+25")) return "+25" + number;
  return number;
};
function SignUp() {
  const [name, setName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const form = useRef();
  const dispatch = useDispatch();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const navigate = useNavigate();
  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const data = {
      email,
      firstname: name,
      lastname: name,
      phone: countryCode(phonenumber),
      password,
    };
    dispatch(signup(data, navigate));
  };
  const global = useSelector((state) => state.global);
  return (
    <div className="loginContainer signUpContainer ">
      <div className="col-12 right d-flex justify-content-center align-items-center">
        <div className="c-f-u-content">
          <ContentHead />
          <div className="c-f-content mt-5">
            <div className="c-f-i-content py-4 px-5">
              {global.error && (
                <Alert
                  info={{ type: "err", message: global.error }}
                  handleCloseAlert={() => dispatch(setError(null))}
                />
              )}
              <div className="c-content-fields w-auto">
                <h6>Sign Up 🤞</h6>
                <form
                  onSubmit={handleSignUp}
                  className="needs-validation mt-5"
                  ref={form}
                >
                  <div className="input-field-container">
                    <FormTextInput
                      onChange={handleNameChange}
                      value={name}
                      labeled
                      placeholder={"John Doe"}
                      label={"Full name"}
                    />
                  </div>

                  <div className="input-field-container">
                    <FormTextInput
                      onChange={handlePhoneChange}
                      value={phonenumber}
                      labeled
                      placeholder={"+250XXXXXXXXX"}
                      label={"Phone number"}
                    />
                  </div>

                  <div className="input-field-container">
                    <Email
                      handleOnChange={handleEmailChange}
                      value={email}
                      labeled
                    />
                  </div>
                  <div className="input-field-container">
                    <Password
                      handleOnChange={handlePasswordChange}
                      value={password}
                    />
                  </div>
                  <Button label="Sign Up" classes={`primary-button  mt-5`} />
                </form>
              </div>
            </div>
          </div>
          <div className="f-c-link-b w-auto py-3 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-row">
              <span className="px-1">Already have an account? </span>
              <Link to="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
