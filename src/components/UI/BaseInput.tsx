import React from "react";

interface BaseInputProps {
  name: string;
  value: string;
  labelText: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const BaseInput: React.FC<BaseInputProps> = ({
  name,
  value,
  labelText,
  type = "text",
  onChange,
  onBlur,
}) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className="form-input"
      />
    </div>
  );
};

export default BaseInput;
