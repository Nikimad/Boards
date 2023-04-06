import { createSelector } from "@reduxjs/toolkit";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.boards
);

export const selectActiveBoardId = createSelector(
  rootSelector,
  (boards) => boards.activeBoardId
);

export const selectBoards = createSelector(
  rootSelector,
  (boards) => boards.boards
);

export const selectBoardsId = createSelector(
  rootSelector,
  (boards) => boards.boardsIds
);

export const selectBoardsArr = createSelector(
  selectBoards,
  selectBoardsId,
  (boards, ids) => ids.map((id) => boards[id])
);

export const selectActiveBoard = createSelector(
  selectBoards,
  selectActiveBoardId,
  (boards, id) => boards[id]
);
