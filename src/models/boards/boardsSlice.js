import { createSlice } from "@reduxjs/toolkit";
import { boardsAdapter } from "./boardsAdapter";

const boardsSlice = createSlice({
  name: "boards",
  initialState: boardsAdapter.getInitialState(),
  reducers: {
    addBoard: boardsAdapter.addOne,
  },
});

export const { addBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
