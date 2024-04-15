import customFetch from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { logoutUser } from "../user/useSlice";

interface filterInitialState_TP {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOption: string[];
}

interface initialState_TP extends filterInitialState_TP {
  isLoading: boolean;
  jobs: any[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: object;
  monthlyApplications: any[];
}

const filterInitialState: filterInitialState_TP = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOption: ["latest", "oldest", "a-z", "z-a"],
};

const initialState: initialState_TP = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...filterInitialState,
};

export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (_, thunkAPI: any) => {
    let url = "/jobs";

    try {
      const response = await customFetch.get(url, {
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

      if (error?.response?.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging out...");
      }

      toast.error(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

const allJobSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },

    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export const { showLoading, hideLoading } = allJobSlice.actions;
export default allJobSlice.reducer;
