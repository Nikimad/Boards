import { createSelector } from "@reduxjs/toolkit";

const getExtendedSelectors = (adapter, rootSelector) => {
  const adapterSelectors = adapter.getSelectors(rootSelector);

  return {
    ...adapterSelectors,
    selectByIds: (ids) =>
      createSelector(adapterSelectors.selectAll, (entities) =>
        entities.filter(({ id }) => ids.includes(id))
      ),
    selectVisibleIds: createSelector(
      rootSelector,
      ({ visibleIds }) => visibleIds
    ),
    selectLoadingStatus: createSelector(
      rootSelector,
      ({ loadingStatus }) => loadingStatus
    ),
    selectError: createSelector(rootSelector, ({ error }) => error),
  };
};

export default getExtendedSelectors;
