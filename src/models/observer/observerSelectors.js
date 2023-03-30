import { createSelector } from "@reduxjs/toolkit";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.observer
);

export const selectCurrentBoardId = createSelector(
  rootSelector,
  (observer) => observer.boardId
);

export const selectBoardsTasks = createSelector(
  rootSelector,
  (observer) => observer.boardsTasks
);

export const selectCurrentTasksIds = createSelector(
  selectCurrentBoardId,
  selectBoardsTasks,
  (boardId, boardsTasks) => boardsTasks[boardId] ?? [],
);

export const selectBoardsTasksCurrent = createSelector(
  selectCurrentBoardId,
  selectCurrentTasksIds,
  (id, taskIds) => [id, taskIds],
);