import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoardId } from "../observer/observerSelectors";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.boards,
);

export const selectBoards = createSelector(
  rootSelector,
  (boards) => boards.items,
);

export const selectCurrentBoard = createSelector(
  selectCurrentBoardId,
  selectBoards,
  (id, boards) => boards.find((board) => board.id === id),
);

export const selectBoardsCount = createSelector(
  selectBoards,
  (boards) => boards.length,
);
