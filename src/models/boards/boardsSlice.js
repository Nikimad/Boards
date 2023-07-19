import { createSlice } from "@reduxjs/toolkit";
import { boardsAdapter } from "./boardsAdapter";
import getInitialState from "../../helpers/getInitialState";
import { getBoards, postBoard, deleteBoard, patchBoard } from "./boardsThunks";
import handleThunks from "../../helpers/handleThunks";

const boardsSlice = createSlice({
  name: "board",
  initialState: getInitialState(boardsAdapter),
  extraReducers: (builder) =>
    handleThunks(builder, boardsAdapter, {
      getEntities: getBoards,
      postEntity: postBoard,
      deleteEntity: deleteBoard,
      patchEntity: patchBoard,
    }),
});

export default boardsSlice.reducer;
