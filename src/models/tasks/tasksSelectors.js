import { createSelector } from "@reduxjs/toolkit";
import { tasksAdapter } from "./tasksAdapter";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.tasks
);

export const tasksSelectors = tasksAdapter.getSelectors(rootSelector);
