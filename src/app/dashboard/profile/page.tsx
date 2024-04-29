"use client";
import Wrapper from "@/assets/wrappers/DashboardFormPage";
import { BaseInput } from "@/components";
import { updateUser } from "@/features/user/useSlice";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type userData_TP = {
  name: string;
  lastName: string;
  email: string;
  location: string;
};

const page = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store: any) => store.user);
  const [userData, setUserData] = useState<userData_TP>({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    location: user?.location || "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, lastName, email, location } = userData;

    if (!name || !lastName || !email || !location) {
      toast.error("Please fill out all fields");
      return;
    }

    dispatch(updateUser(userData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Wrapper>
      <form action="" className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>

        <div className="form-center">
          <BaseInput
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <BaseInput
            name="lastName"
            labelText="last name"
            value={userData.lastName}
            onChange={handleChange}
          />
          <BaseInput
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <BaseInput
            name="location"
            value={userData.location}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "please wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default page;
