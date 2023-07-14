import { createSlice } from "@reduxjs/toolkit";
import { fetchBoards, addBoard } from "../boardsDomain/boardsDomainThunks";
import isRequested from "../../helpers/isRequsted";

const boardsUISlice = createSlice({
  name: "boardsUI",
  initialState: {
    searchParams: "",
    ids: [],
  },
  reducers: {
    setSearchParams(state, { payload }) {
      console.log(payload)
      state.searchParams = payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchBoards.fulfilled, (state, { payload }) => {
        state.ids = payload.map(({ id }) => id);
      })
      .addCase(addBoard.fulfilled, (state, { payload }) => {
        const { board, searchParams } = payload;
        if (isRequested(board, searchParams)) {
          state.ids = [payload.board.id, ...state.ids];
        }
      })
});

export const { setSearchParams } = boardsUISlice.actions;
export default boardsUISlice.reducer;
