import customFetch from "@/utils/axios";
import {
  User_TP,
  addToLocalStorage,
  clearFromLocalStorage,
  getFromLocalStorage,
} from "@/utils/localStorage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from "./userThunk";

interface InitialState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: null | User_TP;
}

const initialState: InitialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: User_TP, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: User_TP, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: User_TP, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
  }
);

export const useSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = !state.isSidebarOpen;
      clearFromLocalStorage();
    },
  },
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
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addToLocalStorage(user);
        toast.success(`User updated successfully`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export const { toggleSidebar, logoutUser } = useSlice.actions;
export default useSlice.reducer;
