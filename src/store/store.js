import { configureStore } from "@reduxjs/toolkit";
import boardsAndTasks from "../models/boardsAndTasks/boardsAndTasksSlice";
import boards from "../models/boards/boardsSlice";
import tasks from "../models/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    boards,
    tasks,
    boardsAndTasks,
  },
});
