import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    activeBoardId: null,
    boards: {},
    boardsIds: [],
  },
  reducers: {
    setActiveBoardId(state, { payload }) {
      state.activeBoardId = payload;
    },
    addBoard(state, { payload }) {
      const { id, ...values } = payload;
      state.boards[id] = { id, ...values };
      state.boardsIds = [id, ...state.boardsIds];
    },
    editBoard(state, { payload }) {
      const { id, ...values } = payload;
      state.boards[id] = {
        ...state.boards[id],
        ...values,
      };
    },
    removeBoard(state, { payload }) {
      state.activeBoardId = null;
      delete state.boards[payload];
      state.boardsIds = state.boardsIds.filter((id) => id !== payload);
    },
  },
});

export const { setActiveBoardId, addBoard, editBoard, removeBoard } =
  boardsSlice.actions;

export default boardsSlice.reducer;
