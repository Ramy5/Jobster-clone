import {
  User_TP,
  addToLocalStorage,
  clearFromLocalStorage,
  getFromLocalStorage,
} from "@/utils/localStorage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  clearAllStateThunk,
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

interface logoutUserAction {
  payload?: string;
}

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

export const clearAllState = createAsyncThunk(
  "user/clearStore",
  clearAllStateThunk
);

export const useSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, action: logoutUserAction) => {
      state.user = null;
      state.isSidebarOpen = !state.isSidebarOpen;
      clearFromLocalStorage();

      if (action.payload) {
        toast.success(action.payload);
      }
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
      })
      .addCase(clearAllState.rejected, (state, { payload }) => {
        toast.error(payload as string);
      });
  },
});

export const { toggleSidebar, logoutUser } = useSlice.actions;
export default useSlice.reducer;
