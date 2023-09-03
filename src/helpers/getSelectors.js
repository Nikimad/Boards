import { createSelector } from "@reduxjs/toolkit";

const getSelectors = (adapter, rootSelector) => ({
  ...adapter.getSelectors(rootSelector),
  selectData: createSelector(
    rootSelector,
    ({ entities, visibleIds, isLoading, isError }) => ({
      entities: visibleIds.map((id) => entities[id]),
      isLoading,
      isError,
    })
  ),
  selectIsLoading: createSelector(rootSelector, ({ isLoading }) => isLoading),
  selectIsError: createSelector(rootSelector, ({ isError }) => isError),
  selectError: createSelector(rootSelector, ({ error }) => error),
});

export default getSelectors;
