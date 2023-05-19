import { createSelector } from "@reduxjs/toolkit";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.view
);

export const activeBoardIdSelector = createSelector(
  rootSelector,
  ({ activeBoardId }) => activeBoardId
);

export const activeTaskIdSelector = createSelector(
  rootSelector,
  ({ activeTaskId }) => activeTaskId
);

export const filterSelector = createSelector(
  rootSelector,
  ({ filter }) => filter
);
