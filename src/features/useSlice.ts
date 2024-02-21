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

export const useSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
});

export default useSlice.reducer;
