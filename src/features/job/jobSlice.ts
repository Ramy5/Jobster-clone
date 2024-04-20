import customFetch from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../user/useSlice";
import { toast } from "react-toastify";
import { getFromLocalStorage } from "@/utils/localStorage";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

interface initialState_TP {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: object[];
  jobType: jobTypeOptions_TP;
  statusOptions: object[];
  status: statusOptions_TP;
  isEditing: boolean;
  editJobId: string;
}

type jobTypeOptions_TP = {
  value: string;
  label: string;
  name: string;
};

type statusOptions_TP = {
  value: string;
  label: string;
  name: string;
};

export interface job_TP {
  company: string;
  position: string;
  jobType: string;
  jobLocation: string;
  status: string;
}
interface editJob_TP {
  jobId: string;
  job: job_TP;
}
interface Payload_TP {
  name: string;
  value: string;
}
interface State_TP {
  [key: string]: any;
}

const statusOptions: statusOptions_TP[] = [
  { value: "interview", label: "interview", name: "status" },
  { value: "declined", label: "declined", name: "status" },
  { value: "pending", label: "pending", name: "status" },
];

const jobTypeOptions: jobTypeOptions_TP[] = [
  { value: "full-time", label: "full-time", name: "jobType" },
  { value: "part-time", label: "part-time", name: "jobType" },
  { value: "remote", label: "remote", name: "jobType" },
  { value: "internship", label: "internship", name: "jobType" },
];

const initialState: initialState_TP = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions,
  jobType: { value: "full-time", label: "full-time", name: "jobType" },
  statusOptions,
  status: { value: "pending", label: "pending", name: "status" },
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI: any) => createJobThunk("/jobs", job, thunkAPI)
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ jobId, job }: editJob_TP, thunkAPI: any) =>
    editJobThunk(`/jobs/${jobId}`, job, thunkAPI)
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI: any) => deleteJobThunk(`/jobs/${jobId}`, thunkAPI)
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (
      state: State_TP,
      { payload: { name, value } }: { payload: Payload_TP }
    ) => {
      state[name] = value;
    },

    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getFromLocalStorage()?.location || "",
      };
    },

    setEditJob: (state: State_TP, { payload }: any) => {
      return { ...state, isEditing: true, ...payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job created");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload as string);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job modified...");
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
