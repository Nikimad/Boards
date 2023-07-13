import { configureStore } from "@reduxjs/toolkit";
import boardsDomain from "../models/boardsDomain/boardsDomainSlice";
import boardsUI from "../models/boardsUI/boardsUISlice";
import tasks from "../models/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    boardsDomain,
    boardsUI,
    tasks,
  },
});
