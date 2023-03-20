import { createSelector } from "@reduxjs/toolkit";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.observer
);

export const selectCurrentBoardId = createSelector(
  rootSelector,
  (observer) => observer.boardId
);

export const selectCurrentTaskId = createSelector(
  rootSelector,
  (observer) => observer.taskId
);
