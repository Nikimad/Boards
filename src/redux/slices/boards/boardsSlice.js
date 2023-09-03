import {
  createSlice,
  createEntityAdapter,
  createSelector,
  createAction,
} from "@reduxjs/toolkit";
import getSelectors from "../../../helpers/getSelectors";

const adapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

const boardsSlice = createSlice({
  name: "boards",
  initialState: adapter.getInitialState({
    visibleIds: [],
    isLoading: true,
    isError: false,
    error: null,
  }),
  reducers: {
    fetchBoards(state) {
      state.isLoading = true;
    },
    fetchBoardsSuccess(state, { payload }) {
      adapter.addMany(state, payload);
      const visibleIds = payload.map(({ id }) => id);
      state.visibleIds = visibleIds.sort((a, b) => b - a);
      state.isLoading = false;
    },
    setIsError(state, { payload }) {
      state.error = payload;
      state.isError = true;
    },
    resetIsError(state) {
      state.error = null;
      state.isError = false;
    },
    addBoard: adapter.addOne,
    updateBoard: adapter.updateOne,
    removeBoard(state, { payload }) {
      adapter.removeOne(state, payload);
      state.visibleIds = state.visibleIds.filter((id) => id !== payload);
    },
  },
});

export const fetchBoard = createAction(`${boardsSlice.name}/fetchBoard`);
export const postBoard = createAction(`${boardsSlice.name}/postBoard`);
export const patchBoard = createAction(`${boardsSlice.name}/patchBoard`);
export const deleteBoard = createAction(`${boardsSlice.name}/deleteBoard`);

export const {
  fetchBoards,
  fetchBoardsSuccess,
  addBoard,
  updateBoard,
  removeBoard,
  setIsError,
  resetIsError,
} = boardsSlice.actions;

export const boardsSelectors = getSelectors(
  adapter,
  createSelector(
    (state) => state,
    ({ boards }) => boards
  )
);

export default boardsSlice.reducer;
