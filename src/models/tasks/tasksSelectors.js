import { createSelector } from "@reduxjs/toolkit";
import { activeBoardIdSelector } from "../boards/boardsSelectors";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.tasks
);

export const tasksSelector = createSelector(
  rootSelector,
  activeBoardIdSelector,
  ({tasks, tasksIds}, boardId) => tasksIds.reduce((acc, id) => {
    if (tasks[id].boardId === boardId) {
      acc = [...acc, tasks[id]];
    }
    return acc;
  }, [])
);

export const activeTaskSelector = createSelector(
  rootSelector,
  ({tasks, activeTaskId}) => tasks[activeTaskId]
);
