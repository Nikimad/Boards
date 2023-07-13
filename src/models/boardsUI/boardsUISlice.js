import { createSlice } from "@reduxjs/toolkit";
import { fetchBoards, addBoard } from "../boardsDomain/boardsDomainThunks";

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
      .addCase(addBoard.fulfilled, (state, { payload }) => {
        state.ids = [ payload.id, ...state.ids];
      })
});

export default boardsUISlice.reducer;
