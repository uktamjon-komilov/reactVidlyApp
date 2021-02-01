import React from "react";

const Input = ({ name, label, value, ref, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type="text"
        className="form-control"
      />
      {error && <div className="alert alert-danger my-2">{error}</div>}
    </div>
  );
};

export default Input;
