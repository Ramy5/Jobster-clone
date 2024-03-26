import { createSlice } from "@reduxjs/toolkit";

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
});

export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
