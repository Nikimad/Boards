const getInitialState = (adapter) =>
  adapter.getInitialState({
    visibleIds: [],
    loadingStatus: "idle",
    error: null,
  });

export default getInitialState;
