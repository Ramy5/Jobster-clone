import customFetch from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { logoutUser } from "../user/useSlice";

interface filterInitialState_TP {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOption: sortOption_TP[];
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

interface sortOption_TP {
  value: string;
  label: string;
  name: string;
}

const sortOption: sortOption_TP[] = [
  { value: "latest", label: "latest", name: "sort" },
  { value: "oldest", label: "oldest", name: "sort" },
  { value: "a-z", label: "a-z", name: "sort" },
  { value: "z-a", label: "z-a", name: "sort" },
];

const filterInitialState: filterInitialState_TP = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOption,
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
  async (_: any, thunkAPI: any) => {
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

export const showStats = createAsyncThunk(
  "jobs/showStats",
  async (_: any, thunkAPI: any) => {
    try {
      const response = await customFetch.get("/jobs/stats");
      console.log(response.data);
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
    showLoading: (state: any) => {
      state.isLoading = true;
    },

    hideLoading: (state: any) => {
      state.isLoading = false;
    },

    handleChange: (
      state: any,
      { payload: { name, value } }: { payload: { name: string; value: string } }
    ) => {
      state[name] = value;
    },

    clearFilters: (state: any) => {
      return { ...state, ...filterInitialState };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllJobs.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        getAllJobs.fulfilled,
        (state: any, { payload }: { payload: any }) => {
          state.isLoading = false;
          state.jobs = payload.jobs;
          state.page = payload.page;
          state.numOfPages = payload.numOfPages;
          state.totalJobs = payload.totalJobs;
        }
      )
      .addCase(
        getAllJobs.rejected,
        (state: any, { payload }: { payload: any }) => {
          state.isLoading = false;
          toast.error(payload as string);
        }
      )
      .addCase(showStats.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        showStats.fulfilled,
        (state: any, { payload }: { payload: any }) => {
          state.isLoading = false;
          state.stats = payload.defaultStats;
          state.monthlyApplications = payload.monthlyApplications;
        }
      )
      .addCase(
        showStats.rejected,
        (state: any, { payload }: { payload: any }) => {
          state.isLoading = false;
          toast.error(payload as string);
        }
      );
  },
});

export const { showLoading, hideLoading, handleChange, clearFilters } =
  allJobSlice.actions;
export default allJobSlice.reducer;
