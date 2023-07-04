import { createSelector } from "@reduxjs/toolkit";
import { boardsAdapter } from "./boardsAdapter";
import getNormolizedString from "../../helpers/getNormolizeString";

const rootSelector = createSelector(
  (state) => state,
  ({ boards }) => boards
);

const adapterSelectors = boardsAdapter.getSelectors(rootSelector);

export const boardsSelectors = {
  ...adapterSelectors,
  selectByQuery: (query) => createSelector(
    adapterSelectors.selectAll,
    (boards) => {
      if (!query) return boards;
      const normolizedQuery = getNormolizedString(query);
      return boards.filter(({ title }) => getNormolizedString(title).includes(normolizedQuery));
    }
  ),
};
