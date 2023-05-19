import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: {},
    boardsIds: [],
  },
  reducers: {
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

export const { addBoard, editBoard, removeBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
