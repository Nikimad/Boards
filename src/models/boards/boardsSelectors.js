import { createSelector } from "@reduxjs/toolkit";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.boards
);

export const allBoardsSelector = createSelector(
  rootSelector,
  ({ boards, boardsIds }) => boardsIds.map((id) => boards[id])
);

export const activeBoardIdSelector = createSelector(
  rootSelector,
  ({ activeBoardId }) => activeBoardId
);

export const activeBoardSelector = createSelector(
  rootSelector,
  ({ boards, activeBoardId }) => boards[activeBoardId]
);

