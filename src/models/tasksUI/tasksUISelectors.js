import { createSelector } from "@reduxjs/toolkit";

const rootSelector = createSelector(
  (state) => state,
  ({ tasksUI }) => tasksUI
);

export const tasksUISelectors = {
  selectAll: createSelector(rootSelector, ({ ids }) => ids),
};
