import customFetch, { checkForUnauthorizedResponse } from "@/utils/axios";
import { clearValues, job_TP } from "./jobSlice";
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
    return checkForUnauthorizedResponse(error, thunkAPI);
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
    return checkForUnauthorizedResponse(error, thunkAPI);
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
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
