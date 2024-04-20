import customFetch from "@/utils/axios";
import { clearValues, job_TP } from "./jobSlice";
import { logoutUser } from "../user/useSlice";
import { toast } from "react-toastify";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";

export const createJobThunk = async (url: string, job: any, thunkAPI: any) => {
  try {
    const response = await customFetch.post(url, job, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error: any) {
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
  }
};

export const editJobThunk = async (url: string, job: job_TP, thunkAPI: any) => {
  try {
    const response = await customFetch.patch(url, job, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error: any) {
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
  }
};

export const deleteJobThunk = async (url: string, thunkAPI: any) => {
  thunkAPI.dispatch(showLoading());

  try {
    const response = await customFetch.delete(url, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    thunkAPI.dispatch(getAllJobs());
    return response.data.msg;
  } catch (error: any) {
    thunkAPI.dispatch(hideLoading());
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
  }
};
