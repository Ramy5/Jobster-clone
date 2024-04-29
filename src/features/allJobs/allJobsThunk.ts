import customFetch, { checkForUnauthorizedResponse } from "@/utils/axios";

export const getAllJobsThunk = async (_: any, thunkAPI: any) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

  if (search) {
    url += `&search=${search}`;
  }

  try {
    const response = await customFetch.get(url, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
};

export const showStatsThunk = async (_: any, thunkAPI: any) => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
};
