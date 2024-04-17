import customFetch from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../user/useSlice";
import { toast } from "react-toastify";
import { getFromLocalStorage } from "@/utils/localStorage";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";

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
};

type statusOptions_TP = {
  value: string;
  label: string;
};

interface job_TP {
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
  { value: "interview", label: "interview" },
  { value: "declined", label: "declined" },
  { value: "pending", label: "pending" },
];

const jobTypeOptions: jobTypeOptions_TP[] = [
  { value: "full-time", label: "full-time" },
  { value: "part-time", label: "part-time" },
  { value: "remote", label: "remote" },
  { value: "internship", label: "internship" },
];

const initialState: initialState_TP = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions,
  jobType: { value: "full-time", label: "full-time" },
  statusOptions,
  status: { value: "pending", label: "pending" },
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI: any) => {
    try {
      const response = await customFetch.post("/jobs", job, {
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
  }
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ jobId, job }: editJob_TP, thunkAPI: any) => {
    console.log("🚀 ~ jobId:", jobId);
    try {
      const response = await customFetch.patch(`/jobs/${jobId}`, job, {
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
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI: any) => {
    thunkAPI.dispatch(showLoading());

    try {
      const response = await customFetch.delete(`/jobs/${jobId}`, {
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
  }
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
