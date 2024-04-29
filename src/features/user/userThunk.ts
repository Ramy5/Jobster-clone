import customFetch, { checkForUnauthorizedResponse } from "@/utils/axios";
import { User_TP } from "@/utils/localStorage";
import { logoutUser } from "./useSlice";
import { clearValues } from "../job/jobSlice";
import { clearState } from "../allJobs/allJobsSlice";

export const registerUserThunk = async (
  url: string,
  user: User_TP,
  thunkAPI: any
) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI);
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
    return checkForUnauthorizedResponse(error, thunkAPI);
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
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearAllStateThunk = async (message: any, thunkAPI: any) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(clearState());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
