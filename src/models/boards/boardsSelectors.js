import { createSelector } from "@reduxjs/toolkit";
import { activeBoardIdSelector } from "../view/viewSelectors";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.boards
);

export const allBoardsSelector = createSelector(
  rootSelector,
  ({ boards, boardsIds }) => boardsIds.map((id) => boards[id])
);

export const activeBoardSelector = createSelector(
  rootSelector,
  activeBoardIdSelector,
  ({ boards }, id) => boards[id]
);
