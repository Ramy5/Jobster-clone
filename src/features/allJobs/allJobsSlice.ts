import { createSlice } from "@reduxjs/toolkit";

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

const allJobSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {},
});

export default allJobSlice.reducer;
