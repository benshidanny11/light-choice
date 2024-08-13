/* eslint-disable react/prop-types */
import React from 'react';

export default function FormTextInput({
  type = 'text', value, placeholder, onChange, label, labeled
}) {
  return (
    <div className="col-12 py-1 has-validation input-text-content w-auto">
      {labeled && (
        <div className="px-3 py-1">
          <span>{label}</span>
        </div>
      )}
      <div className="field">
        <input
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          className="input-control"
          value={value}
          required
        />
      </div>
    </div>

  );
}
