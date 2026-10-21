import { configureStore } from "@reduxjs/toolkit";
import { boardsApi } from "./services/boardsApi";
import { tasksApi } from "./services/tasksApi";

export const store = configureStore({
  reducer: {
    [boardsApi.reducerPath]: boardsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardsApi.middleware, tasksApi.middleware),
});
