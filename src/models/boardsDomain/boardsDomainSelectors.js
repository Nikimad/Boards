import { createSelector } from "@reduxjs/toolkit";
import { boardsDomainAdapter } from "./boardsDomainAdapter";

const rootSelector = createSelector(
  (state) => state,
  ({ boardsDomain }) => boardsDomain
);

const adapterSelectors = boardsDomainAdapter.getSelectors(rootSelector);

export const boardsDomainSelectors = {
  ...adapterSelectors,
  selectByIds: (ids) =>
    createSelector(adapterSelectors.selectAll, (boards) =>
      boards.filter(({ id }) => ids.includes(id))
    ),
};
