"use client"

import axios from "axios";
import { getFromLocalStorage } from "./localStorage";
import { logoutUser } from "@/features/user/useSlice";
import { toast } from "react-toastify";

const customFetch = axios.create({
  baseURL: "https://redux-toolkit-jobster-api-server.onrender.com/api/v1",
});

customFetch.interceptors.request.use(
  (config) => {
    const user = getFromLocalStorage();

    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const checkForUnauthorizedResponse = (error: any, thunkAPI: any) => {
  const errorMsg =
    error.response && error.response.data.msg
      ? error.response.data.msg
      : "An error occurred";

  if (error?.response?.status === 401) {
    thunkAPI.dispatch(logoutUser());
    return thunkAPI.rejectWithValue("Unauthorized! Logging out...");
  }

  toast.error(errorMsg);
  return thunkAPI.rejectWithValue(errorMsg);
};

export default customFetch;
