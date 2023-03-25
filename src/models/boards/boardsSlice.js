import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    items: [],
  },
  reducers: {
    addBoard(state, { payload }) {
      state.items = [payload, ...state.items];
    },
    removeBoard(state, { payload }) {
      state.items = state.items.filter((board) => board.id !== payload);
    },
    updateBoard(state, { payload }) {
      state.items = state.items.map((board) =>
        board.id === payload.id ? { ...board, ...payload.changes } : board
      );
    },
  },
});

export const { addBoard, removeBoard, updateBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
