/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from '../shared/Elements';
import { useNavigate } from "react-router-dom";


function SignUpSuccessfull() {
  const navigate=useNavigate();
  const handleNext = () => {
    navigate("/login");
  };
  // useEffect(() => { handleCanResend(); }, []);
  return (
    <div className="empty-container email-sent text-center">
        <div className="empty-content">
          <h1 className="email-sent"><i className="bi bi-envelope-paper" /></h1>
          <h3 className="text-1 mt-3">Signup success ✅</h3>
          <small className="text-2 d-flex flex-row mt-5">
            <span>You have successfully signed up to right choice</span>
          </small>
          <div className="f-c-link-b w-auto py-3 d-flex justify-content-center align-items-center mt-5">
            <div className="d-flex flex-row">
              <Button handleOnClick={handleNext} label="Continue" classes={`primary-button  mt-3`} />
            </div>
          </div>
        </div>
    

    </div>
  );
}

export default SignUpSuccessfull;
