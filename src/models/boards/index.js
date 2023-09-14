import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const adapter = createEntityAdapter({
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
    getBoards(state) {
      state.isLoading = true;
    },
    getBoardsSuccess(state, { payload }) {
      adapter.addMany(state, payload);
      const visibleIds = payload.map(({ id }) => id);
      state.visibleIds = visibleIds.sort((a, b) => b - a);
      state.isLoading = false;
    },
    getBoard(state) {
      return state;
    },
    getBoardSuccess: adapter.addOne,
    createBoard(state) {
      return state;
    },
    editBoard(state) {
      return state;
    },
    editBoardSuccess: adapter.updateOne,
    deleteBoard(state) {
      return state;
    },
    deleteBoardSucces(state, { payload }) {
      adapter.removeOne(state, payload);
      state.visibleIds = state.visibleIds.filter((id) => id !== payload);
    },
    setIsError(state, { payload }) {
      state.error = payload;
      state.isError = true;
    },
    resetIsError(state) {
      state.error = null;
      state.isError = false;
    },
  },
});

export const boardsActions = boardsSlice.actions;

export default boardsSlice.reducer;
