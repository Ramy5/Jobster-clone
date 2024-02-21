"use client";

import { BaseInput, Logo } from "@/components";
import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";

interface initialStateProps {
  name: string;
  email: string;
  password: string;
  isMember: boolean;
}

const initialState: initialStateProps = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState<initialStateProps>(initialState);
  console.log("🚀 ~ Register ~ values:", values);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }
  };

  const handleToggleMember = () =>
    setValues((prev) => {
      return { ...prev, isMember: !prev.isMember };
    });

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"} </h3>

        {!values.isMember && (
          <BaseInput
            labelText="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        )}

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

        <div>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button className="member-btn" onClick={handleToggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Register;
