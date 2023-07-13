import { createSlice } from "@reduxjs/toolkit";
import { fetchBoards } from "../boardsDomain/boardsDomainThunks";

const boardsUISlice = createSlice({
  name: "boardsUI",
  initialState: {
    ids: [],
  },
  extraReducers: (builder) =>
    builder.addCase(fetchBoards.fulfilled, (state, { payload }) => {
      state.ids = payload.map(({ id }) => id);
    })
});

export default boardsUISlice.reducer;
