import { createSelector, current } from "@reduxjs/toolkit";
import { selectCurrentTasksIds } from "../observer/observerSelectors";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.tasks
);

export const selectTasks = createSelector(rootSelector, (tasks) => tasks.items);

export const selectCurrentTasks = createSelector(
  selectCurrentTasksIds,
  selectTasks,
  (ids, tasks) => tasks.filter((task) => ids.includes(task.id))
);

export const selectStatusDepCurrentTasks = (status) =>
  createSelector(selectCurrentTasks, (currentTasks) =>
    currentTasks.filter((task) => task.status === status)
  );
