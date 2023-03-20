import { configureStore } from "@reduxjs/toolkit";
import boardsAndTasks from "../models/boardsAndTasks/boardsAndTasksSlice";
import boards from "../models/boards/boardsSlice";
import tasks from "../models/tasks/tasksSlice";
import observer from "../models/observer/observerSlice";

export const store = configureStore({
  reducer: {
    boards,
    tasks,
    boardsAndTasks,
    observer,
  },
});
