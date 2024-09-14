
import React, { useState } from 'react';

import { Link } from 'react-router-dom';

function Text() {
  return (
    <div className="col-12 input-text-c">
      <label htmlFor="username" className="form-label">Username</label>
      <div className="input-group has-validation">
        <input type="text" className="form-control" id="username" placeholder="Username" required />
        <span className="input-group-text">@</span>
        <div className="invalid-feedback">
          Your username is required.
        </div>
      </div>
    </div>
  );
}

function Email({
  value, label, handleOnChange, errors, labeled,placeholder
}) {
  return (
    <div className={`col-12 py-1 has-validation input-text-content w-auto ${errors && 'error'}`}>
      {labeled && (
      <div className="px-3 py-1">
        <span>{label}</span>
      </div>
      )}
      <div className="field">
        <input
          className={`input-field p-input-left`}
          type="email"
          name="email"
          onChange={handleOnChange}
          placeholder={placeholder ? `${placeholder}`:'example@gmail.com'}
          required
          style={{backgroundColor: "red"}}
        />
      </div>
    </div>
  );
}

Email.defaultProps = {
  label: 'Email',
};

function Password({
  value, label, handleOnChange, errors,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={`col-12 py-1 input-text-content w-auto has-validation ${errors && 'error'}`}>
      <div className="px-3 py-1">
        <span>{label}</span>
      </div>
      <div className="field w-auto w-auto d-flex flex-row">
        <input
          className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-auto px-3 py-2 flex-grow-1 form-control`}
          type={showPassword ? 'text' : 'password'}
          onChange={handleOnChange}
          name="password"
          placeholder="********"
          required
        />
        <span className="icon px-3 py-2" onClick={handleShowPassword}>
          <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye'}`} />
        </span>
      </div>
      {errors && (
        <div className="d-flex flex-column px-3 pt-2 error-message">
          {errors.map(({ message },i) => (<span key={i}>{message}</span>))}
        </div>
      )}
    </div>
  );
}

Password.defaultProps = {
  label: 'Password',
  success: true,
};

function Submit({ label, classes }) {
  return (
    <div className="py-1 input-text-content w-auto">
      <input type="submit" className={`w-100 px-3 py-2 ${classes}`} value={label} />
    </div>
  );
}

function TCPPAgree({ handleAgree, errors }) {
  return (
    <div className={`input-text-content pt-2 d-flex flex-column ${errors && 'error'}`}>
      <div className="d-flex flex-row">
        <div className="td-st pt-2">
          <label className="agree-container">
            <input type="checkbox" onChange={handleAgree} />
            <span className="checkmark" />
          </label>
        </div>
        <div className="td-st">
          <span className="px-1">I accept the</span>
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
          <span className="px-1">and have read the</span>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
      {errors && (
        <div className="d-flex flex-column px-3 pt-2 error-message">
          {errors.map(({ message },i) => (<span key={i}>{message}</span>))}
        </div>
      )}
    </div>
  );
}

function TCPRemember({ handleRemember, errors }) {
  return (
    <div className={`input-text-content pt-2 d-flex flex-column ${errors && 'error'}`}>
      <div className="d-flex flex-row">
        <div className="td-st pt-2">
          <label className="agree-container">
            <input type="checkbox" onChange={handleRemember} />
            <span className="checkmark" />
          </label>
        </div>
        <span className="pt-2">Remember me</span>
      </div>
      {errors && (
        <div className="d-flex flex-column px-3 pt-2 error-message">
          {errors.map(({ message },i) => (<span key={i}>{message}</span>))}
        </div>
      )}
    </div>
  );
}

export {
  Text, Email, Password, Submit, TCPPAgree, TCPRemember,
};
