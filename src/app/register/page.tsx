"use client";

import { BaseInput, Logo } from "@/components";
import React, { useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/features/useSlice";
import { useRouter } from "next/navigation";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: any) => state.user);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }

    dispatch(registerUser({ name, email, password }));
  };

  const handleToggleMember = () =>
    setValues({ ...values, isMember: !values.isMember });

  useEffect(() => {
    if (user) setTimeout(() => router.push("/dashboard"), 1000);
  }, [user]);

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

        <div className="password-container">
          <BaseInput
            labelText="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
          />
          {showPassword ? (
            <IoMdEyeOff
              className="password-hide"
              onClick={handleShowPassword}
            />
          ) : (
            <IoEye className="password-show" onClick={handleShowPassword} />
          )}
        </div>

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type="button"
            className="member-btn"
            onClick={handleToggleMember}
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
