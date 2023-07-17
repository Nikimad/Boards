import { createSlice } from "@reduxjs/toolkit";
import { fetchBoards, addBoard, deleteBoard } from "../boardsDomain/boardsDomainThunks";
import isRequested from "../../helpers/isRequested";

const boardsUISlice = createSlice({
  name: "boardsUI",
  initialState: {
    ids: [],
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchBoards.fulfilled, (state, { payload }) => {
        state.ids = payload.map(({ id }) => id);
      })
      .addCase(addBoard.fulfilled, (state, { payload : { board, searchParams } }) => {
        if (isRequested(board, searchParams)) {
          state.ids = [board.id, ...state.ids];
        }
      })
      .addCase(deleteBoard.fulfilled, (state, { payload }) => {
        state.ids = state.ids.filter((id) => id !== payload);
      })
});

export default boardsUISlice.reducer;
