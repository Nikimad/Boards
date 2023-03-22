import { configureStore } from "@reduxjs/toolkit";
import boards from "../models/boards/boardsSlice";
import tasks from "../models/tasks/tasksSlice";
import observer from "../models/observer/observerSlice";
import { loadState, saveState } from "../helpers/localStorageHandlers";
import  throttle  from "lodash/throttle";

const state = loadState();

export const store = configureStore({
  reducer: {
    boards,
    tasks,
    observer,
  },
  preloadedState: state,
});

store.subscribe(throttle(() => saveState(store.getState()), 1000, { leading: false }));
