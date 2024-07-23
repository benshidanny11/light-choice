/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable brace-style */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/signup.css'
// import { Validate } from '../../helpers';
import {
  Email, Password, TCPPAgree,
} from '../shared/Input';
import { Button, ProgressBar } from '../shared/Elements';
import { ContentHead } from '../shared/Contents';

// import VerificationSent from './VerificationSent';
import { signUp } from '../../api';
import Alert from '../shared/Alert';
import FormTextInput from '../shared/FormTextInput';
import SignUpSuccessfull from './SignUpSuccessfull';
// import useAuth from '../../hooks/useAuth';

function SignUp({ alert: defaultAlert }) {
  // const { setAuth } = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();
  const [name, setName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTC, setAgreeToTC] = useState(false);
  const [emailErrors, setEmailErrors] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState();
  const [alert, setAlert] = useState(defaultAlert);
  const [showAlert, setShowAlert] = useState(true);
  // eslint-disable-next-line no-restricted-globals
  const from = location?.state?.from?.pathname || '/';
  const form = useRef();
  const canContinue = !!(!emailErrors && !passwordErrors && email && password);

  const handleEmailChange = e => {
    setEmail(e.target.value);
    // const { error } = Validate('signup', { email: e.target.value });
    // setEmailErrors(error ? error.details : undefined);
  };

  const handlePhoneChange = e => {
    setPhoneNumber(e.target.value);
    // const { error } = Validate('signup', { email: e.target.value });
    // setEmailErrors(error ? error.details : undefined);
  };

  const handleNameChange = e => {
    setName(e.target.value);
    // const { error } = Validate('signup', { email: e.target.value });
    // setEmailErrors(error ? error.details : undefined);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
    // const { error } = Validate('signup', { password: e.target.value });
    // setPasswordErrors(error ? error.details : undefined);
  };

  const ValidateInputs = () => {
    handleEmailChange({ target: { value: email } });
    handlePasswordChange({ target: { value: password } });
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };
  const handleSignupSuccess = () => {
    setSignupSuccess(true);
  };
  // const handleGoogleLoginSuccess = response => {
  //   setEmailErrors(undefined);
  //   setPasswordErrors(undefined);
  //   setAuth({ ...response });
  //   navigate(from, { replace: true });
  // };
  const handleSignUp = e => {
    console.log(canContinue)
    e.preventDefault();
    if (status !== 'pending') {

      if (!canContinue) {
       
        ValidateInputs();
      } else {
        console.log('Hello there')
        /*
        
        {
 "email":"benshidanny11@gmail.com",
 "firstname":"dann",
 "lastname":"Benshi",
 "phone":"0783987123",
 "password":"22222222"
}
        */
        setStatus('pending');
        const data = { email, firstname: name, lastname: name, phone: phonenumber, password };
        signUp(data, (err, data) => {
          console.log(data);
          if (err) {
            console.log(err)
            setStatus('fail');
            const resScode = err?.response?.status;
            if (resScode === 400 || resScode === 409) {
              handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
            } else {
              console.log(resScode)
              handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
            }
          } else {
            if(data.responsecode===1){
              handleSignupSuccess();
            }else{
              handleShowAlert({ type: 'err', message: data.responsemessage });
            }
            
          }
        });
      }
    }
  };

  if (signupSuccess) {
    return (<SignUpSuccessfull />);
  }

  return (
    <div className="loginContainer signUpContainer ">
      <div className="col-12 right d-flex justify-content-center align-items-center">
        <div className="c-f-u-content">
          <ContentHead />
          <div className="c-f-content mt-5">
            {status === 'pending' && (<ProgressBar />)}
            <div className="c-f-i-content py-4 px-5">
              {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
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
                      placeholder={'John Doe'}
                      label={'Full name'}
                    />
                  </div>

                  <div className="input-field-container">
                    <FormTextInput
                      onChange={handlePhoneChange}
                      value={phonenumber}
                      labeled
                      placeholder={'+250XXXXXXXXX'}
                      label={'Phone number'}
                    />
                  </div>

                  <div className="input-field-container">
                    <Email
                      handleOnChange={handleEmailChange}
                      value={email}
                      errors={emailErrors}
                      labeled
                    />
                  </div>
                  <div className="input-field-container">
                    <Password
                      handleOnChange={handlePasswordChange}
                      value={password}
                      errors={passwordErrors}
                    />
                  </div>

                  {/* <TCPPAgree handleAgree={handleAgree} errors={agreeErrors} /> */}
                  <Button label="Sign Up" classes={`primary-button ${(!true || status === 'pending') && 'disabled'} mt-5`} />
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