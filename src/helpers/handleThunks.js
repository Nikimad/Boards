import isSearched from "./isSearched";

export const handlePending = (state) => {
  state.loadingStatus = "loading";
  state.error = null;
};

export const handleFulfilled = (state) => {
  state.loadingStatus = "idle";
  state.error = null;
};

export const handleRejected = (state, action) => {
  state.loadingStatus = "failed";
  state.error = action.error;
};

const handleThunks = (
  builder,
  adapter,
  { getEntities, postEntity, deleteEntity, patchEntity }
) =>
  builder
    .addCase(getEntities.pending, handlePending)
    .addCase(getEntities.rejected, handleRejected)
    .addCase(getEntities.fulfilled, (state, action) => {
      adapter.addMany(state, action);
      state.visibleIds = action.payload.map(({ id }) => id);
      handleFulfilled(state);
    })
    .addCase(postEntity.pending, handlePending)
    .addCase(postEntity.rejected, handleRejected)
    .addCase(postEntity.fulfilled, (state, action) => {
      const {
        payload: { searchParams, ...rest },
      } = action;
      const [entity] = Object.values(rest);
      adapter.addOne(state, entity);
      if (isSearched(entity, searchParams)) {
        state.visibleIds = [entity.id, ...state.visibleIds];
      }
      handleFulfilled(state);
    })
    .addCase(deleteEntity.pending, handlePending)
    .addCase(deleteEntity.rejected, handleRejected)
    .addCase(deleteEntity.fulfilled, (state, action) => {
      adapter.removeOne(state, action);
      state.visibleIds = state.visibleIds.filter((id) => id !== action.payload);
      handleFulfilled(state);
    })
    .addCase(patchEntity.pending, handlePending)
    .addCase(patchEntity.rejected, handleRejected)
    .addCase(patchEntity.fulfilled, (state, action) => {
      adapter.updateOne(state, action);
      handleFulfilled(state);
    });

export default handleThunks;
