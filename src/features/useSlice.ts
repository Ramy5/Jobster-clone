import customFetch from "@/utils/axios";
import {
  User_TP,
  addToLocalStorage,
  clearFromLocalStorage,
  getFromLocalStorage,
} from "@/utils/localStorage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
  async (user: User_TP, thunkAPI) => {
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

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: User_TP, thunkAPI) => {
    try {
      const response = await customFetch.patch("/auth/updateUser", user, {
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
      toast.error(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
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
