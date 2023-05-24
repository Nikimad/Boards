import { createSlice } from "@reduxjs/toolkit";
import { removeBoard } from "../boards/boardsSlice";

const viewSlice = createSlice({
  name: "view",
  initialState: {
    activeBoardId: null,
    activeTaskId: null,
    filter: "",
  },
  reducers: {
    setActiveBoardId(state, { payload }) {
      state.activeBoardId = payload;
      state.activeTaskId = null;
    },
    setActiveTaskId(state, { payload }) {
      state.activeTaskId = payload;
    },
    setFilter(state, { payload }) {
      state.filter = payload.trim();
    },
  },
  extraReducers(builder) {
    builder.addCase(removeBoard, (state) => {
      state.activeBoardId = null;
      state.activeTaskId = null;
    });
  },
});

export const { setActiveBoardId, setActiveTaskId, setFilter } =
  viewSlice.actions;

export default viewSlice.reducer;
