import { createSelector } from "@reduxjs/toolkit";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.boards
);

export const allBoardsSelector = createSelector(
  rootSelector,
  ({ boards, boardsIds }) => boardsIds.map((id) => boards[id])
);

export const boardByIdSelector = (id) =>
  createSelector(rootSelector, ({ boards }) => boards[id]);
