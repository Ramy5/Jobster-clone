import customFetch from "@/utils/axios";
import { addToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface InitialState {
  isLoading: boolean;
  user: null | object;
}

const initialState: InitialState = {
  isLoading: false,
  user: getFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (user: string, thunkAPI) => {
    try {
      const response = await customFetch.post("/auth/register", user);
      return response.data;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error?.response?.data?.msg
          : "An error occurred"
      );
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error?.response?.data?.msg
          : "An error occurred"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (user: string, thunkAPI) => {
    try {
      const response = await customFetch.post("/auth/login", user);
      return response.data;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error?.response?.data?.msg
          : "An error occurred"
      );
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error?.response?.data?.msg
          : "An error occurred"
      );
    }
  }
);

export const useSlice = createSlice({
  name: "userSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addToLocalStorage(user);
        toast.success(`Hello ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        console.log("🚀 ~ .addCase ~ user:", JSON.stringify(user));
        state.isLoading = false;
        state.user = user;
        addToLocalStorage(user);
        toast.success(`Welcome back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default useSlice.reducer;
