import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface InitialState {
  isLoading: boolean;
  user: null | object;
}

const initialState: InitialState = {
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (user: string, thunkAPI) => {
    try {
      console.log("🚀 ~ registerUser ~ user:", user);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (user: string, thunkAPI) => {
    try {
      console.log("🚀 ~ loginUser ~ user:", user);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

export const useSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
});

export default useSlice.reducer;
