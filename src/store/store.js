import { configureStore } from "@reduxjs/toolkit";
import boardsDomain from "../models/boardsDomain/boardsDomainSlice";
import boardsUI from "../models/boardsUI/boardsUISlice";
import tasksDomain from "../models/tasksDomain/tasksDomainSlice";
import tasksUI from "../models/tasksUI/tasksUISlice";

export const store = configureStore({
  reducer: {
    boardsDomain,
    boardsUI,
    tasksDomain,
    tasksUI,
  },
});
