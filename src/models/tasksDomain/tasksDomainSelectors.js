import { createSelector } from "@reduxjs/toolkit";
import { tasksDomainAdapter } from "./tasksDomainAdapter";

const rootSelector = createSelector(
  (state) => state,
  ({ tasksDomain }) => tasksDomain
);

export const adapterSelectors = tasksDomainAdapter.getSelectors(rootSelector);

export const tasksDomainSelectors = {
  ...adapterSelectors,
  selectByIds: (ids) =>
    createSelector(adapterSelectors.selectAll, (tasks) =>
      tasks.filter(({ id }) => ids.includes(id))
    ),
};
