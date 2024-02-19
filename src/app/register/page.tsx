"use client";

import { BaseInput, Logo } from "@/components";
import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/RegisterPage";

interface initialStateProps {
  name: string;
  email: string;
  password: string;
  isMember: Boolean;
}

const initialState: initialStateProps = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Register</h3>

        <BaseInput
          labelText="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />

        <BaseInput
          labelText="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />

        <BaseInput
          labelText="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
