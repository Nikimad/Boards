import { createSelector } from "@reduxjs/toolkit";
import { selectActiveBoardId } from "../boards/boardsSelectors";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.tasks
);

export const selectActiveTaskId = createSelector(
  rootSelector,
  (tasks) => tasks.activeTaskId
);

export const selectTasks = createSelector(rootSelector, (tasks) => tasks.tasks);

export const selectTasksId = createSelector(
  rootSelector,
  (tasks) => tasks.tasksIds
);

export const selectTasksArr = createSelector(
  selectTasks,
  selectTasksId,
  selectActiveBoardId,
  (tasks, ids, boardId) => ids.reduce((acc, id) => {
    if (tasks[id].boardId === boardId) {
      acc = [...acc, tasks[id]];
    }
    return acc;
  }, [])
);

export const selectActiveTask = createSelector(
  selectTasks,
  selectActiveTaskId,
  (tasks, id) => tasks[id]
);
