import { boardsDomainAdapter } from "./boardsDomainAdapter";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBoards,
  addBoard,
  deleteBoard,
  editBoard,
} from "./boardsDomainThunks";

const boardsDomainSlice = createSlice({
  name: "boards",
  initialState: boardsDomainAdapter.getInitialState(),
  extraReducers: (builder) =>
    builder
      .addCase(fetchBoards.fulfilled, boardsDomainAdapter.addMany)
      .addCase(addBoard.fulfilled, boardsDomainAdapter.addOne)
      .addCase(deleteBoard.fulfilled, boardsDomainAdapter.removeOne)
      .addCase(editBoard.fulfilled, boardsDomainAdapter.updateOne),
});

export default boardsDomainSlice.reducer;
