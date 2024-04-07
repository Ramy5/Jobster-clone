import customFetch from "@/utils/axios";
import { User_TP } from "@/utils/localStorage";
import { toast } from "react-toastify";
import { logoutUser } from "./useSlice";

export const registerUserThunk = async (
  url: string,
  user: User_TP,
  thunkAPI: any
) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error: any) {
    const errorMsg =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : "An error occurred";
    toast.error(errorMsg);
    return thunkAPI.rejectWithValue(errorMsg);
  }
};

export const loginUserThunk = async (
  url: string,
  user: User_TP,
  thunkAPI: any
) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error: any) {
    const errorMsg =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : "An error occurred";
    toast.error(errorMsg);
    return thunkAPI.rejectWithValue(errorMsg);
  }
};

export const updateUserThunk = async (
  url: string,
  user: User_TP,
  thunkAPI: any
) => {
  try {
    const response = await customFetch.patch(url, user, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMsg =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : "An error occurred";

    if (error?.response?.status) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging out...");
    }

    toast.error(errorMsg);
    return thunkAPI.rejectWithValue(errorMsg);
  }
};
