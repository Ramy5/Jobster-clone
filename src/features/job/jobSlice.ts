import customFetch from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../useSlice";
import { toast } from "react-toastify";

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

interface Payload_TP {
  name: string;
  value: string;
}

interface State_TP {
  [key: string]: any;
}

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI: any) => {
    try {
      const response = await customFetch.post("/job", job, {
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
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload);
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
