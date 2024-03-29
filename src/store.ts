import { configureStore } from "@reduxjs/toolkit";
import useSlice from "./features/useSlice";
import jobSlice from "./features/job/jobSlice";

export const store = configureStore({
  reducer: {
    user: useSlice,
    job: jobSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
