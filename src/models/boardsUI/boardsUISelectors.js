import { createSelector } from "@reduxjs/toolkit";

const rootSelector = createSelector(
  (state) => state,
  ({ boardsUI }) => boardsUI
);

export const boardsUISelectors = {
  selectAll: createSelector(rootSelector, ({ ids }) => ids),
};
