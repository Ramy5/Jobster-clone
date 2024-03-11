import customFetch from "@/utils/axios";
import {
  User_TP,
  addToLocalStorage,
  getFromLocalStorage,
} from "@/utils/localStorage";
import {
  createSlice,
  createAsyncThunk,
  AsyncThunk,
  UnknownAction,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface InitialState {
  isLoading: boolean;
  user: null | User_TP;
}

const initialState: InitialState = {
  isLoading: false,
  user: getFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: string, thunkAPI) => {
    try {
      const response = await customFetch.post("/auth/register", user);
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : "An error occurred";
      toast.error(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: string, thunkAPI) => {
    try {
      const response = await customFetch.post("/auth/login", user);
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : "An error occurred";
      toast.error(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const useSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
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
        toast.error(payload as string);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addToLocalStorage(user);
        toast.success(`Welcome back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export default useSlice.reducer;
