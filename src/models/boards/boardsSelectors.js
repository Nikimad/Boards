import { createSelector } from "@reduxjs/toolkit";
import { boardsAdapter } from "./boardsAdapter";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.boards
);

export const boardsSelectors = boardsAdapter.getSelectors(rootSelector);
